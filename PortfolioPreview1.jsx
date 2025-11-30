// import React, { useEffect, useRef, useState } from "react";
// import "./portfolio.css";
// import { useNavigate, useLocation } from "react-router-dom";

// export default function PortfolioPreview({ data: propData }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [data, setData] = useState(propData || null);
//   const [showPopup, setShowPopup] = useState(false);
//   const [shareLink, setShareLink] = useState("");

//   // Check if it's a public portfolio
//   const isPublic = new URLSearchParams(location.search).get("public") === "true";

//   // Section references
//   const homeRef = useRef(null);
//   const aboutRef = useRef(null);
//   const skillsRef = useRef(null);
//   const projectsRef = useRef(null);
//   const certificatesRef = useRef(null);
//   const contactRef = useRef(null);

//   // Scroll helper
//   const scrollToSection = (ref) => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     if (isPublic) {
//       const saved = localStorage.getItem("publicPortfolio");
//       if (saved) setData(JSON.parse(saved));
//     } else {
//       setData(propData);
//     }
//   }, [isPublic, propData]);

//   if (!data)
//     return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading portfolio...</p>;

//   // ✅ Generate and show shareable link
//   const handleGenerateLink = () => {
//     localStorage.setItem("publicPortfolio", JSON.stringify(data));
//     const baseURL = window.location.origin;
//     const link = `${baseURL}/PortfolioPreview?public=true`;
//     setShareLink(link);
//     setShowPopup(true);
//   };

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(shareLink);
//     alert("✅ Link copied to clipboard!");
//   };

//   return (
//     <div className="portfolio-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">{data.name?.split(" ")[0] || "Portfolio"}</div>
//         <ul>
//           <li onClick={() => scrollToSection(homeRef)}>Home</li>
//           <li onClick={() => scrollToSection(aboutRef)}>About</li>
//           <li onClick={() => scrollToSection(skillsRef)}>Skills</li>
//           <li onClick={() => scrollToSection(projectsRef)}>Projects</li>
//           <li onClick={() => scrollToSection(certificatesRef)}>Certificates</li>
//           <li onClick={() => scrollToSection(contactRef)}>Contact</li>
//         </ul>
//       </nav>

//       {!isPublic && (
//         <div className="portfolio-controls">
       

//         </div>
//       )}

//       {/* Hero Section */}
//       <section ref={homeRef} className="hero-section">
//         <div className="hero-left">
//           <h1 className="hero-title">
//             Hi, I'm <span>{data.name || "Your Name"}</span>
//           </h1>
//           <p className="hero-subtext">
//             {data.heroAbout ||
//               "A passionate developer creating modern and responsive web experiences."}
//           </p>
//         </div>
//         <div className="hero-right">
//           <div className="photo-circle">
//             <img src={data.image || "/default.jpg"} alt="Profile" />
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section ref={aboutRef} className="section about-section">
//         <h2 className="section-title">About Me</h2>
//         <div className="about-box">
//           <p>
//             {data.about ||
//               `I'm ${data.name || "a developer"}, passionate about building modern and creative web apps.`}
//           </p>
//         </div>
//       </section>

//       {/* Skills */}
//       <section ref={skillsRef} className="skills-section">
//         <h2 className="section-title">Skills & Technologies</h2>
//         <div className="skills-grid">
//           {data.skills?.length > 0 ? (
//             data.skills.map((skill, i) => (
//               <span key={i} className="skill-pill">{skill}</span>
//             ))
//           ) : (
//             <p>No skills added yet.</p>
//           )}
//         </div>
//       </section>

//       {/* Projects */}
//       <section ref={projectsRef} className="section">
//         <h2 className="section-title">Projects</h2>
//         {data.projects?.length > 0 ? (
//           data.projects.map((proj, i) => (
//             <div key={i} className="project-card">
//               <h3>{proj.title}</h3>
//               <p>{proj.description}</p>
//               {proj.link && (
//                 <a href={proj.link} target="_blank" rel="noopener noreferrer">
//                   🔗 View Project
//                 </a>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No projects added yet.</p>
//         )}
//       </section>

//       {/* Certificates */}
//       <section ref={certificatesRef} className="section">
//         <h2 className="section-title">Certificates</h2>
//         <div className="cert-grid">
//           {data.certificates?.length > 0 ? (
//             data.certificates.map((cert, i) => (
//               <div key={i} className="cert-card">
//                 <h4>{cert.title}</h4>
//                 {cert.image && <img src={cert.image} alt={cert.title} />}
//               </div>
//             ))
//           ) : (
//             <p>No certificates uploaded yet.</p>
//           )}
//         </div>
//       </section>

//       {/* Contact */}
//       <section ref={contactRef} className="contact-section fade-in">
//         <h2 className="section-title">Contact</h2>
//         <p>📧 {data.email}</p>
//         {data.phone && <p>📞 {data.phone}</p>}
//         <div className="social-icons">
//           <a href={`mailto:${data.email}`} className="icon-p">Email ✉️</a>
//           <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="icon-p">LinkedIn 🔗</a>
//           <a href={data.github} target="_blank" rel="noopener noreferrer" className="icon-p">Github 💼</a>
//         </div>
//       </section>

//       <footer>
//         <p>© {new Date().getFullYear()} {data.name} | Generated by Budge AI</p>
//       </footer>

//       {/* 🌟 Popup for Share Link */}
//       {showPopup && (
//         <div className="popup-overlay" onClick={() => setShowPopup(false)}>
//           <div className="popup-box" onClick={(e) => e.stopPropagation()}>
//             <h2>Portfolio Link for {data.name}</h2>
//             <p className="link-box">{shareLink}</p>
//             <div className="popup-buttons">
//               <button onClick={copyToClipboard}>Copy Link</button>
//               <button
//                 onClick={() => window.open(shareLink, "_blank")}
//                 style={{ backgroundColor: "#007bff", color: "#fff" }}
//               >
//                 Open Link
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="portfolio-buttons">
//   <button onClick={() => navigate(-1)} className="portfolio-back-btn">
//     ← Back
//   </button>

//   <button onClick={handleGenerateLink} className="generate-link-btn">
//     Generate Portfolio Link
//   </button>
// </div>

//     </div>
//   );
// }

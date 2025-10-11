import React, {useState} from 'react'
import "./home.css"
import { Link , useNavigate} from "react-router-dom";
const HomePage = () => {
  const images = [
    "src/assets/Blue Simple Professional CV Resume - Copy (2).png",
    "src/assets/Blue Simple Professional CV Resume (2).png",
    "src/assets/Blue Simple Professional CV Resume (3).png"
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };
 const navigate = useNavigate();
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };
  return (
   <>
   <nav  className='header'>
    <div className='logo'>ZUME</div>
    <ul className='nav-link'> 
  <li><Link to='/'>Home</Link></li>
  <li><Link to='/blogs'>Blogs</Link></li> 
  <li><Link to='/login'>Login</Link></li>
  <li><Link to='/signup'>Sign Up</Link></li>
</ul>
   </nav>
<div className="hero">
  <div className="hero-left">
    <h1>
      Make your <span className="highlight">resume</span> as impressive as your <span className="highlight">skills.</span>
    </h1>
    <h2>Create unlimited, ATS-friendly resumes that recruiters love.</h2>
     <button className="button" onClick={() => navigate("/signup")}>
      Create My Resume
    </button>
  </div>
  <div className="hero-right">
    <img src="src/assets/Gemini_Generated_Image_unexmmunexmmunex.png" 
      alt="resume illustration" 
    />
  </div>
</div>
<div className="slider">
      <h1>These are the <span className="high">templates</span>  which approved by recruiters</h1>
      <p>
        Whether you are a current college student, a fresher or a seasoned
        professional, we have visually appealing templates that will highlight
        your skills and make you stand out.
      </p>

      {/* Image Slider */}
      <div className="slider-container">
        <button className="nav-btn left" onClick={prevSlide}>⬅</button>

        <img src={images[current]} alt="slider" className="slide-img" />

        <button className="nav-btn right" onClick={nextSlide}>➡</button>
      </div>
    </div>
   <div className='steps'>
    <h1>Effortlessly make a <span className="light">job-worthy </span> resume in three easy steps!</h1>
     <h2>STEP-1  <span className="light">Select resume template </span></h2>
     <img src="src/assets/Young man and woman searching.png" alt="hello" />
      <h3>Sign up to select your favourite resume template.</h3>
     <h2>STEP-2  <span className="light">Fill your details </span></h2>
     <img src="src/assets/standardized test as method of assessment.png" alt="hii" />
      <h3>Our templates will automatically present your details in beautiful and ATS friendly formats</h3>
     <h2>STEP-3  <span className="light">Download your resume</span></h2>
     <img src="src/assets/Programming workflow on computer screen.png" alt="" />
     <h3>Once you are happy with your resume, create a shareable link for free or download it in pdf format.</h3>
   </div>
  
       {/* footer */}

  <div className="footer">
  <footer className="footer-container">
    <div className="footer-top">
      <div className="footer-logo">
        <img src="src\assets\zz.png" alt="GoResume" />
        <h2>ZUME...</h2>
      </div>

      <div className="footer-col">
        <h3>Company</h3>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Careers</a></li>
          <li><a href="#">Blogs</a></li>
          <li><a href="#">Contact us</a></li>
         
        </ul>
      </div>

      <div className="footer-col">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms & Conditions</a></li>
         
          <li><a href="#">Returns & Refund</a></li>
          <li><a href="#">Plans & Pricing</a></li>
        </ul>
      </div>

      <div className="footer-col subscribe">
        <h3>Subscribe</h3>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2025 GoResume. A personal project for learning & practice.</p>
    </div>
  </footer>
</div>


   </>
  )
}

export default HomePage;
 
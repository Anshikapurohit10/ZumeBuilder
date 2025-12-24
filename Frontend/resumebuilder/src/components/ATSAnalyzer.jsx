// import { useState } from "react";
// import { uploadResumeATS, analyzeResume, rewriteResume } from "../api/api.js";

// export default function ATSAnalyzer() {
//   const [resumeText, setResumeText] = useState("");
//   const [jdText, setJdText] = useState("");
//   const [role, setRole] = useState("");
//   const [score, setScore] = useState(null);
//   const [matched, setMatched] = useState([]);
//   const [missing, setMissing] = useState([]);
//   const [suggestions, setSuggestions] = useState([]);
//   const [rewriteText, setRewriteText] = useState("");
//   const [loading, setLoading] = useState(false);

//   // UPLOAD RESUME
//   const handleResumeUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     try {
//       const response = await uploadResumeATS(file);
//       setResumeText(response.data.text);
//       alert("🎉 Resume Uploaded Successfully!");
//     } catch {
//       alert("❌ Error uploading resume");
//     }
//   };

//   // ANALYZE
//   const handleAnalyze = async () => {
//     if (!resumeText) return alert("Upload resume first!");

//     setLoading(true);
//     try {
//       const res = await analyzeResume({
//         resumeText,
//         jdText,
//         role,
//       });

//       setScore(res.data.score);
//       setMatched(res.data.matched);
//       setMissing(res.data.missing);
//       setSuggestions(res.data.suggestions);
//     } catch {
//       alert("Analysis failed");
//     }
//     setLoading(false);
//   };

//   // REWRITE
//   const handleRewrite = async () => {
//     if (!resumeText) return alert("Upload resume first!");

//     setLoading(true);
//     try {
//       const res = await rewriteResume({ resumeText, jdText });
//       setRewriteText(res.data.suggestions);
//     } catch {
//       alert("Rewrite failed");
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🚀 ATS Resume Analyzer</h1>

//       {/* Upload */}
//       <div style={styles.card}>
//         <label style={styles.label}>Upload Resume</label>
//         <input type="file" accept=".pdf,.docx" onChange={handleResumeUpload} />
//       </div>

//       {/* Resume */}
//       <div style={styles.card}>
//         <label style={styles.label}>Resume Content</label>
//         <textarea
//           style={styles.textarea}
//           value={resumeText}
//           onChange={(e) => setResumeText(e.target.value)}
//           placeholder="Extracted resume text..."
//         />
//       </div>

//       {/* JD + Role */}
//       <div style={styles.card}>
//         <label style={styles.label}>Job Description</label>
//         <textarea
//           style={styles.jdBox}
//           value={jdText}
//           onChange={(e) => setJdText(e.target.value)}
//           placeholder="Paste job description (optional)"
//         />

//         <label style={styles.label}>Select Role</label>
//         <select
//           style={styles.select}
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="">Select Role</option>
//           <option value="frontend developer">Frontend Developer</option>
//           <option value="backend developer">Backend Developer</option>
//           <option value="full stack developer">Full Stack Developer</option>
//           <option value="data analyst">Data Analyst</option>
//           <option value="ui ux designer">UI/UX Designer</option>
//         </select>
//       </div>

//       {/* Analyze */}
//       <button style={styles.primaryBtn} onClick={handleAnalyze} disabled={loading}>
//         {loading ? "Analyzing..." : "Analyze Resume"}
//       </button>

//       {/* Results */}
//       {score !== null && (
//         <div style={styles.resultCard}>
//           <h2 style={styles.score}>ATS Score: {score}%</h2>

//           <Section title="✅ Matched Keywords" data={matched} />
//           <Section title="❌ Missing Keywords" data={missing} />
//           <Section title="💡 Suggestions" data={suggestions} />
//         </div>
//       )}

//       {/* Rewrite */}
//       <button style={styles.secondaryBtn} onClick={handleRewrite} disabled={loading}>
//         {loading ? "Rewriting..." : "Rewrite with AI"}
//       </button>

//       {rewriteText && (
//         <div style={styles.rewriteBox}>
//           <h3>✨ Improved Resume</h3>
//           <pre>{rewriteText}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

// /* Small reusable section */
// const Section = ({ title, data }) => (
//   <>
//     <h3>{title}</h3>
//     <ul>
//       {data.map((item, i) => (
//         <li key={i}>{item}</li>
//       ))}
//     </ul>
//   </>
// );

// /* UI Styles */
// const styles = {
//   container: {
//     maxWidth: "900px",
//     margin: "40px auto",
//     padding: "25px",
//     fontFamily: "Poppins, sans-serif",
//     background: "linear-gradient(135deg, #f5f7fa, #e4ecff)",
//     borderRadius: "20px",
//   },

//   heading: {
//     textAlign: "center",
//     fontSize: "32px",
//     fontWeight: "700",
//     marginBottom: "30px",
//     color: "#1f2937",
//   },

//   card: {
//     background: "rgba(255,255,255,0.9)",
//     padding: "22px",
//     borderRadius: "16px",
//     marginBottom: "22px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//     border: "1px solid #e5e7eb",
//   },

//   label: {
//     fontWeight: "600",
//     marginBottom: "6px",
//     display: "block",
//     color: "#374151",
//   },

//   textarea: {
//     width: "100%",
//     height: "170px",
//     padding: "12px",
//     borderRadius: "12px",
//     border: "1px solid #c7d2fe",
//     outline: "none",
//     fontSize: "14px",
//     transition: "0.3s",
//   },

//   jdBox: {
//     width: "100%",
//     height: "130px",
//     padding: "12px",
//     borderRadius: "12px",
//     border: "1px solid #bae6fd",
//     marginBottom: "12px",
//     outline: "none",
//   },

//   select: {
//     width: "100%",
//     padding: "12px",
//     borderRadius: "12px",
//     border: "1px solid #93c5fd",
//     fontSize: "14px",
//     cursor: "pointer",
//   },

//   primaryBtn: {
//     width: "100%",
//     padding: "15px",
//     fontSize: "16px",
//     fontWeight: "600",
//     borderRadius: "14px",
//     border: "none",
//     cursor: "pointer",
//     color: "#fff",
//     background: "linear-gradient(135deg, #6366f1, #2563eb)",
//     boxShadow: "0 8px 20px rgba(37,99,235,0.4)",
//     marginBottom: "22px",
//   },

//   secondaryBtn: {
//     width: "100%",
//     padding: "15px",
//     fontSize: "16px",
//     fontWeight: "600",
//     borderRadius: "14px",
//     border: "none",
//     cursor: "pointer",
//     color: "#fff",
//     background: "linear-gradient(135deg, #10b981, #059669)",
//     boxShadow: "0 8px 20px rgba(16,185,129,0.4)",
//     marginBottom: "22px",
//   },

//   resultCard: {
//     background: "linear-gradient(135deg, #eef2ff, #f0fdfa)",
//     padding: "24px",
//     borderRadius: "18px",
//     marginBottom: "25px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
//   },

//   score: {
//     textAlign: "center",
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#1d4ed8",
//     marginBottom: "18px",
//   },

//   rewriteBox: {
//     background: "linear-gradient(135deg, #fff7ed, #ffedd5)",
//     padding: "22px",
//     borderRadius: "18px",
//     boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//     whiteSpace: "pre-wrap",
//   },
// };

import { useState } from "react";
import { uploadResumeATS, analyzeResume, rewriteResume } from "../api/api.js";

export default function ATSAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [role, setRole] = useState("");
  const [score, setScore] = useState(null);
  const [matched, setMatched] = useState([]);
  const [missing, setMissing] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [rewriteText, setRewriteText] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------ UPLOAD RESUME ------------------
const handleResumeUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const response = await uploadResumeATS(file);
    setResumeText(response.data.text);

    if (response?.data?.text) { // ✅ Use response.data.text
      alert("🎉 Resume Uploaded Successfully!");
    }
  } catch (err) {
    console.error(err); // ✅ For debugging
    alert("Error uploading resume");
  }
};



  // ------------------ ANALYZE RESUME ------------------
 const handleAnalyze = async () => {
  if (!resumeText) return alert("Upload or paste resume first!");

  setLoading(true);

  try {
    const payload = {
      resumeText: resumeText,
      jdText: jdText || "",
      role: role || "",
    };

    console.log("📤 Sending:", payload);

    const res = await analyzeResume(payload);

    console.log("📥 Response:", res.data);

    setScore(res.data.score);
    setMatched(res.data.matched);
    setMissing(res.data.missing);
    setSuggestions(res.data.suggestions);

  } catch (err) {
    console.log("ATS ERROR => ", err.response?.data || err);
    alert("Analysis failed");
  }

  setLoading(false);
};

  // ------------------ REWRITE WITH AI ------------------
  const handleRewrite = async () => {
    if (!resumeText) return alert("Upload resume first!!");

    setLoading(true);
    try {
      const res = await rewriteResume({ resumeText, jdText });
      setRewriteText(res.data.suggestions);
    } catch  {
      alert("Rewrite error");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>ATS Analyzer</h1>

      {/* Upload Resume */}
      <div style={styles.card}>
        <label style={styles.label}>Upload Resume (PDF/DOCX)</label>
        <input type="file" accept=".pdf,.docx" onChange={handleResumeUpload} />
      </div>

      {/* Resume Text */}
      <textarea
        style={styles.textarea}
        value={resumeText}
        placeholder="Extracted resume text will appear here..."
        onChange={(e) => setResumeText(e.target.value)}
      />

      {/* JD or Role */}
      <div style={styles.card}>
        <label style={styles.label}>Paste Job Description</label>
        <textarea
          style={styles.jdBox}
          placeholder="Paste JD here (optional)"
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
        />

        <label style={styles.label}>Or Select Role</label>
        <select
          style={styles.select}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="frontend developer">Frontend Developer</option>
<option value="backend developer">Backend Developer</option>
<option value="full stack developer">Full Stack Developer</option>

<option value="data analyst">Data Analyst</option>
<option value="ui ux designer">UI/UX Designer</option>

<option value="teacher">Teacher / Teaching</option>
<option value="medical">Medical / Healthcare</option>
<option value="sports coach">Sports Coach</option>
<option value="fitness trainer">Fitness Trainer</option>
        </select>
      </div>

      {/* Analyze Button */}
      <button style={styles.btn} onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {/* Result */}
      {score !== null && (
        <div style={styles.resultCard}>
          <h2>ATS Score: {score}%</h2>

          <h3>Matched Keywords</h3>
          <ul>
            {matched.map((m, i) => (
              <li key={i}>✔️ {m}</li>
            ))}
          </ul>

          <h3>Missing Keywords</h3>
          <ul>
            {missing.map((m, i) => (
              <li key={i}>❌ {m}</li>
            ))}
          </ul>

          <h3>Suggestions</h3>
          <ul>
            {suggestions.map((s, i) => (
              <li key={i}>💡 {s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Rewrite Button */}
      <button style={styles.btn2} onClick={handleRewrite} disabled={loading}>
        {loading ? "Rewriting..." : "Rewrite with AI"}
      </button>

      {/* Rewrite Result */}
      {rewriteText && (
        <div style={styles.rewriteBox}>
          <h3>AI Improved Resume Content</h3>
          <pre>{rewriteText}</pre>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Poppins",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    background: "#f3f3f3",
    marginBottom: "15px",
  },
  label: { fontWeight: "bold" },
  textarea: {
    width: "100%",
    height: "150px",
    padding: "10px",
    background: "#ffffff",
     color: "#111827",
    borderRadius: "8px",
    marginBottom: "20px",
  
  jdBox: {
    width: "100%",
    height: "120px",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    borderRadius: "8px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "5px",
  },
  btn: {
    width: "100%",
    padding: "12px",
    background: "black",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  resultCard: {
    padding: "15px",
    borderRadius: "10px",
    background: "#e8f7ff",
    marginBottom: "20px",
  },
  btn2: {
    width: "100%",
    padding: "12px",
    background: "#0080ff",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  rewriteBox: {
    padding: "15px",
    borderRadius: "10px",
    background: "#fff3da",
    whiteSpace: "pre-wrap",
  },
}}


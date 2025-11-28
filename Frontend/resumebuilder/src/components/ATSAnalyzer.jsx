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


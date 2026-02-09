
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://zumebuild-5fmx.onrender.com/api/"
      : "http://localhost:5000/api/",
});


export const uploadResumeATS = async (file) => {
  const fd = new FormData();
  fd.append("resume", file);

  const res = await API.post("ats/upload-resume", fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
};

export const analyzeResume = async ({ resumeText, jdText, role }) => {
  return API.post("ats/analyze", {
    resumeText,
    jdText,
    role,
  });
};


export const rewriteResume = (data) => {
  return API.post("ats/rewrite", data);
};

export default API;

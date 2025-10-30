// import axios from "axios";

// export default axios.create({
//   baseURL: " http://localhost:5000/api/",
// });
import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? "https://zume-lgu7.onrender.com/api/"
      : "http://localhost:5000/api/",
});

export default API;

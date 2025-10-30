import API from "./api"; // import your axios instance

const authAPI = {
  signup: async (userData) => {
    const res = await API.post("auth/signup", userData);
    return res.data;
  },

  login: async (credentials) => {
    const res = await API.post("auth/login", credentials);
    return res.data;
  },
};

export default authAPI;

import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-portfolio-backend-32s5.onrender.com/api"
});

export default API;
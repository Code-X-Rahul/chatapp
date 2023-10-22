import axios from "axios";

export default axios.create({
  // baseURL: "https://chatapp-backend-alpha.vercel.app",
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
  },
});

import axios from "axios";



// create axios Instance
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT as string,
  headers: {
    "Content-Type": "application/json",
  },
});

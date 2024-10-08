import axios from "axios";
import { useAuth } from "../context/Auth";


const auth = useAuth()
const api = axios.create();

api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('token');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (accessToken && isTokenExpired(accessToken)) {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const res = await axios.post("http://65.18.112.78:44010/rems/api/v1/Refresh-Token", { refreshToken });

      const newRefreshToken = res.data.data.refreshToken;
      localStorage.setItem("refreshToken", newRefreshToken);

    } catch (error) {
      auth.logout();
      return Promise.reject(error)
    }
  }

  return config;

});

// Helper function to check if token is expired

const isTokenExpired = (token: string): boolean => {
  const decoded = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = decoded.exp * 1000;

  return Date.now() > expirationTime;
}
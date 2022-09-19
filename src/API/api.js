import axios from "axios";
import { BASE_URL } from "../config";
import { removeToken, setToken } from "../utils/localStorage";

const api = axios.create({
  // withCredentials: true,
  baseURL: BASE_URL,
});

// api.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer `;
//   return config;
// });

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.post(`${BASE_URL}/admin/refreshToken`);
        if (
          response &&
          response?.status === 200 &&
          response?.data?.accessToken
        ) {
          setToken(response?.data?.accessToken);
          originalRequest.headers.Authorization = `Bearer ${response?.data?.accessToken}`;
          return api.request(originalRequest);
        }
      } catch (e) {
        if (e?.response?.status === 401) {
          removeToken();
          window.location.pathname = "/singIn";
        }
        console.log("User unauthorized", e.response);
      }
    }
    throw error;
  }
);

export default api;

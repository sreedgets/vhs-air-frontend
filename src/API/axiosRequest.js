import { getToken } from "../utils/localStorage";
import api from "./api";

export const axiosRequest = async (
  query,
  body,
  method,
  limitToken = null,
  blob = false
) => {
  try {
    const token = limitToken ?? getToken();
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (blob) {
    }
    const response = await api({
      method,
      headers,
      url: query,
      data: body,
      responseType: blob ? "blob" : "",
    });
    return response?.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        return error.response.data;
      } else if (error.response.status === 403) {
        return false;
      } else if (error.response.status === 500) {
        alert("Sorry the server is not available right now please try later");
      }
    }
  }
};

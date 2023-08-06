import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Add any other default headers you need
  },
});
axios.defaults.withCredentials = true;

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to the login page
      window.location.href = "/"; // Or use your preferred method for redirection
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

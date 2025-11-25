import axios from "axios";

const API_BASE_URL = "https://revtripindia.com/hidden_site";

/**
 * Axios instance configured with base URL and default headers
 * @type {import('axios').AxiosInstance}
 */
export const axiosInstance: import("axios").AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

/**
 * Request interceptor for adding auth tokens or other headers
 * @param {import('axios').InternalAxiosRequestConfig} config - Axios request configuration
 * @returns {import('axios').InternalAxiosRequestConfig} Modified request configuration
 */
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for handling common errors
 * @param {import('axios').AxiosResponse} response - Axios response
 * @returns {import('axios').AxiosResponse} Response object
 * @param {import('axios').AxiosError} error - Axios error
 * @returns {Promise<never>} Rejected promise with error
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

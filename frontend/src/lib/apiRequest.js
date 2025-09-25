import axios from "axios";

const apiRequest = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
apiRequest.interceptors.request.use(
  (config) => {
    console.log('Making API request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiRequest.interceptors.response.use(
  (response) => {
    console.log('API response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default apiRequest;
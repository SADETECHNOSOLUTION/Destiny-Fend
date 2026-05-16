// axiosInstance.js

import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, removeTokens } from './tokenService';

const api = axios.create({
  baseURL: 'https://your-api-endpoint.com',  // Replace with your API base URL
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,  // If response is OK, just return it
  async (error) => {
    const originalRequest = error.config;

    // If the error is because of an expired access token, refresh the token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;  // Prevent infinite retry loop
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Request new access token using the refresh token
          const response = await axios.post('https://your-api-endpoint.com/refresh', {
            refresh_token: refreshToken,
          });

          const newAccessToken = response.data.access_token;
          const newRefreshToken = response.data.refresh_token;

          // Store the new tokens
          setAccessToken(newAccessToken);
          if (newRefreshToken) {
            setRefreshToken(newRefreshToken);
          }

          // Update the original request with the new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return api(originalRequest);
        } catch (refreshError) {
          // If refreshing the token fails, log out the user
          removeTokens();
          window.location.href = '/login'; // Redirect to login or show an error
        }
      }
    }

    return Promise.reject(error);  // If the error is not related to token expiration
  }
);

export default api;

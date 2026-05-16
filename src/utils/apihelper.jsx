// utils/apiHelper.js

export async function fetchWithRefresh(url, options = {}) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
  
    let response = await fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
      body: options.body,
    });
  
    if (response.status === 401) { // Token expired, attempt to refresh
      if (!refreshToken) {
        return logoutUser();
      }
  
      const refreshResponse = await fetch('/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!refreshResponse.ok) {
        return logoutUser(); // Refresh failed, logout user
      }
  
      const { token: newAccessToken, refreshToken: newRefreshToken } = await refreshResponse.json();
  
      // Store new tokens
      localStorage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken); // Optionally rotate refresh token
      }
  
      // Retry the original request with the new access token
      response = await fetch(url, {
        method: options.method || 'GET',
        headers: {
          'Authorization': `Bearer ${newAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: options.body,
      });
    }
  
    return response;
  }
  
  function logoutUser() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login'; // Redirect to login page
  }
  
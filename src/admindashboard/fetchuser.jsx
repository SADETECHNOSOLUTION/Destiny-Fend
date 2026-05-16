// Function to refresh the access token using the refresh token

const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
};

const setAccessToken = (token) => {
  localStorage.setItem('token', token);
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error('No refresh token available');
    return null;
  }
  const token = localStorage.getItem('token')
  try { 
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
      body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.access_token) {
        setAccessToken(data.access_token);  // Store new access token
        if (data.refresh_token) {
          localStorage.setItem('refresh_token', data.refresh_token);  // Optional: store a new refresh token if provided
        }
        return data.access_token;
      } else {
        console.error('Failed to refresh token');
        return null;
      }
    } else {
      console.error('Failed to refresh token', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return null;
  }
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem('token');  // Get the token from localStorage

  if (!token) {
    console.error('No token found, user might need to log in');
    window.location.href = '/login';  // Redirect to login page
    return null;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/adminuser/get-profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`  // Only set the token if it's not null
      }
    });

    // Log the response status and body for debugging
    console.log('Response Status:', response.status);
    const responseBody = await response.json();
    console.log('Response Body:', responseBody);

    if (response.ok) {
      if (responseBody.statusCode === 200 && responseBody.ourUsers) {
        return responseBody.ourUsers;  // Return the `ourUsers` object
      } else {
        console.error('Invalid data format:', responseBody);
        return null;
      }
    } else if (response.status === 401) {
      // Token has expired, try refreshing the token
      console.log('Access token expired, attempting to refresh token...');
      const newAccessToken = await refreshAccessToken();

      if (newAccessToken) {
        // Retry the request with the new access token
        return fetchUserProfile();  // Recursively call the function with the new token
      } else {
        console.error('Failed to refresh token, logging out...');
        window.location.href = '/login';  // Redirect to login or show a message
        return null;
      }
    } else {
      console.error('Failed to fetch user profile:', response.status);
      return null;
    }
  } catch (error) {
    // Detailed error handling for fetch failure
    console.error('Error fetching user profile:', error);
    if (error instanceof TypeError) {
      // Network-related errors (e.g., failed to reach server)
      console.error('Network error: Could not reach the API server.');
    } else {
      // Other errors
      console.error('Unexpected error:', error);
    }
    return null;
  }
};

  
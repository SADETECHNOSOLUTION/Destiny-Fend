// authslice.js (Updated)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('userId') || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      localStorage.setItem('userId', action.payload.userId);  
      localStorage.setItem('token', action.payload.token);   
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');  
      localStorage.removeItem('token');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;

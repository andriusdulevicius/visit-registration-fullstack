import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    user: undefined,
  },
  reducers: {
    login: (state, action) => ({
      ...state,
      isAuthenticated: true,
      user: action.payload,
    }),
    logout: (state) => ({
      ...state,
      isAuthenticated: false,
      user: undefined,
    }),
  },
});

export const authActions = authSlice.actions;

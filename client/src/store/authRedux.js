import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authentitication',
  initialState: {
    isAuthenticated: false,
    users: [{ email: 'frontend@isawesome.com', password: 'cool' }],
    loggedInUser: {},
  },
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
    setLoggedInUser(state, action) {
      state.loggedInUser = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

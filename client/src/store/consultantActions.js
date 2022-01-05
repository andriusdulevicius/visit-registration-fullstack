import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  consultant: {
    visitors: [],
    email: '',
    isLoggedIn: '',
    isActive: '',
  },
};

export const consultantSlice = createSlice({
  name: 'consultant',
  initialState: INITIAL_STATE,
  reducers: {
    setConsultant: (state, action) => ({ ...state, ...action.payload }),
  },
});

export const consultantActions = consultantSlice.actions;

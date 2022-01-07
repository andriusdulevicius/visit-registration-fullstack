import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  visitors: [],
  email: null,
  isActive: false,
};

export const consultantSlice = createSlice({
  name: 'consultant',
  initialState: INITIAL_STATE,
  reducers: {
    updateVisitors: (state, action) => ({ ...state, visitors: action.payload }),
    setConsultant: (state, action) => ({ ...state, ...action.payload }),
    removeConsultant: () => INITIAL_STATE,
  },
});

export const consultantActions = consultantSlice.actions;

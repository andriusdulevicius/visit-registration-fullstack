import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  count: 0,
};

export const activeConsultantsSlice = createSlice({
  name: 'activeConsultants',
  initialState: INITIAL_STATE,
  reducers: {
    setActiveConsultants: (state, action) => ({ count: action.payload }),
  },
});

export const activeConsultantsActions = activeConsultantsSlice.actions;

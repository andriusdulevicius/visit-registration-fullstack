import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  allVisits: [],
  activeVisit: {},
};

export const visitsSlice = createSlice({
  name: 'visits',
  initialState: INITIAL_STATE,
  reducers: {
    getAllVisits(state, action) {
      state.allVisits = action.payload;
    },
    getAllVisits2(state, action) {
      state.allVisits = action.payload;
    },
    setActiveVisit(state, action) {
      state.activeVisit = action.payload;
    },
  },
});

export const visitsActions = visitsSlice.actions;

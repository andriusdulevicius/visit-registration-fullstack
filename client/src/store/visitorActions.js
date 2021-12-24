import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  consultant: {},
  reference: '',
  _id: '',
};

export const visitorSlice = createSlice({
  name: 'visitor',
  initialState: INITIAL_STATE,
  reducers: {
    setVisitor: (state, action) => {
      console.log('$$$ state', state);
      console.log('$$$ action.payload', action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const visitorActions = visitorSlice.actions;

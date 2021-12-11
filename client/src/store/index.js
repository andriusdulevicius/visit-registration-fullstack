import { configureStore } from '@reduxjs/toolkit';
import { visitsSlice } from './visitsRedux';
import { authSlice } from './authRedux';

const store = configureStore({
  reducer: { visits: visitsSlice.reducer, auth: authSlice.reducer },
});

export default store;

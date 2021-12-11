import { configureStore } from '@reduxjs/toolkit';
import { visitsSlice } from './visitsActions';
import { authSlice } from './authActions';

const store = configureStore({
  reducer: { visits: visitsSlice.reducer, auth: authSlice.reducer },
});

export default store;

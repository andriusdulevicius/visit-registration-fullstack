import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { visitorSlice } from './visitorActions';
import { activeConsultantsSlice } from './activeConsultantsAction';
import { consultantSlice } from './consultantActions';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducers = combineReducers({
  visitor: visitorSlice.reducer,
  consultant: consultantSlice.reducer,
  activeConsultants: activeConsultantsSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export const persistor = persistStore(store);

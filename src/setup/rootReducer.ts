import authSlice from '@bus/auth/slice';
import optionsSlice from '@bus/options/slice';
import profileSlice from '@bus/profile/slice';
import uiSlice from '@bus/ui/slice';
import { combineReducers } from '@reduxjs/toolkit';

// IMPORTS

export const rootReducer = combineReducers({
  options: optionsSlice.reducer,
  ui: uiSlice.reducer,
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  // INJECT
});

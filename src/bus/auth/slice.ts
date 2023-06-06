// eslint-disable-next-line @typescript-eslint/no-unused-vars,prettier/prettier
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// eslint-disable-next-line prettier/prettier
import {
  AuthState,
} from './typedefs';

const initialState: AuthState = {
  isFetching: false,
  isAuthenticated: false,
  isInitialised: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    initialize(state) {
      state.isInitialised = true;
    },
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    // INJECT
  },
});

export default authSlice;

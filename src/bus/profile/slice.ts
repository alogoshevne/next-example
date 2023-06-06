// eslint-disable-next-line @typescript-eslint/no-unused-vars,prettier/prettier
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line prettier/prettier
import {
  ProfileState,
  FillProfileActionPayload,
} from './typedefs';

const initialState: ProfileState = {
  isFetching: false,
  profile: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    fillProfile(state, action: PayloadAction<FillProfileActionPayload>) {
      state.profile = action.payload;
    },
    // INJECT
  },
});

export default profileSlice;

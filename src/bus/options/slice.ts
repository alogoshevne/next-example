// eslint-disable-next-line @typescript-eslint/no-unused-vars,prettier/prettier
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// eslint-disable-next-line prettier/prettier
import {
  OptionsState,
} from './typedefs';

const initialState: OptionsState = {};

const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    // INJECT
  },
});

export default optionsSlice;

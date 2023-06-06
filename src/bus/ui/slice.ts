// eslint-disable-next-line @typescript-eslint/no-unused-vars,prettier/prettier
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// eslint-disable-next-line prettier/prettier
import {
  FillThemeActionPayload,
  ModalDataActionPayload,
  ThemeVariant,
  UiState,
} from './typedefs';

const initialState: UiState = {
  isFetching: false,
  theme: ThemeVariant.dark,
  isSidebarOpen: false,
  isModalOpen: false,
  modalData: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    fillTheme(state, action: PayloadAction<FillThemeActionPayload>) {
      state.theme = action.payload;
    },
    showModal(state) {
      state.isModalOpen = true;
    },
    hideModal(state) {
      state.isModalOpen = false;
    },
    fillModalData(state, action: PayloadAction<ModalDataActionPayload>) {
      state.modalData = action.payload;
    },
    clearModal(state) {
      state.modalData = null;
    },
    // INJECT
  },
});

export default uiSlice;

//state type____________________________________
export type UiState = {
  isFetching: boolean;
  theme: ThemeVariant;
  isSidebarOpen: boolean;

  isModalOpen: boolean;
  modalData: ModalDataActionPayload | null;
};

// INJECT
//payload types_________________________________
export type FillThemeActionPayload = ThemeVariant;

export type ModalDataActionPayload = {
  modalName: string;
  modalComponent?: null;
  modalPayload?: any;
};

//common types__________________________________
export enum ThemeVariant {
  dark = 'dark',
  light = 'light',
}

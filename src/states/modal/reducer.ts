import { createSlice } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
  component: React.ReactNode;
  props: any;
}

const initialState: ModalState = {
  open: false,
  component: null,
  props: null,
};

export const ModalSlide = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.open = true;
      state.component = payload.component;
      // state.props = payload.props;
    },
    closeModal: (state) => {
      state.open = false;
      state.component = null;
      // state.props = null;
    },
  },
});

export const { openModal, closeModal } = ModalSlide.actions;
export default ModalSlide.reducer;

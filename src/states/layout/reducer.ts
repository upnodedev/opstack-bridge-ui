import { createSlice } from '@reduxjs/toolkit';

const initialState: LayoutState = {
  sidebarOpen: false,
};

export const LayoutSlide = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    TOGGLESIDEBAR: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    OPENSIDEBAR: (state) => {
      state.sidebarOpen = true;
    },
    CLOSESIDEBAR: (state) => {
      state.sidebarOpen = false;
    },
  },
});
export const { TOGGLESIDEBAR, OPENSIDEBAR, CLOSESIDEBAR } = LayoutSlide.actions;
export default LayoutSlide.reducer;

import { useAppDispatch, useAppSelector } from '@states/hooks';

// export const useSideBar = () => useAppSelector((state) => state.layout.sidebarOpen);

export const useModal = () => useAppSelector((state) => state.modal);
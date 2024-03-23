import { useAppSelector } from '@states/hooks';

export const useSideBar = () => useAppSelector((state) => state.layout.sidebarOpen);

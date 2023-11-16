import { create } from 'zustand';

interface DrawerState {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
}

const useDrawerStore = create<DrawerState>((set) => ({
  isDrawerOpen: true,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
}));

export default useDrawerStore;

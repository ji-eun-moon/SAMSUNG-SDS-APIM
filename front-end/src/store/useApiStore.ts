import { create } from 'zustand';

interface SelectedApi {
  name: string;
  id: number;
}

interface StoreState {
  selectedApi: SelectedApi;
  selectApi: (name: string, id: number) => void;
  selectedCategory: number;
  selectCategory: (id: number) => void;
}

const useApiStore = create<StoreState>((set) => ({
  selectedApi: { name: '', id: 0 },
  selectApi: (name, id) =>
    set({
      selectedApi: { name, id },
    }),
  selectedCategory: 0,
  selectCategory: (selectedCategory) => set({ selectedCategory }),
}));

export default useApiStore;

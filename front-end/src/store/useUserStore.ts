import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  selectedTeam: string;
  setSelectedTeam: (selectedTeam: string) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      selectedTeam: '',
      setSelectedTeam: (selectedTeam: string) => {
        set({ selectedTeam });
      },
    }),
    {
      name: 'userStore',
    },
  ),
);

export default useUserStore;

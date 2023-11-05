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
// 스토어에서 직접 selectedTeam 값을 가져옵니다.
export const getSelectedTeam = () => useUserStore.getState().selectedTeam;

import { create } from 'zustand';
import { JsonData } from '@/utils/json';

interface TestState {
  testResponse: string;
  setTestResponse: (testResponse: string) => void; // eslint-disable-line no-unused-vars
  testRequest: string | JsonData;
  setTestRequest: (testRequest: string) => void; // eslint-disable-line no-unused-vars
  status: number;
  setStatus: (status: number) => void; // eslint-disable-line no-unused-vars
  loading: boolean;
  setLoading: (loading: boolean) => void; // eslint-disable-line no-unused-vars
  resetStatus: () => void; // eslint-disable-line no-unused-vars
  params: Record<string, string>;
  setParam: (key: string, value: string) => void; // eslint-disable-line no-unused-vars
  resetParams: () => void; // eslint-disable-line no-unused-vars
  resetTestResponse: () => void; // eslint-disable-line no-unused-vars
  resetTestRequest: () => void; // eslint-disable-line no-unused-vars
}

const useTestStore = create<TestState>((set) => ({
  testResponse: '',
  testRequest: '',
  status: 200,
  loading: false,
  trial: 100,
  setTestResponse: (testResponse) => set(() => ({ testResponse })),
  setTestRequest: (testRequest) => set(() => ({ testRequest })),
  setStatus: (status) => set(() => ({ status })),
  setLoading: (loading) => set(() => ({ loading })),
  resetStatus: () => set(() => ({ status: 200 })),
  params: {},
  setParam: (key, value) => set((state) => ({ params: { ...state.params, [key]: value } })),
  resetParams: () => set({ params: {} }),
  resetTestResponse: () => set(() => ({ testResponse: '' })),
  resetTestRequest: () => set(() => ({ testRequest: '' })),
}));

export default useTestStore;

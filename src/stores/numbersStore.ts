import create from 'zustand';
import { NumberRecord } from '@/types/contracts';

const initialNumbers: NumberRecord[] = [];

interface NumbersState {
  numbers: NumberRecord[];
  importNumber: (numberData: Omit<NumberRecord, 'id' | 'health' | 'lastSync'>) => void;
}

export const useNumbersStore = create<NumbersState>((set) => ({
  numbers: initialNumbers,
  importNumber: (numberData) => set((state) => {
    const newNumber: NumberRecord = {
      ...numberData,
      id: `num-${state.numbers.length + 1}`,
      health: 'active',
      lastSync: new Date(),
    };
    return { numbers: [...state.numbers, newNumber] };
  }),
}));

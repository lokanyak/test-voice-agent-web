import create from 'zustand';
import { CallRecord } from '@/types/contracts';

const initialCalls: CallRecord[] = [
    { id: 'd5c0a', phoneNumber: '+917008475642', agentId: '1', duration: 38, status: 'completed', cost: 0.061, timestamp: new Date('2025-08-30T12:55:00'), transcript: [] },
    { id: 'c8b30', phoneNumber: '+917008475642', agentId: '1', duration: 40, status: 'completed', cost: 0.061, timestamp: new Date('2025-08-24T12:02:00'), transcript: [] },
];

interface CallsState {
  calls: CallRecord[];
}

export const useCallsStore = create<CallsState>(() => ({
  calls: initialCalls,
}));

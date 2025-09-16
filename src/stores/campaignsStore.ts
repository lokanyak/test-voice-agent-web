import create from 'zustand';
import { Campaign, CampaignStatus } from '@/types/contracts';
import { useAgentsStore } from './agentsStore';

const DEMO_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    name: 'August Promotion Outreach',
    description: 'Calling all new sign-ups with a special offer.',
    agentId: 'agent-1',
    status: 'completed',
    contacts: Array(100).fill({ name: 'John Doe', phone_number: '+1234567890' }),
    settings: {
      callingWindow: { start: '09:00', end: '17:00', timezone: 'America/New_York' },
      maxAttempts: 2,
      retryDelay: 30,
      callsPerMinute: 10,
      recordCalls: true,
    },
    progress: { total: 100, completed: 100, success: 82 },
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
  {
    id: 'camp-2',
    name: 'Feedback Survey - Q3',
    agentId: 'agent-2',
    status: 'running',
    contacts: Array(250).fill({ name: 'Jane Smith', phone_number: '+1234567890' }),
    settings: {
      callingWindow: { start: '10:00', end: '18:00', timezone: 'Asia/Kolkata' },
      maxAttempts: 1,
      retryDelay: 0,
      callsPerMinute: 5,
      recordCalls: false,
    },
    progress: { total: 250, completed: 112, success: 95 },
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

type CampaignFilters = {
  status: 'all' | CampaignStatus;
  search: string;
};

interface CampaignsStore {
  campaigns: Campaign[];
  filters: CampaignFilters;
  createCampaign: (data: Omit<Campaign, 'id' | 'createdAt' | 'progress' | 'status'>) => Campaign;
  setFilters: (filters: Partial<CampaignFilters>) => void;
}

// Set to true to demonstrate the empty state for a new user
const IS_NEW_USER = true;

export const useCampaignsStore = create<CampaignsStore>((set) => ({
  campaigns: IS_NEW_USER ? [] : DEMO_CAMPAIGNS,
  filters: { status: 'all', search: '' },
  createCampaign: (data) => {
    const newCampaign: Campaign = {
      ...data,
      id: `camp-${Date.now()}`,
      status: data.scheduledFor ? 'scheduled' : 'draft',
      progress: { total: data.contacts.length, completed: 0, success: 0 },
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ campaigns: [newCampaign, ...state.campaigns] }));
    return newCampaign;
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },
}));

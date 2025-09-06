import create from 'zustand';
import { Agent, AgentStatus, Lang } from '@/types/contracts';

const DEMO_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Priya - Hotel Bookings',
    description: 'Handles hotel reservations and customer inquiries for Hotel Beach Comforts.',
    category: 'hotel',
    status: 'active',
    languages: ['en-IN', 'hi-IN'],
    welcome: 'Hello, thank you for calling Hotel Beach Comforts. How can I help you today?',
    systemPrompt: 'You are Priya, a warm and professional hotel booking assistant.',
    providers: { llm: 'openai', stt: 'deepgram', tts: 'cartesia' },
    voice: {
      byLang: {
        'en-IN': { provider: 'cartesia', voiceId: 'priya-en', speed: 1.0, pitch: 0 },
        'hi-IN': { provider: 'sarvam', voiceId: 'priya-hi', speed: 1.0, pitch: 0 },
      }
    },
    llmConfig: { model: 'gpt-4o', temperature: 0.7, maxTokens: 1024 },
    knowledgeBase: { enabled: true, documentIds: ['doc-1'] },
    advanced: { tools: ['calendar'], callRecording: true },
    metrics: { callsToday: 47, avgDurationSec: 151, successRate: 0.94, costPerMinINR: 2.3 },
    avatarUrl: 'https://i.pravatar.cc/150?u=priya',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'agent-2',
    name: 'Anusha - Restaurant Reservations',
    description: 'Manages table bookings and dining inquiries for Spice Garden.',
    category: 'restaurant',
    status: 'draft',
    languages: ['or-IN'],
    welcome: 'Welcome to Spice Garden, this is Anusha. How may I assist you with your reservation?',
    systemPrompt: 'You are Anusha, a professional restaurant reservation assistant.',
    providers: { llm: 'gemini', stt: 'sarvam', tts: 'sarvam' },
    voice: {
      byLang: {
        'or-IN': { provider: 'sarvam', voiceId: 'anusha-or', speed: 1.0, pitch: 0 }
      }
    },
    llmConfig: { model: 'gemini-pro', temperature: 0.8, maxTokens: 2048 },
    knowledgeBase: { enabled: false, documentIds: [] },
    advanced: { tools: [], callRecording: false },
    metrics: { callsToday: 12, avgDurationSec: 95, successRate: 0.88, costPerMinINR: 1.9 },
    avatarUrl: 'https://i.pravatar.cc/150?u=anusha',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export type AgentFilters = {
  status: 'all' | AgentStatus;
  search: string;
};

interface AgentsStore {
  agents: Agent[];
  isLoading: boolean;
  filters: AgentFilters;
  getAgentById: (id: string) => Agent | undefined;
  createAgent: (data: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Agent;
  updateAgent: (id: string, data: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
  cloneAgent: (id: string) => void;
  setFilters: (filters: Partial<AgentFilters>) => void;
}

// Set to true to demonstrate the empty state for a new user
const IS_NEW_USER = true;

export const useAgentsStore = create<AgentsStore>((set, get) => ({
  agents: IS_NEW_USER ? [] : DEMO_AGENTS,
  isLoading: false,
  filters: { status: 'all', search: '' },
  getAgentById: (id) => get().agents.find(agent => agent.id === id),
  createAgent: (data) => {
    const newAgent: Agent = {
      ...data,
      id: `agent-${Date.now()}`,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ agents: [newAgent, ...state.agents] }));
    return newAgent;
  },
  updateAgent: (id, data) => {
    set((state) => ({
      agents: state.agents.map(agent => 
        agent.id === id ? { ...agent, ...data, updatedAt: new Date().toISOString() } : agent
      ),
    }));
  },
  deleteAgent: (id) => {
    set((state) => ({
      agents: state.agents.filter(agent => agent.id !== id),
    }));
  },
  cloneAgent: (id) => {
    const agentToClone = get().agents.find(agent => agent.id === id);
    if (agentToClone) {
      const clonedAgent: Agent = {
        ...agentToClone,
        id: `agent-${Date.now()}`,
        name: `${agentToClone.name} (Copy)`,
        status: 'draft',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      set((state) => ({ agents: [clonedAgent, ...state.agents] }));
    }
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },
}));

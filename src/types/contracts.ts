export type AgentStatus = 'active' | 'draft' | 'paused' | 'testing';
export type ProviderName = 'openai' | 'google' | 'anthropic' | 'sarvam' | 'deepgram' | 'cartesia' | 'elevenlabs';
export type Tier = 'free' | 'pro' | 'enterprise';
export type Lang = 'en-IN' | 'hi-IN' | 'or-IN';
export type CampaignStatus = 'draft' | 'scheduled' | 'running' | 'completed' | 'paused';

export interface Agent {
  id: string;
  name: string;
  description?: string;
  category?: 'hotel' | 'restaurant' | 'healthcare' | 'sales' | 'support' | 'custom';
  status: AgentStatus;
  languages: Lang[];
  welcome: string;
  systemPrompt: string;
  providers: {
    llm: 'openai' | 'gemini';
    stt: 'deepgram' | 'sarvam';
    tts: 'sarvam' | 'cartesia' | 'elevenlabs';
  };
  voice: {
    byLang: Partial<Record<Lang, { provider: string; voiceId: string; speed: number; pitch: number }>>;
  };
  llmConfig: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
  knowledgeBase: {
    enabled: boolean;
    documentIds: string[];
  };
  advanced: {
    tools: ('calendar' | 'crm' | 'customApi')[];
    callRecording: boolean;
  };
  metrics?: {
    callsToday: number;
    avgDurationSec: number;
    successRate: number;
    costPerMinINR: number;
  };
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderConfig {
  name: ProviderName;
  label: string;
  type: 'llm' | 'stt' | 'tts';
  apiKey: string | null;
  status: 'connected' | 'unconfigured' | 'failed';
  pricingMode: 'platform' | 'custom';
}

export interface NumberRecord {
  id: string;
  phoneNumber: string;
  provider: 'twilio' | 'platform';
  assignedAgentId: string | null;
  capabilities: ('voice' | 'sms')[];
  health: 'active' | 'syncing' | 'error';
  lastSync: Date;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  size: number; // in bytes
  type: 'pdf' | 'doc' | 'txt' | 'url';
  language: string;
  status: 'indexed' | 'processing' | 'error';
  lastIndexed: Date;
  source: 'file' | 'url';
}

export interface CallRecord {
  id: string;
  phoneNumber: string;
  agentId: string;
  duration: number; // in seconds
  status: 'completed' | 'failed' | 'in-progress';
  cost: number;
  timestamp: Date;
  transcript: { speaker: 'user' | 'agent'; text: string; timestamp: number }[];
}

export interface Campaign {
  id: string;
  name: string;
  description?: string;
  agentId: string;
  status: CampaignStatus;
  contacts: { name: string; phone_number: string; [key: string]: any }[];
  settings: {
    callingWindow: { start: string; end: string; timezone: string };
    maxAttempts: number;
    retryDelay: number; // in minutes
    callsPerMinute: number;
    recordCalls: boolean;
  };
  progress: {
    total: number;
    completed: number;
    success: number;
  };
  createdAt: string;
  scheduledFor?: string;
}

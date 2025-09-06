import { Agent, ProviderConfig, NumberRecord, KnowledgeDoc, CallRecord } from '@/types/contracts';

export const DASHBOARD_METRICS = {
  totalAgents: { value: 3, change: '+12%', changeType: 'positive' as const },
  callsToday: { value: 47, change: '+23%', changeType: 'positive' as const },
  avgResponseTime: { value: '1.2s', change: '-0.3s', changeType: 'positive' as const },
  monthlyCost: { value: '₹2,840', change: '+₹450', changeType: 'neutral' as const }
}

export const LANGUAGE_DISTRIBUTION = [
  { name: 'Hindi', value: 45, color: '#FF6B35' },
  { name: 'English', value: 40, color: '#004E89' },
  { name: 'Odia', value: 15, color: '#00A6ED' }
]

export const CALL_VOLUME_DATA = [
  { date: 'Mon', calls: 32 },
  { date: 'Tue', calls: 41 },
  { date: 'Wed', calls: 35 },
  { date: 'Thu', calls: 51 },
  { date: 'Fri', calls: 47 },
  { date: 'Sat', calls: 38 },
  { date: 'Sun', calls: 29 }
]

export const AGENT_TEMPLATES = {
  hotel: {
    name: "Hotel Booking Assistant",
    description: "Handles hotel reservations and customer inquiries",
    prompts: {
      hindi: `आप प्रिया हैं, एक warm और professional hotel booking assistant।`,
      odia: `ଆପଣ ଅନୁଷା, ଏକ warm ଓ professional hotel booking assistant।`,
      english: `You are Priya, a professional hotel booking assistant for Indian hospitality.`
    }
  },
  restaurant: {
    name: "Restaurant Reservation",
    description: "Manages table bookings and dining inquiries",
    prompts: {
      hindi: `आप अर्जुन हैं, Spice Garden restaurant के booking assistant।`,
      odia: `ଆପଣ ଅର୍ଜୁନ, Spice Garden restaurant ର booking assistant।`,
      english: `You are Arjun, reservation assistant for Spice Garden restaurant.`
    }
  },
  healthcare: {
    name: "Healthcare Appointment",
    description: "Schedules medical appointments and handles patient inquiries",
    prompts: {
      hindi: `आप डॉ. माया हैं, HealthCare Plus के appointment assistant।`,
      odia: `ଆପଣ ଡାକ୍ତର ମାୟା, HealthCare Plus ର appointment assistant।`,
      english: `You are Dr. Maya, appointment assistant for HealthCare Plus.`
    }
  }
}

export const DEMO_AGENTS: Agent[] = [
  {
    id: '1',
    name: 'Priya',
    description: 'Appointment Setting and Reminder Services',
    company: 'Hotel Beach Comforts',
    avatarUrl: 'https://i.pravatar.cc/150?u=priya',
    status: 'active',
    languages: ['hindi', 'english'],
    callsToday: 23,
    avgDuration: '2m 45s',
    costPerMinute: '₹0.023',
    lastActivity: '5 minutes ago',
    template: 'hotel',
    systemPrompt: AGENT_TEMPLATES.hotel.prompts.hindi,
    voiceSettings: {
        hindi: { provider: 'sarvam', voice: 'anushka', speed: 1, pitch: 0 },
        english: { provider: 'cartesia', voice: 'priya', speed: 1.1, pitch: 2 },
    },
    llmProvider: 'openai',
    llmModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 1024,
    knowledgeBaseEnabled: true,
    toolsEnabled: false,
  },
  {
    id: '2',
    name: 'Anusha',
    description: 'Restaurant Reservation and Food Ordering',
    company: 'Spice Garden Restaurant',
    avatarUrl: 'https://i.pravatar.cc/150?u=anusha',
    status: 'draft',
    languages: ['hindi', 'odia', 'english'],
    callsToday: 0,
    avgDuration: '0m 00s',
    costPerMinute: '₹0.023',
    lastActivity: 'Never',
    template: 'restaurant',
    systemPrompt: AGENT_TEMPLATES.restaurant.prompts.english,
    voiceSettings: {},
    llmProvider: 'google',
    llmModel: 'gemini-pro',
    temperature: 0.8,
    maxTokens: 2048,
    knowledgeBaseEnabled: false,
    toolsEnabled: false,
  },
];


export const RECENT_ACTIVITIES = [
  {
    id: 1,
    type: 'call',
    message: 'Hotel Voice Agent handled 15 successful calls',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    status: 'success'
  },
  {
    id: 2,
    type: 'agent',
    message: 'New agent "Restaurant Reservation" created',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: 'info'
  },
];

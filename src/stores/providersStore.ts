import create from 'zustand';
import { ProviderConfig } from '@/types/contracts';

const initialProviders: ProviderConfig[] = [
  { name: 'openai', label: 'OpenAI', type: 'llm', apiKey: null, status: 'unconfigured', pricingMode: 'platform' },
  { name: 'google', label: 'Google Gemini', type: 'llm', apiKey: null, status: 'unconfigured', pricingMode: 'platform' },
  { name: 'deepgram', label: 'Deepgram', type: 'stt', apiKey: null, status: 'unconfigured', pricingMode: 'platform' },
  { name: 'sarvam', label: 'Sarvam AI', type: 'stt', apiKey: null, status: 'unconfigured', pricingMode: 'platform' },
  { name: 'cartesia', label: 'Cartesia AI', type: 'tts', apiKey: null, status: 'unconfigured', pricingMode: 'platform' },
  { name: 'elevenlabs', label: 'ElevenLabs', type: 'tts', apiKey: null, status: 'unconfigured', pricingMode: 'platform' },
];

interface ProvidersState {
  providers: ProviderConfig[];
  updateProviderKey: (name: ProviderConfig['name'], apiKey: string) => void;
  updatePricingMode: (name: ProviderConfig['name'], mode: 'platform' | 'custom') => void;
}

export const useProvidersStore = create<ProvidersState>((set) => ({
  providers: initialProviders,
  updateProviderKey: (name, apiKey) => set((state) => ({
    providers: state.providers.map(p => 
      p.name === name ? { ...p, apiKey, status: apiKey ? 'connected' : 'unconfigured' } : p
    ),
  })),
  updatePricingMode: (name, mode) => set((state) => ({
    providers: state.providers.map(p =>
      p.name === name ? { ...p, pricingMode: mode } : p
    ),
  })),
}));

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Share, 
  PhoneCall, 
  Settings2, 
  Save, 
  Bot, 
  MessageSquare, 
  Headphones, 
  Cog, 
  Phone, 
  Wrench, 
  BarChart, 
  PhoneIncoming,
  Sparkles,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AGENT_TEMPLATES } from '@/lib/mock-data';

interface AgentDetailsProps {
  agent: {
    id: string;
    name: string;
    description: string;
    status: 'active' | 'draft' | 'paused';
    languages: string[];
    callsToday: number;
    avgDuration: string;
    costPerMinute: string;
    lastActivity: string;
    template?: string;
  };
}

const TABS = [
  { id: 'agent', label: 'Agent', icon: Bot },
  { id: 'llm', label: 'LLM', icon: MessageSquare },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'engine', label: 'Engine', icon: Cog },
  { id: 'call', label: 'Call', icon: Phone },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
  { id: 'inbound', label: 'Inbound', icon: PhoneIncoming },
];

export function AgentDetails({ agent }: AgentDetailsProps) {
  const [activeTab, setActiveTab] = useState('agent');
  const [welcomeMessage, setWelcomeMessage] = useState(
    "नमस्ते! मैं प्रिया बोल रही हूं Hotel Beach Comfort से। आज में आपकी कैसे help कर सकती हूं?"
  );
  const [agentPrompt, setAgentPrompt] = useState(
    agent.template ? AGENT_TEMPLATES[agent.template as keyof typeof AGENT_TEMPLATES]?.prompts.hindi || '' : ''
  );

  const usageData = [
    { name: 'Transcriber', value: 35, color: 'bg-blue-500' },
    { name: 'LLM', value: 25, color: 'bg-red-500' },
    { name: 'Voice', value: 20, color: 'bg-yellow-500' },
    { name: 'Telephony', value: 15, color: 'bg-green-500' },
    { name: 'Platform', value: 5, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Agent Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">{agent.name}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share className="h-4 w-4" />
            Share
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
            <PhoneCall className="h-4 w-4" />
            Test Call
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings2 className="h-4 w-4" />
            Inbound Settings
          </Button>
        </div>
      </div>

      {/* Cost and Usage */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Cost per min:</span>
              <span className="font-semibold">~ {agent.costPerMinute}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {usageData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm flex-1">{item.name}</span>
                <span className="text-sm text-muted-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "bg-card text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'agent' && (
        <div className="space-y-6">
          {/* Welcome Message */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Agent Welcome Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="min-h-[100px] font-medium"
                placeholder="Enter welcome message..."
              />
              <p className="text-sm text-muted-foreground">
                This will be the initial message from the agent. You can use variables here using {'{variable_name}'}
              </p>
            </CardContent>
          </Card>

          {/* Agent Prompt */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg">Agent Prompt</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  AI Edit
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  GPT Builder
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={agentPrompt}
                onChange={(e) => setAgentPrompt(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder="Enter agent prompt..."
              />
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{agentPrompt.length} characters</span>
                <span>Last updated 4 days ago</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-between items-center pt-6 border-t">
        <div className="text-sm text-muted-foreground">
          Use chat to test agent & prompts
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Test via chat</Button>
          <Button variant="outline">Test via web call (beta)</Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Save agent
          </Button>
        </div>
      </div>
    </div>
  );
}

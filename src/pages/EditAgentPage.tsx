import { useParams } from 'react-router-dom';
import { useAgentsStore } from '@/stores/agentsStore';
import { AgentDetails } from '@/components/agents/AgentDetails';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, MessageSquare, Headphones, Cog, Phone, Wrench, BarChart, PhoneIncoming } from 'lucide-react';

const TABS_CONFIG = [
  { id: 'agent', label: 'Agent', icon: Bot },
  { id: 'llm', label: 'LLM', icon: MessageSquare },
  { id: 'audio', label: 'Audio', icon: Headphones },
  { id: 'engine', label: 'Engine', icon: Cog },
  { id: 'call', label: 'Call', icon: Phone },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'analytics', label: 'Analytics', icon: BarChart },
  { id: 'inbound', label: 'Inbound', icon: PhoneIncoming },
];

export function EditAgentPage() {
  const { id } = useParams<{ id: string }>();
  const agent = useAgentsStore(state => state.getAgentById(id || ''));

  if (!agent) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h2 className="text-xl font-semibold">Agent not found</h2>
          <p className="text-muted-foreground">The agent you are looking for does not exist or has been deleted.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">Edit: {agent.name}</h1>
      <Tabs defaultValue="audio" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {TABS_CONFIG.map(tab => (
            <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="audio" className="pt-6">
          <AgentDetails agent={agent} />
        </TabsContent>
        {TABS_CONFIG.filter(t => t.id !== 'audio').map(tab => (
            <TabsContent key={tab.id} value={tab.id} className="pt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{tab.label} Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Settings for {tab.label} coming soon.</p>
                    </CardContent>
                </Card>
            </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

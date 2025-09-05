import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateAgentWizard } from '@/components/agents/CreateAgentWizard';
import { AgentDetails } from '@/components/agents/AgentDetails';
import { Plus, Search, Filter } from 'lucide-react';
import { DEMO_AGENTS } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AgentSetup() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(DEMO_AGENTS[0]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agent Setup</h1>
          <p className="text-muted-foreground">Create, configure, and fine-tune your voice agents</p>
        </div>
        <div className="flex gap-3 self-end sm:self-center">
          <Button variant="outline" className="gap-2">
            Import
          </Button>
          <Button onClick={() => setWizardOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Agent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Agent List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Agents</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search and Filters */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search agents..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Agent List */}
              <div className="space-y-2">
                {DEMO_AGENTS.map((agent) => (
                  <div
                    key={agent.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedAgent.id === agent.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:bg-muted'
                    }`}
                    onClick={() => setSelectedAgent(agent)}
                  >
                    <h3 className="font-medium">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{agent.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className={`text-xs px-2 py-1 rounded-full capitalize ${
                        agent.status === 'active' ? 'bg-green-100 text-green-700' :
                        agent.status === 'draft' ? 'bg-gray-100 text-gray-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {agent.status}
                      </div>
                      <span className="text-xs text-muted-foreground">{agent.callsToday} calls today</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Agent Details */}
        <div className="lg:col-span-2">
          {selectedAgent && <AgentDetails agent={selectedAgent} />}
        </div>
      </div>

      <CreateAgentWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </div>
  );
}

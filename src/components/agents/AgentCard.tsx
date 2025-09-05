import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';

const LANGUAGE_FLAGS = {
  hindi: '🇮🇳',
  odia: '🇮🇳',
  english: '🇮🇳'
};

interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'paused';
  languages: string[];
  callsToday: number;
  avgDuration: string;
  costPerMinute: string;
  lastActivity: string;
}

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    draft: 'bg-gray-100 text-gray-700 border-gray-200',
    paused: 'bg-orange-100 text-orange-700 border-orange-200'
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{agent.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Status and Languages */}
      <div className="flex justify-between items-center mb-4">
        <Badge className={cn("capitalize", statusColors[agent.status])}>
          {agent.status}
        </Badge>
        <div className="flex gap-1">
          {agent.languages.map((lang) => (
            <span key={lang} className="text-lg" title={lang}>
              {LANGUAGE_FLAGS[lang as keyof typeof LANGUAGE_FLAGS]}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-2xl font-bold text-primary">{agent.callsToday}</p>
          <p className="text-xs text-muted-foreground">Calls Today</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{agent.avgDuration}</p>
          <p className="text-xs text-muted-foreground">Avg Duration</p>
        </div>
        <div>
          <p className="text-sm font-semibold">{agent.costPerMinute}</p>
          <p className="text-xs text-muted-foreground">Cost/Minute</p>
        </div>
        <div>
          <p className="text-xs font-medium">{agent.lastActivity}</p>
          <p className="text-xs text-muted-foreground">Last Active</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button 
          variant={agent.status === 'active' ? 'secondary' : 'default'} 
          size="sm" 
          className="flex-1 gap-2"
        >
          {agent.status === 'active' ? (
            <><Pause className="h-3 w-3" /> Pause</>
          ) : (
            <><Play className="h-3 w-3" /> {agent.status === 'draft' ? 'Activate' : 'Resume'}</>
          )}
        </Button>
        <Button variant="outline" size="sm">
          Test Call
        </Button>
      </div>
    </Card>
  );
}

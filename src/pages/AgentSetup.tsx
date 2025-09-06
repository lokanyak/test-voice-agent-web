import { useState, useMemo } from 'react';
import { useAgentsStore } from '@/stores/agentsStore';
import { CreateAgentWizard } from '@/components/agents/CreateAgentWizard';
import { EmptyState } from '@/components/agents/EmptyState';
import { AgentGrid } from '@/components/agents/AgentGrid';
import { FilterBar } from '@/components/agents/FilterBar';
import { Skeleton } from '@/components/ui/skeleton';

export function AgentSetup() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const { agents, isLoading, filters } = useAgentsStore();

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const statusMatch = filters.status === 'all' || agent.status === filters.status;
      const searchMatch = filters.search === '' || 
                          agent.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          agent.description?.toLowerCase().includes(filters.search.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [agents, filters]);

  const handleCreateAgent = () => {
    setWizardOpen(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-[250px] rounded-lg" />
          ))}
        </div>
      );
    }

    if (agents.length === 0) {
      return <EmptyState onPrimaryAction={handleCreateAgent} />;
    }

    return <AgentGrid agents={filteredAgents} />;
  };

  return (
    <>
      <CreateAgentWizard open={wizardOpen} onOpenChange={setWizardOpen} />
      <div className="space-y-6">
        <FilterBar onPrimaryAction={handleCreateAgent} />
        {renderContent()}
      </div>
    </>
  );
}

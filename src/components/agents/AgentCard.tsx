import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, TestTube, Pencil, Copy, Trash2, Archive, Rocket } from 'lucide-react';
import { Agent, AgentStatus } from '@/types/contracts';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAgentsStore } from '@/stores/agentsStore';
import { toast } from 'sonner';

interface AgentCardProps {
  agent: Agent;
}

const statusConfig: Record<AgentStatus, { label: string; className: string; dotClassName: string }> = {
  active: { label: 'Active', className: 'border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400', dotClassName: 'bg-green-500' },
  draft: { label: 'Draft', className: 'border-gray-500/20 bg-gray-500/10 text-gray-700 dark:text-gray-400', dotClassName: 'bg-gray-500' },
  paused: { label: 'Paused', className: 'border-orange-500/20 bg-orange-500/10 text-orange-700 dark:text-orange-400', dotClassName: 'bg-orange-500' },
};

export function AgentCard({ agent }: AgentCardProps) {
  const navigate = useNavigate();
  const { cloneAgent, deleteAgent } = useAgentsStore();

  const handleClone = (e: React.MouseEvent) => {
    e.stopPropagation();
    cloneAgent(agent.id);
    toast.success(`Agent "${agent.name}" cloned successfully.`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Here you would typically show a confirmation dialog
    deleteAgent(agent.id);
    toast.error(`Agent "${agent.name}" has been deleted.`);
  };

  const handleEdit = () => {
    navigate(`/agents/${agent.id}/edit`);
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="h-full"
    >
      <Card onClick={handleEdit} className="h-full flex flex-col cursor-pointer bg-card/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="h-12 w-12 border-2" style={{ borderColor: statusConfig[agent.status].dotClassName }}>
                <AvatarImage src={agent.avatarUrl} alt={agent.name} />
                <AvatarFallback className="font-bold bg-primary/10 text-primary">
                  {agent.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card", statusConfig[agent.status].dotClassName)} />
            </div>
            <div>
              <CardTitle className="text-base font-semibold">{agent.name}</CardTitle>
              <Badge variant="outline" className={cn("capitalize text-xs mt-1", statusConfig[agent.status].className)}>
                {statusConfig[agent.status].label}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
              <DropdownMenuItem onClick={handleEdit}><Pencil className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={handleClone}><Copy className="mr-2 h-4 w-4" /> Clone</DropdownMenuItem>
              <DropdownMenuItem><Rocket className="mr-2 h-4 w-4" /> Publish</DropdownMenuItem>
              <DropdownMenuItem><Archive className="mr-2 h-4 w-4" /> Archive</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex-grow space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
          <div className="flex flex-wrap gap-2">
            {agent.languages.map(lang => <Badge key={lang} variant="secondary">{lang}</Badge>)}
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-2" onClick={(e) => {e.stopPropagation(); toast.info("Test call modal coming soon!")}}>
            <TestTube className="h-4 w-4" /> Test
          </Button>
          <Button size="sm" className="flex-1 gap-2" onClick={handleEdit}>
            <Pencil className="h-4 w-4" /> Edit
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

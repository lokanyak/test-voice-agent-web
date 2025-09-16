import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Play, Pause, Trash2, Copy, BarChart2 } from 'lucide-react';
import { Campaign, CampaignStatus } from '@/types/contracts';
import { useAgentsStore } from '@/stores/agentsStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CampaignCardProps {
  campaign: Campaign;
}

const statusConfig: Record<CampaignStatus, { label: string; className: string; }> = {
  draft: { label: 'Draft', className: 'bg-gray-500/10 text-gray-500' },
  scheduled: { label: 'Scheduled', className: 'bg-blue-500/10 text-blue-500' },
  running: { label: 'Running', className: 'bg-green-500/10 text-green-500 animate-pulse' },
  completed: { label: 'Completed', className: 'bg-primary/10 text-primary' },
  paused: { label: 'Paused', className: 'bg-orange-500/10 text-orange-500' },
};

export function CampaignCard({ campaign }: CampaignCardProps) {
  const agent = useAgentsStore(state => state.getAgentById(campaign.agentId));
  const progressPercentage = (campaign.progress.completed / campaign.progress.total) * 100;

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base font-semibold">{campaign.name}</CardTitle>
              <CardDescription className="text-xs">
                Using agent: {agent?.name || 'Unknown Agent'}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem><BarChart2 className="mr-2 h-4 w-4" /> View Results</DropdownMenuItem>
                <DropdownMenuItem><Copy className="mr-2 h-4 w-4" /> Clone</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{campaign.progress.completed} / {campaign.progress.total}</span>
            </div>
            <Progress value={progressPercentage} />
          </div>
          <div className="text-xs text-muted-foreground">
            Success Rate: {((campaign.progress.success / campaign.progress.completed) * 100 || 0).toFixed(1)}%
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Badge variant="outline" className={cn("capitalize", statusConfig[campaign.status].className)}>
            {statusConfig[campaign.status].label}
          </Badge>
          {campaign.status === 'running' && <Button variant="outline" size="sm"><Pause className="h-4 w-4 mr-2" /> Pause</Button>}
          {campaign.status === 'paused' && <Button variant="outline" size="sm"><Play className="h-4 w-4 mr-2" /> Resume</Button>}
        </CardFooter>
      </Card>
    </motion.div>
  );
}

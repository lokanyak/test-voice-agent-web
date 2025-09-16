import { useState, useMemo } from 'react';
import { useCampaignsStore } from '@/stores/campaignsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Send } from 'lucide-react';
import { CreateCampaignWizard } from '@/components/campaigns/CreateCampaignWizard';
import { CampaignCard } from '@/components/campaigns/CampaignCard';

export function Campaigns() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const { campaigns, filters, setFilters } = useCampaignsStore();

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const statusMatch = filters.status === 'all' || campaign.status === filters.status;
      const searchMatch = filters.search === '' ||
        campaign.name.toLowerCase().includes(filters.search.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [campaigns, filters]);

  const renderEmptyState = () => (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center text-center p-12 space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Send className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Launch Your First Voice Campaign</h2>
          <p className="text-muted-foreground max-w-md">
            Reach hundreds of contacts with personalized AI voice calls. Upload a list, select an agent, and go live in minutes.
          </p>
        </div>
        <Button size="lg" onClick={() => setWizardOpen(true)}>
          <Plus className="mr-2 h-5 w-5" />
          Create Campaign
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <>
      <CreateCampaignWizard open={wizardOpen} onOpenChange={setWizardOpen} />
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Campaigns</h1>
            <p className="text-muted-foreground">Manage your outbound voice campaigns.</p>
          </div>
          <Button onClick={() => setWizardOpen(true)} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {campaigns.length > 0 && (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-10"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
              />
            </div>
            <Select value={filters.status} onValueChange={(value) => setFilters({ status: value as any })}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {campaigns.length === 0 ? renderEmptyState() : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

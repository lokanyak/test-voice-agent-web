import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { CallVolumeChart } from '@/components/dashboard/CallVolumeChart';
import { TierUpgrade } from '@/components/dashboard/TierUpgrade';
import { Plus } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Lokananth!</h1>
          <p className="text-muted-foreground">Here's your voice agent performance overview</p>
        </div>
        <div className="flex gap-3 self-end sm:self-center">
          <TierUpgrade currentTier="FREE" />
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Agent
          </Button>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Agents"
          value="3"
          change="+12%"
          changeType="positive"
          icon="Bot"
          description="Active voice agents"
        />
        <MetricCard
          title="Calls Today"
          value="47"
          change="+23%"
          changeType="positive"
          icon="Phone"
          description="Browser + PSTN calls"
          isLive={true}
        />
        <MetricCard
          title="Avg Response Time"
          value="1.2s"
          change="-0.3s"
          changeType="positive"
          icon="Zap"
          description="STT → LLM → TTS"
        />
        <MetricCard
          title="This Month Cost"
          value="₹2,840"
          change="+₹450"
          changeType="neutral"
          icon="IndianRupee"
          description="API + Platform fees"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Call Volume (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <CallVolumeChart />
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityFeed />
        </CardContent>
      </Card>
    </div>
  );
}

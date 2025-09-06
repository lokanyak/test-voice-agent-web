import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageChart } from '@/components/dashboard/LanguageChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { CallVolumeChart } from '@/components/dashboard/CallVolumeChart';
import { Plus, Bot, Phone, Zap, IndianRupee } from 'lucide-react';
import { DASHBOARD_METRICS } from '@/lib/mock-data';

const kpiData = [
  { title: 'Total Agents', value: DASHBOARD_METRICS.totalAgents.value, icon: Bot },
  { title: 'Calls Today', value: DASHBOARD_METRICS.callsToday.value, icon: Phone },
  { title: 'Avg. Response Time', value: DASHBOARD_METRICS.avgResponseTime.value, icon: Zap },
  { title: 'Monthly Cost', value: DASHBOARD_METRICS.monthlyCost.value, icon: IndianRupee },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Agent
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Call Volume</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <CallVolumeChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <LanguageChart />
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ActivityFeed />
      </div>
    </div>
  );
}

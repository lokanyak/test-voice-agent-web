import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from '@/lib/utils';
import { RECENT_ACTIVITIES } from '@/lib/mock-data';

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {RECENT_ACTIVITIES.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
          <div className={`w-2 h-2 rounded-full mt-2 ${
            activity.status === 'success' ? 'bg-green-500' : 
            activity.status === 'info' ? 'bg-blue-500' : 'bg-orange-500'
          }`} />
          <div className="flex-1">
            <p className="text-sm font-medium">{activity.message}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(activity.timestamp)}
            </p>
          </div>
          <Badge variant="outline" className="text-xs capitalize">
            {activity.type}
          </Badge>
        </div>
      ))}
    </div>
  );
}

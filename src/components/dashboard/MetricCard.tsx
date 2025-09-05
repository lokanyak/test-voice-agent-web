import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Icon, iconMap } from '@/components/ui/icon';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: keyof typeof iconMap;
  description: string;
  isLive?: boolean;
}

export function MetricCard({ title, value, change, changeType, icon, description, isLive }: MetricCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="p-6 relative overflow-hidden">
        {isLive && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1" />
              Live
            </Badge>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
            <div className="flex items-center space-x-1">
              <Badge 
                variant="secondary" 
                className={cn(
                  "text-xs",
                  changeType === 'positive' && "bg-green-100 text-green-700",
                  changeType === 'negative' && "bg-red-100 text-red-700",
                  changeType === 'neutral' && "bg-blue-100 text-blue-700"
                )}
              >
                {change}
              </Badge>
              <span className="text-xs text-muted-foreground">{description}</span>
            </div>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon name={icon} className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

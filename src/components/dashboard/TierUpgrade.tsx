import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

interface TierUpgradeProps {
  currentTier: 'FREE' | 'PRO' | 'ENTERPRISE';
}

export function TierUpgrade({ currentTier }: TierUpgradeProps) {
  return (
    <div className="flex items-center gap-3">
      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
        {currentTier} TIER
      </Badge>
      {currentTier === 'FREE' && (
        <Button variant="outline" size="sm" className="gap-2">
          <Crown className="h-4 w-4" />
          Upgrade to Pro
        </Button>
      )}
    </div>
  );
}

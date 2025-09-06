import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Plus } from 'lucide-react';

interface EmptyStateProps {
  onPrimaryAction: () => void;
}

export function EmptyState({ onPrimaryAction }: EmptyStateProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center text-center p-12 space-y-6">
        <div className="bg-primary/10 p-4 rounded-full">
          <Mic className="h-12 w-12 text-primary" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Create Your First Voice Agent</h2>
          <p className="text-muted-foreground max-w-md">
            Build AI-powered voice assistants for Hindi, Odia, and English conversations. No coding required—just write prompts and go live.
          </p>
        </div>
        <Button size="lg" onClick={onPrimaryAction}>
          <Plus className="mr-2 h-5 w-5" />
          Create Your Voice Agent
        </Button>
      </CardContent>
    </Card>
  );
}

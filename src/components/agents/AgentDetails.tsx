import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ExternalLink } from 'lucide-react';
import { Agent } from '@/types/contracts';

export function AgentDetails({ agent }: AgentDetailsProps) {
  // This component is now focused on just one part of the agent config (e.g., Audio)
  // It's used inside the tabbed layout of the EditAgentPage.
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="text-lg">Language and Transcriber</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Language</label>
            <Select defaultValue="english-hindi">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="english-hindi">English + Hindi</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="odia">Odia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Provider</label>
            <Select defaultValue="deepgram">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="deepgram">Deepgram</SelectItem>
                <SelectItem value="sarvam">Sarvam</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Model</label>
            <Select defaultValue="nova-3">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="nova-3">nova-3</SelectItem>
                <SelectItem value="nova-2">nova-2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-full">
            <label className="text-sm font-medium">Keywords</label>
            <Input placeholder="Bruce:100, Wayne:50" />
            <p className="text-xs text-muted-foreground mt-1">Enter keywords/proper nouns to boost understanding.</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-lg">Select Voice</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-sm font-medium">Provider</label>
            <Select defaultValue="sarvam">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sarvam">Sarvam</SelectItem>
                <SelectItem value="cartesia">Cartesia</SelectItem>
                <SelectItem value="elevenlabs">ElevenLabs (Pro)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Model</label>
            <Select defaultValue="bulbul:v2">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="bulbul:v2">bulbul:v2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Voice</label>
            <Select defaultValue="anushka">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="anushka">Anushka</SelectItem>
                <SelectItem value="priya">Priya</SelectItem>
                <SelectItem value="arjun">Arjun</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-full space-y-4 pt-4">
            <div>
              <label className="text-sm font-medium">Speed</label>
              <Slider defaultValue={[1]} max={2} step={0.1} />
            </div>
            <div>
              <label className="text-sm font-medium">Pitch</label>
              <Slider defaultValue={[0]} min={-20} max={20} step={1} />
            </div>
          </div>
           <div className="col-span-full flex items-center justify-between">
              <Button variant="outline">🔊 Preview Voice</Button>
              <Button variant="link" className="gap-1">More voices <ExternalLink className="h-4 w-4" /></Button>
           </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
interface AgentDetailsProps {
    agent: Agent;
}

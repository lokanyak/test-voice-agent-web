import { useProvidersStore } from '@/stores/providersStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from '@/lib/utils';
import { toast } from "@/hooks/use-toast";

export function Providers() {
  const { providers, updateProviderKey, updatePricingMode } = useProvidersStore();

  const handleTestConnection = (name: string) => {
    toast.info(`Testing connection for ${name}...`);
    setTimeout(() => {
        toast.success(`${name} connected successfully!`);
    }, 1500);
  }

  const providerCategories = {
    llm: providers.filter(p => p.type === 'llm'),
    stt: providers.filter(p => p.type === 'stt'),
    tts: providers.filter(p => p.type === 'tts'),
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Providers</h1>
        <p className="text-muted-foreground">Manage your API keys for LLM, STT, and TTS services here.</p>
      </div>

      {Object.entries(providerCategories).map(([category, providersInCategory]) => (
        <div key={category}>
          <h2 className="text-2xl font-semibold mb-4 capitalize">{category} Providers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {providersInCategory.map((provider) => (
              <Card key={provider.name}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{provider.label}</span>
                    <Badge variant={provider.status === 'connected' ? 'default' : 'secondary'} 
                           className={cn(provider.status === 'connected' && 'bg-green-500 hover:bg-green-600')}>
                      {provider.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="configure">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="configure">Configure</TabsTrigger>
                      <TabsTrigger value="pricing">Pricing</TabsTrigger>
                    </TabsList>
                    <TabsContent value="configure" className="pt-4 space-y-4">
                      <div>
                        <Label htmlFor={`${provider.name}-key`}>API Key</Label>
                        <Input 
                          id={`${provider.name}-key`} 
                          type="password"
                          placeholder="sk-..." 
                          defaultValue={provider.apiKey || ''}
                          onChange={(e) => updateProviderKey(provider.name, e.target.value)}
                        />
                      </div>
                      <Button variant="outline" onClick={() => handleTestConnection(provider.label)} className="w-full">Test Connection</Button>
                    </TabsContent>
                    <TabsContent value="pricing" className="pt-4 space-y-4">
                      <RadioGroup defaultValue={provider.pricingMode} onValueChange={(value) => updatePricingMode(provider.name, value as 'platform' | 'custom')}>
                        <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary">
                          <RadioGroupItem value="platform" />
                          <div>
                            <p className="font-semibold">Platform API</p>
                            <p className="text-sm text-muted-foreground">₹5.00/min all-inclusive</p>
                          </div>
                        </Label>
                        <Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary">
                          <RadioGroupItem value="custom" />
                          <div>
                            <p className="font-semibold">Custom API (BYOK)</p>
                            <p className="text-sm text-muted-foreground">₹2.00/min platform fee + provider usage</p>
                          </div>
                        </Label>
                      </RadioGroup>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

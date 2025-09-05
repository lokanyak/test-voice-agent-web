import { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AGENT_TEMPLATES } from '@/lib/mock-data';

interface CreateAgentWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAgentWizard({ open, onOpenChange }: CreateAgentWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    template: '',
    languages: [] as string[],
    systemPrompt: '',
    llmProvider: 'openai',
    voiceSettings: {
      hindi: { provider: 'sarvam', voice: 'anushka' },
      odia: { provider: 'sarvam', voice: 'anushka' },
      english: { provider: 'sarvam', voice: 'priya' }
    }
  });

  const steps = [
    { number: 1, title: 'Basic Info' },
    { number: 2, title: 'System Prompt' },
    { number: 3, title: 'Voice & Language' },
    { number: 4, title: 'Advanced Settings' }
  ];
  
  const handleTemplateSelect = (key: string) => {
    const template = AGENT_TEMPLATES[key as keyof typeof AGENT_TEMPLATES];
    setFormData({
      ...formData,
      template: key,
      name: template.name,
      description: template.description,
      systemPrompt: template.prompts.hindi, // Default to Hindi prompt
    });
  };

  const handleLanguageChange = (checked: boolean, langId: string) => {
    if (checked) {
      setFormData({
        ...formData,
        languages: [...formData.languages, langId]
      });
    } else {
      setFormData({
        ...formData,
        languages: formData.languages.filter(l => l !== langId)
      });
    }
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <label className="text-sm font-medium">Choose Template</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                {Object.entries(AGENT_TEMPLATES).map(([key, template]) => (
                  <Card key={key} className={`p-4 cursor-pointer border-2 transition-colors ${formData.template === key ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'}`} onClick={() => handleTemplateSelect(key)}>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Agent Name *</label>
              <Input placeholder="e.g., Hotel Booking Assistant" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Describe what this agent does..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">System Prompt *</label>
                <Badge variant="secondary">{formData.systemPrompt.length} characters</Badge>
              </div>
              <Textarea className="min-h-[300px] font-mono text-sm" placeholder="Enter your agent's system prompt..." value={formData.systemPrompt} onChange={(e) => setFormData({...formData, systemPrompt: e.target.value})} />
              <p className="text-xs text-muted-foreground mt-2">This defines your agent's personality, role, and behavior. Be specific and clear.</p>
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-3 block">Supported Languages *</label>
              <div className="space-y-3">
                {[{ id: 'hindi', label: 'हिंदी Hindi (India)', flag: '🇮🇳' }, { id: 'odia', label: 'ଓଡ଼ିଆ Odia (India)', flag: '🇮🇳' }, { id: 'english', label: 'English (India)', flag: '🇮🇳' }].map((lang) => (
                  <div key={lang.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox id={lang.id} checked={formData.languages.includes(lang.id)} onCheckedChange={(checked) => handleLanguageChange(Boolean(checked), lang.id)} />
                    <label htmlFor={lang.id} className="flex items-center gap-3 cursor-pointer">
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {formData.languages.map((lang) => (
              <Card key={lang} className="p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold capitalize">{lang} Voice Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Provider</label>
                      <Select defaultValue="sarvam"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="sarvam">Sarvam AI</SelectItem><SelectItem value="deepgram">Deepgram</SelectItem><SelectItem value="cartesia">Cartesia</SelectItem></SelectContent></Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Voice</label>
                      <Select defaultValue={lang === 'english' ? 'priya' : 'anushka'}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="anushka">Anushka (Female)</SelectItem><SelectItem value="arjun">Arjun (Male)</SelectItem><SelectItem value="priya">Priya (Female)</SelectItem></SelectContent></Select>
                    </div>
                    <div className="flex items-end"><Button variant="outline" size="sm" className="w-full">🔊 Preview Voice</Button></div>
                  </div>
                </div>
              </Card>
            ))}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">LLM Provider</label>
                <Select value={formData.llmProvider} onValueChange={(value) => setFormData({...formData, llmProvider: value})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="openai">OpenAI GPT-4 (Recommended)</SelectItem><SelectItem value="google">Google Gemini Pro</SelectItem><SelectItem value="anthropic">Claude 3</SelectItem></SelectContent></Select>
              </div>
              <div>
                <label className="text-sm font-medium">Response Speed</label>
                <Select defaultValue="balanced"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="fast">Fast (Higher cost)</SelectItem><SelectItem value="balanced">Balanced</SelectItem><SelectItem value="quality">Quality (Lower cost)</SelectItem></SelectContent></Select>
              </div>
            </div>
            <Card className="p-4 bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200">💰 Estimated Cost</h3>
              <div className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
                <p>Platform Fee: <span className="font-bold">₹5.00/minute</span> (Free Tier)</p>
                <p>Includes all API costs - OpenAI, Sarvam, Deepgram</p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Upgrade to Pro for ₹2.00/minute + your API costs</p>
              </div>
            </Card>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create New Voice Agent</DialogTitle>
          <DialogDescription>
            Step {step} of {steps.length}: {steps[step - 1].title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="w-full bg-muted rounded-full h-2 my-4">
          <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${(step / steps.length) * 100}%` }} />
        </div>

        <div className="flex-grow overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </div>

        <DialogFooter className="pt-6">
          <Button variant="outline" onClick={() => step > 1 ? setStep(step - 1) : onOpenChange(false)} className="gap-2">
            {step > 1 && <ArrowLeft className="h-4 w-4" />}
            {step === 1 ? 'Cancel' : 'Previous'}
          </Button>
          <Button onClick={() => { if (step < 4) { setStep(step + 1); } else { console.log('Creating agent:', formData); onOpenChange(false); } }} disabled={(step === 1 && !formData.name) || (step === 2 && !formData.systemPrompt) || (step === 3 && formData.languages.length === 0)} className="gap-2">
            {step === 4 ? 'Create Agent' : 'Next'}
            {step < 4 && <ArrowRight className="h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

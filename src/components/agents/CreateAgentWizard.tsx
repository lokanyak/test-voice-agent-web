import { useState, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bot, Cpu, Mic, Settings, Check, Sparkles, BookOpen, UserPlus, UploadCloud, FileText, Languages, TestTube } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAgentsStore } from '@/stores/agentsStore';
import { toast } from 'sonner';
import { Agent, Lang } from '@/types/contracts';

interface CreateAgentWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 'basics', title: 'Basic Information', icon: Settings },
  { id: 'welcome', title: 'Welcome Message', icon: Bot },
  { id: 'prompt', title: 'System Prompt', icon: Sparkles },
  { id: 'engine', title: 'AI Engine', icon: Cpu },
  { id: 'transcriber', title: 'Transcriber', icon: Languages },
  { id: 'voice', title: 'Voice & Language', icon: Mic },
  { id: 'knowledge', title: 'Knowledge Base', icon: BookOpen },
  { id: 'advanced', title: 'Advanced Functions', icon: UserPlus },
  { id: 'review', title: 'Review & Create', icon: Check },
];

const agentSchema = z.object({
    name: z.string().min(3, "Agent name is required"),
    description: z.string().optional(),
    category: z.enum(['hotel', 'restaurant', 'healthcare', 'sales', 'support', 'custom']),
    welcome: z.string().min(10, "Welcome message is required"),
    systemPrompt: z.string().min(50, "System prompt must be at least 50 characters"),
    llmModel: z.string(),
    temperature: z.number().min(0).max(1),
    maxTokens: z.number().min(100),
    stt: z.object({
        provider: z.enum(['deepgram', 'sarvam']),
        model: z.string(),
    }),
    languages: z.object({
        'en-IN': z.boolean(),
        'hi-IN': z.boolean(),
        'or-IN': z.boolean(),
    }).refine(val => val['en-IN'] || val['hi-IN'] || val['or-IN'], {
        message: "At least one language must be selected.",
    }),
    voiceConfig: z.object({
        'en-IN': z.object({ provider: z.string(), voiceId: z.string(), speed: z.number(), pitch: z.number() }).optional(),
        'hi-IN': z.object({ provider: z.string(), voiceId: z.string(), speed: z.number(), pitch: z.number() }).optional(),
        'or-IN': z.object({ provider: z.string(), voiceId: z.string(), speed: z.number(), pitch: z.number() }).optional(),
    }).optional(),
    knowledgeBase: z.object({
        files: z.array(z.any()).optional(),
        urls: z.array(z.string().url()).optional(),
    }).optional(),
    advanced: z.object({
        calendarIntegration: z.boolean(),
        callRecording: z.boolean(),
    }).optional(),
});

type AgentFormData = z.infer<typeof agentSchema>;

const voiceOptions = {
    sarvam: {
        'hi-IN': ['Anushka', 'Arjun', 'Priya', 'Ravi'],
        'or-IN': ['Anusha-OD', 'Arjun-OD'],
        'en-IN': ['Priya-EN', 'Ravi-EN']
    },
    cartesia: {
        'en-IN': ['Sonia', 'Rahul', 'Maya', 'Kiran'],
        'hi-IN': ['Sonia-HI', 'Rahul-HI']
    }
};

const useAutoSave = (formData: AgentFormData, isDirty: boolean) => {
    const [saveStatus, setSaveStatus] = useState('Saved');
    
    useEffect(() => {
        if (!isDirty) return;
        setSaveStatus('Saving...');
        const handler = setTimeout(() => {
            console.log('Auto-saving draft:', formData);
            // In a real app, you'd save to localStorage or a backend here.
            setSaveStatus('Saved');
            toast.info("Draft auto-saved.");
        }, 2000);

        return () => {
            clearTimeout(handler);
        };
    }, [formData, isDirty]);
    
    return saveStatus;
};

export function CreateAgentWizard({ open, onOpenChange }: CreateAgentWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const createAgent = useAgentsStore(state => state.createAgent);
  
  const { control, handleSubmit, watch, trigger, formState: { errors, isDirty } } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
        name: '',
        description: '',
        category: 'custom',
        welcome: '',
        systemPrompt: '',
        llmModel: 'gpt-4o',
        temperature: 0.7,
        maxTokens: 1024,
        stt: { provider: 'deepgram', model: 'nova-3' },
        languages: { 'en-IN': true, 'hi-IN': false, 'or-IN': false },
        voiceConfig: {
            'en-IN': { provider: 'cartesia', voiceId: 'Sonia', speed: 1, pitch: 0 },
            'hi-IN': { provider: 'sarvam', voiceId: 'Anushka', speed: 1, pitch: 0 },
            'or-IN': { provider: 'sarvam', voiceId: 'Anusha-OD', speed: 1, pitch: 0 },
        },
        knowledgeBase: { files: [], urls: [] },
        advanced: { calendarIntegration: false, callRecording: true },
    }
  });
  
  const formData = watch();
  const saveStatus = useAutoSave(formData, isDirty);

  const handleNext = async () => {
    const fieldsToValidate = Object.keys(agentSchema.shape).filter((_, i) => i <= currentStep);
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
        setCurrentStep(s => Math.min(s + 1, steps.length - 1));
    } else {
        toast.error("Please fix the errors before proceeding.");
    }
  };

  const handlePrev = () => setCurrentStep(s => Math.max(s - 1, 0));

  const onSubmit = (data: AgentFormData) => {
    const enabledLanguages = Object.entries(data.languages)
        .filter(([, enabled]) => enabled)
        .map(([lang]) => lang as Lang);

    const newAgentData: Omit<Agent, 'id' | 'createdAt' | 'updatedAt' | 'status'> = {
        name: data.name,
        description: data.description,
        category: data.category,
        welcome: data.welcome,
        systemPrompt: data.systemPrompt,
        languages: enabledLanguages,
        providers: { llm: 'openai', stt: data.stt.provider, tts: 'cartesia' }, // Simplified
        voice: { byLang: data.voiceConfig || {} },
        llmConfig: {
            model: data.llmModel,
            temperature: data.temperature,
            maxTokens: data.maxTokens,
        },
        knowledgeBase: { enabled: !!data.knowledgeBase?.files?.length, documentIds: [] },
        advanced: { tools: data.advanced?.calendarIntegration ? ['calendar'] : [], callRecording: !!data.advanced?.callRecording },
    };
    const created = createAgent(newAgentData);
    toast.success(`Agent "${created.name}" created successfully!`);
    onOpenChange(false);
    setCurrentStep(0);
  };

  const LanguageVoiceConfig = ({ lang, label }: { lang: Lang, label: string }) => {
    const isEnabled = watch(`languages.${lang}`);
    if (!isEnabled) return null;

    const provider = watch(`voiceConfig.${lang}.provider`) as keyof typeof voiceOptions;

    return (
        <Card className="p-4 bg-muted/50">
            <CardContent className="p-0">
                <h4 className="font-semibold mb-4">{label} Configuration</h4>
                <div className="grid grid-cols-2 gap-4">
                    <Controller name={`voiceConfig.${lang}.provider`} control={control} render={({ field }) => (
                        <div><Label>Provider</Label><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sarvam">Sarvam AI</SelectItem>
                                <SelectItem value="cartesia">Cartesia AI</SelectItem>
                            </SelectContent>
                        </Select></div>
                    )} />
                    <Controller name={`voiceConfig.${lang}.voiceId`} control={control} render={({ field }) => (
                        <div><Label>Voice</Label><Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{(voiceOptions[provider]?.[lang] || []).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                        </Select></div>
                    )} />
                    <Controller name={`voiceConfig.${lang}.speed`} control={control} render={({ field }) => (
                        <div className="col-span-2"><Label>Speed: {field.value?.toFixed(1)}x</Label><Slider value={[field.value || 1]} onValueChange={v => field.onChange(v[0])} min={0.8} max={1.2} step={0.1} /></div>
                    )} />
                    <Controller name={`voiceConfig.${lang}.pitch`} control={control} render={({ field }) => (
                        <div className="col-span-2"><Label>Pitch: {field.value}%</Label><Slider value={[field.value || 0]} onValueChange={v => field.onChange(v[0])} min={-20} max={20} step={1} /></div>
                    )} />
                </div>
            </CardContent>
        </Card>
    );
  }

  const KnowledgeBaseStep = () => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    return (
        <div className="space-y-6">
            <div {...getRootProps({ className: 'p-10 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-primary' })}>
                <input {...getInputProps()} />
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2">Drag & drop files here, or click to select</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, TXT up to 5MB each</p>
            </div>
            {acceptedFiles.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-semibold">Uploaded files:</h4>
                    <ul className="list-disc pl-5">
                        {acceptedFiles.map(file => <li key={file.name} className="text-sm">{file.name} - {(file.size / 1024).toFixed(2)} KB</li>)}
                    </ul>
                </div>
            )}
        </div>
    );
  }

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
        case 'basics': return (
            <div className="space-y-6">
                <Controller name="name" control={control} render={({ field }) => (<div><Label>Agent Name</Label><Input {...field} placeholder="e.g., Hotel Booking Assistant" /><p className="text-red-500 text-xs mt-1">{errors.name?.message}</p></div>)} />
                <Controller name="description" control={control} render={({ field }) => (<div><Label>Description</Label><Input {...field} placeholder="Handles hotel reservations and inquiries" /></div>)} />
                <Controller name="category" control={control} render={({ field }) => (<div><Label>Category</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="hotel">Hotel</SelectItem><SelectItem value="restaurant">Restaurant</SelectItem><SelectItem value="healthcare">Healthcare</SelectItem><SelectItem value="custom">Custom</SelectItem></SelectContent></Select></div>)} />
            </div>
        );
        case 'welcome': return (
            <div className="space-y-4">
                <Controller name="welcome" control={control} render={({ field }) => (<div><Label>Welcome Message</Label><Textarea {...field} placeholder="e.g., Hello, how can I help you today?" rows={4} /><p className="text-red-500 text-xs mt-1">{errors.welcome?.message}</p></div>)} />
                <Button variant="outline">Preview Voice</Button>
            </div>
        );
        case 'prompt': return (
            <div className="space-y-4">
                <Controller name="systemPrompt" control={control} render={({ field }) => (<div><Label>System Prompt</Label><div className="border rounded-lg overflow-hidden mt-1"><Editor height="250px" language="markdown" theme="vs-dark" value={field.value} onChange={(value) => field.onChange(value)} /></div><p className="text-red-500 text-xs mt-1">{errors.systemPrompt?.message}</p></div>)} />
            </div>
        );
        case 'engine': return (
            <div className="space-y-6">
                 <Controller name="llmModel" control={control} render={({ field }) => (<div><Label>LLM Model</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="gpt-4o">OpenAI GPT-4o (Recommended)</SelectItem><SelectItem value="gemini-pro">Google Gemini Pro</SelectItem></SelectContent></Select></div>)} />
                <Controller name="temperature" control={control} render={({ field }) => (<div><Label>Temperature: <span className="text-primary font-bold">{field.value}</span></Label><Slider value={[field.value]} onValueChange={(v) => field.onChange(v[0])} max={1} step={0.1} /></div>)} />
                <Controller name="maxTokens" control={control} render={({ field }) => (<div><Label>Max Tokens</Label><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10))}/></div>)} />
            </div>
        );
        case 'transcriber': return (
            <div className="space-y-6">
                <Controller name="stt.provider" control={control} render={({ field }) => (<div><Label>STT Provider</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="deepgram">Deepgram (Recommended for English)</SelectItem><SelectItem value="sarvam">Sarvam (Recommended for Hindi/Odia)</SelectItem></SelectContent></Select></div>)} />
                <Controller name="stt.model" control={control} render={({ field }) => (<div><Label>STT Model</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{watch('stt.provider') === 'deepgram' ? <>
                    <SelectItem value="nova-3">Nova 3</SelectItem><SelectItem value="nova-2">Nova 2</SelectItem>
                </> : <>
                    <SelectItem value="bulbul-v2">Bulbul v2</SelectItem><SelectItem value="bulbul-v1">Bulbul v1</SelectItem>
                </>}</SelectContent></Select></div>)} />
            </div>
        );
        case 'voice': return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="flex gap-4">
                        {(['en-IN', 'hi-IN', 'or-IN'] as const).map(lang => (
                            <Controller key={lang} name={`languages.${lang}`} control={control} render={({ field }) => (
                                <div className="flex items-center space-x-2"><Checkbox checked={field.value} onCheckedChange={field.onChange} id={lang} /><Label htmlFor={lang}>{lang}</Label></div>
                            )} />
                        ))}
                    </div>
                    {errors.languages && <p className="text-red-500 text-xs mt-1">{errors.languages.root?.message}</p>}
                </div>
                <LanguageVoiceConfig lang="en-IN" label="English" />
                <LanguageVoiceConfig lang="hi-IN" label="Hindi" />
                <LanguageVoiceConfig lang="or-IN" label="Odia" />
            </div>
        );
        case 'knowledge': return <KnowledgeBaseStep />;
        case 'advanced': return (
            <div className="space-y-4">
                <Controller name="advanced.calendarIntegration" control={control} render={({ field }) => (<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm"><Label htmlFor="calendar">Calendar Integration (Cal.com)</Label><Checkbox checked={field.value} onCheckedChange={field.onChange} id="calendar" /></div>)} />
                <Controller name="advanced.callRecording" control={control} render={({ field }) => (<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm"><Label htmlFor="recording">Call Recording</Label><Checkbox checked={field.value} onCheckedChange={field.onChange} id="recording" /></div>)} />
            </div>
        );
        case 'review': 
            return (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Review Your Agent</h3>
                    <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto">
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
            );
        default: return <div className="text-center py-10"><p>Configuration for this step is coming soon.</p></div>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-2xl">Create New Voice Agent</DialogTitle>
            <DialogDescription>Follow the steps to configure and launch your new AI assistant.</DialogDescription>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{saveStatus}</span>
            <Button variant="outline" size="sm" onClick={() => toast.info("Test modal coming soon!")}>
              <TestTube className="h-4 w-4 mr-2" />
              Test Agent
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-grow flex overflow-hidden">
            <aside className="w-1/3 border-r p-6 pr-4">
                <nav className="space-y-1">
                    {steps.map((s, index) => (
                        <button key={s.id} onClick={() => setCurrentStep(index)} className={cn("w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors", currentStep === index ? "bg-primary/10 text-primary" : "hover:bg-muted")}>
                            <div className={cn("w-7 h-7 rounded-full flex items-center justify-center text-sm shrink-0", currentStep >= index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                {currentStep > index ? <Check className="h-4 w-4"/> : <s.icon className="h-4 w-4" />}
                            </div>
                            <span className="font-medium">{s.title}</span>
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="w-2/3 flex-grow overflow-y-auto p-6">
                <AnimatePresence mode="wait">
                    <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        {renderStepContent()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
        <DialogFooter className="p-4 border-t bg-background/80 backdrop-blur-sm">
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next <ArrowRight className="h-4 w-4 ml-2" /></Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)}>Create Agent</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

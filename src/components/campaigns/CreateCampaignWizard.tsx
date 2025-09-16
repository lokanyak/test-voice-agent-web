import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Sparkles, UploadCloud, CalendarIcon, Clock, Settings, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCampaignsStore } from '@/stores/campaignsStore';
import { useAgentsStore } from '@/stores/agentsStore';
import { toast } from 'sonner';
import { format } from 'date-fns';

interface CreateCampaignWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  { id: 'setup', title: 'Campaign Setup' },
  { id: 'contacts', title: 'Contact List' },
  { id: 'settings', title: 'Campaign Settings' },
  { id: 'review', title: 'Review & Launch' },
];

const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name is required"),
  description: z.string().optional(),
  agentId: z.string({ required_error: "Please select an agent." }),
  campaignType: z.enum(['immediate', 'scheduled']).default('immediate'),
  scheduledFor: z.date().optional(),
  contacts: z.array(z.any()).min(1, "Please upload a contact list."),
  settings: z.object({
    callingWindow: z.object({
      start: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
      end: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
    }),
    callsPerMinute: z.number().min(1).max(50),
    retryAttempts: z.number().min(0).max(5),
    recordCalls: z.boolean().default(true),
  }),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export function CreateCampaignWizard({ open, onOpenChange }: CreateCampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const createCampaign = useCampaignsStore(state => state.createCampaign);
  const agents = useAgentsStore(state => state.agents.filter(a => a.status === 'active'));

  const { control, handleSubmit, watch, setValue, trigger, formState: { errors } } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      campaignType: 'immediate',
      contacts: [],
      settings: {
        callingWindow: { start: '09:00', end: '17:00' },
        callsPerMinute: 10,
        retryAttempts: 1,
        recordCalls: true,
      }
    }
  });

  const onDrop = (acceptedFiles: File[]) => {
    // Basic CSV parsing simulation
    const reader = new FileReader();
    reader.onload = () => {
      const lines = (reader.result as string).split('\n').slice(1); // skip header
      const contacts = lines.filter(l => l.trim()).map(line => {
        const [name, phone_number] = line.split(',');
        return { name, phone_number };
      });
      setValue('contacts', contacts, { shouldValidate: true });
      toast.success(`${contacts.length} contacts loaded from ${acceptedFiles[0].name}`);
    };
    reader.readAsText(acceptedFiles[0]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'text/csv': ['.csv'] } });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(s => Math.min(s + 1, steps.length - 1));
    } else {
      toast.error("Please fix the errors before proceeding.");
    }
  };
  const handlePrev = () => setCurrentStep(s => Math.max(s - 1, 0));

  const onSubmit = (data: CampaignFormData) => {
    createCampaign({
      name: data.name,
      description: data.description,
      agentId: data.agentId,
      contacts: data.contacts,
      scheduledFor: data.scheduledFor?.toISOString(),
      settings: { ...data.settings, retryDelay: 30, timezone: 'UTC' }, // Simplified
    });
    toast.success(`Campaign "${data.name}" created successfully!`);
    onOpenChange(false);
  };
  
  const campaignType = watch('campaignType');
  const contactCount = watch('contacts')?.length || 0;

  const renderStepContent = () => {
    switch (steps[currentStep].id) {
      case 'setup': return (
        <div className="space-y-6">
          <Controller name="name" control={control} render={({ field }) => (<div><Label>Campaign Name</Label><Input {...field} placeholder="e.g., Q4 Promo Outreach" /><p className="text-red-500 text-xs mt-1">{errors.name?.message}</p></div>)} />
          <Controller name="description" control={control} render={({ field }) => (<div><Label>Description (Optional)</Label><Input {...field} placeholder="Briefly describe the campaign's goal" /></div>)} />
          <Controller name="agentId" control={control} render={({ field }) => (<div><Label>Select Agent</Label><Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue placeholder="Choose an active agent" /></SelectTrigger><SelectContent>{agents.map(agent => <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>)}</SelectContent></Select><p className="text-red-500 text-xs mt-1">{errors.agentId?.message}</p></div>)} />
        </div>
      );
      case 'contacts': return (
        <div className="space-y-4">
          <div {...getRootProps({ className: `p-10 border-2 border-dashed rounded-lg text-center cursor-pointer ${isDragActive ? 'border-primary bg-primary/10' : 'hover:border-primary'}` })}>
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2">Drag & drop a CSV file here, or click to select</p>
            <p className="text-xs text-muted-foreground">Requires 'name' and 'phone_number' columns.</p>
          </div>
          {contactCount > 0 && <p className="text-green-600 font-medium text-center">{contactCount} valid contacts loaded.</p>}
          {errors.contacts && <p className="text-red-500 text-xs mt-1 text-center">{errors.contacts.message}</p>}
        </div>
      );
      case 'settings': return (
        <div className="space-y-6">
            <Controller name="campaignType" control={control} render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                    <div><Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary"><RadioGroupItem value="immediate" /><span>Launch Immediately</span></Label></div>
                    <div><Label className="flex items-center space-x-3 p-4 border rounded-md has-[:checked]:border-primary"><RadioGroupItem value="scheduled" /><span>Schedule for Later</span></Label></div>
                </RadioGroup>
            )} />
            {campaignType === 'scheduled' && (
                <Controller name="scheduledFor" control={control} render={({ field }) => (
                    <Popover><PopoverTrigger asChild><Button variant="outline" className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}><CalendarIcon className="mr-2 h-4 w-4" />{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                )} />
            )}
            <div className="grid grid-cols-2 gap-4">
                <Controller name="settings.callingWindow.start" control={control} render={({ field }) => (<div><Label>Calling Window Start</Label><Input {...field} type="time" /></div>)} />
                <Controller name="settings.callingWindow.end" control={control} render={({ field }) => (<div><Label>Calling Window End</Label><Input {...field} type="time" /></div>)} />
            </div>
            <Controller name="settings.callsPerMinute" control={control} render={({ field }) => (<div><Label>Calls Per Minute: {field.value}</Label><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></div>)} />
            <Controller name="settings.retryAttempts" control={control} render={({ field }) => (<div><Label>Max Retry Attempts: {field.value}</Label><Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} /></div>)} />
            <Controller name="settings.recordCalls" control={control} render={({ field }) => (<div className="flex items-center justify-between rounded-lg border p-3 shadow-sm"><Label>Record Calls</Label><Switch checked={field.value} onCheckedChange={field.onChange} /></div>)} />
        </div>
      );
      case 'review': return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Review Campaign</h3>
          <pre className="text-xs bg-muted p-4 rounded-lg overflow-x-auto max-h-60">
            {JSON.stringify(watch(), null, 2)}
          </pre>
          <Card>
            <CardContent className="p-4 text-sm">
                Estimated Cost: <span className="font-bold">₹{ (contactCount * 0.5).toFixed(2) }</span> (based on {contactCount} contacts at an estimated ₹0.50/call)
            </CardContent>
          </Card>
        </div>
      );
      default: return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Campaign</DialogTitle>
          <DialogDescription>Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handlePrev} disabled={currentStep === 0}>Previous</Button>
          {currentStep < steps.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit(onSubmit)}>
              {campaignType === 'scheduled' ? 'Schedule Campaign' : 'Launch Now'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

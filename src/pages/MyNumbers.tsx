import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNumbersStore } from '@/stores/numbersStore';
import { useAgentsStore } from '@/stores/agentsStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { NumberRecord } from '@/types/contracts';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const importSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is required"),
  accountSid: z.string().min(1, "Account SID is required"),
  authToken: z.string().min(1, "Auth Token is required"),
  label: z.string().optional(),
  smsEnabled: z.boolean().default(false),
});

export function MyNumbers() {
  const { numbers, importNumber } = useNumbersStore();
  const { agents } = useAgentsStore();
  const [showImportForm, setShowImportForm] = useState(false);

  const form = useForm<z.infer<typeof importSchema>>({
    resolver: zodResolver(importSchema),
    defaultValues: {
      smsEnabled: false,
    },
  });

  function onSubmit(values: z.infer<typeof importSchema>) {
    importNumber({
      phoneNumber: values.phoneNumber,
      provider: 'twilio',
      assignedAgentId: null,
      capabilities: values.smsEnabled ? ['voice', 'sms'] : ['voice'],
    });
    toast.success(`Number ${values.phoneNumber} imported successfully!`);
    form.reset();
    setShowImportForm(false);
  }

  const columns: ColumnDef<NumberRecord>[] = [
    { accessorKey: 'phoneNumber', header: 'Number' },
    { 
      accessorKey: 'assignedAgentId', 
      header: 'Assigned Agent',
      cell: ({ row }) => {
        const agent = agents.find(a => a.id === row.original.assignedAgentId);
        return agent ? agent.name : <span className="text-muted-foreground">Unassigned</span>;
      }
    },
    { 
      accessorKey: 'capabilities', 
      header: 'Capabilities',
      cell: ({ row }) => (
        <div className="flex gap-1">
          {row.original.capabilities.map(cap => <Badge key={cap} variant="secondary">{cap.toUpperCase()}</Badge>)}
        </div>
      )
    },
    { 
      accessorKey: 'health', 
      header: 'Health',
      cell: ({ row }) => <Badge variant={row.original.health === 'active' ? 'default' : 'destructive'} className={row.original.health === 'active' ? 'bg-green-500' : ''}>{row.original.health}</Badge>
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Assign Agent</DropdownMenuItem>
            <DropdownMenuItem>Test Inbound</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Numbers</h1>
          <p className="text-muted-foreground">Manage your provisioned phone numbers for inbound and outbound calls.</p>
        </div>
        <Button onClick={() => setShowImportForm(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Import Number
        </Button>
      </div>

      {showImportForm && (
        <Card>
          <CardHeader>
            <CardTitle>Import Twilio Number</CardTitle>
            <CardDescription>Enter your Twilio credentials to import a phone number.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
                  <Input id="phoneNumber" {...form.register('phoneNumber')} />
                  {form.formState.errors.phoneNumber && <p className="text-red-500 text-xs">{form.formState.errors.phoneNumber.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="label">Label (Optional)</Label>
                  <Input id="label" {...form.register('label')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountSid">Account SID</Label>
                  <Input id="accountSid" {...form.register('accountSid')} />
                  {form.formState.errors.accountSid && <p className="text-red-500 text-xs">{form.formState.errors.accountSid.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="authToken">Auth Token</Label>
                  <Input id="authToken" type="password" {...form.register('authToken')} />
                  {form.formState.errors.authToken && <p className="text-red-500 text-xs">{form.formState.errors.authToken.message}</p>}
                </div>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Switch id="smsEnabled" {...form.register('smsEnabled')} />
                <Label htmlFor="smsEnabled">Enable SMS</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowImportForm(false)}>Cancel</Button>
                <Button type="submit">Import Number</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Provisioned Numbers</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={numbers} 
            filterColumnId="phoneNumber"
            filterPlaceholder="Filter by phone number..."
          />
        </CardContent>
      </Card>
    </div>
  );
}

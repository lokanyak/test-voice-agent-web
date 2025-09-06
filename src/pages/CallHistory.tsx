import { useCallsStore } from '@/stores/callsStore';
import { useAgentsStore } from '@/stores/agentsStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { CallRecord } from '@/types/contracts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileText, BarChart2, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CallHistory() {
  const { calls } = useCallsStore();
  const { agents } = useAgentsStore();

  const columns: ColumnDef<CallRecord>[] = [
    { accessorKey: 'phoneNumber', header: 'Phone Number' },
    { 
      accessorKey: 'agentId', 
      header: 'Agent Used',
      cell: ({ row }) => agents.find(a => a.id === row.original.agentId)?.name || 'Unknown'
    },
    { 
      accessorKey: 'duration', 
      header: 'Duration',
      cell: ({ row }) => `${row.original.duration}s`
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: ({ row }) => <Badge variant={row.original.status === 'completed' ? 'default' : 'destructive'} className={row.original.status === 'completed' ? 'bg-green-500' : ''}>{row.original.status}</Badge>
    },
    { 
      accessorKey: 'cost', 
      header: 'Cost',
      cell: ({ row }) => `₹${row.original.cost.toFixed(3)}`
    },
    { 
      accessorKey: 'timestamp', 
      header: 'Timestamp',
      cell: ({ row }) => new Date(row.original.timestamp).toLocaleString()
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><FileText className="mr-2 h-4 w-4" /> View Transcript</DropdownMenuItem>
            <DropdownMenuItem><BarChart2 className="mr-2 h-4 w-4" /> View Analytics</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Call History</h1>
        <p className="text-muted-foreground">A detailed log of all inbound and outbound calls.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={calls}
            filterColumnId="phoneNumber"
            filterPlaceholder="Filter by phone number..."
          />
        </CardContent>
      </Card>
    </div>
  );
}

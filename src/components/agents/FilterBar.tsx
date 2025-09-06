import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, LayoutGrid, List } from 'lucide-react';
import { useAgentsStore } from '@/stores/agentsStore';

interface FilterBarProps {
  onPrimaryAction: () => void;
}

export function FilterBar({ onPrimaryAction }: FilterBarProps) {
  const { filters, setFilters } = useAgentsStore();

  return (
    <div className="space-y-4">
        <div>
            <h1 className="text-3xl font-bold text-foreground">Assistants</h1>
            <p className="text-muted-foreground">Manage and optimize your AI voice assistants.</p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative w-full md:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search assistants..." 
                    className="pl-10"
                    value={filters.search}
                    onChange={(e) => setFilters({ search: e.target.value })}
                />
            </div>
            <div className="flex w-full md:w-auto gap-4">
                <Select value={filters.status} onValueChange={(value) => setFilters({ status: value as any })}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                    </SelectContent>
                </Select>
                <Button variant="outline" size="icon" className="hidden md:inline-flex">
                    <List className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                    <LayoutGrid className="h-4 w-4" />
                </Button>
            </div>
            <Button onClick={onPrimaryAction} className="w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create Assistant
            </Button>
        </div>
    </div>
  );
}

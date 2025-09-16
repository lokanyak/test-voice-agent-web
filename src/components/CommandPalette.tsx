import { useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Bot, Phone, BookOpen, BarChart2, CreditCard, Settings, Cpu, FlaskConical, Plus, Send
} from 'lucide-react';
import { useAgentsStore } from '@/stores/agentsStore';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Providers', href: '/providers', icon: Cpu },
  { name: 'Numbers', href: '/numbers', icon: Phone },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  { name: 'Campaigns', href: '/campaigns', icon: Send },
  { name: 'Voice Lab', href: '/voice-lab', icon: FlaskConical },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const agents = useAgentsStore(state => state.agents);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navigation.map((item) => (
            <CommandItem key={item.href} onSelect={() => runCommand(() => navigate(item.href))}>
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Agents">
          {agents.map((agent) => (
             <CommandItem key={agent.id} onSelect={() => runCommand(() => navigate(`/agents/${agent.id}/edit`))}>
               <Bot className="mr-2 h-4 w-4" />
               <span>{agent.name}</span>
             </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Bot, 
  Phone,
  BookOpen,
  BarChart2,
  CreditCard,
  Settings,
  Cpu,
  FlaskConical
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Providers', href: '/providers', icon: Cpu },
  { name: 'Numbers', href: '/numbers', icon: Phone },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  { name: 'Call History', href: '/calls', icon: BarChart2 },
  { name: 'Voice Lab', href: '/voice-lab', icon: FlaskConical },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Bot className="h-6 w-6" />
            <span>VocalCraft</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  location.pathname.startsWith(item.href) && 'bg-muted text-primary'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

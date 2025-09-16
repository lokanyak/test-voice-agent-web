import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Phone,
  BookOpen,
  BarChart2,
  CreditCard,
  Settings,
  Cpu,
  FlaskConical,
  Send,
  ChevronDown
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Agents', href: '/agents', icon: Bot },
  { name: 'Numbers', href: '/numbers', icon: Phone },
  { name: 'Knowledge Base', href: '/knowledge', icon: BookOpen },
  { name: 'Call History', href: '/calls', icon: BarChart2 },
  { name: 'Campaigns', href: '/campaigns', icon: Send },
  { name: 'Voice Lab', href: '/voice-lab', icon: FlaskConical },
  { name: 'Analytics', href: '/analytics', icon: BarChart2 },
  { name: 'Billing', href: '/billing', icon: CreditCard },
  { 
    name: 'Settings', 
    icon: Settings,
    subItems: [
      { name: 'Account', href: '/settings' },
      { name: 'Providers', href: '/providers' },
    ]
  },
];

export function Sidebar() {
  const location = useLocation();
  const isSettingsPath = location.pathname.startsWith('/settings') || location.pathname.startsWith('/providers');
  const [isSettingsOpen, setIsSettingsOpen] = useState(isSettingsPath);

  useEffect(() => {
    setIsSettingsOpen(location.pathname.startsWith('/settings') || location.pathname.startsWith('/providers'));
  }, [location.pathname]);

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
              item.subItems ? (
                <div key={item.name}>
                  <button 
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <div className={cn(
                      'flex items-center gap-3',
                      isSettingsPath && 'text-primary font-semibold'
                    )}>
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </div>
                    <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isSettingsOpen && "rotate-180")} />
                  </button>
                  {isSettingsOpen && (
                    <div className="space-y-1 py-1 pl-7">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            location.pathname === subItem.href && 'bg-muted text-primary'
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.href!}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    location.pathname.startsWith(item.href!) && item.href !== '/' && 'bg-muted text-primary',
                    location.pathname === '/' && item.href === '/' && 'bg-muted text-primary'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import { Menu, Bell, User, Sun, Moon } from 'lucide-react';
import { TierUpgrade } from '../dashboard/TierUpgrade';

export function Header() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex-1">
        {/* Can add breadcrumbs or page title here */}
      </div>
      <TierUpgrade currentTier="FREE" />
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon">
        <User className="h-5 w-5" />
      </Button>
    </header>
  );
}

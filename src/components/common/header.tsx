import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { Settings, User } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-2">
          {/* This would be conditional based on auth/role */}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/onboarding">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile / Sign In</span>
            </Link>
          </Button>
           <Button variant="ghost" size="icon" asChild>
            <Link href="/(app)/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

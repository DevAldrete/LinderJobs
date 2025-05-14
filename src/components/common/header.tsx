
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { Settings, User } from 'lucide-react';

export function AppHeader() {
  // In a real app, auth state would determine which links to show.
  // For now, linking User icon to login page.
  const isAuthenticated = false; // This would come from an auth context/hook

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/(app)/settings"> {/* Assuming settings is for authenticated users */}
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/(app)/settings">
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/login">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign In</span>
              </Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}


"use client"; // Added "use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { Settings, User, LogOut as LogOutIcon } from 'lucide-react'; // Added LogOutIcon
import { ThemeToggle } from '@/components/common/theme-toggle';
import { useAuth } from '@/contexts/AuthContext'; // Added useAuth
import { useToast } from '@/hooks/use-toast'; // Added useToast
import { useRouter } from 'next/navigation'; // Added useRouter

export function AppHeader() {
  const { user, signOut, loading } = useAuth(); // Used useAuth
  const { toast } = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/login'); // Redirect to login after logout
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Logo />
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <ThemeToggle />
          {!loading && ( // Render buttons only when not loading auth state
            user ? (
              <>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/profile"> 
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/settings">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOutIcon className="h-5 w-5" />
                  <span className="sr-only">Log Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
                    <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

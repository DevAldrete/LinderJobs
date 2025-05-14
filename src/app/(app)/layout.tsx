
"use client";

import { AppHeader } from "@/components/common/header";
import { MobileNav } from "@/components/common/mobile-nav";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-lg text-muted-foreground">Loading application...</p>
      </div>
    );
  }

  if (!user) {
    // This state should ideally not be reached if the effect above works correctly,
    // but it's a fallback.
    return null; // Or a minimal loading/redirecting message
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8"> 
        {children}
      </main>
      <MobileNav />
    </div>
  );
}

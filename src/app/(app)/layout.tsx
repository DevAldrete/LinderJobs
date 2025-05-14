
import { AppHeader } from "@/components/common/header";
import { MobileNav } from "@/components/common/mobile-nav";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container mx-auto px-4 py-8 pb-20 md:pb-8"> 
        {/* Added padding-bottom for mobile nav */}
        {children}
      </main>
      <MobileNav />
    </div>
  );
}

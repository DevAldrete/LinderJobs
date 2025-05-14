"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Flame, Users, MessageSquare, Briefcase, UserCircle2 } from "lucide-react"; // Using UserCircle2 for Settings/Profile
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  role?: "seeker" | "recruiter" | "any"; // 'any' means visible to both
}

const navItems: NavItem[] = [
  { href: "/(app)/discover", label: "Discover", icon: Flame, role: "seeker" },
  { href: "/(app)/candidates", label: "Candidates", icon: Flame, role: "recruiter" },
  { href: "/(app)/matches", label: "Matches", icon: Users, role: "any" },
  { href: "/(app)/chat", label: "Chat", icon: MessageSquare, role: "any" }, // Main chat list, specific chats will be /chat/[id]
  { href: "/(app)/jobs", label: "My Jobs", icon: Briefcase, role: "recruiter" },
  { href: "/(app)/settings", label: "Profile", icon: UserCircle2, role: "any" },
];

// Simulate user role - in a real app, this would come from auth context
const MOCK_USER_ROLE: "seeker" | "recruiter" = "seeker"; 

export function MobileNav() {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => {
    return item.role === "any" || item.role === MOCK_USER_ROLE;
  });

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="container mx-auto grid h-16 max-w-lg grid-cols-4 items-center px-0">
        {/* Max 4-5 items for typical bottom nav. We have 4 for seeker, 5 for recruiter. For recruiter, we might need to adjust or use a "more" menu. For this example, I'll show 4 for seeker and 4 for recruiter if 'My Jobs' is prioritized */}
        {/* For simplicity, showing all filtered items. Real world needs careful choice or scrollable nav */}
        {filteredNavItems.slice(0, 4).map((item) => { // Limiting to 4 for this example
          const isActive = pathname === item.href || (item.href !== "/(app)/settings" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} legacyBehavior passHref>
              <a className={cn(
                "flex flex-col items-center justify-center space-y-1 p-2 text-sm font-medium",
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              )}>
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

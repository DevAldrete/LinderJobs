
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
  { href: "/discover", label: "Discover", icon: Flame, role: "seeker" },
  { href: "/candidates", label: "Candidates", icon: Flame, role: "recruiter" },
  { href: "/matches", label: "Matches", icon: Users, role: "any" },
  { href: "/chat", label: "Chat", icon: MessageSquare, role: "any" }, // Main chat list, specific chats will be /chat/[id]
  { href: "/jobs", label: "My Jobs", icon: Briefcase, role: "recruiter" },
  { href: "/settings", label: "Profile", icon: UserCircle2, role: "any" },
];

// Simulate user role - in a real app, this would come from auth context
const MOCK_USER_ROLE: "seeker" | "recruiter" = "seeker"; 
// To test recruiter view, change above to "recruiter"

export function MobileNav() {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => {
    return item.role === "any" || item.role === MOCK_USER_ROLE;
  });

  // Prioritize key actions for the limited slots, ensuring 'Profile/Settings' is usually last or accessible
  const mainItems = filteredNavItems.filter(item => item.href !== "/settings");
  const settingsItem = filteredNavItems.find(item => item.href === "/settings");
  
  let displayItems = mainItems.slice(0,3); // take first 3 main items
  if (settingsItem) {
    displayItems.push(settingsItem); // add settings as the 4th
  }
  if (displayItems.length < 4 && mainItems.length > 3) { // if space and more main items exist
     displayItems.splice(displayItems.length -1, 0, ...mainItems.slice(3, 4 - displayItems.length + 3));
  }
  displayItems = displayItems.slice(0,4); // ensure max 4 items


  if (filteredNavItems.length === 0) return null;


  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className={cn(
        "container mx-auto grid h-16 max-w-lg items-center px-0",
         `grid-cols-${displayItems.length}`
      )}>
        {displayItems.map((item) => { 
          const isActive = pathname === item.href || (item.href !== "/settings" && item.href !== "/chat" && pathname.startsWith(item.href));
          // Special handling for /chat and /chat/[id] to make "Chat" active for both
          const isChatActive = item.href === "/chat" && (pathname === "/chat" || pathname.startsWith("/chat/"));
          const finalIsActive = isChatActive || isActive;

          return (
            <Link key={item.href} href={item.href} legacyBehavior passHref>
              <a className={cn(
                "flex flex-col items-center justify-center space-y-1 p-2 text-sm font-medium",
                finalIsActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
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


"use client";

import Image from "next/image";
import Link from "next/link";
import type { Match } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';


interface MatchListItemProps {
  match: Match;
}

export function MatchListItem({ match }: MatchListItemProps) {
  const initials = match.userName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  
  let timeAgo = '';
  if (match.lastMessageTimestamp) {
    try {
      timeAgo = formatDistanceToNow(new Date(match.lastMessageTimestamp), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date:", error);
      timeAgo = "a while ago"; // Fallback for invalid date
    }
  }


  return (
    <Link href={`/(app)/chat/${match.id}`} legacyBehavior>
      <a className="flex items-center space-x-4 p-4 rounded-lg hover:bg-secondary transition-colors cursor-pointer border-b last:border-b-0">
        <Avatar className="h-12 w-12">
          <AvatarImage src={match.userImageUrl} alt={match.userName} data-ai-hint="person avatar" />
          <AvatarFallback className="bg-muted text-muted-foreground">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold truncate text-foreground">{match.userName}</h3>
            {match.lastMessageTimestamp && (
              <p className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</p>
            )}
          </div>
          {match.context && <p className="text-xs text-muted-foreground truncate italic mt-0.5">{match.context}</p>}
          <div className="flex justify-between items-center mt-1">
            <p className={cn(
              "text-sm truncate",
              match.unreadCount && match.unreadCount > 0 ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              {match.lastMessage || "No messages yet."}
            </p>
            {match.unreadCount && match.unreadCount > 0 && (
              <Badge variant="default" className="bg-accent text-accent-foreground h-5 px-2 text-xs">
                {match.unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </a>
    </Link>
  );
}

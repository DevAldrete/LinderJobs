"use client";

// This page would typically show a list of all active chats, similar to the MatchesPage.
// For this example, it will be very similar to MatchesPage, as matches often lead directly to chats.
// In a more complex app, this could be a distinct UI.

import { MatchList } from "@/components/matches/match-list";
import { placeholderMatches } from "@/lib/placeholder-data";
import type { Match } from "@/types";
import { useState, useEffect } from 'react';
import { Loader2, MessageSquareText } from "lucide-react";


export default function AllChatsPage() {
  const [activeChats, setActiveChats] = useState<Match[]>([]); // Using Match type as it contains chat context
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get all active chats (which are essentially matches with messages)
    setTimeout(() => {
      // Filter matches that might have ongoing conversations or are simply listed as chats
      setActiveChats(placeholderMatches.filter(m => m.lastMessage)); 
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Loading your conversations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <MessageSquareText className="h-8 w-8 text-accent" />
        <h1 className="text-3xl font-bold">Conversations</h1>
      </div>
      {activeChats.length > 0 ? (
        <MatchList matches={activeChats} />
      ) : (
         <div className="text-center py-10">
            <MessageSquareText className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-xl font-semibold">No Active Conversations</h3>
            <p className="mt-1 text-sm text-muted-foreground">Start chatting with your matches!</p>
          </div>
      )}
    </div>
  );
}

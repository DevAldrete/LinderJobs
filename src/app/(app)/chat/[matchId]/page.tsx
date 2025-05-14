"use client";

import { ChatInterface } from "@/components/chat/chat-interface";
import { placeholderMatches, placeholderChatMessages } from "@/lib/placeholder-data";
import type { Match, ChatMessage } from "@/types";
import { useParams } from "next/navigation"; // Corrected import
import { useEffect, useState } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";

// Simulate current user ID
const CURRENT_USER_ID = "currentUser";

export default function ChatPage() {
  const params = useParams();
  const matchId = params.matchId as string;

  const [match, setMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (matchId) {
      // Simulate API call
      setIsLoading(true);
      setTimeout(() => {
        const foundMatch = placeholderMatches.find(m => m.id === matchId);
        if (foundMatch) {
          setMatch(foundMatch);
          setMessages(placeholderChatMessages[matchId] || []);
        } else {
          setError("Match not found.");
        }
        setIsLoading(false);
      }, 500);
    }
  }, [matchId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Loading chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-destructive">
        <AlertTriangle className="h-12 w-12" />
        <p className="mt-4 text-lg">{error}</p>
      </div>
    );
  }

  if (!match) {
    // Should be caught by error state, but as a fallback
    return <p>Match details could not be loaded.</p>;
  }

  return (
    <div>
      <ChatInterface match={match} initialMessages={messages} currentUserId={CURRENT_USER_ID} />
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from 'react';
import type { ChatMessage, Match } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizonal, Paperclip, Smile } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';


interface ChatInterfaceProps {
  match: Match;
  initialMessages: ChatMessage[];
  currentUserId: string; // To determine if message is from current user or other
}

export function ChatInterface({ match, initialMessages, currentUserId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: ChatMessage = {
      id: `msg${Date.now()}`,
      matchId: match.id,
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, message]);
    setNewMessage("");

    // Simulate receiving a reply after a short delay
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `reply${Date.now()}`,
        matchId: match.id,
        senderId: match.userId, // The other user
        text: `Thanks for your message! I'll get back to you soon. (Automated reply for demo)`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const getSenderInitials = (senderId: string) => {
    if (senderId === currentUserId) return "ME";
    return match.userName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase() || "OP";
  }
  
  const getSenderAvatar = (senderId: string) => {
    if (senderId === currentUserId) return "https://picsum.photos/seed/currentUser/40/40"; // Placeholder for current user
    return match.userImageUrl;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)] bg-card border rounded-lg shadow-md">
      <div className="p-4 border-b flex items-center space-x-3">
        <Avatar>
          <AvatarImage src={match.userImageUrl} alt={match.userName} data-ai-hint="person avatar" />
          <AvatarFallback>{match.userName.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg text-card-foreground">{match.userName}</h2>
          {match.context && <p className="text-xs text-muted-foreground italic">{match.context}</p>}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex items-end space-x-2 max-w-[75%]",
              msg.senderId === currentUserId ? "ml-auto flex-row-reverse space-x-reverse" : ""
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={getSenderAvatar(msg.senderId)} />
              <AvatarFallback>{getSenderInitials(msg.senderId)}</AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "p-3 rounded-lg shadow",
                msg.senderId === currentUserId
                  ? "bg-accent text-accent-foreground rounded-br-none"
                  : "bg-secondary text-secondary-foreground rounded-bl-none"
              )}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={cn(
                  "text-xs mt-1",
                  msg.senderId === currentUserId ? "text-accent-foreground/70 text-right" : "text-muted-foreground text-left"
                )}>
                {format(new Date(msg.timestamp), "p")}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-accent">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
            aria-label="Chat message input"
          />
          <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-accent">
            <Smile className="h-5 w-5" />
            <span className="sr-only">Add emoji</span>
          </Button>
          <Button type="submit" size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <SendHorizonal className="h-5 w-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  );
}

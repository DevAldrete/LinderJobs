"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, Briefcase, MapPin, DollarSign, Tag, Bookmark } from "lucide-react";
import type { Job, Candidate } from "@/types";
import { Badge } from "@/components/ui/badge";

type SwipeCardProps = {
  item: Job | Candidate;
  onSwipe: (itemId: string, direction: "left" | "right") => void;
  type: "job" | "candidate";
};

export function SwipeCard({ item, onSwipe, type }: SwipeCardProps) {
  const isJob = type === "job";
  const job = isJob ? (item as Job) : null;
  const candidate = !isJob ? (item as Candidate) : null;

  return (
    <Card className="w-full max-w-md mx-auto shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105">
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] w-full relative">
          <Image
            src={item.imageUrl || `https://picsum.photos/seed/${item.id}/400/300`}
            alt={isJob ? job!.title : candidate!.name}
            layout="fill"
            objectFit="cover"
            data-ai-hint={isJob ? "company office" : "person portrait"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent p-4 flex flex-col justify-end">
            <CardTitle className="text-2xl font-bold text-primary-foreground leading-tight">
              {isJob ? job!.title : candidate!.name}
            </CardTitle>
            {isJob && job?.company && (
              <CardDescription className="text-primary-foreground/80 text-sm flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5" /> {job.company}
              </CardDescription>
            )}
            {!isJob && candidate?.headline && (
               <CardDescription className="text-primary-foreground/80 text-sm">
                {candidate.headline}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 mr-1.5 shrink-0" />
          <span>{item.location}</span>
        </div>

        {isJob && job?.salary && (
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="w-4 h-4 mr-1.5 shrink-0" />
            <span>{job.salary}</span>
          </div>
        )}
        {isJob && job?.type && (
            <Badge variant="secondary" className="text-xs">{job.type}</Badge>
        )}

        <p className="text-sm text-foreground line-clamp-3">
          {isJob ? job!.description : candidate!.bio}
        </p>

        {(isJob ? job?.tags : candidate?.skills) && (
          <div className="flex flex-wrap gap-2 mt-2">
            {(isJob ? job!.tags! : candidate!.skills).slice(0,5).map((tagOrSkill) => (
              <Badge key={tagOrSkill} variant="outline">
                {tagOrSkill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-4 p-4 bg-secondary/50">
        <Button variant="outline" size="lg" className="rounded-full aspect-square p-0 border-destructive/50 text-destructive hover:bg-destructive/10" onClick={() => onSwipe(item.id, "left")}>
          <X className="w-7 h-7" />
          <span className="sr-only">Pass</span>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full aspect-square p-0 text-primary hover:bg-primary/10">
          <Bookmark className="w-7 h-7" />
          <span className="sr-only">Save</span>
        </Button>
        <Button size="lg" className="rounded-full aspect-square p-0 bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => onSwipe(item.id, "right")}>
          <Heart className="w-7 h-7" />
          <span className="sr-only">Like</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

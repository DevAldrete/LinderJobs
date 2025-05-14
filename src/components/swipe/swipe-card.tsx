
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Heart, Briefcase, MapPin, DollarSign, Bookmark, Users, Building, School } from "lucide-react";
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
    <Card className="w-full max-w-md mx-auto shadow-2xl rounded-2xl overflow-hidden transition-transform duration-300 ease-in-out hover:scale-[1.02] flex flex-col h-full max-h-[620px]">
      <CardHeader className="p-0 relative">
        <div className="aspect-[16/10] w-full relative"> {/* Adjusted aspect ratio for better visual */}
          <Image
            src={item.imageUrl || `https://picsum.photos/seed/${item.id}/600/375`}
            alt={isJob ? job!.title : candidate!.name}
            layout="fill"
            objectFit="cover"
            priority // Prioritize loading image for the current card
            data-ai-hint={isJob ? "company office building" : "person professional portrait"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 flex flex-col justify-end">
            <CardTitle className="text-3xl font-bold text-primary-foreground leading-tight shadow-black [text-shadow:_0_1px_3px_var(--tw-shadow-color)]">
              {isJob ? job!.title : candidate!.name}
            </CardTitle>
            {isJob && job?.company && (
              <CardDescription className="text-primary-foreground/90 text-md flex items-center mt-1 shadow-black [text-shadow:_0_1px_2px_var(--tw-shadow-color)]">
                <Building className="w-4 h-4 mr-2" /> {job.company}
              </CardDescription>
            )}
            {!isJob && candidate?.headline && (
               <CardDescription className="text-primary-foreground/90 text-md mt-1 shadow-black [text-shadow:_0_1px_2px_var(--tw-shadow-color)]">
                {candidate.headline}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 flex-grow overflow-y-auto">
        <div className="flex items-center text-md text-muted-foreground">
          <MapPin className="w-5 h-5 mr-2.5 shrink-0 text-accent" />
          <span>{item.location}</span>
        </div>

        {isJob && job?.salary && (
          <div className="flex items-center text-md text-muted-foreground">
            <DollarSign className="w-5 h-5 mr-2.5 shrink-0 text-accent" />
            <span>{job.salary}</span>
          </div>
        )}
         {isJob && job?.type && (
            <Badge variant="secondary" className="text-sm py-1 px-3">{job.type}</Badge>
        )}

        {!isJob && candidate?.experienceYears !== undefined && (
          <div className="flex items-center text-md text-muted-foreground">
            <Briefcase className="w-5 h-5 mr-2.5 shrink-0 text-accent" />
            <span>{candidate.experienceYears} years of experience</span>
          </div>
        )}
        {!isJob && candidate?.education && (
          <div className="flex items-center text-md text-muted-foreground">
            <School className="w-5 h-5 mr-2.5 shrink-0 text-accent" />
            <span>{candidate.education}</span>
          </div>
        )}


        <p className="text-md text-foreground leading-relaxed line-clamp-4"> {/* Increased line clamp for more info */}
          {isJob ? job!.description : candidate!.bio}
        </p>

        {(isJob ? job?.tags : candidate?.skills) && (
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground mb-2">
              {isJob ? "Key Skills & Technologies" : "Top Skills"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {(isJob ? job!.tags! : candidate!.skills!).slice(0,7).map((tagOrSkill) => (
                <Badge key={tagOrSkill} variant="outline" className="text-sm py-1 px-2.5 shadow-sm">
                  {tagOrSkill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 border-t mt-auto">
        <Button variant="outline" size="lg" className="rounded-full aspect-square p-0 border-destructive/70 text-destructive hover:bg-destructive/10 shadow-md hover:shadow-lg focus:ring-destructive" onClick={() => onSwipe(item.id, "left")}>
          <X className="w-8 h-8" />
          <span className="sr-only">Pass</span>
        </Button>
        <Button variant="outline" size="lg" className="rounded-full aspect-square p-0 text-primary/80 border-primary/30 hover:bg-primary/10 shadow-md hover:shadow-lg focus:ring-primary">
          <Bookmark className="w-7 h-7" />
          <span className="sr-only">Save</span>
        </Button>
        <Button size="lg" className="rounded-full aspect-square p-0 bg-accent text-accent-foreground hover:bg-accent/80 shadow-lg hover:shadow-xl focus:ring-accent" onClick={() => onSwipe(item.id, "right")}>
          <Heart className="w-8 h-8" />
          <span className="sr-only">Like</span>
        </Button>
      </CardFooter>
    </Card>
  );
}

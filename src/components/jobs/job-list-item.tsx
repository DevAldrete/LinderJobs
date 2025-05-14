"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/types";
import { MapPin, Briefcase, Users, Edit3, Trash2, Eye } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";


interface JobListItemProps {
  job: Job;
  onDelete: (jobId: string) => void;
}

export function JobListItem({ job, onDelete }: JobListItemProps) {
  const { toast } = useToast();
  
  const handleDelete = () => {
    // Simulate API call
    toast({
      title: "Job Deleted",
      description: `Job "${job.title}" has been deleted.`,
    });
    onDelete(job.id);
  };
  
  let postedDateAgo = '';
  if (job.postedDate) {
    try {
      postedDateAgo = formatDistanceToNow(new Date(job.postedDate), { addSuffix: true });
    } catch (error) {
      console.error("Error formatting date for job list item:", error);
      postedDateAgo = "some time ago";
    }
  }


  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">{job.title}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              <Briefcase className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />{job.company}
              <span className="mx-1.5">·</span>
              <MapPin className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />{job.location}
            </CardDescription>
          </div>
           <Badge variant={job.type === "Full-time" ? "default" : "secondary"} className={job.type === "Full-time" ? "bg-accent text-accent-foreground" : ""}>{job.type}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-foreground line-clamp-2">{job.description}</p>
        {job.tags && job.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {job.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
         <p className="text-xs text-muted-foreground pt-1">Posted: {postedDateAgo}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="w-4 h-4 mr-1.5" />
          <span>{Math.floor(Math.random() * 50) + 1} Applicants</span> {/* Placeholder */}
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/(app)/jobs/${job.id}/edit`}>
              <Edit3 className="w-4 h-4 mr-1.5" /> Edit
            </Link>
          </Button>
           <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-1.5" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the job posting for "{job.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
}

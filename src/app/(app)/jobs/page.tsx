"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JobList } from "@/components/jobs/job-list";
import { placeholderJobs } from "@/lib/placeholder-data";
import type { Job } from "@/types";
import { useState, useEffect } from 'react';
import { PlusCircle, Loader2, Briefcase } from "lucide-react";


export default function JobManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setJobs(placeholderJobs); // For now, showing all jobs as if they are recruiter's
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Loading your job postings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-3">
          <Briefcase className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold">Manage Job Postings</h1>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto">
          <Link href="/(app)/jobs/create">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Job
          </Link>
        </Button>
      </div>
      <JobList jobs={jobs} />
    </div>
  );
}

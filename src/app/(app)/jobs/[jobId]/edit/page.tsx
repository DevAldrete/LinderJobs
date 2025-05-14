"use client";

import { JobPostForm } from "@/components/jobs/job-post-form";
import { placeholderJobs } from "@/lib/placeholder-data"; // For fetching placeholder data
import type { Job } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader2, AlertTriangle } from "lucide-react";

export default function EditJobPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const foundJob = placeholderJobs.find(j => j.id === jobId);
        if (foundJob) {
          setJob(foundJob);
        } else {
          setError("Job not found.");
        }
        setIsLoading(false);
      }, 500);
    }
  }, [jobId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Loading job details...</p>
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
  
  if (!job) {
    return <p>Job details could not be loaded.</p>;
  }

  return (
    <div className="py-8">
      <JobPostForm initialData={job} jobId={jobId} />
    </div>
  );
}

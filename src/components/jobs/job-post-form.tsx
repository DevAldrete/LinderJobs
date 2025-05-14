
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Job } from "@/types";
import { Save } from "lucide-react"; // Added Save icon

const JobPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters.").max(100, "Title cannot exceed 100 characters."),
  company: z.string().min(2, "Company name must be at least 2 characters.").max(100, "Company name cannot exceed 100 characters."),
  location: z.string().min(2, "Location is required.").max(100, "Location cannot exceed 100 characters."),
  description: z.string().min(50, "Description must be at least 50 characters.").max(5000, "Description cannot exceed 5000 characters."),
  salary: z.string().optional().refine(val => !val || val.length <= 50, { message: "Salary cannot exceed 50 characters."}),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  tags: z.string().optional().refine(val => !val || val.split(',').every(tag => tag.trim().length > 0 && tag.trim().length <= 30), {
    message: "Each tag must be between 1 and 30 characters."
  }).refine(val => !val || val.split(',').length <= 10, { message: "You can add up to 10 tags."}),
});

type JobPostFormValues = z.infer<typeof JobPostSchema>;

interface JobPostFormProps {
  initialData?: Job; // For editing
  jobId?: string; // For editing
}

export function JobPostForm({ initialData, jobId }: JobPostFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const isEditing = !!initialData;

  const form = useForm<JobPostFormValues>({
    resolver: zodResolver(JobPostSchema),
    defaultValues: initialData 
      ? {
          ...initialData,
          tags: initialData.tags?.join(', ') || '',
        }
      : {
          title: "",
          company: "",
          location: "",
          description: "",
          type: "Full-time",
          salary: "",
          tags: "",
        },
  });

  function onSubmit(data: JobPostFormValues) {
    console.log(data); // In real app, send to API
    // Here you would typically make an API call to save/update the job
    // For now, we just show a toast and navigate
    toast({
      title: isEditing ? "Job Updated!" : "Job Posted!",
      description: `Job "${data.title}" has been successfully ${isEditing ? 'updated' : 'posted'}.`,
    });
    router.push("/jobs"); // Corrected path: Navigate to job list
    router.refresh(); // Force refresh to show updated list if data was server-fetched
  }

  return (
    <Card className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">{isEditing ? "Edit Job Posting" : "Create New Job Posting"}</CardTitle>
        <CardDescription>
          {isEditing ? "Update the details for your job posting." : "Fill in the details for the new job opportunity."}
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Senior Software Engineer" {...field} className="shadow-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Acme Corp" {...field} className="shadow-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., San Francisco, CA or Remote" {...field} className="shadow-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="shadow-sm">
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary Range (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $100,000 - $120,000 per year" {...field} className="shadow-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide a detailed description of the role, responsibilities, and requirements..."
                      className="resize-none shadow-sm"
                      rows={8}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., React, Node.js, Agile, UX" {...field} className="shadow-sm"/>
                  </FormControl>
                  <FormDescription>Comma-separated list of relevant skills or keywords (max 10 tags, 30 chars per tag).</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-shadow">
              <Save className="mr-2 h-5 w-5" />
              {isEditing ? "Save Changes" : "Post Job"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

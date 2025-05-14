
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
  title: z.string().min(5, "Title must be at least 5 characters."),
  company: z.string().min(2, "Company name must be at least 2 characters."),
  location: z.string().min(2, "Location is required."),
  description: z.string().min(50, "Description must be at least 50 characters."),
  salary: z.string().optional(),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship']),
  tags: z.string().optional(), // Comma-separated
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
    toast({
      title: isEditing ? "Job Updated!" : "Job Posted!",
      description: `Job "${data.title}" has been successfully ${isEditing ? 'updated' : 'posted'}.`,
    });
    router.push("/(app)/jobs"); // Navigate to job list
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
                    <Input placeholder="e.g., Senior Software Engineer" {...field} />
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
                    <Input placeholder="e.g., Acme Corp" {...field} />
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
                    <Input placeholder="e.g., San Francisco, CA or Remote" {...field} />
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
                      <SelectTrigger>
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
                    <Input placeholder="e.g., $100,000 - $120,000 per year" {...field} />
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
                      className="resize-none"
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
                    <Input placeholder="e.g., React, Node.js, Agile, UX" {...field} />
                  </FormControl>
                  <FormDescription>Comma-separated list of relevant skills or keywords.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
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

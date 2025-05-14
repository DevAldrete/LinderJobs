
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Rocket } from "lucide-react"; // Added Rocket for button

const ProfileFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  headline: z.string().min(5, "Headline must be at least 5 characters.").max(100, "Headline must be less than 100 characters."),
  bio: z.string().max(500, "Bio must be less than 500 characters.").optional(),
  skills: z.string().optional(), // Could be more complex, e.g. array of strings
  // profilePicture: z.instanceof(File).optional(), // For actual file uploads
});

type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

// This can be dynamic based on user role
const defaultValues: Partial<ProfileFormValues> = {
  fullName: "",
  headline: "",
  bio: "",
  skills: "",
};

export function ProfileForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, save this to user profile/backend
    console.log(data);
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved.",
    });
    // Determine next step based on role, or go to dashboard
    // For now, just go to a generic discover page
    router.push("/(app)/discover"); 
  }

  return (
    <Card className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
        <CardDescription>Tell us a bit about yourself to get started.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Jane Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="headline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Software Engineer | Open to new opportunities" {...field} />
                  </FormControl>
                  <FormDescription>
                    A short, catchy headline to grab attention.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-3">
                    <span className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Upload className="h-8 w-8" />
                    </span>
                    <Button type="button" variant="outline" className="shadow-sm hover:shadow-md">Upload Image</Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Upload a professional photo. (UI only)
                </FormDescription>
                <FormMessage />
            </FormItem>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio / Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself, your experience, and what you're looking for..."
                      className="resize-none"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., JavaScript, React, Project Management" {...field} />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of your top skills.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more fields like experience, education, portfolio link etc. based on seeker/recruiter */}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-shadow">
              <Rocket className="mr-2 h-5 w-5" />
              Finish Setup & Start Swiping
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

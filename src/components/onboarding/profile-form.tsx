
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter, usePathname } from "next/navigation";
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
import { Upload, Rocket, Save } from "lucide-react"; 

const ProfileFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters.").max(50, "Full name cannot exceed 50 characters."),
  headline: z.string().min(5, "Headline must be at least 5 characters.").max(100, "Headline must be less than 100 characters."),
  bio: z.string().max(500, "Bio must be less than 500 characters.").optional(),
  skills: z.string().optional().refine(val => !val || val.split(',').every(tag => tag.trim().length > 0 && tag.trim().length <= 30), {
    message: "Each skill must be between 1 and 30 characters."
  }).refine(val => !val || val.split(',').length <= 15, { message: "You can add up to 15 skills."}),
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
  const pathname = usePathname();
  const { toast } = useToast();

  const isSettingsPage = pathname.includes("/settings");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, save this to user profile/backend
    console.log(data);
    toast({
      title: isSettingsPage ? "Profile Updated!" : "Profile Created!",
      description: "Your profile information has been saved.",
    });
    
    if (!isSettingsPage) {
      // If on onboarding, navigate to discover page
      router.push("/discover"); // Corrected path
    }
    // If on settings page, do nothing or refresh if needed
  }

  return (
    <Card className="w-full shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl">{isSettingsPage ? "Update Your Profile" : "Complete Your Profile"}</CardTitle>
        <CardDescription>{isSettingsPage ? "Keep your information up to date." : "Tell us a bit about yourself to get started."}</CardDescription>
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
                    <Input placeholder="e.g., Jane Doe" {...field} className="shadow-sm"/>
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
                    <Input placeholder="e.g., Software Engineer | Open to new opportunities" {...field} className="shadow-sm"/>
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
                    <span className="h-20 w-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground overflow-hidden shadow-inner">
                      {/* Placeholder for actual image preview */}
                      <Upload className="h-8 w-8" />
                    </span>
                    <Button type="button" variant="outline" className="shadow-sm hover:shadow-md">Upload Image</Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Upload a professional photo. (UI only for this demo)
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
                      className="resize-none shadow-sm"
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
                    <Input placeholder="e.g., JavaScript, React, Project Management" {...field} className="shadow-sm"/>
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of your top skills (max 15 skills, 30 chars per skill).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Add more fields like experience, education, portfolio link etc. based on seeker/recruiter */}
          </CardContent>
          <CardFooter className="flex justify-end pt-4">
            <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md hover:shadow-lg transition-shadow">
              {isSettingsPage ? <Save className="mr-2 h-5 w-5" /> : <Rocket className="mr-2 h-5 w-5" />}
              {isSettingsPage ? "Save Changes" : "Finish Setup & Start Swiping"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

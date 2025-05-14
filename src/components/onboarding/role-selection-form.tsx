"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation"; // Changed from 'next/navigation'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, UserSearch, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const RoleSelectionSchema = z.object({
  role: z.enum(["seeker", "recruiter"], {
    required_error: "You need to select a role.",
  }),
});

type RoleSelectionFormValues = z.infer<typeof RoleSelectionSchema>;

export function RoleSelectionForm() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<RoleSelectionFormValues>({
    resolver: zodResolver(RoleSelectionSchema),
  });

  function onSubmit(data: RoleSelectionFormValues) {
    // In a real app, save this to user profile
    toast({
      title: "Role Selected",
      description: `You've selected the role: ${data.role === 'seeker' ? 'Job Seeker' : 'Recruiter'}.`,
    });
    router.push("/onboarding/profile");
  }

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Choose Your Role</CardTitle>
        <CardDescription>Are you looking for a job, or hiring talent?</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
                    >
                      <FormItem className="flex-1">
                        <FormControl>
                          <RadioGroupItem value="seeker" id="seeker" className="sr-only" />
                        </FormControl>
                        <FormLabel
                          htmlFor="seeker"
                          className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-accent [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:text-accent-foreground cursor-pointer transition-colors"
                        >
                          <UserSearch className="mb-3 h-8 w-8" />
                          Job Seeker
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex-1">
                        <FormControl>
                          <RadioGroupItem value="recruiter" id="recruiter" className="sr-only" />
                        </FormControl>
                        <FormLabel
                          htmlFor="recruiter"
                           className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-6 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-accent [&:has([data-state=checked])]:bg-accent [&:has([data-state=checked])]:text-accent-foreground cursor-pointer transition-colors"
                        >
                          <Briefcase className="mb-3 h-8 w-8" />
                          Recruiter
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

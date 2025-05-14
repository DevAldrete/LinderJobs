
"use client";

import { ProfileForm } from "@/components/onboarding/profile-form"; 
// Re-using ProfileForm for settings for simplicity. 
// In a real app, this might be a more detailed settings page.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Bell, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  // This would typically load user data to pre-fill the ProfileForm
  // const user = useUser(); // example custom hook

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        {/* ProfileForm already uses a Card with shadow-xl */}
        <ProfileForm /> 
      </section>

      <Separator />

      <section>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Manage your email and push notifications.</p>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md"><Bell className="mr-2 h-4 w-4" /> Manage</Button>
            </div>
             <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">Update password and account security settings.</p>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm hover:shadow-md"><Shield className="mr-2 h-4 w-4" /> Manage</Button>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6">
             <Button variant="destructive" className="w-full sm:w-auto shadow-md hover:shadow-lg">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

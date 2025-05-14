
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Bell, Shield, User } from "lucide-react"; // Added User icon
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext"; // Added useAuth
import Link from "next/link"; // Added Link

export default function SettingsPage() {
  const { signOut, user } = useAuth(); // Used useAuth
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Logout Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push("/login");
    }
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">Settings</h1>
      
      <section>
        <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your personal details and preferences.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Your profile details, such as name, bio, skills, and profile picture, can be managed on your dedicated profile page.
            </p>
            <Button asChild variant="outline" className="shadow-sm hover:shadow-md">
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" /> Go to My Profile
              </Link>
            </Button>
          </CardContent>
        </Card>
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
             <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto shadow-md hover:shadow-lg" disabled={!user}>
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

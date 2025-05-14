
"use client";

import { ProfileForm } from "@/components/onboarding/profile-form";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function UserProfilePage() {
  const { user, loading } = useAuth();

  // Here you would typically fetch the user's profile data from Supabase
  // based on user.id and pass it as initialData to ProfileForm.
  // For this example, we'll use an empty ProfileForm if no data exists,
  // or ProfileForm will use its own default values.
  
  // const [profileData, setProfileData] = useState<ProfileFormValues | undefined>(undefined);
  // useEffect(() => {
  //   if (user) {
  //     // async function fetchProfile() {
  //     //   const { data, error } = await supabase
  //     //     .from('profiles') // assuming you have a 'profiles' table
  //     //     .select('*')
  //     //     .eq('id', user.id)
  //     //     .single();
  //     //   if (data) setProfileData(data);
  //     //   else if (error) console.error("Error fetching profile", error);
  //     // }
  //     // fetchProfile();
  //   }
  // }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-accent" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    // This should ideally be handled by the (app) layout redirecting to login
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <ProfileForm 
        // initialData={profileData} // Pass fetched profile data here
        // You'll also need to update ProfileForm to handle saving data to Supabase
      />
    </div>
  );
}


import type { Metadata } from "next";
import ProfileContent from "./ProfilePage";
import { getCurrentUser } from "@/lib/api/serverApi";


export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "View and edit your NoteHub profile information",
  openGraph: {
    title: "Profile | NoteHub",
    description: "View and edit your NoteHub profile information",
    url: "/profile",
    siteName: "NoteHub",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export default async function ProfilePage() {
  
  await getCurrentUser(); 

  return <ProfileContent />;
}

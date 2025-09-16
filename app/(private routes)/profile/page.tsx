import ProfileContent from "./ProfilePage";
import { getCurrentUser } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  try {
    const user = await getCurrentUser();
    if (!user) return redirect("/sign-in");

    return <ProfileContent user={user} />;
  } catch {
    return redirect("/sign-in");
  }
}

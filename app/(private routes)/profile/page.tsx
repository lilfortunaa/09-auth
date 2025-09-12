import type { Metadata } from "next";
import css from "./ProfilePage.module.css";
import Image from "next/image";

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
  robots: {
    index: false, 
    follow: false,
  },
};

export default function ProfilePage() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          
          <a href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: your_username</p>
          <p>Email: your_email@example.com</p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";
import css from "./ProfilePage.module.css";

interface ProfileContentProps {
  user: User;
}

export default function ProfileContent({ user }: ProfileContentProps) {
  const { setUser, user: storeUser } = useAuthStore();

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  const displayUser = storeUser || user;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={displayUser.avatar || "/default-avatar.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>

        <div className={css.profileInfo}>
          <p>Username: {displayUser.username || "No username"}</p>
          <p>Email: {displayUser.email || "No email"}</p>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInUser, SignIn } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User as ApiUser } from "@/types/user";
import css from "./SignInPage.module.css";

export default function SignInPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userFromServer: ApiUser = await signInUser({ email, password } as SignIn);

      const userForStore = {
        email: userFromServer.email,
        username: userFromServer.username || "",
        avatar: userFromServer.avatar || "",
     
      };

      setUser(userForStore);
      router.push("/profile");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Login failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" className={css.input} required />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Log in</button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

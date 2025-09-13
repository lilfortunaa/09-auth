"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User as ApiUser } from "@/types/user";
import css from "./SignUpPage.module.css";
import axios from "axios";

export default function SignUpPage() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userFromServer: ApiUser = await signUp({ email, password });

     
      const userForStore: ApiUser = {
        id: userFromServer.id,
        email: userFromServer.email,
        username: userFromServer.username || "",
        avatar: userFromServer.avatar || "",
        createdAt: userFromServer.createdAt, 
      };

      setUser(userForStore);
      router.push("/profile");
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

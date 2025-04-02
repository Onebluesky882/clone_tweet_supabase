"use client";

import { Button } from "@/components/ui/button";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [currentSession, setCurrentSession] = useState(session);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setCurrentSession(newSession);
        router.refresh(); // Refresh page to get updated session
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, [supabase, router]);

  const handleSignIn = async () => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      console.error("Login error:", error);
    } else {
      window.location.href = data.url;
    }
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return currentSession ? (
    <Button
      onClick={() => {
        handleSignOut();
      }}
    >
      Logout
    </Button>
  ) : (
    <Button
      onClick={() => {
        handleSignIn();
      }}
    >
      Login
    </Button>
  );
}

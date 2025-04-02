"use client";

import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AuthButtonClient = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const [userSession, setUserSession] = useState(session);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setUserSession(newSession);
        router.refresh();
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
    if (error) {
      console.log("something wrong at handleLogin");
    }
  };
  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("something wrong at handleLogout");
    }
    router.refresh();
  };
  return userSession ? (
    <button onClick={handleLogOut}>Logout</button>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
};
export default AuthButtonClient;

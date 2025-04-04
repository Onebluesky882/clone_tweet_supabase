"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const AuthButtonClient = () => {
  const router = useRouter();
  const handleSignIn = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "http://localhost:3000/auth/callback" },
    });
  };

  const handleSignOut = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();
    await router.refresh();
  };
  return (
    <div>
      <button onClick={handleSignIn}>login</button>
      <button onClick={handleSignOut}>logout</button>
    </div>
  );
};
export default AuthButtonClient;

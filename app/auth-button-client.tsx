"use client";

import { useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AuthButtonClient = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <div>
      {session ? (
        <button onClick={handleSignOut}>logout</button>
      ) : (
        <button onClick={handleSignIn}>login</button>
      )}
    </div>
  );
};
export default AuthButtonClient;

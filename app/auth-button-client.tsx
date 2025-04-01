"use client";

import { Button } from "@/components/ui/button";
import {
  createClientComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

export function AuthButtonClient({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "localhost://3000/auth/callback" },
    });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();

    router.refresh();
  };

  return session ? (
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

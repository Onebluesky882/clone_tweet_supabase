"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

export async function AuthButton() {
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
  return (
    <>
      {" "}
      <Button
        onClick={() => {
          handleSignIn();
        }}
      >
        Login
      </Button>{" "}
      <Button
        onClick={() => {
          handleSignOut();
        }}
      >
        Logout
      </Button>
    </>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export async function AuthButton() {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: "localhost://3000/auth/callback" },
    });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
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

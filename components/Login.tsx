"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

const Login = () => {
  const signInWithGithub = async () => {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };
  const signInWithGoogle = async () => {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };
  return (
    <>
      <Button onClick={signInWithGithub}>Github</Button>
      <Button onClick={signInWithGoogle}>Google</Button>
    </>
  );
};

export default Login;

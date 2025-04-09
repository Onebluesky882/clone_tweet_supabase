"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";

const Login = () => {
  const signIn = async () => {
    const supabase = await createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };
  return <Button onClick={signIn}>Github</Button>;
};

export default Login;

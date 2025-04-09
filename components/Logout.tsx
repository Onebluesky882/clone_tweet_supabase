"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const handleSignout = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  return <Button onClick={handleSignout}>Sign out</Button>;
};

export default Logout;

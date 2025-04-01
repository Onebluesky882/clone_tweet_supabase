import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { cookies } from "next/headers";
import { AuthButton } from "./auth-button";
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data: tweet } = await supabase.from("tweets").select();
  return (
    <>
      <AuthButton />
      <pre>{JSON.stringify(tweet, null, 2)}</pre>;
    </>
  );
}

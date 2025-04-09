import Logout from "@/components/Logout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("no session :::--------------------");
    redirect("/login"); // ✅ Must come before any rendering
  }
  const { data: tweets } = await (await supabase).from("tweets").select();

  return (
    <div>
      <h1>homepage</h1>
      <Logout />
      <pre>{JSON.stringify(tweets, null, 3)}</pre>
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    console.log("no session :::--------------------");
  }
  // if (!session) {
  //   redirect("/login");
  // }

  const { data: tweets } = await (await supabase).from("tweets").select();

  return (
    <div>
      <pre>{JSON.stringify(tweets, null, 3)}</pre>
    </div>
  );
}

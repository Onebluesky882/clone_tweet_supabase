import {
  createServerComponentClient,
  Session,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonClient from "./auth-button-client";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  const { data: tweets, error } = await supabase.from("tweets").select();
  if (error) {
    console.error("Error fetching tweets:", error);
    return <div>Error fetching data</div>;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>hello</h1>
      <AuthButtonClient />
      <pre>{JSON.stringify(tweets, null, 3)}</pre>
    </div>
  );
}

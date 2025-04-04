import { redirect } from "next/navigation";
import AuthButtonClient from "../auth-button-client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../auth-button-server";

export default async function LoginPage() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div>
      <AuthButtonServer />
    </div>
  );
}

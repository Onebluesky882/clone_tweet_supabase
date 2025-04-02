import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code"); // Get OAuth code

  if (!code) {
    return NextResponse.redirect("/login?error=MissingCode");
  }

  const supabase = createRouteHandlerClient({ cookies });

  // Exchange code for session
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    return NextResponse.redirect("/login?error=" + error.message);
  }

  return NextResponse.redirect(new URL("/", requestUrl).toString());
}

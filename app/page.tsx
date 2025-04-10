import Likes from "@/components/Likes";
import Logout from "@/components/Logout";
import Tweet from "@/components/Tweet";
import { createServer } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  const {
    data: { user: visitor },
  } = await supabase.auth.getUser();

  const { data } = await (await supabase)
    .from("tweets")
    .select("* , author : profiles(*) , likes(*)");
  const tweets =
    data?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      user_has_liked_tweet: !!tweet.likes.find(
        (like) => like.user_id === visitor?.id
      ),
      liked: tweet.likes.length,
    })) ?? [];
  return (
    <div>
      <h1>homepage</h1>
      <Logout />
      <div>
        {tweets?.map((tweet) => (
          <Tweet tweet={tweet} key={tweet.id} />
        ))}
      </div>
      <pre>{JSON.stringify(tweets, null, 3)}</pre>
    </div>
  );
}

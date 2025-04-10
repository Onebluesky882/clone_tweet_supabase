import Likes from "@/components/Likes";
import Logout from "@/components/Logout";
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
  const { data: tweets } = await (await supabase)
    .from("tweets")
    .select("* , author : profiles(*) , likes(*)");

  return (
    <div>
      <h1>homepage</h1>
      <Logout />
      <div>
        {tweets?.map((tweet) => (
          <div className="" key={tweet.id}>
            {<p>{tweet.author.name}</p>}
            <p>{tweet.title}</p>
            <div className="flex align-middle">
              <div>{tweet.likes.length}</div>
              <Likes tweets={tweet} />
            </div>
          </div>
        ))}
      </div>
      <pre>{JSON.stringify(tweets, null, 3)}</pre>
    </div>
  );
}

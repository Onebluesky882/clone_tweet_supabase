"use client";

import { LikeWithAuthor as TweetWithAuthor } from "@/types/type";
import Likes from "./Likes";
import { useEffect, useOptimistic } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Tweets = ({ tweets }: { tweets: TweetWithAuthor[] }) => {
  const router = useRouter();
  const supabase = createClient();
  const [optimisticTweets, addOptimisticTweet] = useOptimistic<
    TweetWithAuthor[],
    TweetWithAuthor
  >(tweets, (currentOptimisticTweets, newTweet) => {
    const newOptimisticTweets = [...currentOptimisticTweets];
    const index = newOptimisticTweets.findIndex(
      (tweet) => tweet.id === newTweet.id
    );

    newOptimisticTweets[index] = newTweet;
    return newOptimisticTweets;
  });

  useEffect(() => {
    console.log("Initializing Supabase Realtime subscription");
    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "tweets" },
        (_payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div>
      {optimisticTweets.map((tweet) => (
        <div key={tweet.id}>
          <p>{tweet.author.name}</p>
          <p>{tweet.title}</p>
          <p>{tweet.likes}</p>
          <Likes tweet={tweet} addOptimisticTweet={addOptimisticTweet} />
        </div>
      ))}
    </div>
  );
};
export default Tweets;

"use client";
import { LikeWithAuthor } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";

const Likes = ({ tweet }: { tweet: LikeWithAuthor }) => {
  /* 
    input
        - user on session click like icon each tweet content  
        - dislike  if user wants to dislike tweet 

    process 
        - store data insert db keep user_id and tweet_id
        - delete .match user_id  row condition find tweet_id === 

    output
        - show count rows 
    
    */
  const [like, setLike] = useState(false);
  const [disable, setDisable] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!tweet.user_has_liked_tweet) {
      setDisable(true);
      setTimeout(() => {
        setDisable(false);
      }, 500);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("likes")
          .insert({ tweet_id: tweet.id, user_id: user.id })
          .single();

        router.refresh();
        setLike((prev) => !prev);
      }
    } else {
      setDisable(true);
      setTimeout(() => {
        setDisable(false);
      }, 500);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase
          .from("likes")
          .delete()
          .match({ tweet_id: tweet.id, user_id: user.id })
          .single();

        router.refresh();
        setLike((prev) => !prev);
      }
    }
  };
  return (
    <div>
      {!tweet.user_has_liked_tweet ? (
        <button onClick={handleSubmit} disabled={disable}>
          <IoIosHeartEmpty />
        </button>
      ) : (
        <button onClick={handleSubmit} disabled={disable}>
          <IoMdHeart />
        </button>
      )}
    </div>
  );
};
export default Likes;

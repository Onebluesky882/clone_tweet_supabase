"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdHeart, IoIosHeartEmpty } from "react-icons/io";
const Likes = ({ tweets }: any) => {
  /* 
    input
        - user on session click like icon each tweet content  
        - dislike  if user wants to dislike tweet 

    process 
        - store data insert db keep user_id and tweet_id
        - delete .match user_id  row condition find tweet_id === 

    output
        show count rows 
    
    */
  const [like, setLike] = useState(false);
  const router = useRouter();
  const handleSubmitAdd = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("likes")
        .insert({ tweet_id: tweets.id, user_id: user.id })
        .single();
      console.log("add success", data);
      router.refresh();
    }

    setLike((prev) => !prev);
  };

  const handleSubmitRemove = async () => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("likes")
        .delete()
        .match({ tweet_id: tweets.id, user_id: user.id })
        .single();

      console.log("delete success", data);
      router.refresh();
    }

    setLike((prev) => !prev);
    router.refresh();
  };
  return (
    <div>
      {like ? (
        <IoIosHeartEmpty onClick={handleSubmitAdd} />
      ) : (
        <IoMdHeart onClick={handleSubmitRemove} />
      )}
    </div>
  );
};
export default Likes;

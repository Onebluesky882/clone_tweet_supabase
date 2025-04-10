"use client";
import { LikeWithAuthor } from "@/types/type";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Post = () => {
  const router = useRouter();
  const submitForm = async (formData: FormData) => {
    const post = String(formData.get("title"));
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("tweets").insert({ title: post, user_id: user.id });
      router.refresh();
    }
  };

  return (
    <div>
      <form action={submitForm}>
        <input name="title" className="outline-1" />
      </form>
    </div>
  );
};
export default Post;

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const NewTweet = () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const title = String(formData.get("title"));
    const supabase = createServerActionClient<Database>({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("tweets").insert({ title, user_id: user.id });
      redirect("/");
    }
  };

  return (
    <div>
      <form action={handleSubmit}>
        <input type="text" name="title" className="bg-inherit" />
      </form>
    </div>
  );
};
export default NewTweet;

"use client";

import { LikeWithAuthor } from "@/types/type";
import Likes from "./Likes";

const Tweet = ({ tweet }: { tweet: LikeWithAuthor }) => {
  return (
    <div className="flex  flex-col">
      <p>{tweet.author.name}</p>
      <p>{tweet.title}</p>

      <div className="flex align-top outline-1">
        {tweet.liked}
        <div className="flex align-top outline-1">
          {" "}
          <Likes tweet={tweet} />
        </div>
      </div>
    </div>
  );
};
export default Tweet;

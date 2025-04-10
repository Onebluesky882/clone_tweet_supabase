export type LikeWithAuthor = Tweet & {
  author: Profiles;
  likes: number;
  user_has_liked_tweet: boolean;
};

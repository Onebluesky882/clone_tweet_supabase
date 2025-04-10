export type LikeWithAuthor = Tweet & {
  author: Profiles;
  liked: number;
  user_has_liked_tweet: boolean;
};

export declare type Response = {
  subreddit: string;
  id: string;
  afterId?: string;
  previousPost?: Response;
  title: string;
  created: number;
  flair: string;
  buyUrl: string;
  postUrl: string;
};

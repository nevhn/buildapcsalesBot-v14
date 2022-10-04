import { Response } from "../types/PostResponse";
import axios from "axios";

export class Post {
  public readonly regionUrl!: string;
  public readonly baseUrl = "https://reddit.com";

  public constructor(region: string) {
    switch (region) {
      case "usa": {
        this.regionUrl =
          "https://www.reddit.com/r/buildapcsales/new.json?limit=1";
        break;
      }
      case "uk": {
        this.regionUrl =
          "https://www.reddit.com/r/buildapcsalesuk/new.json?limit=1";
        break;
      }
    }
  }

  public async getPost(): Promise<Response | void> {
    try {
      const response = await axios.get(this.regionUrl);
      const post = response.data.data.children[0].data;
      const afterId = response.data.data.after;
      const previousPost = (await this.getPreviousPost(afterId)) as Response;

      return {
        subreddit: post.subreddit,
        id: post.id,
        previousPost,
        title: post.title,
        created: post.created_utc,
        flair: post.link_flair_text,
        buyUrl: post.url_overridden_by_dest,
        postUrl: this.baseUrl + post.permalink,
      };
    } catch (err) {
      console.error(err);
    }
  }

  public async getPreviousPost(
    currentAfterId: string
  ): Promise<Response | void> {
    try {
      const response = await axios.get(
        this.regionUrl + `&after=${currentAfterId}`
      );
      const post = response.data.data.children[0].data;
      const afterId = response.data.data.after;
      // const previousPost = (await this.getPreviousPost(afterId)) as Response;

      return {
        subreddit: post.subreddit,
        id: post.id,
        afterId,
        title: post.title,
        created: post.created_utc,
        flair: post.link_flair_text,
        buyUrl: post.url_overridden_by_dest,
        postUrl: this.baseUrl + post.permalink,
      };
    } catch (err) {
      console.error(err);
    }
  }
}

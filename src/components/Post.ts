import { Response } from "../types/PostResponse";
import axios from "axios";

export class Post {
  public readonly regionUrl!: string;

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

  public async getPost(): Promise<Response> {
    const baseUrl = "https://reddit.com";
    const post = await axios.get(this.regionUrl);
    const responseData = post.data.data.children[0].data;
    /** needed to forward one page */
    // const afterId = post.data.data.after

    return {
      subreddit: responseData.subreddit,
      id: responseData.id,
      title: responseData.title,
      created: responseData.created, // Date()
      flair: responseData.link_flair_text,
      buyUrl: responseData.url_overridden_by_dest,
      postUrl: baseUrl + responseData.permalink,
    };
  }
}

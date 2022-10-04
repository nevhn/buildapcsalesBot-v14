import { Response } from "../types/PostResponse";
import { Posts } from "../types/Posts";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://reddit.com";

/** Authenticated endpoints  */
const SUBREDDIT_URL =
  "https://oauth.reddit.com/r/buildapcsales/new.json?limit=1";
const UK_SUBREDDIT_URL =
  "https://oauth.reddit.com/r/buildapcsalesuk/new.json?limit=1";

export class Subreddit {
  private token: string;
  private headers: AxiosRequestConfig;

  constructor(token: string) {
    this.token = token;
    this.headers = {
      headers: {
        Authorization: `bearer ${this.token}`,
      },
    };
  }

  async fetchPosts(): Promise<Posts> {
    const post = await this.getBuildapcsalesPost();
    const UKPost = await this.getUKBuildapcsalesPost();
    return [post, UKPost] as Posts;
  }

  private async getBuildapcsalesPost(): Promise<Response | void> {
    try {
      const response = await axios.get(SUBREDDIT_URL, this.headers);
      const post = response.data.data.children[0].data;

      return {
        subreddit: post.subreddit,
        id: post.id,
        title: post.title,
        created: post.created_utc,
        flair: post.link_flair_text,
        buyUrl: post.url_overridden_by_dest,
        postUrl: BASE_URL + post.permalink,
      };
    } catch (err) {
      console.error(err);
    }
  }

  private async getUKBuildapcsalesPost(): Promise<Response | void> {
    try {
      const response = await axios.get(UK_SUBREDDIT_URL, this.headers);
      const post = response.data.data.children[0].data;

      return {
        subreddit: post.subreddit,
        id: post.id,
        title: post.title,
        created: post.created_utc,
        flair: post.link_flair_text,
        buyUrl: post.url_overridden_by_dest,
        postUrl: BASE_URL + post.permalink,
      };
    } catch (err) {
      console.error(err);
    }
  }
  // public async getPreviousPost(
  //   currentAfterId: string
  // ): Promise<Response | void> {
  //   try {
  //     const response = await axios.get(
  //       this.regionUrl + `&after=${currentAfterId}`
  //     );
  //     const post = response.data.data.children[0].data;
  //     const afterId = response.data.data.after;
  //     // const previousPost = (await this.getPreviousPost(afterId)) as Response;

  //     return {
  //       subreddit: post.subreddit,
  //       id: post.id,
  //       afterId,
  //       title: post.title,
  //       created: post.created_utc,
  //       flair: post.link_flair_text,
  //       buyUrl: post.url_overridden_by_dest,
  //       postUrl: this.baseUrl + post.permalink,
  //     };
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
}

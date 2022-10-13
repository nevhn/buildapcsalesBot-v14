import fs from "fs-extra";
import { Client } from "discord.js";
import { Subreddit } from "../components/BuildAPCSales";
import setRedditToken from "../config/setRedditToken";
export default (client: Client) => {
  setInterval(postHandler, 1000, client); //1000
};

const postHandler = async (client: Client) => {
  try {
    const accessToken = (await setRedditToken()) as string;
    const subreddit = new Subreddit(accessToken);
    const posts = await subreddit.fetchPosts();

    let isPostNew,
      isUKPostNew = false;

    /** {currentIds : []}  */
    const file = "dist/config/reddit.json";
    const cached = await fs.readJSON(file);

    /** new post : replace with new id */
    isPostNew = posts[0].id !== cached.currentIds[0];
    isUKPostNew = posts[1].id !== cached.currentIds[1];

    if (isPostNew) {
      cached.currentIds[0] = posts[0].id;
    }

    if (isUKPostNew) {
      cached.currentIds[1] = posts[1].id;
    }

    await fs.writeJSON(file, cached);

    client.emit("post", posts[0], isPostNew);
    client.emit("post", posts[1], isUKPostNew);
  } catch (err) {
    console.error(err);
  }
};

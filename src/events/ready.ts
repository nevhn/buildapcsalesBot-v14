import setPresence from "../components/setPresence";
import ClientEvent from "../components/ClientEvent";
import { ActivityType } from "discord.js";
import config from "../config/config";
import { Post } from "../components/Post";

export default new ClientEvent("ready", async (client) => {
  // console.clear();
  console.log(
    `${client.user?.username}#${client.user?.discriminator} is online!`
  );

  new setPresence(client, [
    {
      content: `${config.prefix}help - v${config.version}`,
      type: ActivityType.Playing,
      status: "idle",
    },
    {
      content: `${client.guilds.cache.size} ${
        client.guilds.cache.size === 1 ? "server" : "servidores"
      }`,
      type: ActivityType.Watching,
      status: "idle",
    },
    {
      content: `${client.users.cache.size} ${
        client.users.cache.size === 1 ? "user" : "users"
      }`,
      type: ActivityType.Listening,
      status: "idle",
    },
  ]);

  const fetchPost = async () => {
    try {
      const post = new Post("usa");
      const response = await post.getPost();
      client.emit("post", response);
      // console.log(response.subreddit);
    } catch (err) {
      console.error(err);
    }
  };

  await fetchPost();
});

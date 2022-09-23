import setPresence from "../components/setPresence";
import ClientEvent from "../components/ClientEvent";
import { ActivityType } from "discord.js";
import config from "../config/config";
import { Post } from "../components/Post";
import cron from "node-cron";

export default new ClientEvent("ready", async (client) => {
  console.clear();
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
      console.log("...fetching posts");
      const p1 = new Post("usa");
      const p2 = new Post("uk");

      const usPost = await p1.getPost();
      const ukPost = await p2.getPost();

      client.emit("post", usPost);
      client.emit("post", ukPost);
    } catch (err) {
      console.error(err);
    }
  };

  cron.schedule("* * * * *", () => fetchPost());
  // await fetchPost();
});

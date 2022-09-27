import fs from "fs-extra";
import cron from "node-cron";
import { ActivityType } from "discord.js";
import config from "../config/config";
import setPresence from "../components/setPresence";
import ClientEvent from "../components/ClientEvent";
import { Post } from "../components/Post";

export default new ClientEvent("ready", async (client) => {
  console.clear();
  console.log(
    `🟢${client.user?.username}#${client.user?.discriminator} is online!`
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
      let newUsPost = false;
      let newUkPost = false;

      const post1 = new Post("usa");
      const post2 = new Post("uk");
      const usPost = await post1.getPost();
      const ukPost = await post2.getPost();

      const file = "dist/config/previousPostIds.json";
      const previousPosts = await fs.readJSON(file);

      if (!previousPosts.ids.length) {
        previousPosts.ids.push(usPost.id);
        previousPosts.ids.push(ukPost.id);

        await fs.writeJSON(file, previousPosts);

        console.info("\n⚙️Initialed json file");

        newUsPost = true;
        newUkPost = true;
      }

      // replace new id
      if (previousPosts.ids[0] !== usPost.id) {
        previousPosts.ids[0] = usPost.id;

        await fs.writeJSON(file, previousPosts);

        newUsPost = true;
      }

      if (previousPosts.ids[1] !== ukPost.id) {
        previousPosts.ids[1] = ukPost.id;

        await fs.writeJSON(file, previousPosts);

        newUkPost = true;
      }

      client.emit("post", usPost, newUsPost);
      client.emit("post", ukPost, newUkPost);
    } catch (err) {
      console.error(err);
    }
  };

  cron.schedule("* * * * *", async () => {
    const now = new Date().toLocaleDateString("en-us", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    console.log(`\n⏱️Hit Reddit API: ${now}`);

    await fetchPost();
  });
  // fetchPost();
});

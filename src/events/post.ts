import ClientEvent from "../components/ClientEvent";
import { TextChannel } from "discord.js";
import { Response } from "../types/PostResponse";

//@ts-ignore
export default new ClientEvent("post", async (client, post: Response) => {
  try {
    console.log(post.postUrl);
    const channel = client.channels.cache.get(
      "876960186785488937"
    ) as TextChannel;
    await channel?.send(post.postUrl);
  } catch (err) {
    console.error(err);
  }
});

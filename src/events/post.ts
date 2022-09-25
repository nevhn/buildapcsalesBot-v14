import ClientEvent from "../components/ClientEvent";
import { APIEmbedField, TextChannel } from "discord.js";
import { Response } from "../types/PostResponse";
import { EmbedBuilder } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import config from "../config/config";

export default new ClientEvent(
  //@ts-ignore
  "post",
  async (client, post: Response, newPost: Boolean) => {
    try {
      console.log(newPost);
      // const milliseconds = post.created * 1000;
      // const created = new Date(milliseconds).toString();
      // const fields: APIEmbedField[] = [{ name: post.title, value: post.postUrl }];
      let channelId = "";

      if (!newPost) return;

      if (post.subreddit === "buildapcsales")
        channelId = config.usChannelId as string;
      else channelId = config.ukChannelId as string;

      const channel = client.channels.cache.get(channelId) as TextChannel;

      const embed = new EmbedBuilder().setTitle(post.title).setColor("Random");
      const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
          new ButtonBuilder()
            .setLabel("Reddit")
            .setURL(post.postUrl)
            .setStyle(ButtonStyle.Link)
        )
        .addComponents(
          new ButtonBuilder()
            .setLabel("Buy")
            .setURL(post.buyUrl)
            .setStyle(ButtonStyle.Link)
        );

      await channel?.send({
        embeds: [embed],
        components: [row],
      });
      console.log(post);
    } catch (err) {
      console.error(err);
    }
  }
);

// const savePostId = async (file: any, id: any, path: any) => {
//   await file.ids.push(id);
//   await fs.writeFile(file);
// };

import ClientEvent from "../components/ClientEvent";
import { TextChannel } from "discord.js";
import { Response } from "../types/PostResponse";
import { EmbedBuilder } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import config from "../config/config";

export default new ClientEvent(
  //@ts-ignore
  "post",
  async (client, post: Response, newPost: Boolean) => {
    try {
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

      const message = await channel?.send({
        embeds: [embed],
        components: [row],
      });

      if (post.flair === "Expired :table_flip:" || post.flair === "Expired") {
        await message.reply("**Expired (╯°□°)╯︵ ┻━┻ **");
      }
      console.log(`\nSent link ↩️ ${channel.id}`);
      console.info("\n", post);
    } catch (err) {
      console.error(err);
    }
  }
);

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TextChannel } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import config from "../config/config";
import ClientEvent from "../components/ClientEvent";
import { Response } from "../types/PostResponse";

/**dayjs config */
dayjs.extend(utc);
dayjs.extend(timezone);
const usTz = "America/New_York";
const ukTz = "Europe/London";
const timeFormat = "ddd, D MMMM YYYY hh:mm:ss A";

export default new ClientEvent(
  //@ts-ignore
  "post",
  async (client, post: Response, isPostNew: Boolean) => {
    try {
      // console.log("isPostNew: ", isPostNew);
      console.log(
        `[${post.subreddit}] checked at ${dayjs().format(timeFormat)}`
      );

      if (!isPostNew) return;

      /**  convert post timestamp to unix time */
      const unixTimestamp = dayjs.unix(post.created);

      let timestamp;
      let channelId;

      /** setting up the post for the proper discord channel */
      if (post.subreddit === "buildapcsales") {
        channelId = config.usChannelId as string;
        /**Setting correct timezone */
        timestamp = dayjs(unixTimestamp).tz(usTz);
        timestamp = timestamp.format(timeFormat); //dd, d, M, y
      } else {
        channelId = config.ukChannelId as string;
        timestamp = dayjs(unixTimestamp).tz(ukTz);
        timestamp = timestamp.format(timeFormat);
      }

      // const fields: APIEmbedField[] = [{ name: post.title, value: post.postUrl }];

      const channel = client.channels.cache.get(channelId) as TextChannel;

      const embed = new EmbedBuilder()
        .setTitle(post.title)
        .setColor("Random")
        .setFooter({ text: `Posted on ${timestamp}` });
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
      /**If post has the expired tag(flair) reply with a message */
      if (post?.flair === "Expired :table_flip:" || post?.flair === "Expired") {
        await message.reply("**Expired (╯°□°)╯︵ ┻━┻ **");
      }
      console.log("\n", post);
      console.log(`\nSent link ↩️ ${post.subreddit} ${channelId}`);
    } catch (err) {
      console.error(err);
    }
  }
);

// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
// import { TextChannel } from "discord.js";
// import { EmbedBuilder } from "discord.js";
// import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
// import config from "../config/config";
// import ClientEvent from "../components/ClientEvent";
// import { Response } from "../types/PostResponse";

// export default new ClientEvent(
//   //@ts-ignore
//   "post",
//   async (client, post: Response, isPostNew: Boolean) => {
//     try {
//       console.log("isPostNew", isPostNew);

//       if (!isPostNew) return;

//       dayjs.extend(utc);
//       dayjs.extend(timezone);

//       let postBody = post;

//       console.log("hello", postBody);

//       const timestamp = dayjs.unix(postBody.created);
//       const usTz = "America/New_York";
//       const ukTz = "Europe/London";
//       const timeFormat = "ddd, D MMMM YYYY hh:mm:ss A";

//       let postTimestamp;

//       // console.log("timestamp", timestamp);

//       // const fields: APIEmbedField[] = [{ name: post.title, value: post.postUrl }];
//       let channelId = "";

//       if (postBody.subreddit === "buildapcsales") {
//         channelId = config.usChannelId as string;
//         postTimestamp = dayjs(timestamp).tz(usTz);
//         postTimestamp = postTimestamp.format(timeFormat); //dd, d, M, y
//         // console.log(postTimestamp);
//       } else {
//         channelId = config.ukChannelId as string;
//         postTimestamp = dayjs(timestamp).tz(ukTz);
//         postTimestamp = postTimestamp.format(timeFormat);
//       }

//       const channel = client.channels.cache.get(channelId) as TextChannel;

//       const embed = new EmbedBuilder()
//         .setTitle(postBody.title)
//         .setColor("Random")
//         .setFooter({ text: `Posted on ${postTimestamp}` });
//       const row = new ActionRowBuilder<ButtonBuilder>()
//         .addComponents(
//           new ButtonBuilder()
//             .setLabel("Reddit")
//             .setURL(postBody.postUrl)
//             .setStyle(ButtonStyle.Link)
//         )
//         .addComponents(
//           new ButtonBuilder()
//             .setLabel("Buy")
//             .setURL(postBody.buyUrl)
//             .setStyle(ButtonStyle.Link)
//         );

//       const message = await channel?.send({
//         embeds: [embed],
//         components: [row],
//       });
//       console.log("postBody", postBody);
//       if (
//         postBody?.flair === "Expired :table_flip:" ||
//         postBody?.flair === "Expired"
//       ) {
//         await message.reply("**Expired (╯°□°)╯︵ ┻━┻ **");
//       }

//       console.log(`\nSent link ↩️ ${channel.id}`);
//       // console.info("\n", post);
//     } catch (err) {
//       console.error(err);
//     }
//   }
// );

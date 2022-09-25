import { CommandBuilder } from "../../../components/CommandBuilder";
import { TextChannel, BaseGuild } from "discord.js";
export default new CommandBuilder({
  data: {
    name: "clear",
    alias: ["c"],
    description: "Clear messages",
  },
  async run(client, message, args) {
    try {
      const channelId = message.channelId;
      const channel = client.channels.cache.get(channelId);
      //   console.log(channel);

      const messages = await channel.messs(true);
      console.log(messages);

      //   channel.bulkDelete(10, true);
    } catch (err) {
      console.log(err);
      //   @ts-ignore
      await message.channel.send({ content: err.message });
    }
  },
});

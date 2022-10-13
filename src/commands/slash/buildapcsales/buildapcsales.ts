import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("r")
    .setDescription("Returns the link to the buildapcsales subreddit "),
  async run(client, int) {
    try {
      await int.deferReply();
      await int.editReply({
        content: `https://reddit.com/r/buildapcsales`,
      });
      return;
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});

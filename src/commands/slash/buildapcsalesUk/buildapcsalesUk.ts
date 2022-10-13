import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("rk")
    .setDescription("Returns the link to the buildapcsalesUK subreddit "),
  async run(client, int) {
    try {
      await int.deferReply();
      await int.editReply({
        content: `https://reddit.com/r/buildapcsalesuk`,
      });
      return;
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});

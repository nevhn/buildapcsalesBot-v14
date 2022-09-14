import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Repeat user message")
    .addStringOption((option) =>
      option
        .setName("content")
        .setDescription("Content you want to echo.")
        .setRequired(true)
    ),
  async run(client, int) {
    try {
      const txt = int.options.get("content");

      await int.reply({
        content: "Message sent",
        ephemeral: true,
      });
      await int.channel?.send({ content: `${txt?.value}` });
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});

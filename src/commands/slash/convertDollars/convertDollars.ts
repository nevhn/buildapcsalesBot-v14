import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("cd")
    .setDescription("convert usd to pounds")
    .addIntegerOption((option) =>
      option
        .setName("usd")
        .setDescription("enter freedom dollars")
        .setRequired(true)
    ),
  async run(client, int) {
    try {
      const input = int.options.get("usd")?.value as number;

      if (input <= 0)
        await int.reply({ content: "Enter a value greater then zero." });

      const conversion = (input / 1.07793).toFixed(2);

      return await int.reply(`£ ${conversion}`);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});

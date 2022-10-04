import { SlashCommandBuilder } from "discord.js";
import { SlashBuilder } from "../../../components/CommandBuilder";

export default new SlashBuilder({
  data: new SlashCommandBuilder()
    .setName("cp")
    .setDescription("convert pounds to dollars")
    .addIntegerOption((option) =>
      option
        .setName("pounds")
        .setDescription("enter bruv pounds")
        .setRequired(true)
    ),
  async run(client, int) {
    try {
      const input = int.options.get("pounds")?.value as number;

      if (input <= 0)
        await int.reply({ content: "Enter a value greater then zero." });

      const conversion = (input / 0.927782).toFixed(2);

      return await int.reply(`$ ${conversion}`);
    } catch (err) {
      console.log(err);
      // @ts-ignore
      await int.reply({ content: err.message });
    }
  },
});

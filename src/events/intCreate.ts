import ClientEvent from "../components/ClientEvent";
import { slashes } from "../index";
import { SlashCmd } from "../types/SlashStructure";

export default new ClientEvent("interactionCreate", async (client, int) => {
  if (!int.isChatInputCommand()) return;

  //@ts-ignore
  const command: SlashCmd = slashes.get(int.commandName);

  try {
    if (!command) {
      await int.channel?.sendTyping();
      return await int.reply({
        content: "An error has ocurred",
        ephemeral: true,
      });
    }

    await int.channel?.sendTyping();
    await command.run(client, int);
    console.log(
      `\n${int.user.username}#${int.user?.discriminator} used the ${int.commandName} slash command`
    );
  } catch (err) {
    console.error(err);

    await int.channel?.sendTyping();
    await int.reply({
      content: "There was an error while executing this command ⚠ ",
      ephemeral: true,
    });
  }
});

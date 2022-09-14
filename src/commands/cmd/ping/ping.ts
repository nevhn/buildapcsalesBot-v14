import { CommandBuilder } from "../../../components/CommandBuilder";

export default new CommandBuilder({
  data: {
    name: "ping",
    alias: [],
    description: "Send a ping request.",
  },
  async run(client, message, args) {
    try {
      let msg = await message.reply({ content: "Pong!" });
      await msg.reply({
        content: `Latency: ${client.ws.ping}ms\nBot Latency: ${
          Date.now() - message.createdTimestamp
        }ms`,
      });
    } catch (err) {
      console.log(err);
      //   @ts-ignore
      await message.channel.send({ content: err.message });
    }
  },
});

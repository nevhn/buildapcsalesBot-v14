import { CommandBuilder } from "../../../components/CommandBuilder";

export default new CommandBuilder({
  data: {
    name: "ping",
    alias: ["p"],
    description: "Send a ping request.",
  },
  async run(client, message, args) {
    try {
      await message.reply({
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

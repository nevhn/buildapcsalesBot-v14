import { Client, Collection, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

import config from "./config/config";
import handler from "./handler/handler";
import postHandler from "./handler/postHandler";

const commands = new Collection();
const slashes = new Collection();

handler(client);
postHandler(client);

client.login(config.token);

export { commands, slashes };

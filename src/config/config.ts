import { config } from "dotenv";
import setMode from "./setMode";

config();

const { CLIENT_ID, GUILD_ID, TOKEN } = setMode("development");

export default {
  token: TOKEN,
  clientId: CLIENT_ID,
  guildId: GUILD_ID,
  prefix: "!",
  version: "1.0.0",
};

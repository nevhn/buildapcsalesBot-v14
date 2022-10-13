import { config } from "dotenv";
import setMode from "./setMode";

config();

const { CLIENT_ID, GUILD_ID, TOKEN, CHANNEL1_ID, CHANNEL2_ID } =
  setMode("production");

export default {
  token: TOKEN,
  clientId: CLIENT_ID,
  guildId: GUILD_ID,
  usChannelId: CHANNEL1_ID,
  ukChannelId: CHANNEL2_ID,
  prefix: "!",
  version: "1.0.0",
};

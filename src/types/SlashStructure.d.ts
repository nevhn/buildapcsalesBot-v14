import { SlashCommandBuilder } from "discord.js";
import { Client, CommandInteraction } from "discord.js";

declare type SlashCmd = {
  data: SlashCommandBuilder;
  run(client: Client, interaction: CommandInteraction): Promise<void>;
};

import { CommandOptions, SlashCommandOptions } from "./CommandBuilderOptions";

export class SlashBuilder {
  constructor(option: SlashCommandOptions) {
    this.data = option.data;
    this.run = option.run;
  }
  data;
  run;
}

export class CommandBuilder {
  constructor(option: CommandOptions) {
    this.data = option.data;
    this.run = option.run;
  }
  data;
  run;
}

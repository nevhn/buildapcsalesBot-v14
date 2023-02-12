# buildapcsalesBot-v14

A Discord Bot that keeps you updated with the latest deals and posts from the buildapcsales and buildapcsales UK subreddits. Written in TypeScript using the [Discord.js](https://github.com/discordjs/discord.js/tree/main/apps/website) module.

## Requirements

- [Discord.js v14](https://github.com/discordjs/discord.js/tree/main/apps/website) requires Node.js v16.9 or higher to work
- Discord Bot Token [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)
- Reddit application(client) id and secret [OAuth2](https://github.com/reddit-archive/reddit/wiki/OAuth2)

- Reddit Refresh Token [guide] (https://github.com/not-an-aardvark/reddit-oauth-helper)

## Get Started

```sh
git clone https://github.com/ExhaustCs/buildapcsalesBot-v14.git
cd buildapcsalesBot-v14
npm install
```

Scripts

- `npm install` to install dependencies
- `npm run build` to compile TypeScript
- `npm run slash` to update slash commands
- `npm start` to start the bot

After installing dependencies follow configuration instructions then run `npm run start`

## Configuration

Copy or rename .env.example to .env and fill out the values:

```env
#Discord
TOKEN=""

#REDDIT
CLIENT_ID=""
CLIENT_SECRET=""
REFRESH_TOKEN=""

```

Configure setMode.ts

- Set Discord client_id, guild_id
- Set text channels(CHANNEL1_ID(buildapcsales) CHANEL2_ID(buildapcsalesUk)

Configure config.ts

- Set `setMode()` to `production`

## Features & Commands

> Note: The default prefix is '!'

- Refreshes Reddit oauth token automatically
- Uses slash and prefix commands
- Built-in command to convert usd/pounds

## Resources

- [Discord Developer Portal](https://discord.com/developers/applications)
- [Reddit OAuth2](https://github.com/reddit-archive/reddit/wiki/OAuth2)

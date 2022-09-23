function setMode(mode: "development" | "production") {
  let TOKEN;
  let CLIENT_ID = "1008157669200252999";
  let GUILD_ID = "876957591530532864";
  let CHANNEL1_ID;
  let CHANNEL2_ID;

  if (mode === "production") {
    TOKEN = process.env.TOKEN;
  }

  if (mode === "development") {
    TOKEN = process.env.DEV_TOKEN;
    CLIENT_ID = "1008157669200252999";
    CHANNEL1_ID = "876960186785488937";
    CHANNEL2_ID = "878014127803605003";
  }

  return { TOKEN, CLIENT_ID, GUILD_ID, CHANNEL1_ID, CHANNEL2_ID };
}

export default setMode;

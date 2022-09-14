function setMode(mode: "development" | "production") {
  let TOKEN;
  let CLIENT_ID = "1008157669200252999";
  let GUILD_ID = "876957591530532864";

  if (mode === "production") {
    TOKEN = process.env.TOKEN;
  }

  if (mode === "development") {
    TOKEN = process.env.DEV_TOKEN;
    CLIENT_ID = "1008157669200252999";
  }

  return { TOKEN, CLIENT_ID, GUILD_ID };
}

export default setMode;

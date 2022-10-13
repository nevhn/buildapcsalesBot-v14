import fs from "fs-extra";
import axios from "axios";
import queryString from "query-string";
import * as dotenv from "dotenv";

dotenv.config();

const username = process.env.CLIENT_ID;
const password = process.env.CLIENT_SECRET;
const BASIC_ACCESS = Buffer.from(`${username}:${password}`).toString("base64");

/**TODO: refactor this */

export default async () => {
  try {
    let accessToken = "";
    const file = "dist/config/reddit.json";
    const data = await fs.readJSON(file);

    // no token found in json file
    if (data.token) {
      const response = await axios.get(
        "https://oauth.reddit.com/r/buildapcsales/new.json?limit=1",
        {
          headers: {
            Authorization: `bearer ${data.token}`,
          },
        }
      );

      // expired token
      if (response.status === 401) {
        console.log("\nExpired access_token... generating new token.");
        accessToken = await getAccessToken(file, data);
      } else accessToken = data.token;
    }

    //  if cached token expired: generate new token
    else {
      console.log("Generating new access_token.");
      accessToken = await getAccessToken(file, data);
    }

    return accessToken;
  } catch (err) {
    console.error(err);
  }
};

const getAccessToken = async (file: string, data: any) => {
  try {
    const options = {
      method: "POST",
      url: "https://www.reddit.com/api/v1/access_token",
      headers: {
        Authorization: `Basic ${BASIC_ACCESS}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: queryString.stringify({
        grant_type: "refresh_token",
        refresh_token: process.env.REFRESH_TOKEN,
      }),
    };

    const response = await axios.request(options);
    const { access_token } = response.data;

    data.token = access_token;

    await fs.writeJSON(file, data);

    return access_token;
  } catch (err) {
    console.error(err);
  }
};

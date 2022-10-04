// import fs from "fs-extra";
// import { Client } from "discord.js";
// // import { Post } from "../components/Post";
// import { Subreddit } from "../components/BuildAPCSales";

// export default async (client: Client) => {
//   try {
//     const subreddit = new Subreddit(process.env.ACCESS_TOKEN as string);

//     const posts = await subreddit.fetchPosts();
//     // console.log(posts);

//     // let newUsPost = false;
//     // let newUkPost = false;
//     // let isPreviousUsPost = false;
//     // let isPreviousUkPost = false;

//     // const post1 = new Post("usa");
//     // const post2 = new Post("uk");
//     // const usPost = await post1.getPost();
//     // const ukPost = await post2.getPost();
//     // const file = "dist/config/ids.json";

//     // const cached = await fs.readJSON(file);
//     console.log(cached.previousId);

//     // console.log("us post", usPost);

//     on startup
//     // if (!cached.currentIds.length) {
//       // cached.currentIds.push(usPost?.id);
//       // cached.currentIds.push(ukPost?.id);

//       // cached.previousIds.push(usPost?.previousPost?.id);
//       // cached.previousIds.push(ukPost?.previousPost?.id);

//       // await fs.writeJSON(file, cached);

//       // console.info("\n⚙️Initialed json file\n");

//       // newUsPost = true;
//       // newUkPost = true;
//     // }

//     // /** new post : replace with new id */
//     // if (cached.currentIds[0] !== usPost?.id) {
//       // cached.currentIds[0] = usPost?.id;

//       // await fs.writeJSON(file, cached);

//       // newUsPost = true;
//     // }

//     // if (cached.currentIds[1] !== ukPost?.id) {
//       // cached.currentIds[1] = ukPost?.id;

//       // await fs.writeJSON(file, cached);

//       // newUkPost = true;
//     // }

//     // /** no new post found: check if the current post previous'id matches with the cached one */
//     // if (cached.previousIds[0] !== usPost?.previousPost?.id) {
//       // cached.previousIds[0] = usPost?.previousPost?.id;

//       // await fs.writeJSON(file, cached);

//       // isPreviousUsPost = true;
//     // }

//     // if (cached.previousIds[1] !== ukPost?.previousPost?.id) {
//       // cached.previousIds[1] = ukPost?.previousPost?.id;

//       // await fs.writeJSON(file, cached);

//       // isPreviousUkPost = true;
//     // }

//     // client.emit("post", usPost, newUsPost, isPreviousUsPost);

//     // client.emit("post", ukPost, newUkPost, isPreviousUkPost);
//   } catch (err) {
//     console.error(err);
//   }
// };

// // cron.schedule("* * * * *", async () => {
//   // /**TODO:
//   //  *  replace this with date module
//   //  */
//   // const now = new Date().toLocaleDateString("en-us", {
//     // hour: "numeric",
//     // minute: "numeric",
//     // hour12: true,
//   // });

import ClientEvent from "../components/ClientEvent";

//@ts-ignore
export default new ClientEvent("post", async (client, post) => {
  try {
    console.log("post event");
  } catch (err) {
    console.error(err);
  }
});

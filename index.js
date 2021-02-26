const express = require("express");
const socketio = require("socketio");
const { DB, changeStream } = require("./src/repo");

const server = express();

server.listen("9000", async () => {
  console.log("inside the server ");
  try {
    const { db, client } = await DB();
    changeStream(db);
  } catch (error) {
    console.log("the erri", error);
    client.close();
  }
});

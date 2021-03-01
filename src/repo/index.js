const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://127.0.0.1:27017/";

const dbName = "mokshdb";

async function DB() {
  const client = new MongoClient(`http://${url}`, {
    useNewUrlParser: true,
    poolSize: 10,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(dbName);
  console.log("inside the db");
  return {
    db,
    client,
  };
}

function changeStream(db) {
  const stream = db.collection("orders").watch();
  stream.on("change", (change) => {
    console.log(change);
    if (change.operationType === "update") {
      console.log("update");
    } else if (change.operationType === "insert") {
      console.log("insertion");
    } else if (change.operationType === "delete") {
      console.log("deletion");
    }
  });
}

module.exports = {
  DB,
  changeStream,
};

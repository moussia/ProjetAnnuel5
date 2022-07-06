import { connection as _connection } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient } from "mongodb";

let connection = MongoClient;
let mongoServer = MongoMemoryServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  connection = await MongoClient.connect(mongoServer.getUri(), {});
};

const close = async () => {
  await _connection.dropDatabase();
  await _connection.close();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = _connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

export default {
  connect,
  close,
  clear,
};

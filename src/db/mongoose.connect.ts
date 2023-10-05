import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const uri = process.env.DB_CONN_STRING;
mongoose.set("strictQuery", false);
export async function connectToDbMongoose() {
  await mongoose.connect(uri);
  const connection = mongoose.connection;
  console.log(
    `Successfully connected to database: ${connection.db.databaseName}`
  );
}

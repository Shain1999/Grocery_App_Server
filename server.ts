import { categoryRouter } from "./src/controllers/categoryContoller";
import { groceryRouter } from "./src/controllers/groceryController";
import { connectToDbMongoose } from "./src/db/mongoose.connect";
import * as dotenv from "dotenv";
import { verifyAccessToken } from "./src/filters/auth.middleware";
import { authRouter } from "./src/controllers/authController";
const cookieParser = require("cookie-parser");

dotenv.config();

const express = require("express");
const cors = require("cors");
const server = express();
const PORT = process.env.PORT || 3000;
connectToDbMongoose()
  .then(() => {
    server.use(cors({ origin: "http://localhost:3000" }));
    server.use(cookieParser());
    server.use(express.json());
    server.use(verifyAccessToken);
    server.use("/auth", authRouter);
    server.use("/grocery", groceryRouter);
    server.use("/category", categoryRouter);
    server.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}`)
    );
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });

module.exports = server;

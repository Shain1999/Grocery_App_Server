"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const groceryController_1 = require("./src/controllers/groceryController");
const database_service_1 = require("./src/db/database.service");
const express = require("express");
const cors = require("cors");
const server = express();
(0, database_service_1.connectToDatabase)()
    .then(() => {
    server.use(cors({ origin: "http://localhost:3000" }));
    server.use(express.json());
    server.use("/grocery", groceryController_1.groceryRouter);
    server.listen(3001, () => console.log("Listening on http://localhost:3001"));
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
module.exports = server;
//# sourceMappingURL=server.js.map
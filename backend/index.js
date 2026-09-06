import express from "express";
import dotenv from "dotenv";
import logger from "morgan";

dotenv.config({
  path: "./config/.env",
});

const app = express();
const PORT = process.env.PORT || 3000;

import router from "./Routers/ProductRoutes.js";
import ErrorHandler from "./Utils/ErrorHandler.js";
import ConnectDB from "./Models/ConnectDB.js";
import { GenError } from "./Middlewares/GenError.js";

ConnectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger("tiny"));
app.use("/api/products", router);

// ERROR HANDLING

app.all("/{*splat}", (req, res, next) => {
  next(new ErrorHandler(`Requested Url Not Found ${req.url}`));
});

app.use(GenError);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`, 404);
});

server.on("error", (error) => {
  console.error("SERVER ERROR:", error);
});

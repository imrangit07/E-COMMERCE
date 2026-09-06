import mongoose from "mongoose";
import AsyncErrors from "../Middlewares/AsyncErrors.js";

const ConnectDB = AsyncErrors(async () => {
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

});

export default ConnectDB;
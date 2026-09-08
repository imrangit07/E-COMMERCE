import express from "express";
import { registerUser, loginUser } from "../Controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.post("/signup", registerUser);
UserRoute.post("/login", loginUser);

export default UserRoute;

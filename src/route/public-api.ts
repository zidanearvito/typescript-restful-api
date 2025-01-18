import express from "express";
import { UserController } from "../controller/user-controller";
import { AuthController } from "../controller/auth-controller";

export const publicRouter = express.Router();
publicRouter.post("/api/users", UserController.register);
publicRouter.post("/api/auth/login", AuthController.login);

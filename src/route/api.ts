import express from "express";
import { authMiddleware } from "../middleware/auth-middleware";
import { UserController } from "../controller/user-controller";
import { AuthController } from "../controller/auth-controller";
import { ContactController } from "../controller/contact-controller";

export const apiRouter = express.Router();
apiRouter.use(authMiddleware);

// user api
apiRouter.get("/api/users/current", UserController.getUser);
apiRouter.patch("/api/users/current", UserController.updateUser);
apiRouter.delete("/api/users/current", AuthController.logout);

// contact api
apiRouter.post("/api/contacts", ContactController.create)
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get)
apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update)
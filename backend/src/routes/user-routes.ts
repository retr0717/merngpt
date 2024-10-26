import { Router } from "express";
import { getAllUsers, login, logout, userSignup, verifyUser } from "../controller/user-controller.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), userSignup);
userRouter.post("/login", validate(loginValidator), login);
userRouter.get("/auth-status", verifyToken, verifyUser);
userRouter.get("/logout",verifyToken, logout);

export default userRouter;

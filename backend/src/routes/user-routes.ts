import { Router } from "express";
import { getAllUsers, login, userSignup } from "../controller/user-controller.js";
import { loginValidator, signUpValidator, validate } from "../utils/validators.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), userSignup);
userRouter.post("/login", validate(loginValidator), login);

export default userRouter;

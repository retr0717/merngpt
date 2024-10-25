import { Router } from "express";
import { getAllUsers, userSignup } from "../controller/user-controller.js";
import { signUpValidator, validate } from "../utils/validators.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signUpValidator), userSignup);

export default userRouter;

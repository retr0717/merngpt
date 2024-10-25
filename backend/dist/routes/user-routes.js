import { Router } from "express";
import { getAllUsers, userSignup } from "../controller/user-controller.js";
const userRouter = Router();
userRouter.get("/", getAllUsers);
userRouter.post("/signup", userSignup);
export default userRouter;
//# sourceMappingURL=user-routes.js.map
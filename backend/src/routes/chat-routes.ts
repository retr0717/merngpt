import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controller/chat-controller.js";

const chatRouter = Router();
chatRouter.post("/new", validate(chatCompletionValidator), verifyToken , generateChatCompletion);

export default chatRouter;

import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const deleteChats = async (req:Request, res:Response, next:NextFunction) => {
    try{
  
      const user = await User.findById(res.locals.jwtData.id);
  
      if(!user) return res.status(401).json({message : "User Not Found!"});
      if(user._id.toString() !== res.locals.jwtData.id) return res.status(401).send("Permission Denied!");

      //@ts-ignore
      user.chats = [];
      await user.save();
      return res.status(200).json({message : "OK", chats: user.chats});
  
    }catch(err){
      console.log("loginvalidator ", err);
      return res.status(200).json({message : "ERROR", err})
    }
  }

export const sendChatsToUser = async (req:Request, res:Response, next:NextFunction) => {
    try{
  
      const user = await User.findById(res.locals.jwtData.id);
  
      if(!user) return res.status(401).json({message : "User Not Found!"});
      if(user._id.toString() !== res.locals.jwtData.id) return res.status(401).send("Permission Denied!");
  
      return res.status(200).json({message : "OK", chats: user.chats});
  
    }catch(err){
      console.log("loginvalidator ", err);
      return res.status(200).json({message : "ERROR", err})
    }
  }

export const generateChatCompletion = async (req : Request, res: Response, next: NextFunction) => {
    try {
        const {message} = req.body;
        const user = await User.findById(res.locals.jwtData.id);
        if(!user) return res.status(401).json({message: "user not found or token malfunction!"});

        //grab all chats of user.
        const chats = user.chats.map(({role,content}) => ({role, content})) as ChatCompletionMessageParam[];
        chats.push({content: message, role: "user"});
        user.chats.push({content: message, role: "user"});

        //sent all chats with new one to openAI API.
        const config = configureOpenAI();
        const openai = new OpenAI(config);

        //get latest response.
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: chats,
        }); 
        
        user.chats.push(chatCompletion.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong!"})
    }
    
}
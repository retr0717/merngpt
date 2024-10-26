import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { constants } from "../utils/constant.js";

export const logout = async (req:Request, res:Response, next:NextFunction) => {
  try{

    const user = await User.findById(res.locals.jwtData.id);

    if(!user) return res.status(401).json({message : "User Not Found!"});
    if(user._id.toString() !== res.locals.jwtData.id) return res.status(401).send("Permission Denied!");

     //clear the existing token.
     res.clearCookie(constants.COOKIE_NAME,{
      domain : process.env.DOMAIN,
      httpOnly: true,
      signed: true
    });

    return res.status(200).json({message : "OK"});

  }catch(err){
    console.log("loginvalidator ", err);
    return res.status(200).json({message : "ERROR", err})
  }
}

export const verifyUser = async (req:Request, res:Response, next:NextFunction) => {
  try{

    const user = await User.findById(res.locals.jwtData.id);

    if(!user) return res.status(401).json({message : "User Not Found!"});
    if(user._id.toString() !== res.locals.jwtData.id) return res.status(401).send("Permission Denied!");

    return res.status(200).json({message : "OK", name: user.name, email: user.email});

  }catch(err){
    console.log("loginvalidator ", err);
    return res.status(200).json({message : "ERROR", err})
  }
}

export const login = async (req:Request, res:Response, next:NextFunction) => {
  try{

    console.log(req.body)
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(401).json({message : "Invalid user"});

    const isPasswordCorrect = await compare(password, user.password);
    if(!isPasswordCorrect) return res.status(403).json({message : " Invalid User Credentials"});

    //clear the existing token.
    res.clearCookie(constants.COOKIE_NAME,{
      domain : process.env.DOMAIN,
      httpOnly: true,
      signed: true
    });

    //create the token.
    const token = createToken(user._id.toString(), email, "7d");

    //cookie creation.
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(constants.COOKIE_NAME, token , {
      path : "/",
      domain : process.env.DOMAIN,
      expires,
      httpOnly: true,
      signed: true
    });

    return res.status(200).json({message : "OK", name: user.name, email: user.email});

  }catch(err){
    console.log("loginvalidator ", err);
    return res.status(200).json({message : "ERROR", err})
  }
}

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    //clear the existing token.
    res.clearCookie(constants.COOKIE_NAME,{
      domain : process.env.DOMAIN,
      httpOnly: true,
      signed: true
    });

    //create the token.
    const token = createToken(user._id.toString(), email, "7d");

    //cookie creation.
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(constants.COOKIE_NAME, token , {
      path : "/",
      domain : process.env.DOMAIN,
      expires,
      httpOnly: true,
      signed: true
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email});

  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

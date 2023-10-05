import express, { Request, Response } from "express";
import User, { IUser } from "../models/user";
import * as authLogic from "../logic/auth/logic";
import { ResponseBody } from "../models/response";
import { ResponseError } from "../models/response_error";
import { ErrorType } from "../models/server_error";

export const authRouter = express.Router();

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("login req body is ", req.body);
  //simple checker for username and password
  if (!username || !password) {
    return res.status(400).json({ message: "username or password is missing" });
  }

  try {
    const result = await authLogic.loginUser({ ...req.body });

    if (!result.validPassword) {
      return res
        .status(401)
        .json(new ResponseError(ErrorType.Unauthorize, "Unauthorized", false));
    }
    //send our cookie with the token
    res.cookie("jwt", result.token, {
      httpOnly: true,
      maxAge: result.maxAge * 1000, //convert 2h to ms; maxAge uses miliseconds
    });
    const returnObject = {
      username: result.user.username,
      role: result.user.role,
      token: result.token,
    };
    return res.status(201).json(new ResponseBody(true, returnObject, 201));
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});
authRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log("register req body is ", req.body);
  //simple checker for username and password
  if (!username || !password) {
    return res.status(400).json({ message: "username or password is missing" });
  }
  try {
    const result = await authLogic.registerUser({ ...req.body });

    if (!result.newUser) {
      return res
        .status(500)
        .json(
          new ResponseError(
            ErrorType.ServerError,
            "A problem accord in register",
            false
          )
        );
    }
    //send our cookie with the token
    res.cookie("jwt", result.token, {
      httpOnly: true,
      maxAge: result.maxAge * 1000, //convert 2h to ms; maxAge uses miliseconds
    });
    return res.status(201).json(new ResponseBody(true, result.token, 201));
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
});

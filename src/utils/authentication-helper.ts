import jwt, { Secret } from "jsonwebtoken";
import { ProcessResponse, Status, UserInterface } from "../types";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_KEY } = process.env;

export const getUserToken = (user: UserInterface) => {
  //sign = create a token
  return jwt.sign({ user }, TOKEN_KEY as Secret);
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): ProcessResponse<null> => {
  if (!req.headers.authorization) {
    res.status(401).json({ error: "Access denied, invalid token" });
    return {
      status: Status.FAIL,
      message: `Failed to verify token. Access denied, invalid token`,
    };
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, TOKEN_KEY as Secret);
    next();

    return {
      status: Status.SUCCESS,
      message: "Verified token successfully"
    }
  } catch (err) {
    res.status(401).json("Access denied, invalid token");

    return {
      status: Status.FAIL,
      message: `Failed to verify token. The error is: ${err}`,
    };
  }
};

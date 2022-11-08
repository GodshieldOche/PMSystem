import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import Organisation from "../Models/Organisation";
import User from "../Models/User";

interface UserPayload {
  _id: string;
  fullName: string;
  email: string;
  assigned: number;
  workingOn: number;
  organisations?: any[];
  createdAt: string;
  __v: number;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  let decoded: jwt.JwtPayload;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      decoded = jwt.verify(token, process.env.SECRET!) as jwt.JwtPayload;
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }

  try {
    if (!token) {
      return next();
    }
  } catch (error) {
    return next(error);
  }

  if (decoded.id) {
    User.findById(decoded.id)
      .select("-password")
      .populate({
        path: "organisations.organisationId",
        select: "name description _id members projects",
        model: Organisation,
      })
      .then((user) => {
        req.user = user;
        next();
      });
  }
};

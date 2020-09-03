import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
const fromHeaderOrQueryString = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else {
    return null;
  }
  // else if (req.query && req.query.token) return req.query.token;
};

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = fromHeaderOrQueryString(req);

  //Try to validate the token and get data

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.jwtSecret, async (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }

    req['userId'] = decoded.userId;
    const userRepository = getRepository(User);
    const user = await userRepository.findOne(decoded.userId,{select: ["id", "email", "first_name","last_name","phone_number","profile_image"]});
    req['user'] = user;
    next();
  });
  

 
};

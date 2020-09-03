import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { User } from "../entity/User";

export const get = async (req: Request, res: Response) => {
    console.log(req['userId'])
    console.log(req['user'])
    return res.json('asdf');   
}
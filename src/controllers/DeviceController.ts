import { Request, Response } from 'express';
import * as Joi from "joi";
import { getRepository } from "typeorm";
import {UserDevice} from '../entity/UserDevice';

export const create = async (req: Request, res: Response) => {
    console.log(req.body)
    const user = req['user'];
    const {error} = validateRequest(req.body);
    if (error)
        return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    const {device_id, device_name} = req.body;
    const is_user_device = await getRepository(UserDevice).findOne({
        where:{
            device_id:device_id,
            device_name:device_name,
            user:user
        }
    })
    if(is_user_device)
        return res
        .status(400)
        .json({ 
            success: false, 
            message: 'This device has already been added', 
            data: [] 
        });
    try{
        let user_device = new UserDevice();
        user_device.device_id = device_id;
        user_device.device_name = device_name;
        user_device.user = user;
        await getRepository(UserDevice).save(user_device);
        return res.status(200).json({
            success:true,
            message:'',
            data:{user_device}
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {error},
        });
    }

}

const validateRequest = (device) => {
    const schema = Joi.object({
      device_id: Joi.string().required(),
      device_name: Joi.string().required(),
    });
    return schema.validate(device);
}

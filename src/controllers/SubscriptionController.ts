import { Request, Response } from "express";
import { getRepository, MoreThan } from "typeorm";
import * as Joi from "joi";

import { Plan } from "../entity/Plan";
import { Subscription } from "../entity/Subscription";

export const get = async (req: Request, res: Response) => {

    const subscriptionRepository = getRepository(Subscription);
    const user = req['user'];
    let subscription = await subscriptionRepository.findOne({
        where:{
            user: user,
            expires_at:MoreThan(new Date())
        },
        relations:['plan']
    });
    return res.status(200).json({
        success: true,
        message: "",
        data: { subscription },
    });
}

export const create = async (req: Request, res: Response) => {
    const {error} = validateSubscription(req.body);
    if (error)
        return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    
    const {plan_id, expires_at, payment_method} = req.body;
    const user = req['user'];
    const planRepository = getRepository(Plan);
    //CHECK IF PLAN ID VLAID
    const plan = await planRepository.findOne(plan_id);
    if(!plan){
        return res
        .status(400)
        .json({ success: false, message: 'Plan is invalid', data: [] });
    }else{
        const subscriptionRepository = getRepository(Subscription);
        try{

            //CHCEK IF SUBSCRIPTION WITH SAME PLAN EXISTS 
            let existing_subscription = await subscriptionRepository.findOne({
                where:{
                    user: user,
                    plan: plan
                },
                relations:['plan']
            })
            // IF EXISTS UPDATE SUBSCRIPTION EXPIRY DATE
            if(existing_subscription){
                existing_subscription.payment_method = payment_method;
                existing_subscription.expires_at = expires_at;
                subscriptionRepository.save(existing_subscription);
                return res.status(200).json({
                    success: true,
                    message: "",
                    data: { subscription: existing_subscription },
                });
            }
            //CHECK IF SUBSCRIPTION WITH OTHER PLANS EXIST
            let previous_subscription = await subscriptionRepository.findOne({
                where:{
                    user: user,
                    expires_at:MoreThan(new Date())
                },
                relations:['plan']
            });
            // IF EXISTS EXPIRE IT AND Create New one
            if(previous_subscription){
                previous_subscription.expires_at = new Date();
                subscriptionRepository.save(previous_subscription);
            }
            // NOW CREATE NEW ONE 
            let subscription = new Subscription();
            subscription.plan = plan;
            subscription.user = user,
            subscription.expires_at = expires_at,
            subscription.payment_method = payment_method;

            await subscriptionRepository.save(subscription);

            return res.status(200).json({
                success: true,
                message: "",
                data: { subscription },
              });
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Something went wrong!",
                data: {error},
              });
        }
    }
}

const validateSubscription = (subscription) => {
    const schema = Joi.object({
      payment_method: Joi.string().valid('apple', 'google'),
      plan_id: Joi.required(),
      expires_at: Joi.date().required()
    });
    return schema.validate(subscription);
}
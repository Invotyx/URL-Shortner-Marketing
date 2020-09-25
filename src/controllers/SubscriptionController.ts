import { Request, Response } from "express";
import { getRepository, MoreThan } from "typeorm";
import * as Joi from "joi";
import * as fs from 'fs';
import { Plan } from "../entity/Plan";
import { Subscription } from "../entity/Subscription";
import * as path from 'path';


export const get = async (req: Request, res: Response) => {
    const user = req['user'];
    const subscription = await user.getCurrentSubscriptionPlan();
    return res.status(200).json({
        success: true,
        message: "",
        data: { subscription },
    });
}

export const create = async (req: Request, res: Response) => {
    //validation if free plan
    if(req.body.product_id == '1-apple-asfasdfasd'){
        const {error} = validateFreeSubscription(req.body);
        if (error)
            return res
            .status(400)
            .json({ success: false, message: error.details[0].message, data: [] });
    } else{
    //validation if not free plan
        const {error} = validateSubscription(req.body);
        if (error)
            return res
            .status(400)
            .json({ success: false, message: error.details[0].message, data: [] });
    }
    const { expires_at, payment_method, product_id} = req.body;
    const user = req['user'];
    const planRepository = getRepository(Plan);
    //CHECK IF PLAN ID VLAID
    if(payment_method == 'apple'){
        var plan = await planRepository.findOne({
            where:{
                // id:plan_id,
                apple_product_id: product_id
            }
        });
    }else if(payment_method == 'google'){
        var plan = await planRepository.findOne({
            where:{
                // id:plan_id,
                google_product_id: product_id
            }
        });
    }
    if(!plan){
        return res
        .status(400)
        .json({ success: false, message: 'Product id is invalid', data: [] });
    }else{
        const subscriptionRepository = getRepository(Subscription);
        try{
            let previous_plan = await subscriptionRepository.findOne({
                where:{
                    user:user,
                },
                order: {
                    created_at:'DESC'
                },
                relations:['plan']
            })
            // Check if previous plan is same as request plan
            // if are same then renew the plan
            if(previous_plan && previous_plan.plan == plan){
                previous_plan.payment_method = payment_method;
                previous_plan.created_at = new Date();
                previous_plan.expires_at = expires_at;
                await subscriptionRepository.save(previous_plan);
                return res.status(200).json({
                    success: true,
                    message: "",
                    data: { subscription: previous_plan },
                });
            }else{
                //If not same then expires previous and create new one
                previous_plan.expires_at = new Date();
                await subscriptionRepository.save(previous_plan);

                let new_plan = new Subscription();
                new_plan.plan = plan;
                new_plan.expires_at = expires_at,
                new_plan.payment_method=payment_method,
                new_plan.user = user;
                await subscriptionRepository.save(new_plan);
                return res.status(200).json({
                    success: true,
                    message: "",
                    data: { new_plan },
                  });
            }
            
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Something went wrong!",
                data: {error},
              });
        }
    }
}

export const android_subscription_updates = async (req: Request, res: Response) => {
    let filePath = path.join(__dirname, '..' ,'..', 'public', 'android.json');
    console.log(req.body);

    await fs.writeFile(filePath, JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.end();
    });
   
}
export const ios_subscription_updates = async (req: Request, res: Response) => {
    let filePath = path.join(__dirname, '..' ,'..', 'public', 'ios.json');
    console.log(req.body);

    await fs.writeFile(filePath, JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.end();
    });
}

const validateSubscription = (subscription) => {
    const schema = Joi.object({
      payment_method: Joi.string().valid('apple', 'google'),
      product_id: Joi.required(),
      expires_at: Joi.date().min(Date.now()).required()
    });
    return schema.validate(subscription);
}

const validateFreeSubscription = (subscription) => {
    const schema = Joi.object({
      payment_method: Joi.string().valid('apple', 'google'),
      product_id: Joi.required(),
    //   expires_at: Joi.date().min(Date.now()).required()
    });
    return schema.validate(subscription);
}
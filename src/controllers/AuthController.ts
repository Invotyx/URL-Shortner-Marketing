import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { SocialLogin } from "../entity/SocialLogin";
import { Subscription } from "../entity/Subscription";
import * as Joi from "joi";
import config from "../config/config";


export const login = async (req: Request, res: Response) => {  
  //API KEY VALIDATION
  if(!req.body.api_key || req.body.api_key !== config.apiKey)
    return res
    .status(400)
    .json({ success: false, message: "Invalid Request", data: [] });
  //Validate user
  const {social_id, provider, email, password, phone_number, first_name, last_name} = req.body
  const { error } = validateUser({social_id, provider, email, password, phone_number, first_name, last_name});
  if (error)
  return res
  .status(400)
  .json({ success: false, message: error.details[0].message, data: [] });
  
  const socialLoginRepository = getRepository(SocialLogin);
  const userRepository = getRepository(User);
   
  try{
    //Check if Social Login found 
    const social_login = await socialLoginRepository.findOne({
      where:{
        provider:req.body.provider,
        social_id:req.body.social_id
      },
      relations:['user']
    });
    if(social_login){
      const user = await userRepository.findOne(social_login.user.id,{select: ["id", "email", "first_name","last_name","phone_number","profile_image"]});
      const plan = await user.getCurrentSubscriptionPlan();
      const token = user.generateToken();
      return res.status(200).json({
        success: true,
        message: "",
        data: { token, user, subscription:plan },
      });
    }else{
    //  CREATE NEW USER
      const user = new User();        
      user.email= req.body.email,
      user.phone_number= req.body.phone_number,
      user.password= req.body.password,
      user.first_name= req.body.first_name,
      user.last_name= req.body.last_name,
      // IF Request contains password then hash it
      req.body.password && user.hashPassword()
      await userRepository.save(user);

      // CREATE SOCIAL LOGIN
      const social_login = new SocialLogin();
      social_login.provider = req.body.provider,
      social_login.social_id = req.body.social_id,
      social_login.user = user,
      await socialLoginRepository.save(social_login);

      // ASSIGN FREE SUBSCRIPTION PLAN
      const plan = await user.addFreePlan(req.body.payment_method)
      const subscriptionPlan = await user.getCurrentSubscriptionPlan()
      const token = user.generateToken();
      return res.status(200).json({
        success: true,
        message: "",
        data: { 
          token, 
          user:{
            "id":user.id,
            "email":user.email,
            "first_name":user.first_name,
            "last_name":user.last_name,
            "phone_number":user.phone_number,
            "profile_image":user.profile_image
          },
          subscription:subscriptionPlan
        },
      });
    }
  }catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      data: {error},
    });
  }
}


//Validate user 
const validateUser = (user) => {
  const schema = Joi.object({
    provider: Joi.string().required(),
    social_id: Joi.string().required(),
    email: Joi.string().min(5).max(60).email(),
    password: Joi.string().min(5).max(255),
    phone_number: Joi.string().min(5).max(15),
    first_name: Joi.string().min(5).max(60),
    last_name: Joi.string().min(5).max(60),
    payment_method: Joi.string().valid('apple', 'google'),
  });
  return schema.validate(user);
}


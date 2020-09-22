import { Request, Response } from "express";
import { getRepository, MoreThan } from "typeorm";
import * as Joi from "joi";

import { Advertisement } from "../entity/Advertisement";
import { User } from "../entity/User";
import { Campaign } from "../entity/Campaign";

interface MulterRequest extends Request {
    file: any;
}

export const create = async (req: Request , res: Response) => {
    const user = req['user'];
    const _file = ((req as MulterRequest).file);
    if(!_file){
        res.status(400).json({
            success: false,
            message:"attachment not provided",
            data:{}
        })
    }
    
    //CHECK CURRENT SUBSCRIPTION PLAN IS EXPIRED
    const currentSubscriptionPlan = await user.getCurrentSubscriptionPlan();
    if(currentSubscriptionPlan.expires_at != null && currentSubscriptionPlan.expires_at < new Date()){
        return res.status(400).json({
            success: false,
            message:"Your Subscription plan is expired. Kindly upgrade your Plan",
            data:{}
        });
    }
    const total_user_ads = await user.getCurrentSubscriptionAds(
        currentSubscriptionPlan
    );
    //CHECK IF ADS QUOTA IS OVER
    if( currentSubscriptionPlan.plan.limit <= total_user_ads.length){
        return res.status(400).json({
            success: false,
            message:"Your Subscription plan does not permit you to create more Ads. Kindly upgrade your Plan",
            data:{}
        });
    }
    // VALIDATE REQUEST
    const {error} = validateAdvertisement(req.body);
    if (error)
        return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: [] });
    
    const advertisementRepository = getRepository(Advertisement);
    const {title, description, link, display} = req.body;
    try{
    // CREATE AD

        let advertisement = new Advertisement();
        advertisement.title = title;
        advertisement.description = description;
        advertisement.attachment = _file.location;
        advertisement.link = link;
        advertisement.display = display;
        advertisement.user = user

        await advertisementRepository.save(advertisement);
        return res.status(200).send({
            success:true,
            message:'',
            data:{advertisement}
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {error},
        });
    }
}

export const update = async (req: Request, res: Response) => {

    //CHECK IF USER IS ALLOWED TO UPDATE AD

    const user = req['user']; 
    const id = req.params.id; 
    const _file = ((req as MulterRequest).file);
    const ad_exists = await getRepository(Advertisement).findOne({
        where:{
            id: id,
            user:user,
            deleted_at:null
        }
    });
    if(!ad_exists){
        return res.status(400).json({
            success:false,
            message:'Sorry Advertisement with current ID not found',
            data:{}
        })
    }
    // VALIDATE REQUEST
    const {error} = validateUpdateAdvertisement(req.body);
    if (error)
        return res
        .status(400)
        .json({ success: false, message: error.details[0].message, data: {} });
    
    const title = req.body.title || ad_exists.title;
    const description = req.body.description || ad_exists.description;
    const link = req.body.link || ad_exists.link;
    const attachment = _file ? _file.location : ad_exists.attachment;
    const display = req.body.display || ad_exists.display;
    let is_default = req.body.is_default || ad_exists.is_default;
    is_default = (is_default == '1' );
    try{
    // Update AD
        const advertisement = await getRepository(Advertisement)
        .createQueryBuilder()
        .update(Advertisement)
        .set({ title, description, attachment, link, display, is_default })
        .where("id = :id", { id })
        .execute();

        if(advertisement.affected){
            return res.status(200).send({
                success:true,
                message:'Advertisement updated successfully',
                data:{}
            })
        }else{
            return res.status(400).send({
                success:false,
                message:'You are not allowed to update this advertisement',
                data:{}
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {error},
        });
    }
}

export const get = async(req: Request, res: Response) => {
    const id = req.params.id
    const user = req['user'];
    const advertisementRepository = getRepository(Advertisement);
    const advertisement = await advertisementRepository.findOne({
        where:{
            id,
            user:user,
            deleted_at:null
        }
    });
    if(!advertisement){
        return res.status(400).json({
            success: false,
            message: "Advertisement with this id not found!",
            data: {},
        });
    }else{
        return res.status(200).json({
            success: true,
            message: "",
            data: {advertisement}
        })
    }
    
}

export const getUserAds = async(req: Request, res: Response) => {
    const user = req['user'];
    // GET USER'S CURRENT SUBSCRIPTION PLAN  
    const currentSubscriptionPlan = await user.getCurrentSubscriptionPlan();
    console.log(currentSubscriptionPlan);
    if(currentSubscriptionPlan.expires_at != null && currentSubscriptionPlan.expires_at < new Date()){
        return res.status(400).json({
            success: false,
            message:"Your Subscription plan is expired!",
            data:{}
        });
    }
    // GET ADS OF CURRENT SUBSCRIPTION PLAN
    const advertisements = await getRepository(Advertisement).find({
        where:{
            deleted_at:null,
            user:user
        },
        take:currentSubscriptionPlan.plan.limit
    });
    if(advertisements.length > 0){
        return res.status(200).json({
            success: true,
            message: "",
            data: {advertisements},
        });
    }else{
        return res.status(400).json({
            success: false,
            message: "No Ad found in current Subscription Plan",
            data: {}
        })
    }
}

export const remove = async (req: Request, res: Response) => {

    //CHECK IF USER IS ALLOWED TO CREATE AD IN CURRENT SUBSCRIPTION PLAN

    const user = req['user']; 
    const id = req.params.id; 
    const ad_exists = await getRepository(Advertisement).findOne({
        where:{
            id: id,
            user:user,
            deleted_at:null
        },
    });
    if(!ad_exists){
        return res.status(400).json({
            success:false,
            message:'Sorry Advertisement with current ID not found',
            data:{}
        })
    }
    
    try{
    // Remove AD
        const campaign = await getRepository(Campaign).findOne({
            where:{
                user:user,
                advertisement:ad_exists,
                deleted_at:null
            },
        });
        if(campaign ){
            const campaign_id = campaign.id;
            await getRepository(Campaign)
            .createQueryBuilder()
            .update(Campaign)
            .set({ deleted_at:new Date() })
            .where("id = :campaign_id", { campaign_id })
            .execute();
        }
        const advertisement = await getRepository(Advertisement)
        .createQueryBuilder()
        .update(Advertisement)
        .set({ deleted_at:new Date() })
        .where("id = :id", { id })
        .execute();

        if(advertisement.affected){
            return res.status(200).send({
                success:true,
                message:'Advertisement deleted successfully',
                data:{}
            })
        }else{
            return res.status(400).send({
                success:false,
                message:'You are not allowed to delete this advertisement',
                data:{}
            })
        }
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {error},
        });
    }
}

export const view = async(req: Request, res: Response) => {
    const id = req.params.id
    
    const advertisementRepository = getRepository(Advertisement);
    const advertisement = await advertisementRepository.findOne({
        where:{
            id,
            deleted_at:null
        },
    });
    if(!advertisement){
        return res.status(400).json({
            success: false,
            message: "Advertisement with this id not found!",
            data: {},
        });
    }else{
        try{
            
            advertisement.views++;            
            const result = await advertisementRepository.save(advertisement);
            const user = await getRepository(User).findOne({
                where:{id:result.user_id}
            })
            const subscriptionPlan = await user.getCurrentSubscriptionPlan();
            return res.status(200).send({
                success:true,
                message:'',
                data:{advertisement:result, subscription:subscriptionPlan}
            })
        }catch(error){
            return res.status(500).json({
                success: false,
                message: "Something went wrong!",
                data: {error},
            });
        }
    }
}

const validateAdvertisement = (advertisement) => {
    const schema = Joi.object({
      title: Joi.string().min(3).required(),
      description: Joi.string().min(10),
      link: Joi.string().uri().required(),
      display: Joi.string().valid('title', 'image', 'both').required(),
    });
    return schema.validate(advertisement);
}

const validateUpdateAdvertisement = (advertisement) => {
    const schema = Joi.object({
      title: Joi.string().min(3),
      description: Joi.string().min(10),
      link: Joi.string().uri(),
      is_default: Joi.valid('0','1'),
      display: Joi.string().valid('title', 'image', 'both'),
    });
    return schema.validate(advertisement);
}
  
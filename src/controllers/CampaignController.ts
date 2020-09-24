import { Request, Response } from 'express';
import { getRepository, Between } from 'typeorm';
import * as Joi from 'joi';
const urlMetadata = require('url-metadata');
var randomize = require('randomatic');
import config from '../config/config'
import { Campaign } from '../entity/Campaign';
import { CampaignView } from '../entity/CampaignView';
import { Advertisement } from '../entity/Advertisement';

export const create = async (req: Request, res: Response) => {
  const user = req['user'];
  const { error } = validateCampaign(req.body);
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: {},
    });
  if (req.body.advertisement_id) {
    var advertisement = await user.checkIfAddIsInCurrentSubscriptionPlan(
      req.body.advertisement_id,
    );
    if (!advertisement)
      return res.status(400).json({
        success: false,
        message: 'Advertisement ID is invalid',
        data: {},
      });
  }
  const url = req.body.destination_url;
  try{
      var metaData = await urlMetadata(url);
  }catch(ex){
    res.status(500).json({
        success: false,
      message: 'Destination Url is invalid!',
      data: { error },
    })
  }
  
    const { title, destination_url } = req.body;
    try {
      // CREATE Campaign

      let campaign = new Campaign();
      campaign.title = metaData.title;
      campaign.meta_title = metaData.title;
      campaign.meta_description = metaData.description;
      campaign.meta_image = metaData.image;
      campaign.internal_url = await campaign.getInternalID();
      campaign.destination_url = destination_url;
      if (req.body.advertisement_id) {
        campaign.advertisement = advertisement;
      }
      campaign.user = user;

      await getRepository(Campaign).save(campaign);
      return res.status(200).send({
        success: true,
        message: '',
        data: { link:campaign },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        data: { error },
      });
    }
  
};

export const update = async (req: Request, res: Response) => {
  const user = req['user'];
  const campaignRepository = getRepository(Campaign);

  const campaign = await campaignRepository.findOne({
    where: {
      id: req.params.id,
      user: user,
      deleted_at: null,
    },
  });
  if (!campaign) {
    return res.status(400).json({
      success: false,
      message: 'Link with current ID not found',
      data: {},
    });
  }
  // VALIDATE REQUEST
  const { error } = validateUpdateCampaign(req.body);
  if (error)
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message, data: {} });
  if (req.body.advertisement_id) {
    var advertisement = await user.checkIfAddIsInCurrentSubscriptionPlan(
      req.body.advertisement_id,
    );
    if (!advertisement)
      return res.status(400).json({
        success: false,
        message: 'Advertisement not found!',
        data: {},
      });
  }
  if (req.body.destination_url) {
    const url = req.body.destination_url;
    var metaData = await urlMetadata(url);
  }
  try {
    campaignRepository.merge(campaign, {
      ...req.body,
      title:metaData.title,
      advertisement: advertisement,
      meta_description: metaData.description,
      meta_title: metaData.title,
      meta_image: metaData.image,
    });
    const result = await campaignRepository.save(campaign);
    return res.status(200).send({
      success: true,
      message: 'Link updated successfully',
      data: { link: result },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: { error },
    });
  }
};

export const get = async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req['user'];

  const campaignRepository = getRepository(Campaign);
  const campaign = await campaignRepository.findOne({
    where: {
      id,
      user: user,
      deleted_at: null,
    },
    relations: ['advertisement'],
  });
  if (!campaign) {
    return res.status(500).json({
      success: false,
      message: 'Link with this id not found!',
      data: {},
    });
  } else {
    return res.status(500).json({
      success: true,
      message: '',
      data: { link:campaign },
    });
  }
};

export const getUserCampaigns = async (req: Request, res: Response) => {
  const user = req['user'];
  const campaignRepository = getRepository(Campaign);
  const campaigns = await campaignRepository.find({
    where: {
      user: user,
      deleted_at: null,
    },
    relations:['advertisement']
  });
  if (!campaigns) {
    return res.status(500).json({
      success: false,
      message: 'Links not found!',
      data: {},
    });
  } else {
    return res.status(200).json({
      success: true,
      message: '',
      data: { links:campaigns },
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const user = req['user'];
  const id = req.params.id;

  const campaign_exists = await getRepository(Campaign).findOne({
    where: {
      id: id,
      user: user,
      deleted_at: null,
    },
  });
  if (!campaign_exists) {
    return res.status(400).json({
      success: false,
      message: 'Sorry link with this ID not found',
      data: {},
    });
  }

  try {
    // Remove Campaign
    const campaign = await getRepository(Campaign)
      .createQueryBuilder()
      .update(Campaign)
      .set({ deleted_at: new Date() })
      .where('id = :id', { id })
      .execute();

    if (campaign.affected) {
      return res.status(200).send({
        success: true,
        message: 'link deleted successfully',
        data: {},
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'You are not allowed to delete this link',
        data: {},
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      data: { error },
    });
  }
};


export const view = async (req: Request, res: Response) => {
  const internal_url = req.params.id;

  const campaignRepository = getRepository(Campaign);
  const campaign = await campaignRepository.findOne({
    where: {
      internal_url,
      deleted_at: null,
    },
    relations: ['advertisement'],
  });
  if (!campaign) {
    res.render('pages/404',{campaign:{}});
    
  } else {
      
    if(campaign.advertisement ){
      var advertisement = await getRepository(Advertisement).findOne({
        where:{
          id:campaign.advertisement.id,
          deleted_at:null
        },
        relations:['user']
      })

      if(advertisement){
        const user = advertisement.user;
        const subscription = await user.getCurrentSubscriptionPlan();
        advertisement['subscription'] = subscription;
        advertisement.user = null;
        campaign.advertisement = advertisement;
      }else{
        campaign.advertisement = null;
      }
    }
    res.render('pages/index',{link:campaign, config:{time:config.REDIRECT_TIME,redirect:config.REDIRECT} });
  }
};

export const incrementViewCount = async (req: Request, res: Response) => {
  const campaign_id = req.params.id;
  const campaignRepository = getRepository(Campaign);
  try{
    var campaign = await campaignRepository.findOne({
      where: {
        id:campaign_id,
        deleted_at: null,
      },
      relations: ['advertisement'],
    });
    if(campaign){
      campaign.views++;
      const result = await campaignRepository.save(campaign);
      const campaign_view = new CampaignView();
      if(result.advertisement ){
        var advertisement = await getRepository(Advertisement).findOne({
          where:{
            id:result.advertisement.id,
            deleted_at:null
          },
          relations:['user']
        })
        if(advertisement){
          advertisement.views++;
          advertisement = await getRepository(Advertisement).save(advertisement);
          const user = advertisement.user;
          const subscription = await user.getCurrentSubscriptionPlan();
          advertisement['subscription'] = subscription;
          advertisement.user = null;
          result.advertisement = advertisement;

          campaign_view.advertisement = result.advertisement;
          campaign_view.campaign = campaign;
          await getRepository(CampaignView).save(campaign_view);
          return res.status(200).json({
            success:true,
            message:"View updated Successfully",
            data:{}
          })
        }
      }
    }
  }catch(error){
    return res.status(500).json({
      success:false,
      message:"Something went wrong",
      data:{}
    })
  }
}
export const getAllCampaigns = async (req: Request, res: Response) => {
  const campaignRepository = getRepository(Campaign);
  const campaigns = await campaignRepository.find({
    where: {
      deleted_at: null,
    },
  });
  if (!campaigns) {
    return res.status(400).json({
      success: false,
      message: 'links not found!',
      data: {},
    });
  } else {
    return res.status(200).json({
      success: true,
      message: '',
      data: { links:campaigns },
    });
  }
};
export const getStatistics = async(req: Request, res: Response) => {
  const { error } = validateStatsRequest(req.query);
  
  if (error)
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: {},
    });
    try{
      const campaign = await getRepository(Campaign).findOne(req.params.id);
      if(!campaign) return res.status(400).json({
        success: false,
        message: 'Campign with this id not found',
        data: {},
        });
      const campaigns = await getRepository(CampaignView).find({
        where:{
          campaign: campaign,
          created_at: Between(req.query.starts_at, req.query.ends_at),
        },
      });
      return res.status(200).json({
        success:true,
        message: "",
        data: {links:campaigns}
      })
    }catch(error){
      res.status(500).json({
        success:false,
        message: "Something went wrong",
        data: {error}
      })
    }
  
} 

const validateCampaign = (campaign) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    destination_url: Joi.string().uri().required(),
    advertisement_id: Joi.number(),
  });
  return schema.validate(campaign);
};

const validateUpdateCampaign = (campaign) => {
  const schema = Joi.object({
    title: Joi.string().min(3),
    destination_url: Joi.string().uri(),
    advertisement_id: Joi.number(),
  });
  return schema.validate(campaign);
};

const validateStatsRequest = (campaign) => {
  const schema = Joi.object({
    starts_at: Joi.date().required(),
    ends_at: Joi.date().required(),
  });
  return schema.validate(campaign);
}

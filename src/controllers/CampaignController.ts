import { Request, Response } from 'express';
import { getRepository, Between } from 'typeorm';
import * as Joi from 'joi';
const urlMetadata = require('url-metadata');
var randomize = require('randomatic');
import { Campaign } from '../entity/Campaign';
import { CampaignView } from '../entity/CampaignView';
// import { Advertisement } from '../entity/Advertisement';

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
        message: 'Advertisement not found in your current subscription plan',
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
      campaign.title = title;
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
        data: { campaign },
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
      message: 'Campaign with current ID not found',
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
        message: 'Advertisement not found in your current subscription plan',
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
      advertisement: advertisement,
      meta_description: metaData.description,
      meta_title: metaData.title,
      meta_image: metaData.image,
    });
    const result = await campaignRepository.save(campaign);
    return res.status(200).send({
      success: true,
      message: 'Campaign updated successfully',
      data: { campaign: result },
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
      message: 'Campaign with this id not found!',
      data: {},
    });
  } else {
    return res.status(500).json({
      success: true,
      message: '',
      data: { campaign },
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
      message: 'Campaigns not found!',
      data: {},
    });
  } else {
    return res.status(200).json({
      success: true,
      message: '',
      data: { campaigns },
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
      message: 'Sorry Campaign with this ID not found',
      data: {},
    });
  }

  try {
    // Remove AD
    const campaign = await getRepository(Campaign)
      .createQueryBuilder()
      .update(Campaign)
      .set({ deleted_at: new Date() })
      .where('id = :id', { id })
      .execute();

    if (campaign.affected) {
      return res.status(200).send({
        success: true,
        message: 'Campaign deleted successfully',
        data: {},
      });
    } else {
      return res.status(200).send({
        success: true,
        message: 'You are not allowed to delete this advertisement',
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
  const user = req['user'];

  const campaignRepository = getRepository(Campaign);
  const campaign = await campaignRepository.findOne({
    where: {
      internal_url,
      deleted_at: null,
    },
    relations: ['advertisement'],
  });
  if (!campaign) {
    return res.status(500).json({
      success: false,
      message: 'Campaign with this id not found!',
      data: {},
    });
  } else {
    try {
      campaign.views++;
      const result = await campaignRepository.save(campaign);
      const campaign_view = new CampaignView();
      if(campaign.advertisement){
        campaign_view.advertisement = campaign.advertisement;
      }
      campaign_view.campaign = campaign;
      await getRepository(CampaignView).save(campaign_view);
      return res.status(200).send({
        success: true,
        message: '',
        data: { campaign: result },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        data: { error },
      });
    }
  }
};

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
      message: 'Campaigns not found!',
      data: {},
    });
  } else {
    return res.status(200).json({
      success: true,
      message: '',
      data: { campaigns },
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
          created_at: Between(req.body.starts_at, req.body.ends_at),
        },
      });
      return res.status(200).json({
        success:true,
        message: "",
        data: {campaigns}
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
    title: Joi.string().min(5).required(),
    destination_url: Joi.string().uri().required(),
    advertisement_id: Joi.number(),
  });
  return schema.validate(campaign);
};

const validateUpdateCampaign = (campaign) => {
  const schema = Joi.object({
    title: Joi.string().min(5),
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

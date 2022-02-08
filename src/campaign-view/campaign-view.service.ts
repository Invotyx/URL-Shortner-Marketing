import { Injectable } from '@nestjs/common';
import { CreateCampaignViewDto } from './dto/create-campaign-view.dto';
import { UpdateCampaignViewDto } from './dto/update-campaign-view.dto';

@Injectable()
export class CampaignViewService {
  create(createCampaignViewDto: CreateCampaignViewDto) {
    return 'This action adds a new campaignView';
  }

  findAll() {
    return `This action returns all campaignView`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaignView`;
  }

  update(id: number, updateCampaignViewDto: UpdateCampaignViewDto) {
    return `This action updates a #${id} campaignView`;
  }

  remove(id: number) {
    return `This action removes a #${id} campaignView`;
  }
}

import { Module } from '@nestjs/common';
import { CampaignViewService } from './campaign-view.service';
import { CampaignViewController } from './campaign-view.controller';

@Module({
  controllers: [CampaignViewController],
  providers: [CampaignViewService]
})
export class CampaignViewModule {}

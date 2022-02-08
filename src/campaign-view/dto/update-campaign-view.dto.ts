import { PartialType } from '@nestjs/mapped-types';
import { CreateCampaignViewDto } from './create-campaign-view.dto';

export class UpdateCampaignViewDto extends PartialType(CreateCampaignViewDto) {}

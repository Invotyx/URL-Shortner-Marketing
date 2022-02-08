import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampaignViewService } from './campaign-view.service';
import { CreateCampaignViewDto } from './dto/create-campaign-view.dto';
import { UpdateCampaignViewDto } from './dto/update-campaign-view.dto';

@Controller('campaign-view')
export class CampaignViewController {
  constructor(private readonly campaignViewService: CampaignViewService) {}

  @Post()
  create(@Body() createCampaignViewDto: CreateCampaignViewDto) {
    return this.campaignViewService.create(createCampaignViewDto);
  }

  @Get()
  findAll() {
    return this.campaignViewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignViewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignViewDto: UpdateCampaignViewDto) {
    return this.campaignViewService.update(+id, updateCampaignViewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignViewService.remove(+id);
  }
}

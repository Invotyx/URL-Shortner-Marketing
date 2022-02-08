import { Test, TestingModule } from '@nestjs/testing';
import { CampaignViewController } from './campaign-view.controller';
import { CampaignViewService } from './campaign-view.service';

describe('CampaignViewController', () => {
  let controller: CampaignViewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignViewController],
      providers: [CampaignViewService],
    }).compile();

    controller = module.get<CampaignViewController>(CampaignViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

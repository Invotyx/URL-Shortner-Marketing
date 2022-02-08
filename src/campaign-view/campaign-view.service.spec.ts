import { Test, TestingModule } from '@nestjs/testing';
import { CampaignViewService } from './campaign-view.service';

describe('CampaignViewService', () => {
  let service: CampaignViewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampaignViewService],
    }).compile();

    service = module.get<CampaignViewService>(CampaignViewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

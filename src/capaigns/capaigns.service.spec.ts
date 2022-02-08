import { Test, TestingModule } from '@nestjs/testing';
import { CapaignsService } from './capaigns.service';

describe('CapaignsService', () => {
  let service: CapaignsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CapaignsService],
    }).compile();

    service = module.get<CapaignsService>(CapaignsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

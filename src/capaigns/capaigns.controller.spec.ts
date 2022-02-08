import { Test, TestingModule } from '@nestjs/testing';
import { CapaignsController } from './capaigns.controller';
import { CapaignsService } from './capaigns.service';

describe('CapaignsController', () => {
  let controller: CapaignsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CapaignsController],
      providers: [CapaignsService],
    }).compile();

    controller = module.get<CapaignsController>(CapaignsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

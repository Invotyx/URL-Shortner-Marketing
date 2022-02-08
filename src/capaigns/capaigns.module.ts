import { Module } from '@nestjs/common';
import { CapaignsService } from './capaigns.service';
import { CapaignsController } from './capaigns.controller';

@Module({
  controllers: [CapaignsController],
  providers: [CapaignsService]
})
export class CapaignsModule {}

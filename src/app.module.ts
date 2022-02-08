import { Module } from '@nestjs/common';
import { AdvertisementsModule } from './advertisements/advertisements.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CampaignViewModule } from './campaign-view/campaign-view.module';
import { CampaignModule } from './campaign/campaign.module';
import { PlanModule } from './plan/plan.module';
import { SocialLoginModule } from './social-login/social-login.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { UserDeviceModule } from './user-device/user-device.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    UserDeviceModule,
    SubscriptionModule,
    SocialLoginModule,
    CampaignModule,
    AdvertisementsModule,
    CampaignViewModule,
    PlanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

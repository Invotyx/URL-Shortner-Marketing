import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SocialLoginService } from './social-login.service';
import { CreateSocialLoginDto } from './dto/create-social-login.dto';
import { UpdateSocialLoginDto } from './dto/update-social-login.dto';

@Controller('social-login')
export class SocialLoginController {
  constructor(private readonly socialLoginService: SocialLoginService) {}

  @Post()
  create(@Body() createSocialLoginDto: CreateSocialLoginDto) {
    return this.socialLoginService.create(createSocialLoginDto);
  }

  @Get()
  findAll() {
    return this.socialLoginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialLoginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSocialLoginDto: UpdateSocialLoginDto) {
    return this.socialLoginService.update(+id, updateSocialLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialLoginService.remove(+id);
  }
}

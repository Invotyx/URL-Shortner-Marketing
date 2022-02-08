import { Injectable } from '@nestjs/common';
import { CreateSocialLoginDto } from './dto/create-social-login.dto';
import { UpdateSocialLoginDto } from './dto/update-social-login.dto';

@Injectable()
export class SocialLoginService {
  create(createSocialLoginDto: CreateSocialLoginDto) {
    return 'This action adds a new socialLogin';
  }

  findAll() {
    return `This action returns all socialLogin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialLogin`;
  }

  update(id: number, updateSocialLoginDto: UpdateSocialLoginDto) {
    return `This action updates a #${id} socialLogin`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialLogin`;
  }
}

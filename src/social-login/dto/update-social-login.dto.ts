import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialLoginDto } from './create-social-login.dto';

export class UpdateSocialLoginDto extends PartialType(CreateSocialLoginDto) {}

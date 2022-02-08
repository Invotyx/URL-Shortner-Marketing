import { PartialType } from '@nestjs/mapped-types';
import { CreateCapaignDto } from './create-capaign.dto';

export class UpdateCapaignDto extends PartialType(CreateCapaignDto) {}

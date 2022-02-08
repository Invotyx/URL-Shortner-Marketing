import { Injectable } from '@nestjs/common';
import { CreateCapaignDto } from './dto/create-capaign.dto';
import { UpdateCapaignDto } from './dto/update-capaign.dto';

@Injectable()
export class CapaignsService {
  create(createCapaignDto: CreateCapaignDto) {
    return 'This action adds a new capaign';
  }

  findAll() {
    return `This action returns all capaigns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} capaign`;
  }

  update(id: number, updateCapaignDto: UpdateCapaignDto) {
    return `This action updates a #${id} capaign`;
  }

  remove(id: number) {
    return `This action removes a #${id} capaign`;
  }
}

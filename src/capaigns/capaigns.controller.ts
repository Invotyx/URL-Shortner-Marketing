import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CapaignsService } from './capaigns.service';
import { CreateCapaignDto } from './dto/create-capaign.dto';
import { UpdateCapaignDto } from './dto/update-capaign.dto';

@Controller('capaigns')
export class CapaignsController {
  constructor(private readonly capaignsService: CapaignsService) {}

  @Post()
  create(@Body() createCapaignDto: CreateCapaignDto) {
    return this.capaignsService.create(createCapaignDto);
  }

  @Get()
  findAll() {
    return this.capaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.capaignsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCapaignDto: UpdateCapaignDto) {
    return this.capaignsService.update(+id, updateCapaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.capaignsService.remove(+id);
  }
}

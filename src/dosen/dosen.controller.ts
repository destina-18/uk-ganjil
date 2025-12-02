import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';

@Controller('dosen')
export class DosenController {
  constructor(private readonly dosenService: DosenService) {}

  @Post()
  create(@Body() createDosenDto: CreateDosenDto) {
    return this.dosenService.create(createDosenDto);
  }

  @Get()
  findAll() {
    return this.dosenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dosenService.findOne(id);
  }

  @Put(':nisd')
  update(
    @Param('nisd', ParseIntPipe) nisd: number,
    @Body() updateDosenDto: UpdateDosenDto,
  ) {
    return this.dosenService.update(nisd, updateDosenDto);
  }

  @Delete(':nisd')
  remove(@Param('nisd', ParseIntPipe) nisd: number) {
    return this.dosenService.remove(nisd);
  }
}

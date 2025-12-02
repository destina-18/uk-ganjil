import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DosenService } from './dosen.service';
import { CreateDosenDto } from './dto/create-dosen.dto';
import { UpdateDosenDto } from './dto/update-dosen.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dosen')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class DosenController {
  constructor(private readonly dosenService: DosenService) { }

  @Post()
  create(@Body() dto: CreateDosenDto) {
    return this.dosenService.create(dto);
  }

  @Get()
  findAll() {
    return this.dosenService.findAll();
  }

  @Put(':nidn')
  update(@Param('nidn', ParseIntPipe) nidn: number, @Body() dto: UpdateDosenDto) {
    return this.dosenService.update(nidn, dto);
  }

  @Delete(':nidn')
  remove(@Param('nidn', ParseIntPipe) nidn: number) {
    return this.dosenService.remove(nidn);
  }
}

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
import { PenjadwalanService } from './penjadwalan.service';
import { CreatePenjadwalanDto } from './dto/create-penjadwalan.dto';
import { UpdatePenjadwalanDto } from './dto/update-penjadwalan.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles.decorator';

@Controller('penjadwalan')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class PenjadwalanController {
    constructor(private readonly penjadwalanService: PenjadwalanService) { }

    @Post()
    create(@Body() dto: CreatePenjadwalanDto) {
        return this.penjadwalanService.create(dto);
    }

    @Get()
    findAll() {
        return this.penjadwalanService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.penjadwalanService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePenjadwalanDto) {
        return this.penjadwalanService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.penjadwalanService.remove(id);
    }
}

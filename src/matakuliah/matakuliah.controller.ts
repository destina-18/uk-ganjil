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
import { MatakuliahService } from './matakuliah.service';
import { CreateMatakuliahDto } from './dto/create-matakuliah.dto';
import { UpdateMatakuliahDto } from './dto/update-matakuliah.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles.decorator';

@Controller('matakuliah')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class MatakuliahController {
    constructor(private readonly matakuliahService: MatakuliahService) { }

    @Post()
    create(@Body() dto: CreateMatakuliahDto) {
        return this.matakuliahService.create(dto);
    }

    @Get()
    findAll() {
        return this.matakuliahService.findAll();
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMatakuliahDto) {
        return this.matakuliahService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.matakuliahService.remove(id);
    }
}

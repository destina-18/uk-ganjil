import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    UseGuards,
} from '@nestjs/common';
import { MahasiswaService } from './mahasiswa.service';
import { CreateMahasiswaDto } from './dto/create-mahasiswa.dto';
import { UpdateMahasiswaDto } from './dto/update-mahasiswa.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles.decorator';

@Controller('mahasiswa')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class MahasiswaController {
    constructor(private readonly mahasiswaService: MahasiswaService) { }

    @Post()
    create(@Body() dto: CreateMahasiswaDto) {
        return this.mahasiswaService.create(dto);
    }

    @Get()
    findAll() {
        return this.mahasiswaService.findAll();
    }

    @Put(':nim')
    update(@Param('nim') nim: string, @Body() dto: UpdateMahasiswaDto) {
        return this.mahasiswaService.update(nim, dto);
    }

    @Delete(':nim')
    remove(@Param('nim') nim: string) {
        return this.mahasiswaService.remove(nim);
    }
}

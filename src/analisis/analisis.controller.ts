import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { TopAnalisisDto } from './dto/top-analisis.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RolesGuard } from '../auth/roles-guard';
import { Roles } from '../auth/roles.decorator';

@Controller('analisis')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AnalisisController {
    constructor(private readonly analisisService: AnalisisService) { }

    @Post('top-matakuliah-dosen')
    getTopMatakuliahDosen(@Body() dto: TopAnalisisDto) {
        return this.analisisService.getTopMatakuliahDosen(dto);
    }
}

import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { KrsService } from './krs.service';
import { PilihMatakuliahDto } from './dto/pilih-matakuliah.dto';
import { LihatJadwalDto } from './dto/lihat-jadwal.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('mahasiswa')
@UseGuards(JwtAuthGuard)
export class KrsController {
    constructor(private readonly krsService: KrsService) { }

    @Post('pilih-matakuliah')
    pilihMatakuliah(@Body() dto: PilihMatakuliahDto) {
        return this.krsService.pilihMatakuliah(dto);
    }

    @Post('jadwal')
    lihatJadwal(@Body() dto: LihatJadwalDto) {
        return this.krsService.lihatJadwal(dto);
    }
}

import { Module } from '@nestjs/common';
import { MahasiswaController } from './mahasiswa.controller';
import { MahasiswaService } from './mahasiswa.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [MahasiswaController],
    providers: [MahasiswaService, PrismaService],
})
export class MahasiswaModule { }

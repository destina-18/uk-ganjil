import { Module } from '@nestjs/common';
import { MatakuliahController } from './matakuliah.controller';
import { MatakuliahService } from './matakuliah.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [MatakuliahController],
    providers: [MatakuliahService, PrismaService],
})
export class MatakuliahModule { }

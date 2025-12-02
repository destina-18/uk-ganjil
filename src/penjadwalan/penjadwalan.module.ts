import { Module } from '@nestjs/common';
import { PenjadwalanController } from './penjadwalan.controller';
import { PenjadwalanService } from './penjadwalan.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [PenjadwalanController],
    providers: [PenjadwalanService, PrismaService],
})
export class PenjadwalanModule { }

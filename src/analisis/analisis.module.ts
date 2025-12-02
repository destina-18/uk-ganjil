import { Module } from '@nestjs/common';
import { AnalisisController } from './analisis.controller';
import { AnalisisService } from './analisis.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
    controllers: [AnalisisController],
    providers: [AnalisisService, PrismaService],
})
export class AnalisisModule { }

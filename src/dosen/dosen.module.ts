import { Module } from '@nestjs/common';
import { DosenController } from './dosen.controller';
import { DosenService } from './dosen.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [DosenController],
  providers: [DosenService, PrismaService],
})
export class DosenModule { }

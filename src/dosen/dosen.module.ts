import { Module } from '@nestjs/common';
import { DosenService } from './dosen.service';
import { DosenController } from './dosen.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DosenController],
  providers: [DosenService, PrismaService],
})
export class DosenModule {}

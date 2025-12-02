import { Module } from '@nestjs/common';
import { DosenModule } from './dosen/dosen.module';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [ DosenModule, AuthModule, BcryptModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DosenModule } from './dosen/dosen.module';
import { MatakuliahModule } from './matakuliah/matakuliah.module';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { PenjadwalanModule } from './penjadwalan/penjadwalan.module';
import { KrsModule } from './krs/krs.module';
import { AnalisisModule } from './analisis/analisis.module';

@Module({
  imports: [
    AuthModule,
    DosenModule,
    MatakuliahModule,
    MahasiswaModule,
    PenjadwalanModule,
    KrsModule,
    AnalisisModule,
  ],
})
export class AppModule { }

import { IsString, IsNotEmpty } from 'class-validator';

export class LihatJadwalDto {
    @IsString()
    @IsNotEmpty()
    mahasiswa_id: string;
}

import { IsString, IsArray, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class PilihMatakuliahDto {
    @IsString()
    @IsNotEmpty()
    mahasiswa_id: string;

    @IsArray()
    @ArrayNotEmpty()
    matakuliah_ids: number[];
}

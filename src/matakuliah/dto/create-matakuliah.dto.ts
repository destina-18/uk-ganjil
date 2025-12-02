import { IsInt, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateMatakuliahDto {
    @IsInt()
    @IsNotEmpty()
    id_matakuliah: number;

    @IsString()
    @IsNotEmpty()
    nama_matakuliah: string;

    @IsInt()
    @IsNotEmpty()
    id_dosen: number;

    @IsInt()
    @Min(1)
    @Max(6)
    @IsNotEmpty()
    sks: number;
}

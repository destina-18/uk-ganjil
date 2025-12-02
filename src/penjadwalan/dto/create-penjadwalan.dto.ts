import { IsInt, IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreatePenjadwalanDto {
    @IsInt()
    @IsNotEmpty()
    id_dosen: number;

    @IsInt()
    @IsNotEmpty()
    id_matakuliah: number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^(Senin|Selasa|Rabu|Kamis|Jumat|Sabtu|Minggu),\s*\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/, {
        message: 'Format jadwal harus: "Hari, HH:MM - HH:MM"',
    })
    jadwal: string;
}

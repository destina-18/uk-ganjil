import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateMahasiswaDto {
    @IsString()
    @IsNotEmpty()
    nim: string;

    @IsString()
    @IsNotEmpty()
    nama_mahasiswa: string;

    @IsEnum(['L', 'P'])
    @IsNotEmpty()
    jenis_kelamin: 'L' | 'P';

    @IsString()
    @IsNotEmpty()
    jurusan: string;
}

import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateDosenDto {
  @IsInt()
  nidn: number;

  @IsString()
  @IsNotEmpty()
  nama_dosen: string;

  @IsString()
  @IsNotEmpty()
  jenis_kelamin: string;

  @IsString()
  @IsNotEmpty()
  alamat: string;
}

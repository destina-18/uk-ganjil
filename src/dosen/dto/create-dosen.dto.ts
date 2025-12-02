import { IsInt, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateDosenDto {
  @IsInt()
  @IsNotEmpty()
  nidn: number;

  @IsString()
  @IsNotEmpty()
  nama_dosen: string;

  @IsEnum(['L', 'P'])
  @IsNotEmpty()
  jenis_kelamin: 'L' | 'P';

  @IsString()
  @IsNotEmpty()
  alamat: string;
}

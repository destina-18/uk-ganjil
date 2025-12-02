import { IsString, IsInt, IsOptional } from 'class-validator';

export class TopAnalisisDto {
    @IsString()
    @IsOptional()
    tahun_ajaran?: string;

    @IsInt()
    @IsOptional()
    semester?: number;

    @IsInt()
    @IsOptional()
    limit?: number;
}

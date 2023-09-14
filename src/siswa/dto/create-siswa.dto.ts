import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class CreateSiswaDto {
    @IsNotEmpty()
    @IsString()
    nama: string;

    @IsNotEmpty()
    @IsString()
    nis: string;

    @IsNotEmpty()
    @IsNumber()
    rayon_id: number;

    @IsNotEmpty()
    @IsNumber()
    jurusan_id: number;

    @IsNotEmpty()
    @IsString()
    kelas: string;
}
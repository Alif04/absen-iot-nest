import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSiswaDto {
    @IsNotEmpty()
    @IsString()
    nama: string;

    @IsNotEmpty()
    @IsString()
    nis: string;

    @IsNotEmpty()
    @IsString()
    rayon: string;

    @IsNotEmpty()
    @IsString()
    jurusan: string;

    @IsNotEmpty()
    @IsString()
    kelas: string;
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Request } from '@nestjs/common';
import { SiswaService } from './siswa.service';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth/jwt-auth.guard';
import * as exceljs from 'exceljs'
import { PrismaService } from 'src/prisma/prisma.service';
import { Response } from 'express';
import { randomInt } from 'crypto';
import * as fs from 'fs'

@UseGuards(JwtAuthGuard)
@Controller('siswa')
export class SiswaController {
  constructor(private readonly siswaService: SiswaService,
    private readonly dbService: PrismaService) { }

  @Post('/create')
  create(@Body() createSiswaDto: CreateSiswaDto) {
    return this.siswaService.create(createSiswaDto);
  }

  @Get('/get')
  findAll(@Request() req) {
    const user_id = req.user.id
    return this.siswaService.findAll(user_id);
  }

  @Get('/get/:jurusan_id/:rayon_id/:kelas')
  findOne(@Param('jurusan_id') jurusan_id: string, @Param('kelas') kelas: string, @Param('rayon_id') rayon_id: string) {
    return this.siswaService.findOne(+jurusan_id, kelas, +rayon_id);
  }

  @Get('/export-excel')
  async excelSiswa(@Res() res: Response) {
    const data = await this.dbService.siswa.findMany()

    const workbook = new exceljs.Workbook()
    const worksheet = workbook.addWorksheet('Data Siswa')

    worksheet.columns = [
      { header: 'Nama', key: 'nama', width: 25 },
      { header: 'NIS', key: 'nis', width: 20 },
      { header: 'Rayon', key: 'rayon', width: 25 },
      { header: 'Jurusan', key: 'jurusan', width: 25 },
      { header: 'Kelas', key: 'kelas', width: 25 },
      { header: 'Jam Kehadiran', key: 'created_at', width: 25 },
    ];

    worksheet.addRows(data)
    const now = new Date()

    const tahun = now.getFullYear();
    const bulan = String(now.getMonth() + 1).padStart(2, '0');
    const tanggal = String(now.getDate()).padStart(2, '0');

    const tanggalDalamFormat = `${tahun}-${bulan}-${tanggal}`;
    const excelFileName = `datasiswa-${tanggalDalamFormat}.xlsx`;
    const excelFilePath = `./uploads/excel/${excelFileName}`;

    await workbook.xlsx.writeFile(excelFilePath);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${excelFileName}`);

    const fileStream = fs.createReadStream(excelFilePath);
    fileStream.pipe(res);
  }


  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.siswaService.remove(+id);
  }

  @Get('/get/:date')
  getByDate(@Param('date') date: string) {
    return this.siswaService.getByDate(date)
  }

}

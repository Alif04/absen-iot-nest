import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateSiswaDto } from './dto/create-siswa.dto';
import { UpdateSiswaDto } from './dto/update-siswa.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as ExcelJS from 'exceljs'
import * as fs from 'fs'
const { format } = require('date-fns');

@Injectable()
export class SiswaService {
  constructor(private readonly dbService: PrismaService) { }
  async create(createSiswaDto: CreateSiswaDto) {
    try {
      const now = new Date();
      const formattedDate = format(now, 'yyyy-MM-dd HH:mm');
      await this.dbService.siswa.create({
        data: {
          nama: createSiswaDto.nama,
          jurusan: createSiswaDto.jurusan,
          kelas: createSiswaDto.kelas,
          nis: createSiswaDto.nis,
          rayon: createSiswaDto.rayon,
          created_at: formattedDate
        }
      })

      return {
        status: HttpStatus.CREATED,
        message: 'Successfully'
      }
    } catch (err) {
      console.log(err);

      return {

        status: HttpStatus.BAD_REQUEST,
        message: 'Failed'
      }
    }
  }

  async findAll() {
    try {
      const siswa = await this.dbService.siswa.findMany()

      return {
        status: HttpStatus.OK,
        message: 'Successfully',
        data: siswa
      }
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed'
      }
    }
  }

  async findOne(jurursan: string, kelas: string, rayon: string) {
    try {
      const siswa = await this.dbService.siswa.findMany({
        where: {
          jurusan: jurursan,
          kelas: kelas,
          rayon: rayon
        }
      })

      return {
        status: HttpStatus.OK,
        message: 'Successfully',
        data: siswa
      }
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed'
      }
    }
  }

  async remove(id: number) {
    try {
      await this.dbService.siswa.delete({
        where: {
          id
        }
      })

      return {
        status: HttpStatus.OK,
        message: 'Successfully'
      }
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed'
      }
    }
  }

  // async excelSiswa(res: Response) {
  //   const data = await this.dbService.siswa.findMany()

  //   const workbook = new ExcelJS.Workbook()
  //   const worksheet = workbook.addWorksheet('Data Siswa')

  //   worksheet.columns = [
  //     { header: 'Nama', key: 'nama', width: 25 },
  //     { header: 'NIS', key: 'nis', width: 20 },
  //     { header: 'Rayon', key: 'rayon', width: 25 },
  //     { header: 'Jurusan', key: 'rayon', width: 25 },
  //     { header: 'Kelas', key: 'kelas', width: 25 },
  //     { header: 'Jam Kehadiran', key: 'created_at', width: 25 },
  //   ]

  //   worksheet.addRows(data)
  //   res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  //   res.setHeader('Content-Disposition', 'attachment; filename=siswa.xlsx');

  //   await workbook.xlsx.write(res);

  //   // Akhiri respons
  //   res.end();
  // }

  async removeOldDataAutomatically() {
    try {
      const now = new Date();
      const satuMingguYangLalu = new Date(now);
      satuMingguYangLalu.setDate(satuMingguYangLalu.getDate() - 7);

      await this.dbService.siswa.deleteMany({
        where: {
          created_at: {
            lte: satuMingguYangLalu.toISOString(),
          },
        },
      });

      return {
        status: HttpStatus.OK,
        message: 'Successfully ',
      };
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed',
      };
    }
  }
}


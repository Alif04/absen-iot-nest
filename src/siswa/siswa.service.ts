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
          jurusan: {
            connect: {
              id: createSiswaDto.jurusan_id
            }
          },
          kelas: createSiswaDto.kelas,
          nis: createSiswaDto.nis,
          created_at: formattedDate,
          rayon: {
            connect: {
              id: createSiswaDto.rayon_id
            }
          }
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

  async findAll(user_id: number) {
    try {
      const users = await this.dbService.user_rayon.findFirst({
        where: {
          users: {
            id: user_id
          }
        }
      })


      const siswa = await this.dbService.siswa.findMany({
        where: {
          rayon_id: users.rayon_id
        }
      })
      console.log(users, siswa);


      return {
        status: HttpStatus.OK,
        message: 'Successfully',
        data: siswa
      }
    } catch (err) {
      console.log(err);

      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed'
      }
    }
  }

  async findOne(jurusan_id: number, kelas: string, rayon_id: number) {
    try {
      const siswa = await this.dbService.siswa.findMany({
        where: {
          jurusan_id: jurusan_id,
          kelas: kelas,
          rayon_id: rayon_id
        },
        include: {
          jurusan: true,
          rayon: true
        }
      })



      return {
        status: HttpStatus.OK,
        message: 'Successfully',
        data: siswa
      }
    } catch (err) {
      console.log(err);

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

  async getByDate(date: string) {
    try {
      const data = await this.dbService.siswa.findMany({
        where: {
          created_at: {
            contains: date
          }

        }
      })

      return {
        status: HttpStatus.OK,
        message: 'Succesfully',
        data: data
      }
    } catch (err) {
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Failed'
      }
    }
  }
}


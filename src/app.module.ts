import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SiswaModule } from './siswa/siswa.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, SiswaModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


let exit: never
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }


  async enableShutdownHooks(app: INestApplication) {
    this.$on(exit, async () => {
      await app.close();
    });
  }
}

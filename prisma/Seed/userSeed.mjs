import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  // const user20 = await prisma.users.create({
  //   data: {
  //     username: 'Ciawi 4',
  //     password: await hash('ciawi4', 10),
  //     roles: {
  //       connect: {
  //         id: 3,
  //       },
  //     },
  //   },
  // });

  // await prisma.user_rayon.create({
  //   data: {
  //     user_id: user.id,
  //     rayon_id: 25,
  //   },
  // });

  // await prisma.role.create({
  //   data: {
  //     role_name: 'Admin',
  //   },
  // });
  // await prisma.role.create({
  //   data: {
  //     role_name: 'Tata Usaha',
  //   },
  // });
  // await prisma.role.create({
  //   data: {
  //     role_name: 'Pembimbing Rayon',
  //   },
  // });

  await prisma.jurusan.create({
    data: {
      jurusan_name: 'PPLG',
    },
  });
  await prisma.jurusan.create({
    data: {
      jurusan_name: 'TJKT',
    },
  });
  await prisma.jurusan.create({
    data: {
      jurusan_name: 'DKV',
    },
  });
  await prisma.jurusan.create({
    data: {
      jurusan_name: 'MPLB',
    },
  });
  await prisma.jurusan.create({
    data: {
      jurusan_name: 'KLN',
    },
  });
  await prisma.jurusan.create({
    data: {
      jurusan_name: 'HTL',
    },
  });
  await prisma.jurusan.create({
    data: {
      jurusan_name: 'PMN',
    },
  });
};

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

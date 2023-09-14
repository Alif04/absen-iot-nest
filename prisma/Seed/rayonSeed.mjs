import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 3',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 4',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 5',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 6',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 7',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 8',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 9',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cicurug 10',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cibedug 1',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cibedug 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cibedug 3',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cibedug 4',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 1',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 3',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 4',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 5',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 6',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Cisarua 7',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Ciawi 1',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Ciawi 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Ciawi 3',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Ciawi 4',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Ciawi 5',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Ciawi 6',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Tajur 1',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Tajur 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Tajur 3',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Tajur 4',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Tajur 5',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Tajur 6',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Sukasari 1',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Sukasari 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Wikrama 1',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Wikrama 2',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Wikrama 3',
    },
  });
  await prisma.rayon.create({
    data: {
      rayon_name: 'Wikrama 4',
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

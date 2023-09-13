import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

const main = async () => {
  await prisma.users.create({
    data: {
      username: 'Cicurug 1',
      password: await hash('cicurug1', 10),
      role: 1,
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

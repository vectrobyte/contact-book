const { faker } = require('@faker-js/faker');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const count = parseInt(process.argv[2]);

  if (isNaN(count) || count <= 0) {
    console.error('Please provide a valid positive integer as the count argument');
    process.exit(1);
  }

  console.log(`Creating ${count} contacts...`);

  for (let i = 0; i < count; i++) {
    const contact = await prisma.contact.create({
      data: {
        full_name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number('+4891#######'),
      },
    });
    console.log(`Created contact with name ${contact.full_name} and number ${contact.phone}`);
  }

  await prisma.$disconnect();
  console.log('Done');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

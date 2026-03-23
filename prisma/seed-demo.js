const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const demoHotel = await prisma.hotel.upsert({
    where: { adminEmail: "demo@ahtpulse.com" },
    update: {},
    create: {
      nombre: "Hotel Demo Pulse",
      habitaciones: 100,
      categoria: "5 Estrellas",
      adminEmail: "demo@ahtpulse.com",
      adminPassword: "demo_password_123",
    },
  });

  console.log("Demo hotel created/updated:", demoHotel.nombre);
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

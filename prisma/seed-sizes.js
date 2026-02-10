const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Sembrando tallas para cada producto...");

  const sizes = ["25", "25.5", "26", "26.5", "27", "27.5", "28", "28.5", "29"];

  const products = await prisma.product.findMany();

  for (const product of products) {
    for (const size of sizes) {
      // Stock aleatorio: 0-15 (algunas tallas agotadas)
      const stock = Math.floor(Math.random() * 16);

      await prisma.productSize.upsert({
        where: {
          productId_size: {
            productId: product.id,
            size: size,
          },
        },
        update: { stock },
        create: {
          productId: product.id,
          size: size,
          stock: stock,
        },
      });
    }
    console.log(`Tallas cargadas para: ${product.title}`);
  }

  console.log("¡Tallas sembradas exitosamente!");
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

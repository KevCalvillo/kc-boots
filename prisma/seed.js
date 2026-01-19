const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // 1. Limpiamos la consola para ver mejor
  console.log("Comenzando la siembra de datos...");

  // 2. Definimos nuestra lista de productos
  const boots = [
    {
      title: "Botas de Montaña Explorer",
      description:
        "Ideales para senderismo y terrenos difíciles. Resistentes al agua.",
      price: 120.0,
      slug: "botas-montana-explorer",
      stock: 30,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas Chelsea Urbanas",
      description:
        "Estilo elegante y minimalista para la ciudad. Cuero genuino.",
      price: 95.5,
      slug: "botas-chelsea-urbanas",
      stock: 45,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas Tácticas BlackOps",
      description: "Diseño militar ligero con suela antideslizante.",
      price: 140.0,
      slug: "botas-tacticas-blackops",
      stock: 20,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas Vaqueras Clásicas",
      description: "Artesanales con bordados detallados y tacón cubano.",
      price: 180.0,
      slug: "botas-vaqueras-clasicas",
      stock: 15,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas de Trabajo Industrial",
      description:
        "Punta de acero y protección eléctrica para máxima seguridad.",
      price: 110.0,
      slug: "botas-trabajo-industrial",
      stock: 50,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas Chukka de Gamuza",
      description:
        "Comodidad casual para el fin de semana. Suela de goma suave.",
      price: 85.0,
      slug: "botas-chukka-gamuza",
      stock: 40,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas de Invierno Ártico",
      description: "Forro térmico interior para temperaturas bajo cero.",
      price: 160.0,
      slug: "botas-invierno-artico",
      stock: 25,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas Biker de Piel",
      description: "Estilo motociclista con hebillas metálicas y cuero grueso.",
      price: 135.0,
      slug: "botas-biker-piel",
      stock: 35,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas de Lluvia Hunter",
      description: "Caucho 100% impermeable en color verde oliva.",
      price: 70.0,
      slug: "botas-lluvia-hunter",
      stock: 60,
      imageUrl: "https://placehold.co/600x400/png",
    },
    {
      title: "Botas Deportivas Trail",
      description: "Híbrido entre zapatilla de correr y bota ligera.",
      price: 105.0,
      slug: "botas-deportivas-trail",
      stock: 55,
      imageUrl: "https://placehold.co/600x400/png",
    },
  ];

  // 3. Recorremos la lista e insertamos cada bota
  for (const boot of boots) {
    const product = await prisma.product.create({
      data: {
        ...boot,
        category: {
          connectOrCreate: {
            where: { name: "Calzado" },
            create: { name: "Calzado" },
          },
        },
      },
    });
    console.log(`Creado: ${product.title}`);
  }

  console.log("¡Inventario cargado exitosamente!");
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

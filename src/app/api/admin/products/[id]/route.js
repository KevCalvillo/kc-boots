import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// Obtener producto por id
export async function GET(req, { params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      sizes: true,
    },
  });
  if (!product) {
    return NextResponse.json(
      { error: "Producto no encontrado" },
      { status: 404 },
    );
  }
  return NextResponse.json(product);
}

// Actualizar producto
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { sizes, ...productData } = body;

    // Actualizar producto y manejar tallas en una transacción
    const product = await prisma.$transaction(async (tx) => {
      // 1. Actualizar los datos del producto
      const updated = await tx.product.update({
        where: { id },
        data: productData,
      });

      // 2. Si se enviaron tallas, reemplazar las existentes
      if (sizes !== undefined) {
        // Borrar tallas existentes
        await tx.productSize.deleteMany({
          where: { productId: id },
        });

        // Crear las nuevas tallas
        if (sizes && sizes.length > 0) {
          await tx.productSize.createMany({
            data: sizes.map((s) => ({
              productId: id,
              size: s.size,
              stock: s.stock,
            })),
          });
        }
      }

      // Devolver producto con relaciones
      return tx.product.findUnique({
        where: { id },
        include: { category: true, sizes: true },
      });
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Eliminar producto
export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    // Eliminar tallas primero (por la relación), luego el producto
    await prisma.$transaction(async (tx) => {
      await tx.productSize.deleteMany({ where: { productId: id } });
      await tx.product.delete({ where: { id } });
    });

    return NextResponse.json({ message: "Producto eliminado" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

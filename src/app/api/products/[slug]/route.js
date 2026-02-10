import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";

export async function GET(request, { params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, sizes: { orderBy: { size: "asc" } } },
  });

  if (!product) {
    return NextResponse.json(
      { message: "Producto no encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json(product);
}

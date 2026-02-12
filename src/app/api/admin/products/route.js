import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Listar todos los productos con category y size

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      sizes: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(products);
}

// Crear un nuevo producto
export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      price,
      slug,
      stock,
      imageUrl,
      categoryId,
      sizes,
    } = body;
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        slug,
        stock,
        imageUrl,
        categoryId,
        sizes: sizes
          ? {
              create: sizes.map((s) => ({
                size: s.size,
                stock: s.stock,
              })),
            }
          : undefined,
      },
    });
    return NextResponse.json(newProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error al crear el producto" },
      { status: 500 },
    );
  }
}

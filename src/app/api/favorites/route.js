import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";


export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "userId es requerido" },
        { status: 400 },
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    // Retornar solo los productos
    const products = favorites.map((fav) => fav.product);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// POST: Agregar un producto a favoritos
export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, productId } = body;

    if (!userId || !productId) {
      return NextResponse.json(
        { message: "userId y productId son requeridos" },
        { status: 400 },
      );
    }

    // Verificar si ya existe
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existing) {
      return NextResponse.json(
        { message: "El producto ya está en favoritos" },
        { status: 400 },
      );
    }

    const favorite = await prisma.favorite.create({
      data: { userId, productId },
      include: { product: true },
    });

    return NextResponse.json(favorite.product);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE: Quitar un producto de favoritos
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const productId = searchParams.get("productId");

    if (!userId || !productId) {
      return NextResponse.json(
        { message: "userId y productId son requeridos" },
        { status: 400 },
      );
    }

    await prisma.favorite.delete({
      where: {
        userId_productId: { userId, productId },
      },
    });

    return NextResponse.json({ message: "Eliminado de favoritos" });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

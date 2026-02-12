import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// Obtener producto por id
export async function GET(req, { params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
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
    const product = await prisma.product.update({
      where: {
        id: id,
      },
      data: body,
    });
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}

//Eliminar producto

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 },
    );
  }
}

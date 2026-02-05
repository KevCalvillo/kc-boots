import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, total, orderItems } = body;

    const order = await prisma.order.create({
      data: {
        // campos directos de Order
        userId: userId,
        total: total,

        // relación con OrderItems
        orderItems: {
          create: orderItems,
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.log("Error en backend:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 },
    );
  }
}

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

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


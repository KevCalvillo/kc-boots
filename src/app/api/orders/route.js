import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { auth } from "@/auth";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { total, orderItems } = body;

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total: total,

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
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
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

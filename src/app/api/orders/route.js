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

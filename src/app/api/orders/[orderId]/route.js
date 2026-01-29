import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function PATCH(req, { params }) {
  const { orderId } = await params;
  const body = await req.json();
  const { status } = body;

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("Error updating order:", error);
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 },
    );
  }
}

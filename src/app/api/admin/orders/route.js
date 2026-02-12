import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      user: { select: { name: true, email: true } },
      orderItems: { include: { product: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}

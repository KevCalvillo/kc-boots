import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      createdAt: true,
      _count: {
        select: { orders: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(users);
}

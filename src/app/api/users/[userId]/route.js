import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function PATCH(req, { params }) {
  try {
    const { userId } = await params;
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        phone: body.phone,
        address: body.address,
        city: body.city,
        state: body.state,
        zip: body.zip,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        zip: true,
        role: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Error al actualizar perfil" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { auth } from "@/auth";

export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const { userId } = await params;

    // Verificar que el usuario solo pueda editar su propio perfil
    if (session.user.id !== userId) {
      return NextResponse.json({ message: "Acceso denegado" }, { status: 403 });
    }

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

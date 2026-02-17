import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { auth } from "@/auth";

export async function PATCH(req, { params }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }

  const { orderId } = await params;
  const body = await req.json();
  const { status } = body;

  // Validar status permitidos
  const allowedStatuses = ["paid", "cancelled"];
  if (!allowedStatuses.includes(status)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  try {
    // Verificar que la orden pertenece al usuario
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    if (existingOrder.userId !== session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

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

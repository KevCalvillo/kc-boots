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
    const { orderItems } = body;

    // Obtener precios reales de la base de datos
    const productIds = orderItems.map((item) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Validar que todos los productos existen
    if (products.length !== new Set(productIds).size) {
      return NextResponse.json(
        { error: "Uno o más productos no fueron encontrados" },
        { status: 400 },
      );
    }

    // Crear mapa de precios desde la DB
    const priceMap = Object.fromEntries(
      products.map((p) => [p.id, Number(p.price)]),
    );

    // Calcular total desde precios de la DB
    const total = orderItems.reduce(
      (sum, item) => sum + priceMap[item.productId] * item.quantity,
      0,
    );

    // Crear items con precios de la DB
    const itemsWithPrices = orderItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      size: item.size || null,
      price: priceMap[item.productId],
    }));

    // Transacción atómica: decrementar stock + crear orden
    const order = await prisma.$transaction(async (tx) => {
      // Decrementar stock de cada producto
      for (const item of orderItems) {
        if (item.size) {
          
          const sizeUpdate = await tx.productSize.updateMany({
            where: {
              productId: item.productId,
              size: item.size,
              stock: {
                gte: item.quantity,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })

          if (sizeUpdate.count === 0) {
            throw new Error(
              `Stock insuficiente para "${products.find(p => p.id === item.productId).title}" en talla ${item.size}`,
            );
          }

          const productUpdate = await tx.product.updateMany({
            where: {
              id: item.productId,
              stock: {
                gte: item.quantity,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })

          if (productUpdate.count === 0) {
            throw new Error(
              `Stock insuficiente para "${products.find(p => p.id === item.productId).title} en talla ${item.size}"`,
            );
          }

        } else {
          const productUpdate = await tx.product.updateMany({
            where: {
              id: item.productId,
              stock: {
                gte: item.quantity,
              },
            },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          })

          if (productUpdate.count === 0) {
            throw new Error(
              `Stock insuficiente para "${products.find(p => p.id === item.productId).title}"`,
            );
          }
        }
      }

      // Crear la orden (solo si todo el stock fue decrementado exitosamente)
      return await tx.order.create({
        data: {
          userId: session.user.id,
          total: total,
          orderItems: {
            create: itemsWithPrices,
          },
        },
      });
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.log("Error en backend:", error);

    // Diferenciar error de stock vs error genérico
    if (error.message?.includes("Stock insuficiente")) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }

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

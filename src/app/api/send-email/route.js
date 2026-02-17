import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/libs/prisma";
import { auth } from "@/auth";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }

    const body = await req.json();
    const { orderId } = body;

    // Obtener datos de la orden desde la DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: { include: { product: true } },
        user: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Orden no encontrada" },
        { status: 404 },
      );
    }

    // Verificar que la orden pertenece al usuario
    if (order.userId !== session.user.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    const email = order.user.email;
    const total = Number(order.total);

    const { data, error } = await resend.emails.send({
      from: "KC Boots <onboarding@resend.dev>",
      to: "kev322970@gmail.com",
      subject: `¡Gracias por tu compra! - Orden #${orderId.slice(0, 8)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #ffffff; padding: 40px; border-radius: 20px;">
          
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #a18046; font-size: 32px; margin: 0;">¡Gracias por tu compra!</h1>
          </div>
          
          <p style="color: #9ca3af; font-size: 16px; line-height: 1.6;">
            Tu pedido ha sido confirmado y ya se está preparando. Pronto recibirás información de seguimiento.
          </p>
          
          <div style="background-color: #1a1a1a; padding: 20px; border-radius: 12px; margin: 30px 0;">
            <p style="color: #9ca3af; font-size: 12px; text-transform: uppercase; margin: 0 0 5px 0;">Número de Orden</p>
            <p style="color: #ffffff; font-size: 18px; font-weight: bold; margin: 0;">#${orderId.slice(0, 8).toUpperCase()}</p>
          </div>
          
          <h2 style="color: #ffffff; font-size: 20px; border-bottom: 1px solid #333; padding-bottom: 10px;">Productos</h2>
          
          ${order.orderItems
            .map(
              (item) => `
            <div style="display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #333;">
              <div>
                <p style="color: #ffffff; margin: 0; font-weight: bold;">${item.product.title}</p>
                <p style="color: #9ca3af; margin: 5px 0 0 0; font-size: 14px;">Cantidad: ${item.quantity}</p>
              </div>
              <p style="color: #a18046; font-weight: bold; margin: 0;">$${(Number(item.price) * item.quantity).toLocaleString()}</p>
            </div>
          `,
            )
            .join("")}
          
          <div style="display: flex; justify-content: space-between; margin-top: 20px; padding-top: 20px; border-top: 2px solid #a18046;">
            <p style="color: #ffffff; font-size: 20px; font-weight: bold; margin: 0;">Total</p>
            <p style="color: #a18046; font-size: 24px; font-weight: bold; margin: 0;">$${total.toLocaleString()} MXN</p>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #333;">
            <p style="color: #9ca3af; font-size: 14px;">¿Tienes preguntas? Contáctanos en soporte@kcboots.com</p>
          </div>
          
        </div>
      `,
    });

    if (error) {
      console.log("Error sending email:", error);
      return NextResponse.json(
        { error: "Error sending email" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}

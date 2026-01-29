import { prisma } from "@/libs/prisma";
import OrderConfirmation from "@/components/OrderConfirmation";

export default async function OrderConfirmationPage({ params }) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  return <OrderConfirmation orderId={orderId} total={Number(order.total)} />;
}

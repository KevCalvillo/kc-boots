import { prisma } from "@/libs/prisma";

export default async function CheckoutPage({ params }) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: order.userId },
  });

  return (
    <div className="h-screen flex flex-col text-white items-center justify-center text-4xl">
      <h1>Checkout</h1>
      <div className="p-10">
        <p>id: {order.id}</p>
        <p>userId: {user.id}</p>
        <p>userName: {user.name}</p>
        <p>Total: {order.total.toString()}</p>
      </div>
      {order.orderItems.map((item) => {
        return (
          <div key={item.id} className="p-10 mb-10">
            <div>
                <img src={item.product.imageUrl} alt="" className="w-10" />
            </div>
            <p>productID: {item.productId}</p>
            <p>productName: {item.product.title}</p>
            <p>quantity: {item.quantity}</p>
            <p>price: {item.price.toString()}</p>
          </div>
        );
      })}
    </div>
  );
}

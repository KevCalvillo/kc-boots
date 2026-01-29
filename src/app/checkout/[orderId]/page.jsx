import { prisma } from "@/libs/prisma";
import CheckoutForm from "@/forms/Checkout";
import { CheckCircle, CreditCard, Truck } from "lucide-react";

export default async function CheckoutPage({ params }) {

  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: { product: true },
      },
    },
  });

  const subtotal = order.orderItems.reduce((acc, item) => {
    return acc + Number(item.price) * item.quantity;
  }, 0);

  const shippingCost = subtotal > 2500 ? 0 : 250;
  const total = subtotal + shippingCost;

  return (
    <section className="w-full min-h-screen bg-[#050505] text-white pt-32 pb-20 font-roboto">
      <div className="container mx-auto px-4 lg:px-10">
        {/* HEADER Y PROGRESS BAR */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-16 gap-10">
          <h1 className="text-6xl md:text-8xl font-rancho">
            CHECKOUT
          </h1>

          {/* Progress Bar Mejorado */}
          <div className="flex items-center gap-4 text-sm md:text-base">
            <div className="flex items-center gap-2 text-primary font-bold">
              <div className="w-8 h-8 rounded-full bg-primary text-black flex items-center justify-center">
                1
              </div>
              <span>Envío</span>
            </div>
            <div className="w-16 h-0.5 bg-stone-700"></div>
            <div className="flex items-center gap-2 text-stone-500">
              <div className="w-8 h-8 rounded-full border border-stone-600 flex items-center justify-center">
                2
              </div>
              <span>Pago</span>
            </div>
            <div className="w-16 h-0.5 bg-stone-700"></div>
            <div className="flex items-center gap-2 text-stone-500">
              <div className="w-8 h-8 rounded-full border border-stone-600 flex items-center justify-center">
                3
              </div>
              <span>Confirmación</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* COLUMNA IZQUIERDA: FORMULARIO (Ocupa 7 columnas) */}
          <div className="lg:col-span-7">
            <CheckoutForm orderId={orderId} total={total} />
          </div>

          {/* COLUMNA DERECHA: RESUMEN (Ocupa 5 columnas y es Sticky) */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-32">
            <div className="bg-[#121212] p-8 rounded-3xl border border-stone-800 shadow-2xl">
              <h2 className="font-rancho text-4xl mb-8 border-b border-stone-800 pb-4">
                Tu Pedido
              </h2>

              {/* Lista de Productos Scrollable si son muchos */}
              <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-6">
                {order.orderItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="bg-stone-800/50 p-2 rounded-xl border border-stone-700 min-w-[80px]">
                      <img
                        src={item.product.imageUrl}
                        className="w-16 h-16 object-contain"
                        alt={item.product.title}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg leading-tight">
                        {item.product.title}
                      </h3>
                      <p className="text-stone-400 text-sm mt-1">
                        Cant: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right font-mono font-bold text-lg">
                      ${Number(item.price).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desglose de Precios */}
              <div className="mt-8 border-t border-stone-800 pt-6 space-y-3 text-lg">
                <div className="flex justify-between text-stone-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Envío</span>
                  <span className={shippingCost === 0 ? "text-green-500" : ""}>
                    {shippingCost === 0 ? "GRATIS" : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-bold mt-6 pt-6 border-t border-stone-800 text-primary">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Beneficios rápidos debajo del resumen */}
            <div className="mt-6 flex justify-between text-stone-500 text-sm px-4">
              <span className="flex items-center gap-1">
                <CheckCircle size={16} /> Compra Segura
              </span>
              <span className="flex items-center gap-1">
                <Truck size={16} /> Envío Rápido
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";

const OrderConfirmation = () => {
  const { lastOrder } = useCart();

  if (!lastOrder) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">No order found</h1>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight">Order Confirmed!</h1>
      <p className="mt-2 text-muted-foreground">
        Thank you for your order. We've sent a confirmation to {lastOrder.shipping.email}.
      </p>

      <div className="mt-8 rounded-lg border p-6 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Order Number</span>
          <span className="font-mono font-semibold">{lastOrder.id}</span>
        </div>
        <div className="mt-1 flex justify-between text-sm">
          <span className="text-muted-foreground">Date</span>
          <span>{lastOrder.date}</span>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {lastOrder.items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3">
              <img src={item.product.image} alt={item.product.name} className="h-12 w-10 rounded object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${lastOrder.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    </main>
  );
};

export default OrderConfirmation;

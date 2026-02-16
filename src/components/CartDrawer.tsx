import { X, Plus, Minus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <p className="text-muted-foreground">Your cart is empty</p>
            <Button variant="outline" onClick={() => setIsOpen(false)} asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col gap-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-20 w-16 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{item.product.name}</p>
                          {(item.size || item.color) && (
                            <p className="text-xs text-muted-foreground">
                              {[item.size, item.color].filter(Boolean).join(" / ")}
                            </p>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-md border">
                          <button className="px-2 py-1" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button className="px-2 py-1" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Shipping calculated at checkout</p>
              <Separator className="my-4" />
              <Button className="w-full gap-2" asChild onClick={() => setIsOpen(false)}>
                <Link to="/checkout">
                  Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;

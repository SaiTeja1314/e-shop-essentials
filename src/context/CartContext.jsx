import React, { createContext, useContext, useState, useCallback } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);

  const addItem = useCallback((product, quantity = 1, size, color) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size && i.color === color);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size && i.color === color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity, size, color }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.product.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const placeOrder = useCallback(
    (shipping) => {
      const order = {
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        items: [...items],
        total: subtotal,
        shipping,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      setLastOrder(order);
      setItems([]);
      return order;
    },
    [items, subtotal]
  );

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, lastOrder, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

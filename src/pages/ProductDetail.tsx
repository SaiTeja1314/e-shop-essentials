import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Star, Minus, Plus, ArrowLeft } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/products">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Button variant="ghost" size="sm" className="mb-6 gap-1" asChild>
        <Link to="/products">
          <ArrowLeft className="h-4 w-4" /> Back to Shop
        </Link>
      </Button>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {product.badge && (
            <Badge className="absolute left-4 top-4" variant={product.badge === "new" ? "default" : "secondary"}>
              {product.badge === "new" ? "New" : "Best Seller"}
            </Badge>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-muted-foreground">{product.category}</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">{product.name}</h1>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-current text-foreground" />
            <span className="font-medium text-foreground">{product.rating}</span>
            <span>·</span>
            <span>{product.reviews} reviews</span>
          </div>

          <p className="mt-4 text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

          <Separator className="my-6" />

          {product.sizes && (
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <Button
                    key={s}
                    size="sm"
                    variant={selectedSize === s ? "default" : "outline"}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="mb-6">
              <p className="mb-2 text-sm font-medium">Color</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <Button
                    key={c}
                    size="sm"
                    variant={selectedColor === c ? "default" : "outline"}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-md border">
              <button className="px-3 py-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button className="px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={() => {
                addItem(product, quantity, selectedSize, selectedColor);
              }}
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;

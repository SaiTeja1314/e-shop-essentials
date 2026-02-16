import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  return (
    <div className="group relative flex flex-col">
      <Link to={`/product/${product.id}`} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <Badge
            className="absolute left-3 top-3 text-xs"
            variant={product.badge === "new" ? "default" : "secondary"}
          >
            {product.badge === "new" ? "New" : "Best Seller"}
          </Badge>
        )}
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`} className="text-sm font-medium leading-tight hover:underline">
            {product.name}
          </Link>
          <span className="text-sm font-semibold">${product.price.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-current" />
          <span>{product.rating}</span>
          <span>·</span>
          <span>{product.reviews} reviews</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="mt-2 w-full gap-2 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const Index = () => {
  const newArrivals = products.filter((p) => p.badge === "new");
  const bestSellers = products.filter((p) => p.badge === "bestseller");

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-muted/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
          <Badge variant="secondary" className="mb-4">New Collection</Badge>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Curated essentials for modern living
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Thoughtfully designed products that blend form and function. Simple, lasting, and made to be used.
          </p>
          <div className="mt-8 flex gap-3">
            <Button size="lg" asChild>
              <Link to="/products">Shop All</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products?category=Clothing">Clothing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Shop by Category</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.filter((c) => c !== "All").map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="group relative flex aspect-square items-end overflow-hidden rounded-lg bg-muted p-4"
            >
              <img
                src={products.find((p) => p.category === cat)?.image}
                alt={cat}
                width={600}
                height={700}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="relative text-lg font-semibold text-white">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">New Arrivals</h2>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link to="/products">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Best Sellers</h2>
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link to="/products">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Index;

import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { itemCount, setIsOpen } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="text-xl font-semibold tracking-tight">
          STORE
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link to="/products?category=Clothing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Clothing
          </Link>
          <Link to="/products?category=Accessories" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Accessories
          </Link>
          <Link to="/products?category=Home" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Home
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => navigate("/auth")} title="Sign in">
              <User className="h-5 w-5" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

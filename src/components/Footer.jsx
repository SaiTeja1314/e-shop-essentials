const Footer = () => (
  <footer className="border-t bg-muted/30">
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold">STORE</h3>
          <p className="mt-2 text-sm text-muted-foreground">Curated essentials for modern living.</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>Clothing</li>
            <li>Accessories</li>
            <li>Home</li>
            <li>Footwear</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Support</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>Shipping & Returns</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} STORE. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

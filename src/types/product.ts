export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  colors?: string[];
  badge?: "new" | "bestseller";
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  shipping: ShippingInfo;
  date: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

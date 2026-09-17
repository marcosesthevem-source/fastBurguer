export type Category = 'burgers' | 'acompanhamentos' | 'bebidas' | 'sobremesas';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  isHighlight?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
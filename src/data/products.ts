import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // Categoria: burgers
  {
    id: '1',
    name: 'Classic Burger',
    description: 'Pão, hambúrguer de carne bovina, queijo e molho especial.',
    price: 19.90,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop',
    isHighlight: true,
  },
  {
    id: '2',
    name: 'Cheeseburger',
    description: 'Pão brioche, hambúrguer 180g, queijo cheddar fatiado e maionese artesanal.',
    price: 24.90,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=500&auto=format&fit=crop',
    isHighlight: true,
  },
  {
    id: '3',
    name: 'Bacon Burger',
    description: 'Pão de hambúrguer, 2 carnes bovinas, fatias crocantes de bacon e queijo em dobro.',
    price: 28.90,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=500&auto=format&fit=crop',
    isHighlight: false,
  },

  // Categoria: acompanhamentos
  {
    id: '4',
    name: 'Batata Frita',
    description: 'Porção individual de batatas crocantes e douradas, temperadas com sal.',
    price: 9.90,
    category: 'acompanhamentos',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=500&auto=format&fit=crop',
    isHighlight: true,
  },
  {
    id: '5',
    name: 'Nuggets (6 un.)',
    description: '6 unidades de empanados de frango crocantes acompanhados de molho ketchup.',
    price: 11.90,
    category: 'acompanhamentos',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=500&auto=format&fit=crop',
    isHighlight: false,
  },
  {
    id: '6',
    name: 'Onion Rings Crocantes',
    description: 'Anéis de cebola empanados e fritos, servidos dourados e sequinhos.',
    price: 12.90,
    category: 'acompanhamentos',
    image: 'https://images.unsplash.com/photo-1639024471287-032f667712d5?q=80&w=500&auto=format&fit=crop',
    isHighlight: false,
  },

  // Categoria: bebidas
  {
    id: '7',
    name: 'Refrigerante 500ml',
    description: 'Garrafa de refrigerante trincando de gelada (opções no balcão).',
    price: 7.90,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop',
    isHighlight: false,
  },
  {
    id: '8',
    name: 'Milkshake Chocolate',
    description: 'Milkshake cremoso de chocolate com calda especial e chantilly.',
    price: 14.90,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=500&auto=format&fit=crop',
    isHighlight: true,
  },
  {
    id: '9',
    name: 'Suco Natural Laranja 500ml',
    description: 'Suco 100% natural de laranja espremida na hora, super refrescante.',
    price: 9.90,
    category: 'bebidas',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=500&auto=format&fit=crop',
    isHighlight: false,
  },

  // Categoria: sobremesas
  {
    id: '10',
    name: 'Sundae Chocolate',
    description: 'Sorvete cremoso de baunilha coberto com calda quente de chocolate.',
    price: 8.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500&auto=format&fit=crop',
    isHighlight: false,
  },
  {
    id: '11',
    name: 'Tortinha de Maçã',
    description: 'Massa crocante folhada recheada com maçãs caramelizadas e canela.',
    price: 7.90,
    category: 'sobremesas',
    image: 'https://images.unsplash.com/photo-1535920527002-b35e96722eb9?q=80&w=500&auto=format&fit=crop',
    isHighlight: true,
  },
];
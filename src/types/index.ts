import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';

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

export interface UserProfile {
  name: string;
  email: string;
}

// Navigation Param Lists
export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: { userName?: string } | undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Checkout: undefined;
  OrderStatus: { orderId?: string } | undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type MainTabParamList = {
  Home: { userName?: string } | undefined;
  Products: undefined;
  Profile: undefined;
};

// Typed Screen Props
export type SplashScreenProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type ProductDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'ProductDetail'>;
export type CartScreenProps = NativeStackScreenProps<RootStackParamList, 'Cart'>;
export type CheckoutScreenProps = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
export type OrderStatusScreenProps = NativeStackScreenProps<RootStackParamList, 'OrderStatus'>;
export type MainTabsScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

export type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamList, 'Login'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProductsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Products'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;
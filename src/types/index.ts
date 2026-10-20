export type UserRole = 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  address: string;
  avatar?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  price: number;
  stock: number;
  unit: string; // e.g. "kg", "ikat", "pack 500g", "buah"
  origin: string; // e.g. "Malang, Jawa Timur"
  farmer: string; // e.g. "Kelompok Tani Harapan Makmur"
  description: string;
  image: string;
  rating: number;
  soldCount: number;
  isFeatured?: boolean;
  isOrganic?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Menunggu' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  subtotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  shippingCourier: string; // "Freshora Instant (1-2 Jam)", "Same Day Segar", "Reguler Dingin"
  shippingCost: number;
  paymentMethod: string; // "QRIS Instan", "Transfer Bank BCA", "Transfer Bank Mandiri", "COD (Bayar di Tempat)"
  paymentStatus: 'Lunas' | 'Menunggu Verifikasi' | 'COD';
  status: OrderStatus;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}

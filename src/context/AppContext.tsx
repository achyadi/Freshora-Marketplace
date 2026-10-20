import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Category, Product, Order, CartItem, ToastMessage, OrderStatus } from '../types';
import { INITIAL_USERS, INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  products: Product[];
  categories: Category[];
  orders: Order[];
  cart: CartItem[];
  toasts: ToastMessage[];
  currentRoute: string;
  selectedProductId: string | null;
  lastCreatedOrderId: string | null;
  
  // Navigation
  navigate: (route: string, productId?: string | null) => void;
  
  // Authentication & Role
  login: (email: string, password?: string) => { success: boolean; message: string; role?: 'admin' | 'buyer' };
  register: (name: string, email: string, phone: string, address: string) => { success: boolean; message: string };
  logout: () => void;
  switchDemoRole: (role: 'admin' | 'buyer') => void;
  
  // Cart Actions
  addToCart: (product: Product, quantity?: number) => boolean;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  
  // Checkout & Orders
  createOrder: (orderInput: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    shippingCourier: string;
    shippingCost: number;
    paymentMethod: string;
    notes?: string;
  }) => { success: boolean; order?: Order; message?: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  cancelOrder: (orderId: string) => boolean;
  
  // Product CRUD (Admin)
  addProduct: (product: Omit<Product, 'id' | 'soldCount' | 'rating'>) => Product;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => boolean;
  
  // Category CRUD (Admin)
  addCategory: (category: Omit<Category, 'id'>) => Category;
  updateCategory: (id: string, data: Partial<Category>) => void;
  deleteCategory: (id: string) => { success: boolean; message?: string };

  // System & Toast
  addToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
  resetDemoData: () => void;
  showPresentationBanner: boolean;
  setShowPresentationBanner: (show: boolean) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'freshora_users_v1',
  PRODUCTS: 'freshora_products_v1',
  CATEGORIES: 'freshora_categories_v1',
  ORDERS: 'freshora_orders_v1',
  CART: 'freshora_cart_v1',
  CURRENT_USER: 'freshora_current_user_v1',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage or initial dataset
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USERS);
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed: Product[] = JSON.parse(saved);
      // Ensure prod-0 is removed so durian is strictly on landing page only
      const filtered = parsed.filter((p) => p.id !== 'prod-0');

      // Create a lookup for current INITIAL_PRODUCTS to sync images and ensure names/categories match
      const initialMap = new Map(INITIAL_PRODUCTS.map((p) => [p.id, p]));
      
      const synced = filtered.map((p) => {
        const init = initialMap.get(p.id);
        if (init) {
          return {
            ...p,
            name: init.name,
            image: init.image,
            categoryId: init.categoryId,
            categoryName: init.categoryName,
            origin: init.origin,
            unit: init.unit,
          };
        }
        return p;
      });

      // Seamlessly merge any missing items if older localStorage had fewer than 40 products
      const existingIds = new Set(synced.map((p) => p.id));
      const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id));
      const merged = [...synced, ...missing];

      try {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(merged));
      } catch {
        // ignore localStorage quota errors
      }
      return merged;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Budi Pratama') {
          parsed.name = 'Sumanto';
          localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return INITIAL_USERS[1];
      }
    }
    // Default demo user: Buyer (Sumanto) so the shop feels welcoming immediately
    return INITIAL_USERS[1]; 
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    return hash ? (hash.startsWith('/') ? hash : '/' + hash) : '/';
  });
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [lastCreatedOrderId, setLastCreatedOrderId] = useState<string | null>(null);

  // Toggle for top presentation banner (can be turned on/off in Pengaturan Sistem)
  const [showPresentationBanner, setShowPresentationBannerState] = useState<boolean>(() => {
    const saved = localStorage.getItem('freshora_show_rpl_banner');
    return saved !== null ? saved === 'true' : false;
  });

  const setShowPresentationBanner = (show: boolean) => {
    setShowPresentationBannerState(show);
    localStorage.setItem('freshora_show_rpl_banner', String(show));
  };

  // Dark Mode / Light Mode Theme Management
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('freshora_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('freshora_theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    addToast(next === 'dark' ? 'Mode Gelap (Dark Mode) aktif' : 'Mode Terang (Light Mode) aktif', 'info');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Handle hashchange for back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const path = hash ? (hash.startsWith('/') ? hash : '/' + hash) : '/';
      setCurrentRoute(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation helper
  const navigate = (route: string, prodId: string | null = null) => {
    setCurrentRoute(route);
    setSelectedProductId(prodId);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast feedback
  const addToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auth
  const login = (email: string, _password?: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      addToast('Akun dengan email tersebut tidak ditemukan.', 'error');
      return { success: false, message: 'Email tidak ditemukan' };
    }

    setCurrentUser(user);
    addToast(`Selamat datang kembali, ${user.name}! (${user.role === 'admin' ? 'Admin Freshora' : 'Pembeli'})`, 'success');

    if (user.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/');
    }

    return { success: true, message: 'Login berhasil', role: user.role };
  };

  const register = (name: string, email: string, phone: string, address: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      addToast('Email ini sudah terdaftar. Silakan login.', 'error');
      return { success: false, message: 'Email sudah terdaftar' };
    }

    const newUser: User = {
      id: 'user-' + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      phone: phone.trim(),
      address: address.trim(),
      role: 'buyer',
      createdAt: new Date().toISOString(),
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast(`Pendaftaran berhasil! Selamat berbelanja, ${newUser.name}.`, 'success');
    navigate('/');
    return { success: true, message: 'Registrasi berhasil' };
  };

  const logout = () => {
    const wasAdmin = currentUser?.role === 'admin';
    setCurrentUser(null);
    addToast('Anda telah keluar dari akun.', 'info');
    if (wasAdmin) {
      navigate('/admin/login');
    } else {
      navigate('/');
    }
  };

  const switchDemoRole = (role: 'admin' | 'buyer') => {
    if (role === 'admin') {
      const adminUser = users.find((u) => u.role === 'admin') || INITIAL_USERS[0];
      setCurrentUser(adminUser);
      addToast('Beralih ke akun demo: Administrator Freshora', 'success');
      navigate('/admin/dashboard');
    } else {
      const buyerUser = users.find((u) => u.role === 'buyer') || INITIAL_USERS[1];
      setCurrentUser(buyerUser);
      addToast('Beralih ke akun demo: Pembeli (Sumanto)', 'success');
      navigate('/');
    }
  };

  // Cart operations with stock validation
  const addToCart = (product: Product, quantity: number = 1): boolean => {
    // Check available stock in current products state
    const currentProduct = products.find((p) => p.id === product.id) || product;
    
    if (currentProduct.stock <= 0) {
      addToast(`Maaf, stok ${currentProduct.name} sedang habis.`, 'error');
      return false;
    }

    const existingIndex = cart.findIndex((item) => item.product.id === product.id);
    let requestedQuantity = quantity;

    if (existingIndex > -1) {
      requestedQuantity += cart[existingIndex].quantity;
    }

    if (requestedQuantity > currentProduct.stock) {
      addToast(
        `Jumlah melebihi stok yang tersedia (${currentProduct.stock} ${currentProduct.unit}).`,
        'warning'
      );
      return false;
    }

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: requestedQuantity }
            : item
        )
      );
    } else {
      setCart((prev) => [...prev, { product: currentProduct, quantity }]);
    }

    addToast(`Berhasil menambahkan ${quantity} ${currentProduct.unit} ${currentProduct.name} ke keranjang.`, 'success');
    return true;
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (quantity > product.stock) {
      addToast(`Stok maksimal untuk ${product.name} adalah ${product.stock} ${product.unit}.`, 'warning');
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      addToast(`${item.product.name} dihapus dari keranjang.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Checkout with real stock deduction and order persistence
  const createOrder = (orderInput: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    customerAddress: string;
    shippingCourier: string;
    shippingCost: number;
    paymentMethod: string;
    notes?: string;
  }) => {
    if (cart.length === 0) {
      addToast('Keranjang belanja Anda kosong!', 'error');
      return { success: false, message: 'Keranjang belanja kosong' };
    }

    // Backend-like validation: Verify stock for all items
    for (const item of cart) {
      const liveProduct = products.find((p) => p.id === item.product.id);
      if (!liveProduct || liveProduct.stock < item.quantity) {
        addToast(
          `Gagal checkout: Stok ${item.product.name} tidak mencukupi (sisa ${liveProduct ? liveProduct.stock : 0}).`,
          'error'
        );
        return { success: false, message: `Stok ${item.product.name} tidak cukup` };
      }
    }

    // Deduct stock and increment sold count
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((ci) => ci.product.id === prod.id);
        if (cartItem) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - cartItem.quantity),
            soldCount: prod.soldCount + cartItem.quantity,
          };
        }
        return prod;
      })
    );

    const now = new Date();
    const orderNumber = `FSH-${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(100 + Math.random() * 900)}`;
    const discount = cartTotal >= 100000 ? 10000 : 0; // Promo belanja di atas 100rb diskon 10rb
    const finalTotal = cartTotal + orderInput.shippingCost - discount;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      userId: currentUser?.id || 'guest-' + Date.now(),
      customerName: orderInput.customerName.trim(),
      customerPhone: orderInput.customerPhone.trim(),
      customerEmail: orderInput.customerEmail.trim(),
      customerAddress: orderInput.customerAddress.trim(),
      shippingCourier: orderInput.shippingCourier,
      shippingCost: orderInput.shippingCost,
      paymentMethod: orderInput.paymentMethod,
      paymentStatus: orderInput.paymentMethod.includes('COD') ? 'COD' : 'Lunas',
      status: 'Menunggu',
      notes: orderInput.notes?.trim() || '',
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        unit: item.product.unit,
        image: item.product.image,
        subtotal: item.product.price * item.quantity,
      })),
      subtotal: cartTotal,
      discount,
      total: finalTotal,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setLastCreatedOrderId(newOrder.id);
    addToast(`Pesanan #${newOrder.orderNumber} berhasil dibuat!`, 'success');
    return { success: true, order: newOrder };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? { ...ord, status, updatedAt: new Date().toISOString() }
          : ord
      )
    );
    addToast(`Status pesanan berhasil diubah menjadi "${status}".`, 'success');
  };

  const cancelOrder = (orderId: string): boolean => {
    const targetOrder = orders.find((o) => o.id === orderId);
    if (!targetOrder) return false;

    if (targetOrder.status !== 'Menunggu') {
      addToast('Pesanan yang sudah diproses atau dikirim tidak dapat dibatalkan.', 'warning');
      return false;
    }

    // Return stock back to products
    setProducts((prev) =>
      prev.map((prod) => {
        const item = targetOrder.items.find((i) => i.productId === prod.id);
        if (item) {
          return {
            ...prod,
            stock: prod.stock + item.quantity,
            soldCount: Math.max(0, prod.soldCount - item.quantity),
          };
        }
        return prod;
      })
    );

    updateOrderStatus(orderId, 'Dibatalkan');
    addToast(`Pesanan #${targetOrder.orderNumber} berhasil dibatalkan.`, 'info');
    return true;
  };

  // Product Admin Management
  const addProduct = (productData: Omit<Product, 'id' | 'soldCount' | 'rating'>): Product => {
    const category = categories.find((c) => c.id === productData.categoryId);
    const newProd: Product = {
      ...productData,
      id: 'prod-' + Date.now(),
      categoryName: category?.name || 'Lainnya',
      soldCount: 0,
      rating: 5.0,
    };

    setProducts((prev) => [newProd, ...prev]);
    addToast(`Produk "${newProd.name}" berhasil ditambahkan ke katalog.`, 'success');
    return newProd;
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updatedCat = data.categoryId
            ? categories.find((c) => c.id === data.categoryId)?.name
            : p.categoryName;
          return { ...p, ...data, categoryName: updatedCat || p.categoryName };
        }
        return p;
      })
    );
    addToast('Perubahan produk berhasil disimpan.', 'success');
  };

  const deleteProduct = (id: string): boolean => {
    const prod = products.find((p) => p.id === id);
    if (!prod) return false;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // Also remove from cart if present
    setCart((prev) => prev.filter((ci) => ci.product.id !== id));
    addToast(`Produk "${prod.name}" berhasil dihapus.`, 'info');
    return true;
  };

  // Category Admin Management
  const addCategory = (categoryData: Omit<Category, 'id'>): Category => {
    const newCat: Category = {
      ...categoryData,
      id: 'cat-' + Date.now(),
    };
    setCategories((prev) => [...prev, newCat]);
    addToast(`Kategori "${newCat.name}" berhasil dibuat.`, 'success');
    return newCat;
  };

  const updateCategory = (id: string, data: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...data } : c))
    );
    // Update category name in products
    if (data.name) {
      setProducts((prev) =>
        prev.map((p) => (p.categoryId === id ? { ...p, categoryName: data.name } : p))
      );
    }
    addToast('Kategori berhasil diperbarui.', 'success');
  };

  const deleteCategory = (id: string) => {
    const hasProducts = products.some((p) => p.categoryId === id);
    if (hasProducts) {
      addToast('Tidak dapat menghapus kategori yang masih memiliki produk aktif!', 'error');
      return { success: false, message: 'Masih memiliki produk' };
    }
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast('Kategori berhasil dihapus.', 'info');
    return { success: true };
  };

  // Reset demo data to pristine state for presentations
  const resetDemoData = () => {
    setUsers(INITIAL_USERS);
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setCurrentUser(INITIAL_USERS[1]); // Sumanto
    localStorage.clear();
    addToast('Data demonstrasi berhasil direset ke pengaturan awal.', 'info');
    navigate('/');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        products,
        categories,
        orders,
        cart,
        toasts,
        currentRoute,
        selectedProductId,
        lastCreatedOrderId,
        navigate,
        login,
        register,
        logout,
        switchDemoRole,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartItemCount,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addToast,
        removeToast,
        resetDemoData,
        showPresentationBanner,
        setShowPresentationBanner,
        theme,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

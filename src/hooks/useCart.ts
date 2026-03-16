import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pizza, CartItem } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (pizza: Pizza) => void;
  removeFromCart: (pizzaId: string) => void;
  updateQuantity: (pizzaId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('nova_pizza_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('nova_pizza_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (pizza: Pizza) => {
    setItems(prev => {
      const existing = prev.find(i => i.pizza_id === pizza.id);
      if (existing) {
        return prev.map(i => 
          i.pizza_id === pizza.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { pizza_id: pizza.id, quantity: 1, pizza }];
    });
    toast({
      title: "Added to cart",
      description: `${pizza.name} has been added to your order.`,
    });
  };

  const removeFromCart = (pizzaId: string) => {
    setItems(prev => prev.filter(i => i.pizza_id !== pizzaId));
  };

  const updateQuantity = (pizzaId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(pizzaId);
      return;
    }
    setItems(prev => prev.map(i => 
      i.pizza_id === pizzaId ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.pizza.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

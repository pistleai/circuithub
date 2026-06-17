"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  animateCartIcon: boolean;
  isGstinModalOpen: boolean;
  setIsGstinModalOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isGstinModalOpen, setIsGstinModalOpen] = useState(false);
  const [animateCartIcon, setAnimateCartIcon] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("circuithub_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data", e);
      }
    }
  }, []);

  // Save cart to localStorage on change
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("circuithub_cart", JSON.stringify(newCart));
  };

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    const existingIndex = cart.findIndex((item) => item.id === newItem.id);
    let updatedCart: CartItem[];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart = [...cart, { ...newItem, quantity: 1 }];
    }

    saveCart(updatedCart);
    
    // Trigger header icon micro-animation (glow/bounce)
    setAnimateCartIcon(true);
    setTimeout(() => setAnimateCartIcon(false), 800);
  };

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        animateCartIcon,
        isGstinModalOpen,
        setIsGstinModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

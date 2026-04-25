/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header, Footer } from './components/Shared';
import { HomePage } from './components/Home';
import { ShopPage } from './components/Shop';
import { ProductDetailPage } from './components/ProductDetail';
import { CartPage } from './components/Cart';
import { Page, Product, CartItem } from './types';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const onProductSelect = (p: Product) => {
    setSelectedProduct(p);
    setPage('product');
    window.scrollTo(0, 0);
  };

  const addToCart = (p: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === p.id);
      if (existing) {
        return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...p, quantity: 1 }];
    });
    setPage('cart');
    window.scrollTo(0, 0);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPage={setPage} cartCount={cartCount} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && <HomePage key="home" onProductSelect={onProductSelect} />}
          {page === 'shop' && <ShopPage key="shop" onProductSelect={onProductSelect} />}
          {page === 'product' && selectedProduct && (
            <ProductDetailPage 
              key={`product-${selectedProduct.id}`} 
              product={selectedProduct} 
              addToCart={addToCart} 
            />
          )}
          {page === 'cart' && (
            <CartPage 
              key="cart" 
              items={cart} 
              removeItem={removeItem} 
              updateQuantity={updateQuantity} 
              setPage={setPage} 
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

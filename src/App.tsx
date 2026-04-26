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
import { agentAuthenticate, checkAgentPermission } from "uoaweb3-2026-team5";
import {
  getWebsitePermissions,
  setAIPermissions,
  userAuthenticate,
} from "uoaweb3-2026-team5";

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const onProductSelect = (p: Product) => {
    console.log("onProductSelect");
    setSelectedProduct(p);
    setPage('product');
    window.scrollTo(0, 0);
  };

  const addToCart = (p: Product) => {
    console.log("addToCart");


	if (agentAuthenticate("AgentGPT") == true){
		if (checkAgentPermission("AgentGPT", "Allow Purchases") == false) {return;} //agent hardcoded
		if (checkAgentPermission("AgentGPT", "Allow Purchase Past Limit") == false) { //agent hardcoded
			const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + p.price;
			const shipping = subtotal > 0 ? 25 : 0;
			const tax = subtotal * 0.08;
			const total = subtotal + shipping + tax;
			console.log(total);

			
			if (total>=2000) {
				console.log("This Agent has no permissions to spend past $2000");
				return;
			}
		}
	}

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
    console.log("updateQuantity");
    console.log(getWebsitePermissions())
	
	var purchaseLimit=false;
	if (agentAuthenticate("AgentGPT") == true){
		if (checkAgentPermission("AgentGPT", "Allow Purchases") == false) {return;} //agent hardcoded
		if (checkAgentPermission("AgentGPT", "Allow Purchase Past Limit") == false) { //agent hardcoded
			purchaseLimit=true;
		}
	}

    setCart(prev => prev.map(item => {
      if (item.id === id) {
		if (purchaseLimit && delta>0) {
			const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + item.price;
			const shipping = subtotal > 0 ? 25 : 0;
			const tax = subtotal * 0.08;
			const total = subtotal + shipping + tax;

			console.log(total);

			
			if (total>=2000) {
				console.log("This Agent has no permissions to spend past $2000");
				return item;
			}
		}
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    console.log("removeItem");
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const checkout = () => {
    var permissions = getWebsitePermissions()
    if (checkAgentPermission("TestAgent", "TestPermission")) {
      console.log("agentPermissionTrue")
    } else {
      console.log("agentPermissionFalse")
    }
    console.log("checkoutClicked");
  }

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
              checkout={checkout}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

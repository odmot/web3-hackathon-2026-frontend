/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, User, ShoppingCart, Globe, Share2, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, CartItem, Product } from '../types';

export function Header({ 
    setPage, 
    cartCount 
}: { 
    setPage: (p: Page) => void, 
    cartCount: number 
}) {
    return (
        <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-primary/10 transition-all duration-300">
            <div className="flex justify-between items-center w-full px-8 md:px-12 py-10 max-w-[1440px] mx-auto">
                <div 
                    className="text-sm font-bold tracking-widest-plus uppercase text-primary cursor-pointer"
                    onClick={() => setPage('home')}
                >
                    L'ATELIER
                </div>
                
                <div className="hidden md:flex items-center space-x-12 font-sans text-[10px] tracking-[0.3em] uppercase opacity-50">
                    <button 
                        className="hover:opacity-100 hover:text-primary transition-all"
                        onClick={() => setPage('shop')}
                    >
                        Shop All
                    </button>
                    <button className="hover:opacity-100 hover:text-primary transition-all">Collections</button>
                    <button 
                        className="text-primary opacity-100 border-b border-primary/40 pb-1"
                        onClick={() => setPage('shop')}
                    >
                        New Arrivals
                    </button>
                    <button className="hover:opacity-100 hover:text-primary transition-all">Journal</button>
                    <button className="hover:opacity-100 hover:text-primary transition-all">About</button>
                </div>

                <div className="flex items-center space-x-8 text-primary">
                    <button className="hover:opacity-50 transition-opacity"><Search size={18} strokeWidth={1.5} /></button>
                    <button className="hover:opacity-50 transition-opacity"><User size={18} strokeWidth={1.5} /></button>
                    <button 
                        className="hover:opacity-50 transition-opacity relative"
                        onClick={() => setPage('cart')}
                    >
                        <ShoppingCart size={18} strokeWidth={1.5} />
                        {cartCount > 0 && (
                            <span className="absolute -top-3 -right-3 bg-primary text-background text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="w-full mt-32 bg-background border-t border-primary/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start w-full px-12 py-20 max-w-[1440px] mx-auto">
                <div className="space-y-10">
                    <div className="text-sm font-bold tracking-widest-plus uppercase">L'ATELIER</div>
                    <div className="grid grid-cols-2 gap-6 font-sans text-[10px] tracking-[0.2em] uppercase opacity-40">
                        <a className="hover:opacity-100 transition-opacity text-primary" href="#">Sustainability</a>
                        <a className="hover:opacity-100 transition-opacity text-primary" href="#">Shipping & Returns</a>
                        <a className="hover:opacity-100 transition-opacity text-primary" href="#">Privacy Policy</a>
                        <a className="hover:opacity-100 transition-opacity text-primary" href="#">Terms of Use</a>
                        <a className="hover:opacity-100 transition-opacity text-primary" href="#">Contact</a>
                    </div>
                </div>
                <div className="flex flex-col md:items-end justify-between h-full space-y-12 md:space-y-0">
                    <div className="flex space-x-8 text-primary opacity-40">
                        <button className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:opacity-100 hover:border-primary/40 transition-all">IG</button>
                        <button className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:opacity-100 hover:border-primary/40 transition-all">TW</button>
                        <button className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:opacity-100 hover:border-primary/40 transition-all">LI</button>
                    </div>
                    <div className="font-sans text-[9px] tracking-[0.4em] uppercase opacity-30">
                        © 2024 L'ATELIER. EST. MMXXIV
                    </div>
                </div>
            </div>
        </footer>
    );
}

export function ProductCard({ 
    product, 
    onClick 
}: { 
    product: Product, 
    onClick: () => void,
    key?: string | number
}) {
    return (
        <motion.div 
            className="group cursor-pointer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={onClick}
        >
            <div className="relative aspect-[3/4] overflow-hidden bg-surface border border-primary/5 mb-8 transition-all duration-700 group-hover:border-primary/20">
                <img 
                    src={product.image} 
                    alt={product.alt} 
                    className="w-full h-full object-cover mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-1000 group-hover:scale-105"
                />
                {product.new && (
                    <span className="absolute top-6 left-6 text-[9px] uppercase tracking-widest-plus font-bold opacity-50 bg-background/50 px-2 py-1 backdrop-blur-sm">NEW</span>
                )}
            </div>
            <div className="px-1 text-center">
                <h3 className="text-xl mb-2 italic font-serif opacity-80 group-hover:opacity-100 transition-opacity">{product.name}</h3>
                <p className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-6">${product.price.toFixed(2)}</p>
                <div className="h-px w-0 group-hover:w-full bg-primary/20 mx-auto transition-all duration-500"></div>
            </div>
        </motion.div>
    );
}

import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCard } from './Shared';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

export function ShopPage({ onProductSelect }: { onProductSelect: (p: Product) => void; key?: string }) {
    return (
        <motion.main 
            className="max-w-[1440px] mx-auto px-8 md:px-12 py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <header className="mb-24 border-b border-primary/10 pb-16">
                <nav className="flex items-center space-x-3 text-[10px] uppercase tracking-[0.3em] text-accent mb-12">
                    <button className="hover:text-primary transition-colors uppercase">Collections</button>
                    <span className="opacity-30">/</span>
                    <span className="text-primary opacity-100 uppercase">Shop All</span>
                </nav>
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-3xl">
                        <h1 className="text-7xl mb-8 leading-[0.9]">Curated <br/> Modern Archive</h1>
                        <p className="text-sm text-accent max-w-xl leading-relaxed font-light italic">
                            A collection of timeless silhouettes and artisan-crafted pieces 
                            designed for the modern wardrobe, where form meets eternal flux.
                        </p>
                    </div>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-20">
                {/* Sidebar */}
                <aside className="w-full lg:w-64 shrink-0 space-y-12">
                    <div>
                        <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 pb-2 border-b border-primary/10 opacity-60">Category</h3>
                        <ul className="space-y-6">
                            <li className="flex items-center justify-between group cursor-pointer">
                                <span className="text-primary text-[11px] tracking-[0.2em] uppercase">All Apparel</span>
                                <span className="text-[10px] text-accent opacity-40">(124)</span>
                            </li>
                            {['Outerwear', 'Knitwear', 'Accessories'].map(cat => (
                                <li key={cat} className="flex items-center justify-between text-accent group cursor-pointer hover:text-primary transition-colors">
                                    <span className="text-[11px] tracking-[0.2em] uppercase">{cat}</span>
                                    <span className="text-[10px] opacity-40">(32)</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-8 pb-2 border-b border-primary/10 opacity-60">Size</h3>
                        <div className="grid grid-cols-4 gap-4">
                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                <button 
                                    key={size}
                                    className={`aspect-square border border-primary/10 text-[9px] tracking-widest uppercase hover:border-primary/40 transition-all ${size === 'S' ? 'bg-primary text-background border-primary' : ''}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-16 pb-6 border-b border-primary/5">
                        <span className="text-[10px] tracking-[0.2em] uppercase text-accent opacity-60">Results ({PRODUCTS.length})</span>
                        <div className="flex items-center space-x-3 cursor-pointer group">
                            <span className="text-[10px] tracking-[0.4em] uppercase text-accent group-hover:text-primary transition-colors">Sort: Relevance</span>
                            <ChevronDown size={12} className="group-hover:translate-y-0.5 transition-transform opacity-40" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                        {PRODUCTS.map(p => (
                            <ProductCard 
                                key={p.id} 
                                product={p} 
                                onClick={() => onProductSelect(p)} 
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-32 flex justify-center items-center space-x-10 border-t border-primary/10 pt-16">
                        <button className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:border-primary/40 transition-all">
                            <ChevronLeft size={14} strokeWidth={1.5} />
                        </button>
                        <div className="flex gap-10 text-[10px] tracking-[0.4em] uppercase font-bold">
                            <span className="text-primary border-b border-primary/60 pb-1">01</span>
                            <span className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity">02</span>
                            <span className="opacity-30 hover:opacity-100 cursor-pointer transition-opacity">03</span>
                        </div>
                        <button className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center hover:border-primary/40 transition-all">
                            <ChevronRight size={14} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}

import React from 'react';
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { CartItem, Page } from '../types';

interface CartPageProps {
    items: CartItem[];
    updateQuantity: (id: string, delta: number) => void;
    removeItem: (id: string) => void;
    setPage: (p: Page) => void;
    checkout: () => void;
    key?: string;
}


export function CartPage({ items, updateQuantity, removeItem, setPage, checkout }: CartPageProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 0 ? 25 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return (
        <motion.main 
            className="max-w-[1440px] mx-auto px-8 md:px-12 py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <header className="mb-20 border-b border-primary/10 pb-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Perception. 04</span>
                    <div className="h-px w-8 bg-accent/20"></div>
                </div>
                <h1 className="text-6xl italic leading-tight">Shopping Bag</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* List */}
                <div className="lg:col-span-8 space-y-12">
                    {items.length === 0 ? (
                        <div className="py-32 text-center border-y border-primary/10 bg-surface/30">
                            <p className="text-accent mb-12 italic text-2xl font-light">Your bag is currently empty.</p>
                            <button 
                                onClick={() => setPage('shop')}
                                className="inline-flex items-center gap-4 border border-primary/20 text-primary px-10 py-5 text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-primary hover:text-background transition-all"
                            >
                                Explorer Shop <ArrowRight size={14} strokeWidth={1} />
                            </button>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="group flex flex-col md:flex-row gap-12 pb-12 border-b border-primary/5">
                                <div className="w-full md:w-56 aspect-[3/4] overflow-hidden bg-surface border border-primary/5">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover mix-blend-luminosity grayscale group-hover:grayscale-0 group-hover:mix-blend-normal transition-all duration-1000" 
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-3xl italic mb-3 opacity-90 group-hover:opacity-100 transition-opacity">{item.name}</h3>
                                            <p className="text-[10px] font-bold tracking-[0.4em] text-accent uppercase opacity-60">
                                                {item.category} / ARC. {item.id.slice(-4).toUpperCase()}
                                            </p>
                                        </div>
                                        <p className="text-2xl italic opacity-80">${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-12">
                                        <div className="flex items-center border border-primary/10 font-bold">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="p-4 text-accent hover:text-primary transition-colors border-r border-primary/10"
                                            >
                                                <Minus size={12} strokeWidth={1.5} />
                                            </button>
                                            <span className="px-8 text-[11px] tracking-[0.2em]">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="p-4 text-accent hover:text-primary transition-colors border-l border-primary/10"
                                            >
                                                <Plus size={12} strokeWidth={1.5} />
                                            </button>
                                        </div>
                                        <button 
                                            onClick={() => removeItem(item.id)}
                                            className="flex items-center gap-3 text-accent hover:text-red-400 transition-colors text-[9px] font-bold tracking-[0.4em] uppercase"
                                        >
                                            <Trash2 size={14} className="stroke-1" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-surface/50 p-10 border border-primary/5 sticky top-40">
                        <h2 className="text-2xl italic mb-10 border-b border-primary/10 pb-6">Summary</h2>
                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center text-accent">
                                <span className="text-[11px] tracking-[0.2em] uppercase font-light">Subtotal</span>
                                <span className="text-primary font-bold italic">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-accent">
                                <span className="text-[11px] tracking-[0.2em] uppercase font-light">Sustainability Logistic</span>
                                <span className="text-primary font-bold italic">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-accent">
                                <span className="text-[11px] tracking-[0.2em] uppercase font-light">Contribution Tax</span>
                                <span className="text-primary font-bold italic">${tax.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center pt-8 border-t border-primary/40 mb-12">
                            <span className="text-2xl italic">Total</span>
                            <span className="text-4xl italic text-primary">${total.toFixed(2)}</span>
                        </div>
                        <div className="space-y-4">
                            <button onClick={() => checkout()}
                                className="w-full bg-primary text-background py-6 text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all">
                                Checkout
                            </button>
                            <button 
                                onClick={() => setPage('shop')}
                                className="w-full border border-primary/20 text-primary py-6 text-[10px] font-bold tracking-[0.5em] uppercase hover:border-primary transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                        <div className="mt-12 pt-10 border-t border-primary/5 space-y-6 opacity-40">
                            <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.3em] uppercase">
                                <ShieldCheck size={16} strokeWidth={1} /> Encrypted Transactions
                            </div>
                            <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.3em] uppercase">
                                <Truck size={16} strokeWidth={1} /> Global Archetypal Logistics
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.main>
    );
}


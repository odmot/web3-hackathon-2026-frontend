import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Page, CartItem } from '../types';
import { ChevronRight, CreditCard, ShieldCheck } from 'lucide-react';

interface CheckoutPageProps {
    items: CartItem[];
    setPage: (p: Page) => void;
    key?: string;
}

export function CheckoutPage({ items, setPage }: CheckoutPageProps) {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 24.00;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
        }, 2000);
    };

    if (isComplete) {
        return (
            <motion.div 
                className="max-w-2xl mx-auto px-8 py-40 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Order Confirmed</span>
                    <div className="h-px w-8 bg-accent/20"></div>
                </div>
                <h1 className="text-6xl italic leading-tight mb-12">Order <br/> Confirmed</h1>
                <p className="text-accent italic mb-16 max-w-lg mx-auto leading-relaxed">
                    Your collection has been processed. A confirmation of this exchange 
                    has been sent to your email.
                </p>
                <button 
                    onClick={() => setPage('home')}
                    className="inline-flex items-center gap-4 border border-primary/20 text-primary px-10 py-5 text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-primary hover:text-background transition-all"
                >
                    Return to Home <ChevronRight size={14} strokeWidth={1} />
                </button>
            </motion.div>
        );
    }

    return (
        <motion.main 
            className="max-w-[1440px] mx-auto px-8 md:px-12 py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <header className="mb-20 border-b border-primary/10 pb-12">
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Process. 05</span>
                    <div className="h-px w-8 bg-accent/20"></div>
                </div>
                <h1 className="text-6xl italic leading-tight">Checkout</h1>
            </header>

            <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* Details */}
                <div className="lg:col-span-7 space-y-20">
                    {/* Shipping */}
                    <div className="space-y-12">
                        <h2 className="text-[10px] tracking-[0.5em] font-bold uppercase opacity-30 border-b border-primary/5 pb-4">Shipping Address</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <InputField label="First Name" placeholder="e.g. Julian" required />
                            <InputField label="Last Name" placeholder="e.g. Vane" required />
                            <div className="md:col-span-2">
                                <InputField label="Street Address" placeholder="123 Gallery St" required />
                            </div>
                            <InputField label="City" placeholder="Metropolis" required />
                            <InputField label="Postal Code" placeholder="00000" required />
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="space-y-12">
                        <h2 className="text-[10px] tracking-[0.5em] font-bold uppercase opacity-30 border-b border-primary/5 pb-4">Payment Details</h2>
                        <div className="bg-surface/30 p-10 border border-primary/5 space-y-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <CreditCard size={18} strokeWidth={1.5} className="text-accent" />
                                    <span className="text-[10px] tracking-[0.3em] uppercase font-bold">Credit Card</span>
                                </div>
                                <div className="flex gap-4 opacity-30 h-4 items-center">
                                    <div className="w-8 h-px bg-primary"></div>
                                    <div className="w-8 h-px bg-primary"></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="md:col-span-2">
                                    <InputField label="Card Number" placeholder="0000 0000 0000 0000" required />
                                </div>
                                <InputField label="Expiry Date" placeholder="MM/YY" required />
                                <InputField label="CVV" placeholder="123" required />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-surface/50 p-10 border border-primary/5 sticky top-40">
                        <h2 className="text-2xl italic mb-10 border-b border-primary/10 pb-6">Order Summary</h2>
                        
                        {/* Compact items list */}
                        <div className="space-y-6 mb-10 pb-10 border-b border-primary/5">
                            {items.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-[10px] tracking-[0.2em] uppercase">
                                    <span className="opacity-60">{item.name} × {item.quantity}</span>
                                    <span className="italic">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="flex justify-between items-center text-accent">
                                <span className="text-[11px] tracking-[0.2em] uppercase font-light">Subtotal</span>
                                <span className="text-primary font-bold italic">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-accent">
                                <span className="text-[11px] tracking-[0.2em] uppercase font-light">Shipping</span>
                                <span className="text-primary font-bold italic">${shipping.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-8 border-t border-primary/40 mb-12">
                            <span className="text-2xl italic">Total</span>
                            <span className="text-4xl italic text-primary">${total.toFixed(2)}</span>
                        </div>

                        <button 
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-primary text-background py-6 text-[10px] font-bold tracking-[0.5em] uppercase hover:bg-neutral-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {isProcessing ? 'Processing...' : 'Complete Order'}
                        </button>

                        <div className="mt-12 pt-10 border-t border-primary/5 space-y-6 opacity-40">
                            <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.3em] uppercase">
                                <ShieldCheck size={16} strokeWidth={1} /> Secure Payment Transfer
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </motion.main>
    );
}

function InputField({ label, placeholder, required }: { label: string, placeholder: string, required?: boolean }) {
    return (
        <div className="space-y-3">
            <label className="text-[9px] tracking-[0.3em] uppercase font-bold opacity-40">{label}</label>
            <input 
                type="text" 
                required={required}
                placeholder={placeholder}
                className="w-full bg-transparent border-b border-primary/10 py-3 text-sm focus:border-primary/40 outline-none transition-all placeholder:text-accent/20 placeholder:italic font-light italic"
            />
        </div>
    );
}

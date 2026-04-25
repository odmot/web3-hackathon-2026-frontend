import React, { useState } from 'react';
import { ShoppingBag, Truck, Package, Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

export function ProductDetailPage({ 
    product, 
    addToCart 
}: { 
    product: Product, 
    addToCart: (p: Product) => void,
    key?: string
}) {
    const [selectedSize, setSelectedSize] = useState('S');

    return (
        <motion.main 
            className="max-w-[1440px] mx-auto px-8 md:px-12 pt-12 pb-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <nav className="flex items-center gap-4 mb-20 text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
                <button className="hover:text-primary transition-colors">Archive</button>
                <span className="opacity-20">/</span>
                <span className="text-primary opacity-100">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                {/* GALLERY */}
                <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-primary/10 border border-primary/10 overflow-hidden">
                    <div className="col-span-2 aspect-[4/5] bg-surface overflow-hidden">
                        <img 
                            src={product.image} 
                            className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                            alt={product.alt}
                        />
                    </div>
                    <div className="aspect-square bg-surface overflow-hidden">
                        <img 
                            src={product.image} 
                            className="w-full h-full object-cover grayscale opacity-40 mix-blend-overlay scale-150"
                            alt="Detail view"
                        />
                    </div>
                    <div className="aspect-square bg-surface overflow-hidden flex items-center justify-center p-12">
                        <p className="text-[10px] tracking-[0.5em] uppercase opacity-20 rotate-90 whitespace-nowrap">Macro Perspectives</p>
                    </div>
                </div>

                {/* INFO */}
                <div className="lg:col-span-5 sticky top-40">
                    <div className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Series 02.24</span>
                            <div className="h-px w-8 bg-accent/20"></div>
                        </div>
                        <h1 className="text-6xl mb-6 leading-tight italic">{product.name}</h1>
                        <p className="text-3xl font-serif text-primary opacity-80 italic">${product.price.toFixed(2)}</p>
                    </div>

                    <div className="space-y-12">
                        <p className="text-base text-accent leading-relaxed font-light italic">
                            A definitive statement in modern tailoring. Crafted from ethically sourced materials, 
                            this piece features a structured silhouette that maintains its architectural form 
                            amidst the transition between solid and fluid digital dualism.
                        </p>

                        <div className="space-y-6">
                            <div className="flex justify-between items-center pb-2 border-b border-primary/10">
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-60">Selection</span>
                                <button className="text-[9px] text-accent underline uppercase tracking-[0.2em] opacity-40 hover:opacity-100">Size Matrix</button>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {['XS', 'S', 'M', 'L'].map(size => (
                                    <button 
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-4 border text-[10px] tracking-[0.4em] transition-all font-bold ${selectedSize === size ? 'border-primary bg-primary text-background' : 'border-primary/10 hover:border-primary/40'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6 pt-8">
                            <button 
                                onClick={() => addToCart(product)}
                                className="w-full bg-primary text-background py-6 font-bold text-[10px] uppercase tracking-[0.5em] hover:bg-neutral-200 transition-all shadow-2xl"
                            >
                                Add to Bag
                            </button>
                            <button className="w-full border border-primary/20 text-primary py-6 font-bold text-[10px] uppercase tracking-[0.5em] hover:border-primary transition-all flex items-center justify-center gap-3">
                                <Heart size={14} strokeWidth={1.5} /> Save to Wishlist
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-6 pt-12 border-t border-primary/10">
                            <div className="flex items-center gap-4 text-accent opacity-60">
                                <Truck size={16} strokeWidth={1} />
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Complimentary Logistics</span>
                            </div>
                            <div className="flex items-center gap-4 text-accent opacity-60">
                                <Package size={16} strokeWidth={1} />
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Sustainable Containment</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TECHNICAL SPECS */}
            <section className="mt-40 grid grid-cols-1 md:grid-cols-12 gap-16 border-t border-primary/10 pt-20">
                <div className="md:col-span-4">
                    <h2 className="text-[10px] tracking-[0.5em] font-bold uppercase opacity-30 mb-4">Structure</h2>
                    <div className="text-3xl italic mb-8 leading-tight">Material & Maintenance</div>
                    <div className="space-y-8 text-accent font-light leading-relaxed">
                        <p className="border-l border-primary/10 pl-6">
                            100% Virgin Wool Outer <br/>
                            100% Cupro Lining
                        </p>
                        <p className="italic opacity-60">
                            Professional dry clean only. Store on a wide-shoulder hanger to maintain silhouette integrity.
                        </p>
                    </div>
                </div>
                <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-[10px] tracking-[0.4em] font-bold uppercase opacity-30 mb-8 border-b border-primary/5 pb-2">Artifact Features</h3>
                        <ul className="space-y-6 text-sm text-accent">
                            <li className="flex gap-4"><span className="opacity-20">01</span> Hand-finished internal seams</li>
                            <li className="flex gap-4"><span className="opacity-20">02</span> Brushed silver minimal hardware</li>
                            <li className="flex gap-4"><span className="opacity-20">03</span> Concealed structural security pocket</li>
                            <li className="flex gap-4"><span className="opacity-20">04</span> Architectural detachable waist belt</li>
                        </ul>
                    </div>
                    <div className="bg-surface p-12 border border-primary/5">
                        <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Observation</p>
                        <p className="text-lg italic font-serif leading-relaxed text-primary/80">
                            "A study in modern restraint. The garment interacts with the wearer's 
                            movement, shifting its form without losing its geometric identity."
                        </p>
                    </div>
                </div>
            </section>
        </motion.main>
    );
}


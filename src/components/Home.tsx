import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCard } from './Shared';
import { PRODUCTS } from '../constants';
import { Page, Product } from '../types';

export function HomePage({ onProductSelect }: { onProductSelect: (p: Product) => void; key?: string }) {
    const featuredProducts = PRODUCTS.slice(0, 3);

    return (
        <motion.div 
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden border-b border-primary/10">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
                        alt="Hero Image" 
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full px-12 md:px-24 max-w-[1440px] mx-auto">
                    <div className="flex flex-col max-w-4xl">
                        <motion.div 
                            className="mb-8 flex items-center gap-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-accent">Chapter 01</span>
                            <div className="h-[1px] w-12 bg-accent/30"></div>
                        </motion.div>

                        <motion.h1 
                            className="text-[clamp(60px,10vw,120px)] leading-[0.85] italic mb-12"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            Form <br/> & Eternal <br/> Flux
                        </motion.h1>

                        <motion.p 
                            className="max-w-md text-sm md:text-base leading-relaxed text-accent font-light mb-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                        >
                            A curated exploration of ephemeral structures and the transition between 
                            solid and fluid architectural philosophy in modern couture.
                        </motion.p>

                        <motion.div 
                            className="flex items-center gap-12"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                        >
                            <button 
                                onClick={() => onProductSelect(featuredProducts[0])}
                                className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-background transition-all group"
                            >
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} strokeWidth={1} />
                            </button>
                            <div className="text-[10px] tracking-[0.4em] uppercase font-bold">Discover Collection</div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute right-0 bottom-0 top-0 w-12 border-l border-primary/10 hidden md:flex flex-col justify-center items-center">
                    <span className="rotate-[-90deg] whitespace-nowrap text-[9px] tracking-[0.5em] uppercase opacity-30">Est. MMXXIV</span>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="py-32 px-12 max-w-[1440px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 pb-8 border-b border-primary/10">
                    <div className="space-y-4">
                        <div className="text-[10px] tracking-[0.4em] uppercase opacity-40">Series. 02</div>
                        <h2 className="text-5xl">Minimal Voids</h2>
                    </div>
                    <div className="text-[10px] tracking-[0.4em] uppercase opacity-60 mt-8 md:mt-0">
                        View Collection
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {featuredProducts.map((product) => (
                        <ProductCard 
                            key={product.id} 
                            product={product} 
                            onClick={() => onProductSelect(product)}
                        />
                    ))}
                </div>
            </section>

            {/* Editorial Feature */}
            <section className="py-32 border-y border-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0 max-w-[1440px] mx-auto">
                    <div className="col-span-7 px-12 md:px-24 flex flex-col justify-center order-2 md:order-1 mt-16 md:mt-0">
                        <div className="text-[10px] tracking-[0.3em] uppercase opacity-40 mb-8">Concept. 24</div>
                        <h2 className="text-6xl md:text-8xl mb-12 leading-tight">The Silence <br/> of Modern <br/> Spaces</h2>
                        <p className="max-max-lg text-accent leading-relaxed mb-12 italic">
                            "True elegance lies in the reduction of everything unnecessary, 
                            leaving only the core essence of form and feeling."
                        </p>
                        <button className="self-start text-[10px] tracking-[0.4em] uppercase border-b border-primary/20 pb-2 hover:border-primary transition-all">
                            Read the Journal
                        </button>
                    </div>
                    <div className="col-span-5 aspect-square md:aspect-auto bg-surface overflow-hidden border-l border-primary/10 order-1 md:order-2">
                        <img 
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop" 
                            alt="Editorial" 
                            className="w-full h-full object-cover mix-blend-luminosity grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}


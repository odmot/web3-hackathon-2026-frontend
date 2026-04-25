export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    alt: string;
    color?: string;
    size?: string;
    description?: string;
    new?: boolean;
    limited?: boolean;
    rating?: number;
    reviews?: number;
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export type Page = 'home' | 'shop' | 'product' | 'cart';

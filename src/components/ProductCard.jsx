import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart, HiOutlineEye } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const formattedPrice = new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    }).format(product.price);

    return (
        <Link
            to={`/product/${product.id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors shadow-lg"
                        title="Quick View"
                    >
                        <HiOutlineEye size={20} />
                    </button>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-primary hover:text-white transition-colors shadow-lg"
                        title="Add to Cart"
                    >
                        <HiOutlineShoppingCart size={20} />
                    </button>
                </div>

                {/* Badge */}
                {product.stockStatus === 'In Stock' && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gray-950/50 backdrop-blur-sm text-primary text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                        In Stock
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
                <div className="flex justify-between items-start">
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{product.category}</p>
                    <p className="text-[10px] text-gray-400 font-medium">{product.brand}</p>
                </div>
                <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors font-display">
                    {product.title}
                </h3>
                <div className="flex items-center justify-between pt-2">
                    <p className="text-lg font-bold text-gray-900">{formattedPrice}</p>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product);
                        }}
                        className="text-[10px] font-bold text-primary hover:text-primary-dark underline underline-offset-4 decoration-primary/30 transition-colors uppercase tracking-widest"
                    >
                        Add to Bag
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;

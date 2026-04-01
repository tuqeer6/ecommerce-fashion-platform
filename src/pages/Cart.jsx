import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineTrash, HiMinus, HiPlus, HiOutlineShoppingBag, HiArrowNarrowRight } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-PK', {
            style: 'currency',
            currency: 'PKR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    if (cart.length === 0) {
        return (
            <div className="pt-40 pb-20 min-h-[70vh]">
                <div className="max-w-2xl mx-auto px-4 text-center space-y-8">
                    <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary">
                        <HiOutlineShoppingBag size={48} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold font-display text-gray-900">Your bag is empty</h1>
                        <p className="text-gray-500">Looks like you haven't added anything to your cart yet. Discover our latest collections and find something you love.</p>
                    </div>
                   <Link 
  to="/" 
  className="inline-flex items-center px-10 py-4 bg-gray-950 text-white rounded-full font-bold tracking-wide hover:bg-amber-600 transition-all duration-300 shadow-2xl shadow-gray-200 group"
>
  <span className="relative z-10">Start Shopping</span>
  <HiArrowNarrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold font-display text-gray-900 mb-12">Shopping Bag</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-900">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white p-6 rounded-2xl flex flex-col sm:flex-row gap-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-full sm:w-32 h-40 sm:h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-grow flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">{item.category}</p>
                                            <h3 className="text-lg font-bold leading-tight font-display">{item.title}</h3>
                                            <p className="text-sm text-gray-400 mt-1">{item.brand}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                            title="Remove item"
                                        >
                                            <HiOutlineTrash size={20} />
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap justify-between items-end gap-4 mt-6">
                                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors hover:bg-white rounded-md shadow-sm"
                                            >
                                                <HiMinus size={14} />
                                            </button>
                                            <span className="w-10 text-center font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-primary transition-colors hover:bg-white rounded-md shadow-sm"
                                            >
                                                <HiPlus size={14} />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold">{formatPrice(item.price * item.quantity)}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">({formatPrice(item.price)} each)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm sticky top-32">
                            <h2 className="text-xl font-bold font-display mb-8">Order Summary</h2>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-gray-950">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-primary font-bold">Calculated at next step</span>
                                </div>
                                <div className="flex justify-between text-gray-500 text-sm border-t border-gray-100 pt-4">
                                    <span>Tax (Included)</span>
                                    <span className="font-bold text-gray-950">{formatPrice(cartTotal * 0.05)}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mb-8 pt-4 border-t-2 border-primary-light/10">
                                <span className="text-lg font-bold font-display">Total Price</span>
                                <span className="text-3xl font-bold font-display text-gradient">{formatPrice(cartTotal)}</span>
                                <p>PKR</p>
                            </div>

                            <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                                Proceed to Checkout
                                <HiArrowNarrowRight size={20} />
                            </button>

                            <div className="mt-8 space-y-4">
                                <p className="text-[10px] text-gray-400 text-center font-medium uppercase tracking-widest">Secure Payments with</p>
                                <div className="flex justify-center flex-wrap gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-300">
                                    {/* Placeholder for payment icons */}
                                    <span className="text-[10px] font-bold border border-gray-400 rounded px-2">VISA</span>
                                    <span className="text-[10px] font-bold border border-gray-400 rounded px-2">MASTERCARD</span>
                                    <span className="text-[10px] font-bold border border-gray-400 rounded px-2">COD</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

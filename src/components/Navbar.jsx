import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiOutlineShoppingBag, HiOutlineSearch } from 'react-icons/hi';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { cartCount } = useCart();
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Bedsheets', path: '/category/bedsheets' },
        { name: 'Perfumes', path: '/category/perfumes' },
        { name: 'Male Dresses', path: '/category/male-dresses' },
        { name: 'Female Dresses', path: '/category/female-dresses' },
    ];

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const query = searchTerm.trim();
        if (!query) return;
        navigate(`/shop?q=${encodeURIComponent(query)}`);
        setIsSearchOpen(false);
        setIsOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-primary-light/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-3xl font-bold tracking-tighter text-gradient font-display">
                            kharediofy
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-gray-700 hover:text-primary transition-colors font-medium text-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons Context */}
                    <div className="flex items-center space-x-5">
                        <button
                            type="button"
                            onClick={() => setIsSearchOpen((prev) => !prev)}
                            className="text-gray-600 hover:text-primary transition-colors"
                            title="Search products"
                        >
                            <HiOutlineSearch size={22} />
                        </button>
                        <Link to="/cart" className="relative text-gray-600 hover:text-primary transition-colors">
                            <HiOutlineShoppingBag size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden text-gray-600 focus:outline-none"
                        >
                            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            {isSearchOpen && (
                <div className="border-t border-primary-light/10 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <form onSubmit={handleSearchSubmit} className="flex gap-3">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by product title, brand, or category..."
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40"
                            />
                            <button
                                type="submit"
                                className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-t border-primary-light/10 animate-fade-in">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-3 rounded-xl text-base font-medium text-gray-800 hover:bg-primary/10 hover:text-primary transition-all"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

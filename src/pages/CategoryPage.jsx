import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineAdjustmentsHorizontal, HiOutlineChevronRight } from 'react-icons/hi2';
import productData from '../data/products';
import ProductCard from '../components/ProductCard';

const CategoryPage = () => {
    const { slug } = useParams();
    const [activeSubcategory, setActiveSubcategory] = useState('All');
    const [priceRange, setPriceRange] = useState(20000);
    const [sortBy, setSortBy] = useState('newest');

    // Convert slug to friendly name
    const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const categoryInfo = productData.categories.find(c => c.id === slug);
    const subcategories = categoryInfo ? ['All', ...categoryInfo.subcategories] : ['All'];

    // Reset filter when category changes
    useEffect(() => {
        setActiveSubcategory('All');
    }, [slug]);

    const filteredProducts = useMemo(() => {
        let result = productData.products.filter(p => p.category.toLowerCase().replace(' ', '-') === slug);

        if (activeSubcategory !== 'All') {
            result = result.filter(p => p.subCategory === activeSubcategory);
        }

        result = result.filter(p => p.price <= priceRange);

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [slug, activeSubcategory, priceRange, sortBy]);

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap py-2">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <HiOutlineChevronRight size={10} />
                    <span className="text-gray-900 font-medium">{categoryName}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 flex-shrink-0 space-y-10">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="text-lg font-bold font-display flex items-center">
                                <HiOutlineAdjustmentsHorizontal className="mr-2" />
                                Filters
                            </h2>
                            <button
                                onClick={() => { setActiveSubcategory('All'); setPriceRange(20000); }}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Subcategories */}
                        {subcategories.length > 1 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Type</h3>
                                <div className="space-y-2">
                                    {subcategories.map(sub => (
                                        <label key={sub} className="flex items-center group cursor-pointer">
                                            <input
                                                type="radio"
                                                name="subcategory"
                                                className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                                                checked={activeSubcategory === sub}
                                                onChange={() => setActiveSubcategory(sub)}
                                            />
                                            <span
                                                className={`ml-3 text-sm transition-colors ${
                                                    activeSubcategory === sub
                                                        ? 'text-gray-900 font-bold bg-primary/10 px-2 py-1 rounded-lg'
                                                        : 'text-gray-600 group-hover:text-primary'
                                                }`}
                                            >
                                                {sub}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Price Filter */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Price</h3>
                                <span className="text-xs font-bold text-primary">Up to {priceRange.toLocaleString()} PKR</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20000"
                                step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <span>0 PKR</span>
                                <span>20K PKR</span>
                            </div>
                        </div>

                        {/* Banner/Quality Promo */}
                        <div className="hidden lg:block bg-primary/5 rounded-2xl p-6 border border-primary/10">
                            <h4 className="text-primary font-bold text-sm mb-2">kharediofy Choice</h4>
                            <p className="text-xs text-gray-600 leading-relaxed mb-4">Discover the best quality products selected just for you.</p>
                            <div className="w-10 h-1 bg-accent rounded-full"></div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium leading-none">
                                Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> Products
                            </p>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="text-xs font-bold border-none bg-transparent focus:ring-0 cursor-pointer text-gray-700"
                            >
                                <option value="newest">Sort By: Newest</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-12 animate-fade-in">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <HiOutlineAdjustmentsHorizontal size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                                <p className="text-gray-500 text-sm">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    onClick={() => { setActiveSubcategory('All'); setPriceRange(20000); }}
                                    className="mt-6 text-primary font-bold text-sm hover:underline"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;

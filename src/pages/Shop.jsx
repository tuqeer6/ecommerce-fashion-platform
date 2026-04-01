import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import productData from '../data/products';
import ProductCard from '../components/ProductCard';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';

const Shop = () => {
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeSubcategory, setActiveSubcategory] = useState('All');
    const [priceRange, setPriceRange] = useState(20000);
    const [sortBy, setSortBy] = useState('newest');
    const query = searchParams.get('q')?.trim().toLowerCase() || '';

    const { products, categories } = productData;

    const activeCategoryConfig =
        selectedCategory === 'All'
            ? null
            : categories.find((c) => c.name === selectedCategory) ?? null;

    const subcategories =
        activeCategoryConfig && activeCategoryConfig.subcategories.length > 0
            ? ['All', ...activeCategoryConfig.subcategories]
            : ['All'];

    const maxPrice = useMemo(
        () => Math.max(...products.map((p) => p.price)),
        [products]
    );

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (query) {
            result = result.filter((p) => {
                const haystack = [p.title, p.brand, p.category, p.subCategory]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                return haystack.includes(query);
            });
        }

        if (selectedCategory !== 'All') {
            result = result.filter((p) => p.category === selectedCategory);
        }

        if (activeSubcategory !== 'All') {
            result = result.filter((p) => p.subCategory === activeSubcategory);
        }

        result = result.filter((p) => p.price <= priceRange);

        if (sortBy === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [products, selectedCategory, activeSubcategory, priceRange, sortBy, query]);

    const resetFilters = () => {
        setSelectedCategory('All');
        setActiveSubcategory('All');
        setPriceRange(20000);
        setSortBy('newest');
    };

    return (
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-10">
                    <h1 className="text-4xl font-bold font-display text-gray-900 mb-3">
                        Shop All Products
                    </h1>
                    <p className="text-gray-500 text-sm max-w-2xl">
                        Browse the complete kharediofy collection of perfumes, Pakistani dresses, and luxury bedsheets with powerful, professional filters.
                    </p>
                    {query && (
                        <p className="mt-3 text-sm font-semibold text-primary">
                            Search results for: "{query}"
                        </p>
                    )}
                </header>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:w-64 flex-shrink-0 space-y-10">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                            <h2 className="text-lg font-bold font-display flex items-center">
                                <HiOutlineAdjustmentsHorizontal className="mr-2" />
                                Filters
                            </h2>
                            <button
                                onClick={resetFilters}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Category Filter */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                                Category
                            </h3>
                            <div className="space-y-2">
                                {['All', ...categories.map((c) => c.name)].map((cat) => (
                                    <label key={cat} className="flex items-center group cursor-pointer">
                                        <input
                                            type="radio"
                                            name="category"
                                            className="w-4 h-4 border-gray-300 text-primary focus:ring-primary"
                                            checked={selectedCategory === cat}
                                            onChange={() => {
                                                setSelectedCategory(cat);
                                                setActiveSubcategory('All');
                                            }}
                                        />
                                        <span
                                            className={`ml-3 text-sm transition-colors ${
                                                selectedCategory === cat
                                                    ? 'text-gray-900 font-bold bg-primary/10 px-2 py-1 rounded-lg'
                                                    : 'text-gray-600 group-hover:text-primary'
                                            }`}
                                        >
                                            {cat}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Subcategory Filter */}
                        {subcategories.length > 1 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                                    Type
                                </h3>
                                <div className="space-y-2">
                                    {subcategories.map((sub) => (
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
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                                    Price
                                </h3>
                                <span className="text-xs font-bold text-primary">
                                    Up to {priceRange.toLocaleString()} PKR
                                </span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max={maxPrice}
                                step="500"
                                value={priceRange}
                                onChange={(e) => setPriceRange(parseInt(e.target.value, 10))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                            />
                            <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                <span>0 PKR</span>
                                <span>{maxPrice.toLocaleString()} PKR</span>
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-grow">
                        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100">
                            <p className="text-sm text-gray-500 font-medium leading-none">
                                Showing{' '}
                                <span className="text-gray-900 font-bold">
                                    {filteredProducts.length}
                                </span>{' '}
                                Products
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
                                {filteredProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                    <HiOutlineAdjustmentsHorizontal size={32} />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    No products found
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    Try adjusting your filters to discover more products from
                                    kharediofy.
                                </p>
                                <button
                                    onClick={resetFilters}
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

export default Shop;


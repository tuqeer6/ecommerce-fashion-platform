import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HiOutlineChevronRight } from 'react-icons/hi2';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import productData from '../data/products';
import { useCart } from '../context/CartContext';

const formatPKR = (value) =>
    new Intl.NumberFormat('en-PK', {
        style: 'currency',
        currency: 'PKR',
        minimumFractionDigits: 0,
    }).format(value);

const toSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

const KeyValue = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="flex items-start justify-between gap-6 py-3 border-b border-gray-100">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                {label}
            </span>
            <span className="text-sm font-semibold text-gray-900 text-right">{value}</span>
        </div>
    );
};

const Chips = ({ label, items }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
                {label}
            </h3>
            <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                    <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-xs font-semibold"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

const ProductDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = useMemo(() => {
        const parsedId = Number(id);
        return productData.products.find((p) => p.id === parsedId) ?? null;
    }, [id]);

    const images = useMemo(() => {
        if (!product) return [];
        const gallery = Array.isArray(product.gallery) ? product.gallery : [];
        const first = product.image ? [product.image] : [];
        const uniq = Array.from(new Set([...first, ...gallery].filter(Boolean)));
        return uniq.length > 0 ? uniq : [];
    }, [product]);

    const [activeImage, setActiveImage] = useState(0);

    if (!product) {
        return (
            <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold font-display text-gray-900 mb-3">
                        Product not found
                    </h1>
                    <p className="text-gray-500 mb-8">
                        This product doesn’t exist or was removed.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all"
                    >
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const categorySlug = toSlug(product.category);
    const categoryLink = `/category/${categorySlug}`;

    return (
        <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <nav className="flex items-center space-x-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap py-2">
                    <Link to="/" className="hover:text-primary transition-colors">
                        Home
                    </Link>
                    <HiOutlineChevronRight size={10} />
                    <Link to="/shop" className="hover:text-primary transition-colors">
                        Shop
                    </Link>
                    <HiOutlineChevronRight size={10} />
                    <Link to={categoryLink} className="hover:text-primary transition-colors">
                        {product.category}
                    </Link>
                    <HiOutlineChevronRight size={10} />
                    <span className="text-gray-900 font-medium">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Gallery */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="aspect-[4/5] bg-gray-100">
                                {images.length > 0 ? (
                                    <img
                                        src={images[Math.min(activeImage, images.length - 1)]}
                                        alt={product.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm font-semibold">
                                        No image
                                    </div>
                                )}
                            </div>
                        </div>

                        {images.length > 1 && (
                            <div className="grid grid-cols-5 gap-3">
                                {images.slice(0, 10).map((src, idx) => (
                                    <button
                                        key={src}
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square rounded-2xl overflow-hidden border transition-all ${
                                            idx === activeImage
                                                ? 'border-primary ring-2 ring-primary/20'
                                                : 'border-gray-200 hover:border-primary/50'
                                        }`}
                                        title={`View image ${idx + 1}`}
                                    >
                                        <img
                                            src={src}
                                            alt={`${product.title} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                                    {product.category}
                                </span>
                                {product.subCategory && (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                        {product.subCategory}
                                    </span>
                                )}
                                {product.stockStatus && (
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                        {product.stockStatus}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 leading-tight">
                                {product.title}
                            </h1>

                       <div className="flex items-center justify-between gap-6 flex-wrap py-4 border-t border-gray-50">
    <div className="flex flex-col">
        <span className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">Total Price</span>
        <p className="text-4xl font-black font-display text-gray-900 tracking-tight">
            {formatPKR(product.price)}
        </p>
    </div>
    
    <button
        onClick={() => addToCart(product)}
        className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-900 hover:bg-black text-white font-bold rounded-full transition-all duration-300 shadow-2xl shadow-gray-300 hover:-translate-y-1 active:scale-[0.95]"
    >
        <HiOutlineShoppingCart size={22} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="tracking-wide">Add to Cart</span>
        
        {/* Subtle accent light effect */}
        <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"></div>
    </button>
</div>
                            {product.description && (
                                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                            )}
                        </div>

                        {/* Key details */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                            <h2 className="text-xl font-bold font-display text-gray-900 mb-6">
                                Product Details
                            </h2>
                            <div className="space-y-1">
                                <KeyValue label="Brand" value={product.brand} />
                                <KeyValue label="SKU" value={product.SKU} />
                                <KeyValue label="Size" value={product.size} />
                                <KeyValue label="Color" value={product.color} />
                                <KeyValue label="Season" value={product.season} />
                                <KeyValue label="Fabric" value={product.fabric} />
                                <KeyValue label="Category Type" value={product.productCategory} />
                                <KeyValue label="Fragrance Type" value={product.fragranceType} />
                                <KeyValue label="Gender" value={product.gender} />
                                <KeyValue label="Thread Count" value={product.threadCount} />
                                <KeyValue label="Material" value={product.material} />
                                <KeyValue label="Weave" value={product.weave} />
                            </div>
                        </div>

                        {/* Long description */}
                        {(product.detailDescription || product.moreInformation || product.usageTips) && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
                                <h2 className="text-xl font-bold font-display text-gray-900">
                                    About this product
                                </h2>
                                {product.detailDescription && (
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.detailDescription}
                                    </p>
                                )}
                                {product.moreInformation && (
                                    <p className="text-gray-600 leading-relaxed">
                                        {product.moreInformation}
                                    </p>
                                )}
                                {product.usageTips && (
                                    <p className="text-gray-600 leading-relaxed">
                                        <span className="font-bold text-gray-900">Usage:</span>{' '}
                                        {product.usageTips}
                                    </p>
                                )}
                                {product.moreInfoLink && (
                                    <a
                                        href={product.moreInfoLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center text-primary font-bold hover:underline"
                                    >
                                        More info
                                    </a>
                                )}
                            </div>
                        )}

                        {/* Notes / Chips */}
                        {(product.topNotes || product.middleNotes || product.baseNotes) && (
                            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
                                <h2 className="text-xl font-bold font-display text-gray-900">
                                    Notes
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <Chips label="Top" items={product.topNotes} />
                                    <Chips label="Middle" items={product.middleNotes} />
                                    <Chips label="Base" items={product.baseNotes} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;


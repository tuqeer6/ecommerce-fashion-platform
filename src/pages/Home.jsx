import { Link } from 'react-router-dom';
import { HiArrowRight, HiOutlineCheckBadge, HiOutlineTruck, HiOutlineTag, HiOutlineShieldCheck } from 'react-icons/hi2';
import productData from '../data/products';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const categories = [
        { title: 'Bedsheets', slug: 'bedsheets', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop', count: '12+ Items' },
        { title: 'Perfumes', slug: 'perfumes', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop', count: '45+ Items' },
        { title: 'Male Dresses', slug: 'male-dresses', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop', count: '28+ Items' },
        { title: 'Female Dresses', slug: 'female-dresses', image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop', count: '34+ Items' },
    ];

    const featuredProducts = productData.products.slice(0, 4);

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-xs tracking-wider uppercase">
                                New Summer Collection 2024
                            </span>
                            <h1 className="text-6xl md:text-7xl font-bold leading-tight font-display tracking-tight text-gray-900">
                                Elevate Your <span className="text-primary italic">Lifestyle</span> with <span className="text-gradient">kharediofy</span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                                Discover curated collections of premium scents, elegant Pakistani attire, and luxury bedding essentials designed for comfort and style.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link to="/shop" className="px-8 py-4 bg-primary hover:bg-primary-dark text-gray-900 rounded-xl font-bold transition-all shadow-xl shadow-primary/20 flex items-center group">
                                    Shop All Products
                                    <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/category/perfumes" className="px-8 py-4 bg-white border border-gray-200 text-gray-900 hover:border-primary rounded-xl font-bold transition-all">
                                    Explore Scents
                                </Link>
                            </div>
                        </div>
                        <div className="relative hidden lg:block">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
                                    alt="Premium Collection"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="absolute -top-10 -left-10 w-full h-full border-2 border-accent/20 rounded-2xl -z-10 -rotate-3"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold font-display text-gray-900">Shop by Category</h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                        <p className="text-gray-500 max-w-2xl mx-auto">Explore our diverse range of premium products tailored to your every need.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, idx) => (
                            <Link
                                key={idx}
                                to={`/category/${cat.slug}`}
                                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2"
                            >
                                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <p className="text-accent text-xs font-bold mb-1 uppercase tracking-widest">{cat.count}</p>
                                    <h3 className="text-white text-2xl font-bold font-display">{cat.title}</h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Products Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10">
                        <div className="space-y-3">
                            <h2 className="text-4xl font-bold font-display text-gray-900">Our Products</h2>
                            <p className="text-gray-500 text-sm max-w-xl">
                                Handpicked bestsellers from kharediofy - explore perfumes, dresses, and bedding designed for modern Pakistani lifestyles.
                            </p>
                        </div>
                        <Link
                            to="/shop"
                            className="hidden md:inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark group"
                        >
                            View All Products
                            <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="mt-10 text-center md:hidden">
                        <Link
                            to="/shop"
                            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark group"
                        >
                            View All Products
                            <HiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-primary-dark text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10">
                    <svg width="400" height="400" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                </div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature Item */}
        <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineTruck size={32} />
            </div>
            <h4 className="text-xl font-bold font-display text-gray-900 mb-2">Fast Delivery</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
                Swift island-wide shipping across Pakistan within <span className="font-semibold text-gray-700">3-5 working days</span>.
            </p>
        </div>

        {/* Feature Item */}
        <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineShieldCheck size={32} />
            </div>
            <h4 className="text-xl font-bold font-display text-gray-900 mb-2">Quality Assured</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
                Every product is handpicked and undergoes <span className="font-semibold text-gray-700">rigorous quality checks</span>.
            </p>
        </div>

        {/* Feature Item */}
        <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineTag size={32} />
            </div>
            <h4 className="text-xl font-bold font-display text-gray-900 mb-2">Best Prices</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
                Premium quality doesn't have to be expensive. Shop the <span className="font-semibold text-gray-700">best deals</span> online.
            </p>
        </div>

        {/* Feature Item */}
        <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <HiOutlineCheckBadge size={32} />
            </div>
            <h4 className="text-xl font-bold font-display text-gray-900 mb-2">Secure Payments</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
                <span className="font-semibold text-gray-700">100% secure</span> gateways and Cash on Delivery options available.
            </p>
        </div>
    </div>
</div>



            </section>

            {/* Discount/Offers Section */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-linear-to-r from-primary to-accent rounded-[3rem] p-12 relative overflow-hidden shadow-2xl shadow-primary/20 group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20 blur-3xl"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 py-16 px-6 md:px-12 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
    {/* Decorative background element for texture */}
    <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
    
    <div className="relative text-center md:text-left space-y-6 max-w-xl">
        <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
            Exclusive Deal
        </span>
        
        <h2 className="text-5xl md:text-7xl font-bold font-display leading-[1.1] text-gray-900">
            Flat <span className="text-amber-600 font-serif italic">25% OFF</span> <br /> 
            <span className="text-gray-800">on Premium Scents</span>
        </h2>
        
        <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Experience luxury like never before. Use code 
            <span className="ml-2 px-3 py-1 bg-gray-50 border border-dashed border-amber-400 text-gray-900 rounded-lg font-mono font-bold">
                KHAREDIO25
            </span>
        </p>
        
        <div className="pt-4">
            <Link to="/category/perfumes" className="inline-flex items-center px-10 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-200 group/btn">
                Claim Discount
                <HiArrowRight className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
            </Link>
        </div>
    </div>

    <div className="relative w-full md:w-5/12 aspect-square flex items-center justify-center">
        {/* Abstract shape behind the bottle to make it pop on white */}
        <div className="absolute inset-0 bg-linear-to-tr from-amber-50 to-orange-50 rounded-3xl rotate-6 scale-90"></div>
        
        <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1904&auto=format&fit=crop"
            alt="9PM Rebel Premium Scent"
            className="w-4/5 h-4/5 object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        {/* Floating Tag */}
        <div className="absolute bottom-4 right-4 z-20 bg-white p-4 shadow-xl rounded-2xl border border-gray-50 animate-bounce-slow">
            <p className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Starting From</p>
            <p className="text-xl font-black text-gray-900">PKR 49.00</p>
        </div>
    </div>
</div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-4xl font-bold font-display text-gray-900">What Our Clients Say</h2>
                        <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sana Khan", review: "The 9PM Rebel perfume is absolute perfection! Lasts all day and I get so many compliments.", role: "Verified Buyer" },
                            { name: "Ahmed Ali", review: "Great quality unstitched fabric. The color was exactly what I saw on the website. Highly recommended!", role: "Regular Customer" },
                            { name: "Fatima Noor", review: "Bedsheets are so soft and breathable. Best purchase for my new home.", role: "Home Maker" }
                        ].map((t, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex text-yellow-400 mb-4 items-center">
                                    {[...Array(5)].map((_, star) => <span key={star}>★</span>)}
                                </div>
                                <p className="text-gray-600 italic mb-6">"{t.review}"</p>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mr-3">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-900">{t.name}</h5>
                                        <p className="text-gray-400 text-xs">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

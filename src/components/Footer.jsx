import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand section */}
                    <div>
                        <Link to="/" className="text-2xl font-bold tracking-tighter text-gradient font-display mb-6 block">
                            kharediofy
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Your one-stop destination for premium fragrances, trendy apparel, and cozy home essentials. Quality meets style.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaFacebookF size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaWhatsapp size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-display">Quick Shop</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link to="/category/bedsheets" className="hover:text-primary transition-colors">Bedsheets</Link></li>
                            <li><Link to="/category/perfumes" className="hover:text-primary transition-colors">Perfumes</Link></li>
                            <li><Link to="/category/male-dresses" className="hover:text-primary transition-colors">Men's Collection</Link></li>
                            <li><Link to="/category/female-dresses" className="hover:text-primary transition-colors">Women's Collection</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-display">Customer Care</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Returns & Exchanges</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Size Guide</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6 font-display">Newsletter</h4>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            />
                            <button className="mt-4 w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-primary/20">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs text-center md:text-left gap-4">
                    <p>© 2024 kharediofy. All rights reserved. Designed for Excellence.</p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-gray-300">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

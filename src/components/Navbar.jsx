import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add listener
    document.addEventListener('click', handleClickOutside, true);
    
    // Also close on Escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.nav
      ref={navRef}
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b transition-all duration-300 ${
  scrolled
    ? "bg-slate-900/95 border-slate-700/80 shadow-lg"
    : "bg-transparent border-transparent"
}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-cyan-500 rounded-lg flex items-center justify-center overflow-hidden">
  <img
    src="/WebocoreLogo.png"
    alt="logo"
    className="w-full h-full object-contain"
  />
</div>
            <span className="font-bold text-xl text-white">Webocore</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-slate-300 hover:text-primary-400 transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-primary-500/50 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-primary-400 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
  initial={false}
  animate={isOpen ? "open" : "closed"}
  variants={{
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 }
  }}
  transition={{ duration: 0.3 }}
  className={`md:hidden fixed top-16 left-0 w-full bg-slate-900/95 backdrop-blur-xl px-6 py-6 space-y-4 border-t border-slate-700/50 ${
    isOpen ? "block" : "hidden"
  }`}
>
          <div className="px-4 py-4 space-y-3 border-t border-slate-700/50">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block text-center text-lg text-slate-300 hover:text-cyan-400 font-medium py-3"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white text-center font-semibold"
            >
              Admin
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Footer = () => {
  const services = ['Web Development', 'IT Consulting', 'Cloud Solutions'];
  const company = ['About', 'Services', 'Contact'];
  const legal = ['Privacy', 'Terms', 'Security'];

  return (
    <footer className="bg-slate-900 border-t border-slate-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Branding */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                W
              </div>
              <span className="font-bold text-xl text-white">Webocore</span>
            </div>
            <p className="text-slate-400 text-sm">
              Building smart digital solutions for modern businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {legal.map((item) => (
                <li key={item}>
                  <span className="text-slate-400 hover:text-cyan-400 transition cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-700/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400 text-xs sm:text-sm text-center md:text-left">
            © 2024 Webocore. All rights reserved.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition text-sm"
              >
                {social}
              </a>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
};
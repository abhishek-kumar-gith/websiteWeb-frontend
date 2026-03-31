import React, { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Zap, Shield, Globe } from 'lucide-react';
import AnimatedGradientBox from '../components/AnimatedGradientBox';
import LoadingScreen from '../components/LoadingScreen';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Build scalable, modern web applications with cutting-edge technologies',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Cloud Solutions',
      description: 'Deploy and manage cloud infrastructure with AWS, Azure, and GCP',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade security and compliance for your applications',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Globe,
      title: 'Global Scale',
      description: 'Reach users worldwide with optimized, lightning-fast applications',
      color: 'from-purple-500 to-pink-600',
    },
  ];

  const stats = [
    { number: '500+', label: 'Projects Delivered', suffix: '' },
    { number: '100+', label: 'Happy Clients', suffix: '' },
    { number: '15+', label: 'Years Experience', suffix: '' },
    { number: '24/7', label: 'Support Available', suffix: '' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="min-h-screen bg-slate-950 text-white overflow-visible">
        {/* Animated background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center py-20 lg:py-32">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            {/* Main Hero Content with Left, Center, Right Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left Content */}
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible" 
                className="space-y-6 sm:space-y-8"
              >
                <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center px-4 sm:px-5 py-2 sm:py-2.5 bg-white/10 border border-cyan-500 rounded-full text-cyan-300 text-xs sm:text-sm font-semibold hover:bg-white/15 transition-colors"
                  >
                    Welcome to Webocore
                  </motion.div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Next-Gen
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                      Tech Solutions
                    </span>
                  </h1>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-lg font-light"
                >
                  Transform your business with innovative technology solutions. We build scalable, modern applications that drive growth and success.
                </motion.p>

                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-wrap pt-4">
                  <motion.button
                    onClick={() => navigate('/projects')}
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all shadow-lg flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base"
                  >
                    Explore Solutions <ArrowRight size={18} className="hidden sm:inline" />
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/about')}
                    whileHover={{ scale: 1.05, borderColor: '#06b6d4', backgroundColor: 'rgba(6, 182, 212, 0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-cyan-500 text-cyan-400 rounded-lg font-semibold transition-all text-sm sm:text-base"
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                {/* Tech Stack */}
                <motion.div variants={itemVariants} className="pt-6 sm:pt-8 space-y-2 sm:space-y-3">
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Built With Modern Tech</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'TypeScript', 'Cloud Native', 'DevOps'].map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ scale: 1.08, backgroundColor: 'rgba(6, 182, 212, 0.3)' }}
                        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 border border-cyan-500/30 rounded-full text-xs text-cyan-300 font-medium hover:border-cyan-400"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Right - 3D Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-auto sm:h-80 lg:h-96 xl:h-[450px] w-full flex justify-center items-start mt-10 sm:mt-14 lg:mt-0"
              >
                <AnimatedGradientBox />
              </motion.div>
            </div>
          </div>

        </section>

        {/* Stats Section */}
        <section className="pt-0 pb-12 sm:pb-16 lg:pb-20 px-4 mt-16 sm:mt-20 lg:mt-24">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1 sm:mb-2 group-hover:scale-110 transition-transform"
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12 sm:mb-16 lg:mb-20"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">Our Services</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto px-4">
                Comprehensive technology solutions tailored to your business needs
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={{ translateY: -8, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)' }}
                    className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${service.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-xl`}
                    >
                      <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base mb-3 sm:mb-4">{service.description}</p>
                    <motion.div whileHover={{ x: 4 }} className="flex items-center gap-2 text-cyan-400 font-semibold text-sm sm:text-base">
                      Learn More <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl sm:rounded-3xl p-8 sm:p-12 lg:p-16 backdrop-blur-xl"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-white">
                Ready to Transform Your <span className="text-cyan-400">Business?</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Let's discuss how we can help you achieve your goals with innovative technology solutions
              </p>
              <motion.button
                onClick={() => navigate('/contact')}
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(6, 182, 212, 0.6)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-bold text-base sm:text-lg transition-all shadow-xl hover:shadow-cyan-500/50"
              >
                Start Your Journey
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;

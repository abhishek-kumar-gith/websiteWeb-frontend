import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Zap } from 'lucide-react';
import AnimatedGradientBox from '../components/AnimatedGradientBox';

const AboutPage = () => {
  const values = [
    {
      title: 'Innovation',
      description: 'We push boundaries with cutting-edge technology and creative solutions daily.',
      icon: Zap,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      title: 'Quality',
      description: 'Excellence is non-negotiable in every project and deliverable we create.',
      icon: Award,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Reliability',
      description: 'Your success is our mission with 24/7 support and consistent delivery.',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Teamwork',
      description: 'Collaborative approach bringing best minds together for solutions.',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 relative">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 sm:space-y-8"
          >
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2 sm:mb-4">
                About WEBOCORE
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300">
                Innovative IT solutions for the modern digital world
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
              WEBOCORE was founded with a vision to revolutionize IT services through innovative technology, creative solutions, and unwavering commitment to client success.
            </p>

            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Our Story</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Starting from a small team of passionate developers, we've grown into a trusted technology partner serving businesses worldwide. Our journey is defined by continuous innovation and excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400">50+</p>
                <p className="text-gray-400 text-sm sm:text-base">Projects Delivered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <p className="text-2xl sm:text-3xl font-bold text-blue-400">20+</p>
                <p className="text-gray-400 text-sm sm:text-base">Happy Clients</p>
              </div>
            </div>
          </motion.div>

          {/* Animated Gradient Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-64 sm:h-80 lg:h-96 xl:h-full min-h-64 relative mt-8 lg:mt-0"
          >
            <AnimatedGradientBox />
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="min-h-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
              These principles guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ translateY: -8, boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)' }}
                  className="p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 hover:border-cyan-400/50 transition-all group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className={`w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${value.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:shadow-xl`}
                  >
                    <Icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3">{value.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="min-h-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-14 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Our Founders
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
              Visionary leaders driving innovation in IT solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {[
              { name: 'Avnish Kumar', role: 'Founder & CEO', specialty: 'Strategic Leadership' },
              { name: 'Abhishek Kumar', role: 'Co-Founder & CTO', specialty: 'Technical Innovation' },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-xl border border-cyan-500/20 rounded-lg sm:rounded-2xl p-6 sm:p-8 text-center hover:border-cyan-400/50 transition-all"
              >
                <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 mx-auto mb-3 sm:mb-4 flex items-center justify-center text-2xl sm:text-4xl">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-cyan-400 text-sm sm:text-base mb-2">{member.role}</p>
                <p className="text-gray-400 text-xs sm:text-sm">{member.specialty}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

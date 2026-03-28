import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientBox from '../components/AnimatedGradientBox';

const ProjectsPage = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack web application with React, Node.js, and MongoDB',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      year: '2024',
    },
    {
      title: '3D Data Visualization',
      description: 'Interactive 3D dashboard using Three.js and Babylon.js',
      tags: ['Three.js', 'React', 'D3.js', 'WebGL'],
      year: '2024',
    },
    {
      title: 'Cloud Migration Suite',
      description: 'Enterprise solution for AWS to Azure cloud migration',
      tags: ['AWS', 'Azure', 'Terraform', 'Python'],
      year: '2023',
    },
    {
      title: 'Real-time Chat Application',
      description: 'WebSocket-based chat with encryption and file sharing',
      tags: ['Socket.io', 'React', 'Express', 'Redis'],
      year: '2023',
    },
    {
      title: 'AI Content Generator',
      description: 'Machine learning-powered content creation tool',
      tags: ['Python', 'TensorFlow', 'React', 'FastAPI'],
      year: '2024',
    },
    {
      title: 'Mobile Banking App',
      description: 'Cross-platform financial management application',
      tags: ['React Native', 'Firebase', 'Biometric', 'SSL'],
      year: '2023',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
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
                Our Projects
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-300">
                Showcasing innovation and excellence in every line of code
              </p>
            </div>

            <p className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed">
              Our portfolio demonstrates expertise across web development, cloud solutions, AI/ML, and enterprise applications. Each project reflects our commitment to quality and innovation.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  50+
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">Projects Completed</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Across various industries</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  20+
                </div>
                <div>
                  <p className="font-semibold text-white text-sm sm:text-base">Global Clients</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Trusted partnerships</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Animated Gradient Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-64 sm:h-80 lg:h-96 xl:h-[600px] relative"
          >
            <AnimatedGradientBox />
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="min-h-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Featured Works
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-gray-400 max-w-2xl mx-auto">
              From concept to deployment, we deliver excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ translateY: -10 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-2xl p-6 sm:p-8 hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs sm:text-sm lg:text-base text-gray-400 mb-4 sm:mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-gray-300 group-hover:border-cyan-500/50 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/50 text-cyan-400 rounded-lg hover:from-cyan-500/40 hover:to-blue-600/40 transition-all text-xs sm:text-sm font-semibold"
                >
                  View Project
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;

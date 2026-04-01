import React from 'react';
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
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-60 sm:w-80 lg:w-96 h-60 sm:h-80 lg:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* HERO SECTION */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-24 sm:pb-28 lg:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Our Projects
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-gray-300">
              Showcasing innovation and excellence in every line of code
            </p>

            <p className="text-xs sm:text-base lg:text-lg text-gray-400 leading-relaxed">
              Our portfolio demonstrates expertise across web development, cloud solutions, AI/ML, and enterprise applications.
            </p>

            {/* STATS */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {[
                { value: '50+', label: 'Projects Completed' },
                { value: '20+', label: 'Global Clients' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center font-bold">
                    {item.value}
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{item.label}</p>
                    <p className="text-gray-400 text-xs">Across industries</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="h-56 sm:h-72 lg:h-96 xl:h-[500px] w-full mt-6 lg:mt-0"
          >
            <AnimatedGradientBox />
          </motion.div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 mt-6 sm:mt-0 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* TITLE */}
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Featured Works
            </h2>
            <p className="text-xs sm:text-base text-gray-400 mt-2">
              From concept to deployment
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 sm:p-6 hover:border-cyan-500/50 transition"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="text-sm sm:text-lg font-bold">{project.title}</h3>
                  <span className="text-[10px] sm:text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs px-2 py-1 bg-white/10 border border-white/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button className="w-full py-2 text-xs sm:text-sm font-semibold border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition">
                  View Project
                </button>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default ProjectsPage;
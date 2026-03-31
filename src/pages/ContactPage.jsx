import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { contactAPI } from '../api/client';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    services: [],
    message: '',
  });

  const services = [
    'Web Development',
    'Cloud Solutions',
    'Mobile Development',
    'Cybersecurity',
    'IT Consulting',
    'Business Analytics',
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.services || formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 5) {
      newErrors.message = 'Message must be at least 5 characters';
    } else if (formData.message.length > 5000) {
      newErrors.message = 'Message cannot exceed 5000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'webocore@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8877 9984 83',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Remote • Global',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'services') {
      // Handle checkbox selection for services
      setFormData((prev) => {
        const services = prev.services || [];
        if (services.includes(value)) {
          // Remove if already selected
          return {
            ...prev,
            services: services.filter((s) => s !== value),
          };
        } else {
          // Add if not selected
          return {
            ...prev,
            services: [...services, value],
          };
        }
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    console.log('🚀 SENDING DATA:', formData);
    console.log('📋 Services being sent:', formData.services);
    console.log('📊 Services is array?', Array.isArray(formData.services));
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        services: formData.services,
        message: formData.message,
      };

      console.log('📤 Final API payload:', JSON.stringify(payload, null, 2));
      
      await contactAPI.submitForm(payload);
      
      console.log('✅ Form submitted successfully');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', services: [], message: '' });
      setErrors({});

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('❌ Submission error:', error);
      console.error('❌ Error response:', error.response?.data);
      const errorMsg = error.response?.data?.message || 'Something went wrong. Please try again.';
      setSubmitStatus({ type: 'error', message: errorMsg });
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Hero Section */}
      <section className="min-h-auto flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 relative">
        <div className="max-w-6xl w-full">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2 sm:mb-4">
              Get In Touch
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto px-2">
              Have a question or ready to start your project? We'd love to hear from you. Let's create something amazing together.
            </p>
          </motion.div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  whileHover={{ translateY: -5 }}
                  className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg sm:rounded-2xl p-6 sm:p-8 text-center hover:border-cyan-500/50 transition-all"
                >
                  <div className="w-10 sm:w-14 lg:w-16 h-10 sm:h-14 lg:h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-cyan-500/30">
                    <Icon className="w-5 sm:w-6 lg:w-8 h-5 sm:h-6 lg:h-8 text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-1 sm:mb-2">{info.label}</h3>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-400">{info.value}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8">Send us a message</h2>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2 text-xs sm:text-sm lg:text-base"
              >
                <span>✓</span>
                Thank you! Your message has been sent successfully.
              </motion.div>
            )}

            {submitStatus?.type === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm lg:text-base"
              >
                {submitStatus.message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  {errors.name && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.name}</p>}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                  {errors.email && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.email}</p>}
                </motion.div>
              </div>

              {/* Phone and Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                <motion.input
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
                <motion.input
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  type="text"
                  name="subject"
                  placeholder="Subject (optional)"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Service Selection */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="text-sm font-semibold text-gray-300 mb-3 block">
                  Select Services * <span className="text-red-400">(at least one required)</span>
                </label>
                <div className={`bg-white/10 border rounded-lg p-4 sm:p-5 transition-all ${
                  errors.services ? 'border-red-500/50' : 'border-white/20'
                }`}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-white/40 bg-white/10 text-purple-500 focus:ring-purple-500 cursor-pointer accent-purple-500"
                        />
                        <span className="text-sm sm:text-base text-gray-200 group-hover:text-white transition-colors">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                {formData.services.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.services.map((service) => (
                      <motion.span
                        key={service}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="inline-block text-xs px-3 py-1.5 bg-purple-500/40 text-purple-200 rounded-full border border-purple-500/30 font-medium"
                      >
                        ✓ {service}
                      </motion.span>
                    ))}
                  </div>
                )}
                {errors.services && <p className="text-red-400 text-xs sm:text-sm mt-2">{errors.services}</p>}
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.message}</p>}
                <p className="text-gray-500 text-xs sm:text-sm mt-2">{formData.message.length}/5000</p>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 text-sm sm:text-base"
              >
                <Send size={16} className="sm:w-5 sm:h-5" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

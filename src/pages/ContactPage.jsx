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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.services.length) newErrors.services = 'Select at least one service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'webocore@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 8877 9984 83' },
    { icon: MapPin, label: 'Location', value: 'Remote • Global' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'services') {
      setFormData((prev) => {
        const list = prev.services;
        return list.includes(value)
          ? { ...prev, services: list.filter((s) => s !== value) }
          : { ...prev, services: [...list, value] };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await contactAPI.submitForm(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', services: [], message: '' });
      setErrors({});
    } catch {
      setSubmitStatus({ type: 'error', message: 'Something went wrong' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cyan-400">
              Get In Touch
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Let’s build something amazing together 🚀
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="bg-white/10 p-6 rounded-xl text-center">
                  <Icon className="mx-auto mb-3 text-cyan-400" />
                  <h3 className="font-bold">{info.label}</h3>
                  <p className="text-gray-400">{info.value}</p>
                </div>
              );
            })}
          </div>

          {/* Form */}
          <div className="max-w-4xl mx-auto bg-white/10 p-6 sm:p-10 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 rounded bg-black/30 w-full"
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded bg-black/30 w-full"
                />
              </div>

              {/* Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((s) => (
                  <label key={s} className="flex gap-2 items-center">
                    <input
                      type="checkbox"
                      name="services"
                      value={s}
                      checked={formData.services.includes(s)}
                      onChange={handleChange}
                    />
                    {s}
                  </label>
                ))}
              </div>

              {/* Message */}
              <textarea
                name="message"
                rows="5"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 rounded bg-black/30"
              />

              {/* Button */}
              <button
                disabled={isSubmitting}
                className="w-full bg-cyan-500 py-3 rounded font-bold"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../context/AdminContext';
import { LogOut, Trash2, X } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const { adminUser, adminLogout } = useAdmin();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Fetch messages from database
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('adminToken');
        
        if (!token) {
          setError('No authentication token found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('📥 API Response:', response.data);
        console.log('📋 Contacts count:', response.data.data?.length);
        
        if (response.data.data && response.data.data.length > 0) {
          console.log('📋 First contact object:', JSON.stringify(response.data.data[0], null, 2));
          console.log('📋 First contact services:', response.data.data[0].services);
        }
        
        setMessages(response.data.data || []);
      } catch (err) {
        console.error('❌ Error fetching messages:', err);
        console.error('❌ Error response:', err.response?.data);
        setError(err.response?.data?.message || 'Failed to load messages. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      setDeleting(id);
      const token = localStorage.getItem('adminToken');
      
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/contacts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      // Remove from local state
      setMessages(messages.filter(msg => msg._id !== id));
      setSelectedMessage(null); // Close modal if open
    } catch (err) {
      console.error('Error deleting message:', err);
      setError(err.response?.data?.message || 'Failed to delete message');
    } finally {
      setDeleting(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const handleModalBackdropClick = (e) => {
    // Only close if clicking on the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleOpenMessage = (message) => {
    console.log('📖 Opening message modal');
    console.log('📋 Message services:', message.services);
    console.log('📋 Message service (legacy):', message.service);
    console.log('📋 Services type:', typeof message.services);
    console.log('📋 Is array?', Array.isArray(message.services));
    console.log('📋 Services length:', message.services?.length);
    console.log('📋 Full message object:', JSON.stringify(message, null, 2));
    setSelectedMessage(message);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold text-white mb-2">Contact Messages</h1>
            <p className="text-gray-400">Welcome, <span className="text-cyan-400 font-semibold">{adminUser?.email}</span></p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-6 py-3 rounded-lg transition-all"
          >
            <LogOut size={20} />
            Logout
          </motion.button>
        </motion.div>

        {/* Messages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Messages from Contact Form</h2>
            <span className="text-sm text-gray-400">Total: {messages.length}</span>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Loading state */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-cyan-400 border-solid"></div>
              <p className="text-gray-400 mt-4">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <p className="text-gray-400 text-center py-8">✨ No messages yet</p>
          ) : (
            <div className="space-y-4">
              {messages.map((contact) => {
                const createdDate = new Date(contact.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                });

                return (
                  <motion.div
                    key={contact._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
                    onClick={() => handleOpenMessage(contact)}
                    className="bg-white/5 border border-white/10 rounded-lg p-6 transition-all cursor-pointer hover:border-white/30"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-white text-lg">{contact.name}</h3>
                          <span className="text-xs px-2 py-1 bg-cyan-500/30 text-cyan-300 rounded">
                            {contact.isRead ? 'Read' : 'New'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{contact.email}</p>
                        
                        {/* Phone Badge */}
                        {contact.phone && (
                          <div className="mb-3">
                            <span className="inline-block text-xs px-3 py-1 bg-purple-500/40 text-purple-200 rounded-full border border-purple-500/30">
                              📞 {contact.phone}
                            </span>
                          </div>
                        )}

                        {/* Services Badges */}
                        {(contact.services || contact.service) && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-2">
                              {/* Handle services array */}
                              {Array.isArray(contact.services) && contact.services.length > 0 && (
                                <>
                                  {contact.services.map((svc, idx) => (
                                    <span
                                      key={idx}
                                      className="inline-block text-xs px-3 py-1.5 bg-purple-500/40 text-purple-200 rounded-full border border-purple-500/30 font-medium hover:bg-purple-500/50 transition-colors"
                                    >
                                      ✓ {svc}
                                    </span>
                                  ))}
                                </>
                              )}
                              {/* Handle single service string (for backward compatibility) */}
                              {!Array.isArray(contact.services) && contact.service && (
                                <span className="inline-block text-xs px-3 py-1.5 bg-purple-500/40 text-purple-200 rounded-full border border-purple-500/30 font-medium hover:bg-purple-500/50 transition-colors">
                                  ✓ {contact.service}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Subject Badge */}
                        {contact.subject && (
                          <div className="mb-3">
                            <span className="inline-block text-xs px-3 py-1 bg-indigo-500/40 text-indigo-200 rounded-full border border-indigo-500/30">
                              📝 {contact.subject}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-3">{createdDate}</p>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteMessage(contact._id)}
                          disabled={deleting === contact._id}
                          className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-3 py-2 rounded-lg transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={16} />
                          {deleting === contact._id ? 'Deleting...' : 'Delete'}
                        </motion.button>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed border-t border-white/10 pt-4">"{contact.message}"</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Detailed Message Modal */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalBackdropClick}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/20 rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 flex justify-between items-center bg-slate-900/95 backdrop-blur p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Message Details</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Name Section */}
                <div>
                  <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Full Name</p>
                  <p className="text-lg sm:text-xl text-white font-semibold">{selectedMessage.name}</p>
                </div>

                {/* Email & Status Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Email</p>
                    <p className="text-white break-all">{selectedMessage.email}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Status</p>
                    <span className="inline-block text-xs px-3 py-1.5 bg-cyan-500/30 text-cyan-300 rounded-full border border-cyan-500/50 font-medium">
                      {selectedMessage.isRead ? '📖 Read' : '🆕 New'}
                    </span>
                  </div>
                </div>

                {/* Phone Section */}
                {selectedMessage.phone && (
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Phone</p>
                    <span className="inline-block text-xs px-4 py-2 bg-purple-500/40 text-purple-200 rounded-full border border-purple-500/30 font-medium">
                      📞 {selectedMessage.phone}
                    </span>
                  </div>
                )}

                {/* Services Section */}
                <div>
                  <p className="text-xs uppercase text-gray-500 font-semibold mb-3">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedMessage.services ? (
                      Array.isArray(selectedMessage.services) && selectedMessage.services.length > 0 ? (
                        selectedMessage.services.map((svc, idx) => (
                          <span
                            key={idx}
                            className="inline-block text-sm px-3 py-1 bg-purple-500 text-white rounded-full font-medium"
                          >
                            {svc}
                          </span>
                        ))
                      ) : null
                    ) : null}
                    
                    {(!selectedMessage.services || (Array.isArray(selectedMessage.services) && selectedMessage.services.length === 0)) && !selectedMessage.service && (
                      <span className="text-gray-400 italic text-sm">
                        ℹ️ No services recorded (contact created before services feature was added)
                      </span>
                    )}
                    
                    {selectedMessage.service && !selectedMessage.services && (
                      <span className="inline-block text-sm px-3 py-1 bg-purple-500 text-white rounded-full font-medium">
                        {selectedMessage.service}
                      </span>
                    )}
                  </div>
                </div>

                {/* Subject Section */}
                {selectedMessage.subject && (
                  <div>
                    <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Subject</p>
                    <p className="text-white bg-white/5 border border-white/10 rounded-lg p-4">
                      {selectedMessage.subject}
                    </p>
                  </div>
                )}

                {/* Full Message Section */}
                <div>
                  <p className="text-xs uppercase text-gray-500 font-semibold mb-3">Message</p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {/* Date Section */}
                <div className="border-t border-white/10 pt-4">
                  <p className="text-xs uppercase text-gray-500 font-semibold mb-2">Received On</p>
                  <p className="text-gray-300">
                    {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleDeleteMessage(selectedMessage._id);
                    }}
                    disabled={deleting === selectedMessage._id}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={18} />
                    {deleting === selectedMessage._id ? 'Deleting...' : 'Delete Message'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseModal}
                    className="flex-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 px-4 py-3 rounded-lg transition-all font-medium"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;

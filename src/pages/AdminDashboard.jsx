import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { adminAPI, contactAPI } from '../api/client';
import { LogOut, Trash2 } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      fetchContacts();
    }
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await adminAPI.login(loginData);
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      fetchContacts();
    } catch {
      alert('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete message?')) return;
    await contactAPI.delete(id);
    setContacts(contacts.filter((c) => c._id !== id));
    setSelectedContact(null);
  };

  // LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-slate-800 p-6 rounded-xl w-full max-w-sm">
          <h2 className="text-xl text-white mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 rounded bg-black/30"
            />
            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 rounded bg-black/30"
            />
            <button className="w-full bg-cyan-500 py-2 rounded">
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-4xl text-white font-bold">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 rounded"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - LIST */}
          <div className="bg-slate-800 rounded-xl p-4 max-h-[500px] overflow-y-auto">
            {contacts.length === 0 ? (
              <p className="text-gray-400 text-center">No messages</p>
            ) : (
              contacts.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className="p-3 border-b border-gray-700 cursor-pointer hover:bg-slate-700"
                >
                  <p className="text-white">{c.name}</p>
                  <p className="text-sm text-gray-400">{c.email}</p>
                </div>
              ))
            )}
          </div>

          {/* RIGHT - DETAIL */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
            {selectedContact ? (
              <>
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-xl text-white">{selectedContact.name}</h2>
                    <p className="text-gray-400">{selectedContact.email}</p>
                  </div>
                  <button onClick={() => handleDelete(selectedContact._id)}>
                    <Trash2 />
                  </button>
                </div>

                <p className="text-gray-300">{selectedContact.message}</p>
              </>
            ) : (
              <p className="text-gray-400 text-center">
                Select a message
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
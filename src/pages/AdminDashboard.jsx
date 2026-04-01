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

  // ================= LOGIN =================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-900">
        <div className="bg-slate-800 p-6 sm:p-8 rounded-xl w-full max-w-sm shadow-lg">
          <h2 className="text-xl sm:text-2xl text-white mb-4 text-center font-semibold">
            Admin Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-3 rounded bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-3 rounded bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 transition py-2 rounded font-semibold">
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= DASHBOARD =================
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-16 bg-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold text-center sm:text-left">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - CONTACT LIST */}
          <div className="bg-slate-800 rounded-xl p-4 h-auto lg:h-[500px] overflow-y-auto">
            {contacts.length === 0 ? (
              <p className="text-gray-400 text-center">No messages</p>
            ) : (
              contacts.map((c) => (
                <div
                  key={c._id}
                  onClick={() => setSelectedContact(c)}
                  className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-slate-700 transition ${
                    selectedContact?._id === c._id ? 'bg-slate-700' : ''
                  }`}
                >
                  <p className="text-white font-medium text-sm sm:text-base">
                    {c.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {c.email}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* RIGHT - DETAILS */}
          <div className="lg:col-span-2 bg-slate-800 rounded-xl p-4 sm:p-6 min-h-[200px]">
            {selectedContact ? (
              <>
                <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-lg sm:text-xl text-white font-semibold">
                      {selectedContact.name}
                    </h2>
                    <p className="text-sm text-gray-400 break-all">
                      {selectedContact.email}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedContact._id)}
                    className="self-start sm:self-auto text-red-400 hover:text-red-500"
                  >
                    <Trash2 />
                  </button>
                </div>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed break-words">
                  {selectedContact.message}
                </p>
              </>
            ) : (
              <p className="text-gray-400 text-center mt-10">
                Select a message
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
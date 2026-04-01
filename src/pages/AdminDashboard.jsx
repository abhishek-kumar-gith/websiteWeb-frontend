import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, contactAPI } from '../api/client';
import { LogOut, Trash2 } from 'lucide-react';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
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
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              className="w-full p-3 rounded bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
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
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-bold text-center sm:text-left">
            Messages from Contact Form
          </h1>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* CARD LIST */}
        <div className="space-y-6">

          {contacts.length === 0 ? (
            <p className="text-gray-400 text-center">No messages</p>
          ) : (
            contacts.map((c) => (
              <div
                key={c._id}
                className="bg-slate-800/60 border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 backdrop-blur-md"
              >

                {/* TOP */}
               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 w-full">

  {/* LEFT */}
  <div className="flex-1 min-w-0">
    <div className="flex items-center gap-2 flex-wrap">
      <h3 className="text-white font-semibold text-sm sm:text-base">
        {c.name}
      </h3>

      <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">
        New
      </span>
    </div>

    <p className="text-gray-400 text-xs sm:text-sm break-all">
      {c.email}
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:justify-end w-full sm:w-auto">

    <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
      Apr 1, 2026, 09:40 AM
    </span>

    <button
      onClick={() => handleDelete(c._id)}
      className="flex items-center gap-1 px-2 sm:px-3 py-1 text-xs sm:text-sm shrink-0 border border-red-500 text-red-400 rounded hover:bg-red-500/10 transition"
    >
      <Trash2 size={14} /> Delete
    </button>

  </div>
</div>

                {/* SERVICES */}
                <div className="flex flex-wrap gap-2">
                  {c.services?.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>

                {/* MESSAGE */}
                <div className="border-t border-white/10 pt-3">
                  <p className="text-gray-300 text-xs sm:text-sm break-words">
                    "{c.message}"
                  </p>
                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};
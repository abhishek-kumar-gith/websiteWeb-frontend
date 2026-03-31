import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_BASE_URL;

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    // Check if admin is logged in on mount
    const storedAdmin = localStorage.getItem('adminUser');
    const storedToken = localStorage.getItem('adminToken');
    if (storedAdmin && storedToken) {
      try {
        setAdminUser(JSON.parse(storedAdmin));
        setIsAdminLoggedIn(true);
      } catch (error) {
        console.error('Error parsing admin user:', error);
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminToken');
      }
    }
  }, []);

  const adminLogin = async (email, password) => {
    try {
      // Call backend login endpoint
      const response = await axios.post(`${API}/api/admin/login`, {
  email,
  password
});

      if (response.data.success && response.data.token) {
        const adminData = {
          email: response.data.admin.email,
          name: response.data.admin.name,
          id: response.data.admin.id,
          loginTime: new Date().toISOString()
        };
        
        // Save both user data and token
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        localStorage.setItem('adminToken', response.data.token);
        
        setAdminUser(adminData);
        setIsAdminLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminToken');
    setAdminUser(null);
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminUser, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};

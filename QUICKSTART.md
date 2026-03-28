# Quick Start Guide - 3D Interactive Frontend

## ⚡ Get Started in 3 Minutes

### 1. Install & Run

```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

Open browser: `http://localhost:5173`

### 2. Explore the Website

- **Home** - Click "Explore Projects" for smooth scroll
- **About** - Learn about the company with 3D animations
- **Projects** - Browse portfolio with 50+ projects
- **Contact** - Send a message using the form

### 3. Access Admin Dashboard

1. **Go to**: `http://localhost:5173/admin-secret-123/login`
2. **Login with**:
   - Email: `admin@webocore.com`
   - Password: `Admin@123456`
3. **Explore**: Three tabs - Overview, Contacts, Settings

---

## 🎯 Key Features

✅ **3D Elements**
- Rotating cube on home page
- Floating objects on about page  
- Particle cloud on projects page

✅ **Animations**
- Smooth page transitions
- Hover effects on buttons
- Loading screen with animated elements

✅ **Admin Panel**
- Dashboard with metrics
- Contact submissions view
- Settings management
- Secure logout

---

## 🔧 Customization Quick Tips

### Change Colors
Edit `tailwind.config.js` and look for cyan/blue color definitions

### Add New Page
1. Create file: `src/pages/MyPage.jsx`
2. Add route in `App.jsx`
3. Import and use: `<Route path="/my-page" element={<MyPage />} />`

### Modify Admin Credentials
Edit `src/context/AdminContext.jsx` line 16-19:
```javascript
const adminCredentials = {
  email: 'your-email@example.com',
  password: 'your-password'
};
```

### Change Theme
Modify background colors and gradients in page components (search for `from-slate-900`)

---

## 📦 Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

Output in `dist/` folder ready for deployment

---

## 🔗 Navigation

| Page | URL | Features |
|------|-----|----------|
| Home | `/` | 3D cube, features |
| About | `/about` | Company info, team |
| Projects | `/projects` | Portfolio grid |
| Contact | `/contact` | Contact form |
| Admin Login | `/admin-secret-123/login` | Secure login |
| Admin Panel | `/admin-secret-123` | Dashboard |

---

## 💡 Developer Tips

- Use `npm run dev` for hot reload development
- Press `F12` to open browser dev tools
- Check Console for any errors
- Test on mobile using Chrome DevTools
- Use React DevTools extension for state debugging

---

## 🚀 Next Steps

1. ✅ Explore all pages and features
2. ✅ Test admin login/logout
3. ✅ Try 3D interactions (rotate, hover)
4. ✅ Customize colors and content
5. ✅ Deploy to production

---

**Questions?** Check `3D_ADMIN_README.md` for detailed documentation!


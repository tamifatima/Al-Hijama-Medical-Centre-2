import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';

import Home from './pages/Home';
import About from './pages/About';
import Practitioners from './pages/Practitioners';
import SunnahDates from './pages/SunnahDates';
import Booking from './pages/Booking';
import BookingDetails from './pages/BookingDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

// Wrapper so we can use useLocation inside BrowserRouter
function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!isAdmin && !isAuth && <Navbar />}
      {isAdmin && <Navbar />}
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/practitioners" element={<Practitioners />} />
        <Route path="/sunnah-dates" element={<SunnahDates />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/details/:id" element={<BookingDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: 40 }}>
      <div style={{ fontSize: '5rem', marginBottom: 24 }}>🌙</div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--green-800)', marginBottom: 12 }}>404</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '1.05rem' }}>Page not found. Let's guide you back.</p>
      <a href="/" className="btn btn-primary"><i className="fas fa-home"></i> Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

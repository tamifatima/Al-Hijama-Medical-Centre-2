import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">
          <i className="fas fa-crescent"></i>☽
        </div>
        Al Hijama Medical Centre
      </Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
        <span style={{ opacity: menuOpen ? 0 : 1 }} />
        <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
      </button>

      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/about" className={isActive('/about')}>About Hijama</Link></li>
        <li><Link to="/practitioners" className={isActive('/practitioners')}>Practitioners</Link></li>
        <li><Link to="/sunnah-dates" className={isActive('/sunnah-dates')}>Sunnah Dates</Link></li>
        {user?.role === 'admin' && (
          <li><Link to="/admin" className={isActive('/admin')}>Admin</Link></li>
        )}
        {user ? (
          <>
            <li>
              <span className="nav-user">
                <i className="fas fa-user-circle" style={{ color: 'var(--green-600)' }}></i>
                {user.name}
              </span>
            </li>
            <li><button onClick={handleLogout} className="btn-outline" style={{ padding: '8px 18px', borderRadius: '100px', border: '1.5px solid var(--green-600)', color: 'var(--green-700)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)', fontWeight: 500 }}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login" className={isActive('/login')}>Login</Link></li>
            <li><Link to="/register" className="nav-cta">Register</Link></li>
          </>
        )}
        <li><Link to="/booking" className="nav-cta" style={{ background: 'var(--gold)', color: 'white', marginLeft: '4px' }}>Book Now</Link></li>
      </ul>
    </nav>
  );
}

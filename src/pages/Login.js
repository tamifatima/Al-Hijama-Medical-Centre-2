import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(p => ({ ...p, [f]: '' })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    if (!form.password) errs.password = 'Password is required';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = await login(form.email, form.password);
    setLoading(false);

    if (result.success) {
      showToast('Welcome back! 👋');
      navigate(result.role === 'admin' ? '/admin' : '/');
    } else {
      setErrors({ password: result.error });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">☽</div>
          <h2>Welcome Back</h2>
          <p>Sign in to your Al Hijama account</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className={`form-input ${errors.email ? 'error' : ''}`}
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className={`form-input ${errors.password ? 'error' : ''}`}
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={e => set('password', e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                <i className={`fas fa-eye${showPass ? '-slash' : ''}`}></i>
              </button>
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
            {loading
              ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span> Signing in...</>
              : <><i className="fas fa-sign-in-alt"></i> Sign In</>
            }
          </button>
        </form>

        {/* Admin hint */}
        <div style={{ marginTop: 20, padding: '14px', background: 'var(--green-50)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(30,100,60,0.1)', fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          <strong style={{ color: 'var(--green-700)' }}>Admin Demo:</strong> admin@alhijama.com / Admin@123
          <div style={{ marginTop: 6, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            If the admin account does not yet exist, it will be created automatically on first login.
          </div>
        </div>

        <div className="auth-footer">
          Don't have an account? <Link to="/register">Register here</Link>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

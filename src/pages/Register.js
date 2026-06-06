import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { register, showToast } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (f, v) => { setForm(p => ({ ...p, [f]: v })); setErrors(p => ({ ...p, [f]: '' })); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = await register(form.name, form.email, form.password);
    setLoading(false);

    if (result.success) {
      showToast('Account created successfully! Welcome 🎉');
      navigate('/');
    } else {
      setErrors({ email: result.error });
    }
  };

  const strength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['', '#dc2626', '#f59e0b', '#22c55e'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 500 }}>
        <div className="auth-logo">
          <div className="auth-logo-icon">☽</div>
          <h2>Create Account</h2>
          <p>Join Al Hijama Medical Centre</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className={`form-input ${errors.name ? 'error' : ''}`}
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Your full name"
            />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className={`form-input ${errors.email ? 'error' : ''}`}
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="you@example.com"
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
                placeholder="Min. 6 characters"
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPass(s => !s)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <i className={`fas fa-eye${showPass ? '-slash' : ''}`}></i>
              </button>
            </div>
            {form.password && (
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 4, background: '#e5e7eb', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${(strength / 3) * 100}%`, height: '100%', background: strengthColors[strength], borderRadius: 2, transition: 'all 0.3s' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: strengthColors[strength], fontWeight: 600 }}>{strengthLabels[strength]}</span>
              </div>
            )}
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              className={`form-input ${errors.confirm ? 'error' : ''}`}
              type="password"
              value={form.confirm}
              onChange={e => set('confirm', e.target.value)}
              placeholder="Re-enter your password"
            />
            {errors.confirm && <div className="form-error">{errors.confirm}</div>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }} disabled={loading}>
            {loading
              ? <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span> Creating account...</>
              : <><i className="fas fa-user-plus"></i> Create Account</>
            }
          </button>
        </form>

        <div className="auth-footer" style={{ marginTop: 24 }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

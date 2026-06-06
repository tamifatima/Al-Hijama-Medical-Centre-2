import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';

const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Other'];

export default function Booking() {
  const { user, addBooking, showToast } = useApp();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.name || '',
    gender: '',
    phoneNumber: '',
    city: '',
    address: '',
    practitioner: '',
    preferredDate: '',
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.gender) e.gender = 'Please select your gender';
    if (!form.phoneNumber.trim()) e.phoneNumber = 'Phone number is required';
    else if (!/^[\d\s+\-()]{10,15}$/.test(form.phoneNumber)) e.phoneNumber = 'Enter a valid phone number';
    if (!form.city) e.city = 'Please select your city';
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.practitioner) e.practitioner = 'Please choose a practitioner type';
    if (!form.preferredDate) e.preferredDate = 'Please select a preferred date';
    else if (new Date(form.preferredDate) < new Date().setHours(0, 0, 0, 0)) e.preferredDate = 'Date cannot be in the past';
    return e;
  };

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { navigate('/login'); return; }
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800)); // simulate async
    const booking = await addBooking(form);
    setSubmitting(false);
    showToast('Booking submitted successfully! 🎉');
    navigate(`/booking/details/${booking.id}`);
  };

  // Get today's date for min date input
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return (
    <>
      <div className="booking-page">
        <div className="booking-container">
          <div className="booking-header">
            <span className="section-label">Schedule Your Session</span>
            <h1 className="section-title">Book Your Hijama Session</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
              Fill in the form below and we'll confirm your appointment within 24 hours.
            </p>
            {!user && (
              <div style={{ background: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.25)', borderRadius: 'var(--radius-sm)', padding: '14px 20px', marginTop: 20, color: '#7a5e0a', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className="fas fa-info-circle"></i>
                <span>You need to <Link to="/login" style={{ fontWeight: 700, color: 'var(--green-700)' }}>log in</Link> or <Link to="/register" style={{ fontWeight: 700, color: 'var(--green-700)' }}>register</Link> to book a session.</span>
              </div>
            )}
          </div>

          <div className="booking-form-card">
            <form onSubmit={handleSubmit} noValidate>

              {/* Name & Gender */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className={`form-input ${errors.fullName ? 'error' : ''}`} type="text" value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Enter your full name" />
                  {errors.fullName && <div className="form-error">{errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select className={`form-input form-select ${errors.gender ? 'error' : ''}`} value={form.gender} onChange={e => set('gender', e.target.value)}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <div className="form-error">{errors.gender}</div>}
                </div>
              </div>

              {/* Phone & City */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input className={`form-input ${errors.phoneNumber ? 'error' : ''}`} type="tel" value={form.phoneNumber} onChange={e => set('phoneNumber', e.target.value)} placeholder="e.g. 0300 1234567" />
                  {errors.phoneNumber && <div className="form-error">{errors.phoneNumber}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <select className={`form-input form-select ${errors.city ? 'error' : ''}`} value={form.city} onChange={e => set('city', e.target.value)}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.city && <div className="form-error">{errors.city}</div>}
                </div>
              </div>

              {/* Address */}
              <div className="form-group">
                <label className="form-label">Home Address *</label>
                <textarea className={`form-input ${errors.address ? 'error' : ''}`} value={form.address} onChange={e => set('address', e.target.value)} placeholder="Enter your full home address for the practitioner to visit" rows={3} style={{ resize: 'vertical' }} />
                {errors.address && <div className="form-error">{errors.address}</div>}
              </div>

              {/* Practitioner */}
              <div className="form-group">
                <label className="form-label">Preferred Practitioner *</label>
                <div className="radio-group">
                  {['Male', 'Female'].map(p => (
                    <label key={p} className={`radio-option ${form.practitioner === p ? 'selected' : ''}`}>
                      <input type="radio" name="practitioner" value={p} checked={form.practitioner === p} onChange={() => set('practitioner', p)} />
                      <span>{p === 'Male' ? '👨‍⚕️ ' : '👩‍⚕️ '}{p} Practitioner</span>
                    </label>
                  ))}
                </div>
                {errors.practitioner && <div className="form-error">{errors.practitioner}</div>}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 8 }}>
                  <i className="fas fa-info-circle"></i> Female practitioners serve female clients; male practitioners serve male clients.
                </p>
              </div>

              {/* Date */}
              <div className="form-group">
                <label className="form-label">Preferred Session Date *</label>
                <input className={`form-input ${errors.preferredDate ? 'error' : ''}`} type="date" value={form.preferredDate} onChange={e => set('preferredDate', e.target.value)} min={today} max={maxDateStr} />
                {errors.preferredDate && <div className="form-error">{errors.preferredDate}</div>}
                <p style={{ fontSize: '0.8rem', color: 'var(--green-600)', marginTop: 6 }}>
                  💡 <Link to="/sunnah-dates" style={{ color: 'var(--green-600)', fontWeight: 600 }}>Check Sunnah dates</Link> for maximum benefit.
                </p>
              </div>

              <button type="submit" className="btn btn-primary booking-submit" disabled={submitting}>
                {submitting ? (
                  <><span style={{ display: 'inline-block', width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></span> Submitting...</>
                ) : (
                  <><i className="fas fa-calendar-check"></i> Confirm Booking</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <Footer />
    </>
  );
}

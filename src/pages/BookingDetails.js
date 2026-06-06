import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';

export default function BookingDetails() {
  const { id } = useParams();
  const { bookings, user } = useApp();

  const booking = bookings.find(b => b.id === id || b.id === Number(id));

  if (!booking) return <Navigate to="/" />;
  if (!user || (booking.userId !== user.id && user.role !== 'admin')) return <Navigate to="/login" />;

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <div className="success-page">
        <div className="success-card">
          <div className="success-icon">
            {booking.isApproved ? '✅' : '📋'}
          </div>

          <h2>{booking.isApproved ? 'Booking Approved!' : 'Booking Confirmed!'}</h2>
          <p className="subtitle">
            {booking.isApproved
              ? `Great news, ${booking.fullName}! Your session has been approved.`
              : `Thank you, ${booking.fullName}! We'll confirm your booking within 24 hours.`}
          </p>

          <ul className="booking-details-list">
            <li>
              <span className="detail-label"><i className="fas fa-user" style={{ width: 16, marginRight: 6 }}></i> Full Name</span>
              <span className="detail-value">{booking.fullName}</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-venus-mars" style={{ width: 16, marginRight: 6 }}></i> Gender</span>
              <span className="detail-value">{booking.gender}</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-phone" style={{ width: 16, marginRight: 6 }}></i> Phone</span>
              <span className="detail-value">{booking.phoneNumber}</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-city" style={{ width: 16, marginRight: 6 }}></i> City</span>
              <span className="detail-value">{booking.city}</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-map-marker-alt" style={{ width: 16, marginRight: 6 }}></i> Address</span>
              <span className="detail-value">{booking.address}</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-user-md" style={{ width: 16, marginRight: 6 }}></i> Practitioner</span>
              <span className="detail-value">{booking.practitioner} Practitioner</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-calendar" style={{ width: 16, marginRight: 6 }}></i> Preferred Date</span>
              <span className="detail-value">{formatDate(booking.preferredDate)}</span>
            </li>
            <li>
              <span className="detail-label"><i className="fas fa-circle-dot" style={{ width: 16, marginRight: 6 }}></i> Status</span>
              <span className={`status-badge ${booking.isApproved ? 'status-approved' : 'status-pending'}`}>
                {booking.isApproved ? '✅ Approved' : '⏳ Pending Review'}
              </span>
            </li>
          </ul>

          {!booking.isApproved && (
            <div style={{ background: 'rgba(201,162,39,0.08)', border: '1px solid rgba(201,162,39,0.2)', borderRadius: 'var(--radius-sm)', padding: '14px 18px', marginBottom: 24, fontSize: '0.88rem', color: '#7a5e0a', textAlign: 'left' }}>
              <i className="fas fa-clock" style={{ marginRight: 8 }}></i>
              Our team will review your booking and contact you within 24 hours to confirm the session.
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/" className="btn btn-outline">
              <i className="fas fa-home"></i> Back to Home
            </Link>
            <Link to="/booking" className="btn btn-primary">
              <i className="fas fa-calendar-plus"></i> Book Another
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

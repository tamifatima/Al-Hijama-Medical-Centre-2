import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { user, bookings, approveBooking, deleteBooking, logout } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [confirmDelete, setConfirmDelete] = useState(null);

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  const handleLogout = () => { logout(); navigate('/'); };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = !q || b.fullName?.toLowerCase().includes(q) || b.city?.toLowerCase().includes(q) || b.phoneNumber?.includes(q);
    const matchTab = activeTab === 'all' || (activeTab === 'pending' && !b.isApproved) || (activeTab === 'approved' && b.isApproved);
    return matchSearch && matchTab;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => !b.isApproved).length,
    approved: bookings.filter(b => b.isApproved).length,
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

  return (
    <div className="admin-page">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">☽ Al Hijama Admin</div>

        {[
          { icon: 'fa-tachometer-alt', label: 'Dashboard', tab: 'dashboard' },
          { icon: 'fa-calendar-check', label: 'All Bookings', tab: 'all' },
          { icon: 'fa-clock', label: 'Pending', tab: 'pending' },
          { icon: 'fa-check-circle', label: 'Approved', tab: 'approved' },
        ].map(item => (
          <button key={item.tab} className={`admin-nav-item ${activeTab === item.tab ? 'active' : ''}`} onClick={() => setActiveTab(item.tab)}>
            <i className={`fas ${item.icon}`}></i>
            {item.label}
          </button>
        ))}

        <div style={{ position: 'absolute', bottom: 24, left: 0, right: 0, padding: '0 24px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fas fa-user-shield" style={{ color: 'var(--gold-light)' }}></i>
            {user.name}
          </div>
          <button className="admin-nav-item" onClick={handleLogout} style={{ padding: '10px 0', color: 'rgba(255,255,255,0.5)' }}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">
        <div className="admin-header">
          <div>
            <h2 className="admin-title">Admin Dashboard</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>Welcome back, {user.name} 👋</p>
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', background: 'var(--white)', padding: '8px 18px', borderRadius: '100px', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(30,100,60,0.08)' }}>
            <i className="fas fa-calendar" style={{ marginRight: 6, color: 'var(--green-600)' }}></i>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon total"><i className="fas fa-calendar-alt"></i></div>
            <div>
              <div className="stat-value">{stats.total}</div>
              <div className="stat-name">Total Bookings</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending"><i className="fas fa-hourglass-half"></i></div>
            <div>
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-name">Pending Review</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon approved"><i className="fas fa-check-circle"></i></div>
            <div>
              <div className="stat-value">{stats.approved}</div>
              <div className="stat-name">Approved</div>
            </div>
          </div>
        </div>

        {/* BOOKINGS TABLE */}
        <div className="table-card">
          <div className="table-header">
            <h3>
              {activeTab === 'all' ? 'All Bookings' : activeTab === 'pending' ? '⏳ Pending Bookings' : '✅ Approved Bookings'}
              <span style={{ marginLeft: 10, background: 'var(--green-100)', color: 'var(--green-700)', padding: '2px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 700 }}>{filtered.length}</span>
            </h3>
            <input
              className="table-search"
              placeholder="Search name, city, phone..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No bookings found.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Practitioner</th>
                    <th>Date</th>
                    <th>Booked At</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, idx) => (
                    <tr key={b.id}>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{idx + 1}</td>
                      <td style={{ fontWeight: 600 }}>{b.fullName}</td>
                      <td>{b.gender}</td>
                      <td>{b.phoneNumber}</td>
                      <td>{b.city}</td>
                      <td>{b.practitioner}</td>
                      <td>{formatDate(b.preferredDate)}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{formatDate(b.createdAt)}</td>
                      <td>
                        <span className={`status-badge ${b.isApproved ? 'status-approved' : 'status-pending'}`}>
                          {b.isApproved ? '✅ Approved' : '⏳ Pending'}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          {!b.isApproved && (
                            <button className="btn-success-sm" onClick={() => approveBooking(b.id)}>
                              <i className="fas fa-check"></i> Approve
                            </button>
                          )}
                          <button className="btn-danger-sm" onClick={() => setConfirmDelete(b.id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* DELETE CONFIRMATION MODAL */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '40px', maxWidth: 420, width: '90%', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🗑️</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 8 }}>Delete Booking?</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: 28 }}>This action cannot be undone. The booking will be permanently removed.</p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button className="btn btn-outline" style={{ padding: '10px 24px' }} onClick={() => setConfirmDelete(null)}>Cancel</button>
              <button className="btn" style={{ background: '#dc2626', color: 'white', padding: '10px 24px' }} onClick={() => { deleteBooking(confirmDelete); setConfirmDelete(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

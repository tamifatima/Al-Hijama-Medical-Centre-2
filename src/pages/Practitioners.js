import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const practitioners = [
  {
    name: 'Ahsan Ishtiaq',
    gender: 'Male',
    phone: '0300 9444472',
    specialization: 'Certified Hijama Specialist',
    experience: '10+ years',
    for: 'Male Patients',
    icon: '👨‍⚕️',
    bio: 'Ahsan has been practicing traditional Hijama therapy for over a decade, trained in authentic Sunnah techniques. He specializes in therapeutic wet cupping for male patients.',
    skills: ['Wet Cupping', 'Dry Cupping', 'Sports Recovery', 'Pain Management'],
  },
  {
    name: 'Akhtar Parveen',
    gender: 'Female',
    phone: '0306 4707032',
    specialization: 'Certified Hijama Specialist',
    experience: '10+ years',
    for: 'Female Patients',
    icon: '👩‍⚕️',
    bio: 'Akhtar Parveen is our expert female practitioner, providing safe and professional Hijama therapy exclusively for female clients in a comfortable, private setting.',
    skills: ['Wet Cupping', 'Facial Cupping', 'Hormonal Balance', 'Wellness Cupping'],
  },
];

export default function Practitioners() {
  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, var(--green-900), var(--green-800))', padding: '140px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(42,173,110,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <span className="section-label" style={{ color: 'var(--gold-light)' }}>Our Team</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'white', marginBottom: 20, fontFamily: 'var(--font-display)' }}>Meet Our Experts</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.08rem', lineHeight: 1.8 }}>
            Certified, experienced, and dedicated to providing authentic Sunnah-based Hijama therapy at your home.
          </p>
        </div>
      </div>

      {/* PRACTITIONERS */}
      <section className="section">
        <div className="practitioners-grid">
          {practitioners.map((p) => (
            <div key={p.name} className="practitioner-card">
              <div className="practitioner-avatar">{p.icon}</div>
              <h3 className="practitioner-name">{p.name}</h3>
              <div className="practitioner-title">{p.specialization}</div>

              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 20, position: 'relative', zIndex: 1 }}>
                {p.bio}
              </p>

              <ul className="practitioner-details">
                <li><i className="fas fa-venus-mars"></i> <strong>Gender:</strong> {p.gender}</li>
                <li><i className="fas fa-phone"></i> <strong>Phone:</strong> {p.phone}</li>
                <li><i className="fas fa-user-friends"></i> <strong>Serving:</strong> {p.for}</li>
                <li><i className="fas fa-award"></i> <strong>Experience:</strong> {p.experience}</li>
              </ul>

              <div style={{ marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                {p.skills.map(skill => (
                  <span key={skill} style={{ background: 'var(--green-100)', color: 'var(--green-700)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600 }}>{skill}</span>
                ))}
              </div>

              <Link to="/booking" className="btn btn-primary" style={{ position: 'relative', zIndex: 1 }}>
                <i className="fas fa-calendar-check"></i>
                Book with {p.name.split(' ')[0]}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section-full">
        <div className="section-inner">
          <div className="text-center" style={{ marginBottom: 56 }}>
            <span className="section-label">Our Standards</span>
            <h2 className="section-title">Why Choose Our Practitioners?</h2>
            <p className="section-subtitle">We uphold the highest standards in authentic, safe Hijama practice.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { icon: '🎓', title: 'Certified', desc: 'All practitioners hold recognized Hijama therapy certifications.' },
              { icon: '🕌', title: 'Sunnah-Based', desc: 'Every session follows the prophetic method with full reverence.' },
              { icon: '🧪', title: 'Hygienic', desc: 'Sterile, disposable equipment used in every single session.' },
              { icon: '🏡', title: 'Home Service', desc: 'We come to you — professional therapy in your own space.' },
            ].map(i => (
              <div key={i.title} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: '32px 24px', textAlign: 'center', boxShadow: 'var(--shadow-sm)', border: '1px solid rgba(30,100,60,0.08)', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <div style={{ fontSize: '2.4rem', marginBottom: 16 }}>{i.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: 8 }}>{i.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

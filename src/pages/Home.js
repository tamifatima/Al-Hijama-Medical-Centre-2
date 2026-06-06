import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import heroBg from '../images/hij1.jpg';

const hadiths = [
  {
    text: '"Indeed, the best of remedies you have is cupping."',
    source: '— Anas ibn Malik (RA) | Sahih Bukhari'
  },
  {
    text: '"Healing is in three things: A gulp of honey, cupping, and branding with fire. But I forbid my followers to use branding with fire."',
    source: '— Ibn Abbas (RA) | Sahih Bukhari'
  },
  {
    text: '"The best treatment is cupping; it removes blood, lightens the back, and sharpens the eyesight."',
    source: '— Al-Hakim 4/212, At-Tirmidhi No: 3053'
  },
  {
    text: '"The best medicine with which you treat yourselves is Hijama, or it is one of the best of your medicines."',
    source: '— Sahih Bukhari No: 5371'
  },
];

const services = [
  {
    icon: '🏠',
    title: 'Home-Based Hijama',
    desc: 'Professional Hijama therapy in the comfort of your home by certified practitioners — no travel needed.',
  },
  {
    icon: '🩺',
    title: 'Certified Practitioners',
    desc: 'All our specialists are trained, certified, and experienced in authentic Sunnah-based cupping therapy.',
  },
  {
    icon: '🌙',
    title: 'Sunnah Date Guidance',
    desc: 'We help you schedule sessions on the recommended 17th, 19th & 21st of the lunar Hijri month.',
  },
];

const benefits = [
  { icon: '🫀', title: 'Improved Circulation', desc: 'Stimulates blood flow, removes stagnation, and promotes healing throughout the body.' },
  { icon: '🧘', title: 'Pain Relief', desc: 'Effective for headaches, neck pain, back pain, and joint discomfort without medication.' },
  { icon: '🌿', title: 'Detoxification', desc: 'Draws out toxins and metabolic waste from the blood and tissues naturally.' },
  { icon: '🛡️', title: 'Boosts Immunity', desc: 'Strengthens the immune system and helps the body defend against illness.' },
  { icon: '😴', title: 'Stress & Anxiety Relief', desc: 'Activates the parasympathetic nervous system, reducing stress hormones.' },
  { icon: '✨', title: 'Skin Health', desc: 'Improves skin tone, reduces acne, and promotes a healthy natural glow.' },
];

export default function Home() {
  const [hadithIdx, setHadithIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHadithIdx(i => (i + 1) % hadiths.length);
        setFade(true);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-image" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="hero-bg-pattern" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="hero-content">
          <div className="animate-fade-in">
            <div className="hero-badge">
              <i className="fas fa-star-and-crescent"></i>
              Authentic Sunnah Healing
            </div>
            <h1 className="hero-title">
              Healing Through
              <span className="highlight">The Sunnah Way</span>
            </h1>
            <p className="hero-subtitle">
              Experience professional, home-based Hijama (Cupping Therapy) with certified practitioners. Trusted by hundreds of families across Pakistan.
            </p>
            <div className="hero-actions">
              <Link to="/booking" className="btn btn-gold">
                <i className="fas fa-calendar-check"></i>
                Book Your Session
              </Link>
              <Link to="/about" className="btn btn-outline-white">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-num">500+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">10+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">2</div>
                <div className="stat-label">Certified Experts</div>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-float">
              <div className="arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
              <p className="hadith-text">
                "Indeed, the best of remedies you have is cupping (Hijama)."
              </p>
              <p className="hadith-source">— Prophet Muhammad ﷺ | Sahih Bukhari</p>
              <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Detox', 'Pain Relief', 'Immunity', 'Wellness'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.8)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.78rem' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>Scroll</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="text-center">
          <span className="section-label">What We Offer</span>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Al Hijama Medical Centre brings traditional healing and modern convenience together.
          </p>
        </div>

        <div className="services-grid stagger">
          {services.map((s) => (
            <div key={s.title} className="service-card animate-fade-in">
              <div className="service-card-icon">{s.icon}</div>
              <div className="service-card-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HADITH CAROUSEL */}
      <section className="hadith-section">
        <div className="hadith-inner">
          <div className="hadith-label">
            <i className="fas fa-star-and-crescent"></i> Prophetic Guidance
          </div>
          <div className="hadith-text" style={{ opacity: fade ? 1 : 0 }}>
            {hadiths[hadithIdx].text}
          </div>
          <div className="hadith-source">{hadiths[hadithIdx].source}</div>
          <div className="hadith-dots">
            {hadiths.map((_, i) => (
              <button
                key={i}
                className={`hadith-dot ${i === hadithIdx ? 'active' : ''}`}
                onClick={() => { setFade(false); setTimeout(() => { setHadithIdx(i); setFade(true); }, 300); }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="text-center">
          <span className="section-label">Why Hijama?</span>
          <h2 className="section-title">Benefits of Hijama Therapy</h2>
          <p className="section-subtitle">
            Backed by centuries of prophetic tradition and modern holistic wellness science.
          </p>
        </div>

        <div className="benefits-grid stagger">
          {benefits.map(b => (
            <div key={b.title} className="benefit-card animate-fade-in">
              <span className="icon">{b.icon}</span>
              <h4>{b.title}</h4>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, var(--green-800), var(--green-600))',
        padding: '72px 5%',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: 'white', marginBottom: 16, fontFamily: 'var(--font-display)' }}>
            Ready to Begin Your Healing Journey?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: 36, fontSize: '1.05rem' }}>
            Book your home-based Hijama session today on a blessed Sunnah date.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/booking" className="btn btn-gold">
              <i className="fas fa-calendar-plus"></i> Book Now
            </Link>
            <Link to="/sunnah-dates" className="btn btn-outline-white">
              <i className="fas fa-moon"></i> View Sunnah Dates
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

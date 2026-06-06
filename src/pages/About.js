import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import consultImg from '../images/consult.jpg';
import skinprepImg from '../images/skinprep.jpg';
import cuppingImg from '../images/cupping.jpg';
import aftercareImg from '../images/aftercare.jpg';

const processSteps = [
  { num: '1', title: 'Consultation', desc: 'Discuss your health history, concerns, and goals with our certified practitioner before the session.', image: consultImg, image: consultImg },
  { num: '2', title: 'Skin Preparation', desc: 'The target area is gently cleansed and prepared. Cups are placed on specific therapeutic points.', image: skinprepImg },
  { num: '3', title: 'Cupping Therapy', desc: 'Gentle suction draws out toxins, stimulates blood flow, and promotes deep cellular healing.', image: cuppingImg },
  { num: '4', title: 'Aftercare Guidance', desc: 'Thorough clean-up, rest advice, and personalized guidance on hydration and diet for best results.', image: aftercareImg },
];

const faqs = [
  { q: 'Is Hijama painful?', a: 'Most clients feel only a gentle pulling sensation. Discomfort is minimal, and many people find the experience deeply relaxing.' },
  { q: 'How often should I do Hijama?', a: 'For general wellness, once a month on Sunnah dates is recommended. Your practitioner will advise based on your health condition.' },
  { q: 'Who should avoid Hijama?', a: 'Pregnant women, people with blood disorders, or those on blood thinners should consult their doctor first. Our practitioners will screen you before your session.' },
  { q: 'What are Sunnah dates?', a: 'The 17th, 19th, and 21st of the Islamic Hijri (lunar) month, as recommended by the Prophet Muhammad ﷺ for maximum benefit.' },
];

export default function About() {
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, var(--green-900), var(--green-800))', padding: '140px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(42,173,110,0.1) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }}>
          <span className="section-label" style={{ color: 'var(--gold-light)' }}>Our Story</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'white', marginBottom: 20, fontFamily: 'var(--font-display)' }}>About Hijama Therapy</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.08rem', lineHeight: 1.8 }}>
            Discover the ancient wisdom, prophetic guidance, and proven benefits of Al-Hijama (Cupping Therapy).
          </p>
        </div>
      </div>

      {/* WHAT IS HIJAMA */}
      <section className="section-full">
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="section-label">The Ancient Sunnah</span>
              <h2 className="section-title">What is Hijama?</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 20, fontSize: '1rem' }}>
                Hijama (Arabic: الحجامة) is the practice of cupping therapy — a form of alternative medicine in which a practitioner puts special cups on the skin to create suction. It has been practiced for thousands of years across many cultures.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: 32, fontSize: '1rem' }}>
                In Islamic medicine, it holds a special place as a recommended Sunnah of the Prophet Muhammad ﷺ. Wet cupping (Hijama) involves small, shallow incisions allowing stagnant blood and toxins to be drawn out through the cup's suction.
              </p>
              <Link to="/booking" className="btn btn-primary">
                <i className="fas fa-calendar-check"></i> Book a Session
              </Link>
            </div>
            <div style={{ background: 'var(--white)', borderRadius: 'var(--radius-lg)', padding: 40, boxShadow: 'var(--shadow-md)', border: '1px solid rgba(30,100,60,0.08)' }}>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: '1.6rem', color: 'var(--green-700)', textAlign: 'center', marginBottom: 20, lineHeight: 2 }}>
                «إِنَّ أَمْثَلَ مَا تَدَاوَيْتُمْ بِهِ الْحِجَامَةُ»
              </div>
              <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                "Indeed the best of remedies you have is cupping (Hijama)."
              </p>
              <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 12 }}>
                — Prophet Muhammad ﷺ | Sahih Bukhari
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="text-center" style={{ marginBottom: 0 }}>
          <span className="section-label">Step by Step</span>
          <h2 className="section-title">The Hijama Process</h2>
          <p className="section-subtitle">What to expect during your session — from start to finish.</p>
        </div>
        <div className="process-grid">
          {processSteps.map(s => (
            <div key={s.num} className="process-step">
              <img src={s.image} alt={s.title} className="process-step-image" />
              <div className="step-number">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HADITH PANEL */}
      <div style={{ background: 'linear-gradient(135deg, var(--green-900), var(--green-800))', padding: '80px 5%' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="text-center" style={{ marginBottom: 48 }}>
            <span className="section-label" style={{ color: 'var(--gold-light)' }}>Prophetic Hadiths</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'white', marginTop: 8 }}>What the Prophet ﷺ Said</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {[
              { text: '"Healing is in three things: A gulp of honey, cupping, and branding with fire — but I forbid my followers to use branding."', src: 'Ibn Abbas (RA) | Sahih Bukhari' },
              { text: '"The best treatment is cupping; it removes blood, lightens the back, and sharpens the eyesight."', src: 'Al-Hakim 4/212 | At-Tirmidhi No: 3053' },
              { text: '"On the night of Isra (ascension), I did not pass by any group of angels but they told me: Instruct your people with cupping."', src: 'Ibn Majah | Hasan' },
              { text: '"Indeed the best of remedies you have is cupping, or it is one of the best of your medicines."', src: 'Sahih Bukhari No: 5371' },
            ].map((h, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid rgba(255,255,255,0.1)', transition: 'var(--transition)' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', fontSize: '1rem', lineHeight: 1.7, marginBottom: 16 }}>{h.text}</p>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>— {h.src}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="section">
        <div className="text-center">
          <span className="section-label">Got Questions?</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        <div style={{ maxWidth: 720, margin: '48px auto 0' }}>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: 'var(--white)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(30,100,60,0.1)', marginBottom: 12, overflow: 'hidden', transition: 'var(--transition)', boxShadow: openFaq === i ? 'var(--shadow-sm)' : 'none' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600, color: 'var(--text-main)', textAlign: 'left' }}
              >
                {faq.q}
                <i className={`fas fa-chevron-${openFaq === i ? 'up' : 'down'}`} style={{ color: 'var(--green-600)', fontSize: '0.85rem', flexShrink: 0, transition: 'transform 0.3s' }}></i>
              </button>
              {openFaq === i && (
                <div style={{ padding: '0 24px 20px', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

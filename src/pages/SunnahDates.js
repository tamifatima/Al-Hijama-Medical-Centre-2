import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Hijri month names
const HIJRI_MONTHS = ['', 'Muharram', 'Safar', "Rabi' al-Awwal", "Rabi' al-Thani",
  "Jumada al-Awwal", "Jumada al-Thani", 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal',
  'Dhu al-Qadah', 'Dhu al-Hijjah'];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Approximate Hijri conversion (±1 day accuracy)
function gregorianToHijri(date) {
  const jd = Math.floor((date.getTime() / 86400000) + 2440587.5);
  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor(50 * l / 17719) +
    Math.floor(l / 5670) * Math.floor(43 * l / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) -
    Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
  const month = Math.floor(24 * l / 709);
  const day = l - Math.floor(709 * month / 24);
  const year = 30 * n + j - 30;
  return { day, month, year };
}

function buildMonthDays(year, month) {
  const days = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date(); today.setHours(0, 0, 0, 0);

  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month - 1, d);
    const hijri = gregorianToHijri(date);
    const isSunnah = [17, 19, 21].includes(hijri.day);
    const isToday = date.getTime() === today.getTime();
    days.push({ date, hijri, isSunnah, isToday, weekday: date.getDay() });
  }
  return days;
}

export default function SunnahDates() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const days = buildMonthDays(year, month);
  const firstWeekday = days[0]?.weekday || 0;
  const todayHijri = gregorianToHijri(now);

  const prevMonth = () => {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  };

  const monthLabel = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });
  const sunnahDays = days.filter(d => d.isSunnah);
  const currentHijriStr = `${todayHijri.day} ${HIJRI_MONTHS[todayHijri.month]} ${todayHijri.year}`;

  return (
    <>
      {/* HERO */}
      <div style={{ background: 'linear-gradient(135deg, var(--green-900), var(--green-800))', padding: '140px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(201,162,39,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <span className="section-label" style={{ color: 'var(--gold-light)' }}>Islamic Calendar</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', color: 'white', marginBottom: 12, fontFamily: 'var(--font-display)' }}>Sunnah Hijama Dates</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.08rem', marginBottom: 16 }}>
            Current Hijri Date: <strong style={{ color: 'var(--gold-light)' }}>{currentHijriStr} AH</strong>
          </p>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem' }}>
            Highlighted dates: 17th, 19th, and 21st of the Hijri month — as recommended by the Prophet ﷺ
          </p>
        </div>
      </div>

      <section className="section">
        {/* Upcoming Sunnah Dates Banner */}
        {sunnahDays.length > 0 && (
          <div style={{ background: 'linear-gradient(135deg, var(--green-50), var(--white))', border: '1px solid rgba(30,100,60,0.12)', borderRadius: 'var(--radius-md)', padding: '20px 28px', marginBottom: 36, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontSize: '1.8rem' }}>🌙</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--green-800)', marginBottom: 4 }}>Sunnah Dates This Month</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {sunnahDays.map(d => (
                  <span key={d.date.getDate()} style={{ background: 'var(--green-700)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600 }}>
                    {d.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} — Hijri {d.hijri.day}
                  </span>
                ))}
              </div>
            </div>
            <Link to="/booking" className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>
              <i className="fas fa-calendar-check"></i> Book on Sunnah Date
            </Link>
          </div>
        )}

        {/* Calendar */}
        <div className="calendar-container">
          <div className="calendar-header">
            <button className="calendar-nav-btn" onClick={prevMonth}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <div>
              <h3>{monthLabel}</h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
                {HIJRI_MONTHS[todayHijri.month]} {todayHijri.year} AH
              </p>
            </div>
            <button className="calendar-nav-btn" onClick={nextMonth}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="calendar-weekdays">
            {WEEKDAYS.map(d => <div key={d} className="weekday-label">{d}</div>)}
          </div>

          <div className="calendar-grid">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} className="day-cell empty" />
            ))}
            {days.map(day => (
              <div key={day.date.getDate()} className={`day-cell ${day.isToday ? 'today' : ''} ${day.isSunnah ? 'sunnah' : ''}`}>
                <div className={`day-greg`}>{day.date.getDate()}</div>
                <div className="day-hijri">{day.hijri.day}</div>
                {day.isSunnah && <div className="sunnah-badge">Sunnah</div>}
              </div>
            ))}
          </div>

          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-dot today"></div>
              Today
            </div>
            <div className="legend-item">
              <div className="legend-dot sunnah"></div>
              Sunnah Date (17, 19, 21)
            </div>
            <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Top: Gregorian &nbsp;|&nbsp; Bottom: Hijri day
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ background: 'var(--cream)', borderRadius: 'var(--radius-md)', padding: 32, border: '1px solid rgba(30,100,60,0.08)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 16, color: 'var(--text-main)' }}>Why Sunnah Dates?</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.93rem', marginBottom: 16 }}>
              The Prophet Muhammad ﷺ recommended specific lunar dates for Hijama. The 17th, 19th, and 21st of the Hijri (Islamic lunar) month are considered optimal for the therapy's effectiveness.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.93rem' }}>
              Scholars and traditional medicine practitioners believe blood flow and the body's natural rhythms are most favorable for cupping therapy on these dates.
            </p>
          </div>
          <div style={{ background: 'linear-gradient(135deg, var(--green-800), var(--green-700))', borderRadius: 'var(--radius-md)', padding: 32, color: 'white' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: 16, color: 'white' }}>Book on a Sunnah Date</h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.8, fontSize: '0.93rem', marginBottom: 24 }}>
              Select one of the highlighted Sunnah dates above when booking your session. Our practitioners are available on these dates to give you the most beneficial Hijama experience.
            </p>
            <Link to="/booking" className="btn btn-gold">
              <i className="fas fa-calendar-plus"></i> Book Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

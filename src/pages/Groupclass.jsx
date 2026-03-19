import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gold = "#D4A017";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .gc-root {
    background: #0d0d0d;
    color: #fff;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .gc-nav {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 48px; height: 64px;
    background: rgba(10,10,10,0.97);
    border-bottom: 1px solid #1e1e1e;
    position: sticky; top: 0; z-index: 50;
  }
  .gc-nav-brand { display: flex; align-items: center; gap: 10px; }
  .gc-logo-circle {
    width: 38px; height: 38px; border-radius: 50%;
    background: #222; border: 2px solid #333;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .gc-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 17px;
    letter-spacing: 1.5px; text-transform: uppercase;
  }
  .gc-brand-text span { color: ${gold}; }
  .gc-nav-links { display: flex; gap: 36px; list-style: none; }
  .gc-nav-links a {
    color: #bbb; text-decoration: none; font-size: 13px;
    font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;
    transition: color 0.2s;
  }
  .gc-nav-links a:hover { color: #fff; }
  .gc-nav-cta {
    background: ${gold}; color: #000; border: none;
    padding: 10px 24px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 14px; letter-spacing: 2px;
    cursor: pointer; transition: background 0.2s;
  }
  .gc-nav-cta:hover { background: #e6b822; }

  /* ── HERO ── */
  .gc-hero {
    position: relative;
    height: 280px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
  }
  .gc-hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1400&q=80')
      center/cover no-repeat;
    filter: brightness(0.18);
  }
  /* decorative large text in background */
  .gc-hero-deco {
    position: absolute; inset: 0;
    display: flex; align-items: center;
    justify-content: space-around;
    pointer-events: none; overflow: hidden;
  }
  .gc-hero-deco-word {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(60px, 9vw, 110px);
    color: transparent;
    -webkit-text-stroke: 1px rgba(212,160,23,0.12);
    text-transform: uppercase;
    letter-spacing: 4px;
    white-space: nowrap;
    user-select: none;
  }
  .gc-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(5,5,5,0.82) 100%);
  }
  .gc-hero-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; gap: 20px;
  }
  .gc-back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: ${gold};
    background: none; border: none; cursor: pointer;
    transition: gap 0.2s; width: fit-content;
  }
  .gc-back-btn:hover { gap: 11px; }
  .gc-back-btn svg { width: 14px; height: 14px; }
  .gc-hero-title-row { display: flex; align-items: center; gap: 20px; }
  .gc-hero-icon-box {
    width: 64px; height: 64px;
    border: 2px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; background: rgba(212,160,23,0.06);
  }
  .gc-hero-icon-box svg { width: 30px; height: 30px; }
  .gc-hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(36px, 5vw, 62px);
    text-transform: uppercase; letter-spacing: 1px; line-height: 1;
  }

  /* ── MAIN ── */
  .gc-main {
    flex: 1; padding: 68px 60px 90px;
    display: grid; grid-template-columns: 1fr 340px;
    gap: 52px; max-width: 1200px;
    margin: 0 auto; width: 100%;
  }

  /* left */
  .gc-section-label {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700; letter-spacing: 3px;
    color: ${gold}; text-transform: uppercase; margin-bottom: 18px;
  }
  .gc-label-line { width: 28px; height: 2px; background: ${gold}; }
  .gc-overview-text {
    color: #aaa; font-size: 14.5px;
    line-height: 1.85; max-width: 600px;
  }
  .gc-benefits-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 32px;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin: 44px 0 20px;
  }
  .gc-benefits-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  }
  .gc-benefit-card {
    background: #161616; border: 1px solid #222;
    border-left: 3px solid #222;
    padding: 16px 20px;
    display: flex; align-items: center; gap: 14px;
    transition: border-color 0.2s, border-left-color 0.2s;
  }
  .gc-benefit-card:hover {
    border-color: #333; border-left-color: ${gold};
  }
  .gc-benefit-icon {
    width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .gc-benefit-icon svg { width: 12px; height: 12px; }
  .gc-benefit-text { font-size: 14px; font-weight: 500; color: #ddd; }

  /* right CTA */
  .gc-cta-card {
    background: #161616; border: 1px solid #252525;
    padding: 32px 28px; height: fit-content;
    position: sticky; top: 80px;
  }
  .gc-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 26px;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 14px; line-height: 1.1;
  }
  .gc-cta-desc {
    color: #888; font-size: 13px;
    line-height: 1.75; margin-bottom: 28px;
  }
  .gc-join-btn {
    width: 100%; background: ${gold};
    color: #000; border: none; padding: 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 16px;
    letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s; margin-bottom: 12px;
  }
  .gc-join-btn:hover { background: #e6b822; }
  .gc-cta-note { text-align: center; color: #555; font-size: 12px; }

  /* ── FOOTER ── */
  .gc-footer {
    background: #111; border-top: 1px solid #1e1e1e;
    padding: 56px 60px 0;
  }
  .gc-footer-top {
    display: grid; grid-template-columns: 1.6fr 1fr 1.3fr 1.4fr;
    gap: 40px; padding-bottom: 48px;
  }
  .gc-footer-brand-logo {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .gc-footer-brand p {
    color: #555; font-size: 13px; line-height: 1.8; max-width: 240px;
  }
  .gc-footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 13px; letter-spacing: 3px;
    text-transform: uppercase; color: #fff; margin-bottom: 18px;
  }
  .gc-footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .gc-footer-links a {
    color: #555; font-size: 13px; text-decoration: none; transition: color 0.2s;
  }
  .gc-footer-links a:hover { color: ${gold}; }
  .gc-hours { display: flex; flex-direction: column; }
  .gc-hour-row {
    display: flex; justify-content: space-between;
    font-size: 12.5px; color: #555;
    padding: 9px 0; border-bottom: 1px solid #1e1e1e;
  }
  .gc-hour-row:last-child { border-bottom: none; }
  .gc-hour-day { color: #777; min-width: 88px; }
  .gc-newsletter-desc {
    color: #555; font-size: 13px; line-height: 1.7; margin-bottom: 16px;
  }
  .gc-newsletter-row { display: flex; }
  .gc-newsletter-input {
    flex: 1; background: #1a1a1a;
    border: 1px solid #252525; border-right: none;
    color: #fff; padding: 10px 14px; font-size: 13px;
    font-family: 'Barlow', sans-serif;
    outline: none; transition: border-color 0.2s;
  }
  .gc-newsletter-input::placeholder { color: #3a3a3a; }
  .gc-newsletter-input:focus { border-color: ${gold}; }
  .gc-newsletter-btn {
    background: ${gold}; color: #000; border: none;
    padding: 10px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 13px; letter-spacing: 1px;
    cursor: pointer; transition: background 0.2s;
  }
  .gc-newsletter-btn:hover { background: #e6b822; }
  .gc-footer-bottom {
    border-top: 1px solid #1e1e1e; padding: 20px 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .gc-footer-copy { color: #3a3a3a; font-size: 12px; }
  .gc-footer-legal { display: flex; gap: 24px; }
  .gc-footer-legal a {
    color: #3a3a3a; font-size: 12px; text-decoration: none; transition: color 0.2s;
  }
  .gc-footer-legal a:hover { color: #888; }
`;

/* Icons */
const ChevronLeft = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3L5 8L10 13" />
    </svg>
);

const PulseIcon = () => (
    <svg viewBox="0 0 32 32" fill="none" stroke="#D4A017"
        strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,16 8,16 11,8 14,24 17,14 20,18 23,16 30,16" />
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="#D4A017"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6.5L4.5 9L10 3" />
    </svg>
);

const benefits = [
    "Over 40 Classes Weekly",
    "Inspiring Instructors",
    "Community Atmosphere",
    "Varied Training Styles",
];

const footerLinks = ["Home", "About Us", "Services", "Contact", "Pricing Plans"];

export default function Groupclass() {
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState("");

    return (
        <div className="gc-root">
            <style>{styles}</style>

            {/* NAV */}
            <nav className="gc-nav">
                <div className="gc-nav-brand">
                    <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div className="gc-brand-text">FITNESS <span>SPORTS</span></div>
                </div>
                <ul className="gc-nav-links">
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#about")}>About</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#programs")}>Services</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#contact")}>Contact</a></li>
                </ul>
                <button className="gc-nav-cta" onClick={() => navigate("/pricing")}>JOIN NOW</button>
            </nav>

            {/* HERO */}
            <div className="gc-hero">
                <div className="gc-hero-bg" />

                <div className="gc-hero-overlay" />
                <div className="gc-hero-content">
                    <button className="gc-back-btn" onClick={() => navigate("/")}>
                        <ChevronLeft />
                        BACK TO HOME
                    </button>
                    <div className="gc-hero-title-row">
                        <div className="gc-hero-icon-box">
                            <PulseIcon />
                        </div>
                        <h1 className="gc-hero-title">GROUP CLASSES</h1>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="gc-main">
                {/* LEFT */}
                <div>
                    <div className="gc-section-label">
                        <span className="gc-label-line" />
                        OVERVIEW
                    </div>
                    <p className="gc-overview-text">
                        Experience the motivation and energy of our dynamic group fitness classes. Led by
                        inspiring instructors, our classes are designed to challenge you while fostering a
                        sense of community. From heart-pumping HIIT and cycling to focused core and mobility
                        sessions, there's a class for every fitness level and goal.
                    </p>

                    <h2 className="gc-benefits-title">KEY BENEFITS</h2>
                    <div className="gc-benefits-grid">
                        {benefits.map(b => (
                            <div className="gc-benefit-card" key={b}>
                                <div className="gc-benefit-icon"><CheckIcon /></div>
                                <span className="gc-benefit-text">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT CTA */}
                <div className="gc-cta-card">
                    <div className="gc-cta-title">READY TO START?</div>
                    <p className="gc-cta-desc">
                        Transform your life today with our group classes program. Unlock your true potential
                        with the best facilities and coaching.
                    </p>
                    <button className="gc-join-btn" onClick={() => navigate("/pricing")}>JOIN NOW</button>
                    <p className="gc-cta-note">Plans start at just $39/month</p>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="gc-footer">
                <div className="gc-footer-top">
                    <div className="gc-footer-brand">
                        <div className="gc-footer-brand-logo">
                            <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div className="gc-brand-text">
                                FITNESS <span style={{ color: gold }}>SPORTS</span>
                            </div>
                        </div>
                        <p>
                            Forging stronger bodies and better habits with expert coaching, motivating spaces,
                            and a community that keeps you moving.
                        </p>
                    </div>

                    <div>
                        <div className="gc-footer-col-title">Quick Links</div>
                        <ul className="gc-footer-links">
                            {footerLinks.map(l => (
                                <li key={l}><a href="#">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="gc-footer-col-title">Working Hours</div>
                        <div className="gc-hours">
                            <div className="gc-hour-row">
                                <span className="gc-hour-day">Mon – Fri</span>
                                <span>6:00 AM – 10:00 PM</span>
                            </div>
                            <div className="gc-hour-row">
                                <span className="gc-hour-day">Saturday</span>
                                <span>8:00 AM – 10:00 PM</span>
                            </div>
                            <div className="gc-hour-row">
                                <span className="gc-hour-day">Sunday</span>
                                <span>8:00 AM – 8:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="gc-footer-col-title">Newsletter</div>
                        <p className="gc-newsletter-desc">
                            Subscribe to get class updates, wellness tips, and special member offers.
                        </p>
                        <div className="gc-newsletter-row">
                            <input
                                className="gc-newsletter-input"
                                placeholder="Email Address"
                                value={newsletter}
                                onChange={e => setNewsletter(e.target.value)}
                            />
                            <button className="gc-newsletter-btn">GO</button>
                        </div>
                    </div>
                </div>

                <div className="gc-footer-bottom">
                    <span className="gc-footer-copy">© 2023 Fitness Center. All rights reserved.</span>
                    <div className="gc-footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
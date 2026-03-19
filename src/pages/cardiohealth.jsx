import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gold = "#D4A017";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .ch-root {
    background: #0d0d0d;
    color: #fff;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .ch-nav {
    display: flex; align-items: center;
    justify-content: space-between;
    padding: 0 48px; height: 64px;
    background: rgba(10,10,10,0.97);
    border-bottom: 1px solid #1e1e1e;
    position: sticky; top: 0; z-index: 50;
  }
  .ch-nav-brand { display: flex; align-items: center; gap: 10px; }
  .ch-logo-circle {
    width: 38px; height: 38px; border-radius: 50%;
    background: #222; border: 2px solid #333;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .ch-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 17px;
    letter-spacing: 1.5px; text-transform: uppercase;
  }
  .ch-brand-text span { color: ${gold}; }
  .ch-nav-links { display: flex; gap: 36px; list-style: none; }
  .ch-nav-links a {
    color: #bbb; text-decoration: none; font-size: 13px;
    font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;
    transition: color 0.2s;
  }
  .ch-nav-links a:hover { color: #fff; }
  .ch-nav-cta {
    background: ${gold}; color: #000; border: none;
    padding: 10px 24px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 14px; letter-spacing: 2px;
    cursor: pointer; transition: background 0.2s;
  }
  .ch-nav-cta:hover { background: #e6b822; }

  /* ── HERO ── */
  .ch-hero {
    position: relative; height: 360px; overflow: hidden;
    display: flex; flex-direction: column;
    justify-content: flex-end; padding: 0 60px 48px;
  }
  .ch-hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1400&q=80')
      center 30%/cover no-repeat;
    filter: brightness(0.25);
  }
  .ch-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(5,5,5,0.88) 100%);
  }
  .ch-hero-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; gap: 24px;
  }
  .ch-back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: ${gold};
    background: none; border: none; cursor: pointer;
    transition: gap 0.2s; width: fit-content;
  }
  .ch-back-btn:hover { gap: 11px; }
  .ch-back-btn svg { width: 14px; height: 14px; }
  .ch-hero-title-row { display: flex; align-items: center; gap: 22px; }
  .ch-hero-icon-box {
    width: 66px; height: 66px;
    border: 2px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; background: rgba(212,160,23,0.06);
  }
  .ch-hero-icon-box svg { width: 32px; height: 32px; }
  .ch-hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(36px, 5vw, 64px);
    text-transform: uppercase; letter-spacing: 1px; line-height: 1;
  }

  /* ── MAIN ── */
  .ch-main {
    flex: 1; padding: 68px 60px 90px;
    display: grid; grid-template-columns: 1fr 340px;
    gap: 52px; max-width: 1200px;
    margin: 0 auto; width: 100%;
  }

  /* left */
  .ch-section-label {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700; letter-spacing: 3px;
    color: ${gold}; text-transform: uppercase; margin-bottom: 18px;
  }
  .ch-label-line { width: 28px; height: 2px; background: ${gold}; }
  .ch-overview-text {
    color: #aaa; font-size: 14.5px;
    line-height: 1.85; max-width: 600px;
  }
  .ch-benefits-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 32px;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin: 44px 0 20px;
  }
  .ch-benefits-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
  }
  .ch-benefit-card {
    background: #161616; border: 1px solid #222;
    border-left: 3px solid #222;
    padding: 16px 20px;
    display: flex; align-items: center; gap: 14px;
    transition: border-color 0.2s, border-left-color 0.2s;
  }
  .ch-benefit-card:hover {
    border-color: #333; border-left-color: ${gold};
  }
  .ch-benefit-icon {
    width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .ch-benefit-icon svg { width: 12px; height: 12px; }
  .ch-benefit-text { font-size: 14px; font-weight: 500; color: #ddd; }

  /* right CTA */
  .ch-cta-card {
    background: #161616; border: 1px solid #252525;
    padding: 32px 28px; height: fit-content;
    position: sticky; top: 80px;
  }
  .ch-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 26px;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 14px; line-height: 1.1;
  }
  .ch-cta-desc {
    color: #888; font-size: 13px;
    line-height: 1.75; margin-bottom: 28px;
  }
  .ch-join-btn {
    width: 100%; background: ${gold};
    color: #000; border: none; padding: 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 16px;
    letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s; margin-bottom: 12px;
  }
  .ch-join-btn:hover { background: #e6b822; }
  .ch-cta-note { text-align: center; color: #555; font-size: 12px; }

  /* ── FOOTER ── */
  .ch-footer {
    background: #111; border-top: 1px solid #1e1e1e;
    padding: 56px 60px 0;
  }
  .ch-footer-top {
    display: grid; grid-template-columns: 1.6fr 1fr 1.3fr 1.4fr;
    gap: 40px; padding-bottom: 48px;
  }
  .ch-footer-brand-logo {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .ch-footer-brand p {
    color: #555; font-size: 13px; line-height: 1.8; max-width: 240px;
  }
  .ch-footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 13px; letter-spacing: 3px;
    text-transform: uppercase; color: #fff; margin-bottom: 18px;
  }
  .ch-footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .ch-footer-links a {
    color: #555; font-size: 13px; text-decoration: none; transition: color 0.2s;
  }
  .ch-footer-links a:hover { color: ${gold}; }
  .ch-hours { display: flex; flex-direction: column; }
  .ch-hour-row {
    display: flex; justify-content: space-between;
    font-size: 12.5px; color: #555;
    padding: 9px 0; border-bottom: 1px solid #1e1e1e;
  }
  .ch-hour-row:last-child { border-bottom: none; }
  .ch-hour-day { color: #777; min-width: 88px; }
  .ch-newsletter-desc {
    color: #555; font-size: 13px; line-height: 1.7; margin-bottom: 16px;
  }
  .ch-newsletter-row { display: flex; }
  .ch-newsletter-input {
    flex: 1; background: #1a1a1a;
    border: 1px solid #252525; border-right: none;
    color: #fff; padding: 10px 14px; font-size: 13px;
    font-family: 'Barlow', sans-serif;
    outline: none; transition: border-color 0.2s;
  }
  .ch-newsletter-input::placeholder { color: #3a3a3a; }
  .ch-newsletter-input:focus { border-color: ${gold}; }
  .ch-newsletter-btn {
    background: ${gold}; color: #000; border: none;
    padding: 10px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 13px; letter-spacing: 1px;
    cursor: pointer; transition: background 0.2s;
  }
  .ch-newsletter-btn:hover { background: #e6b822; }
  .ch-footer-bottom {
    border-top: 1px solid #1e1e1e; padding: 20px 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .ch-footer-copy { color: #3a3a3a; font-size: 12px; }
  .ch-footer-legal { display: flex; gap: 24px; }
  .ch-footer-legal a {
    color: #3a3a3a; font-size: 12px; text-decoration: none; transition: color 0.2s;
  }
  .ch-footer-legal a:hover { color: #888; }
`;

/* ── SVG Icons ── */
const ChevronLeft = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3L5 8L10 13" />
    </svg>
);

// Pulse / heartbeat icon for Cardio
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
    "Latest Cardio Machines",
    "Personal Entertainment Screens",
    "Heart Rate Tracking",
    "Dedicated Stretching Area",
];

const footerLinks = ["Home", "About Us", "Services", "Contact", "Pricing Plans"];

export default function CardioHealth() {
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState("");

    return (
        <div className="ch-root">
            <style>{styles}</style>

            {/* NAV */}
            <nav className="ch-nav">
                <div className="ch-nav-brand">
                    <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div className="ch-brand-text">FITNESS <span>SPORTS</span></div>
                </div>
                <ul className="ch-nav-links">
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#about")}>About</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#programs")}>Services</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#contact")}>Contact</a></li>
                </ul>
                <button className="ch-nav-cta" onClick={() => navigate("/pricing")}>JOIN NOW</button>
            </nav>

            {/* HERO */}
            <div className="ch-hero">
                <div className="ch-hero-bg" />
                <div className="ch-hero-overlay" />
                <div className="ch-hero-content">
                    <button className="ch-back-btn" onClick={() => navigate("/")}>
                        <ChevronLeft />
                        BACK TO HOME
                    </button>
                    <div className="ch-hero-title-row">
                        <div className="ch-hero-icon-box">
                            <PulseIcon />
                        </div>
                        <h1 className="ch-hero-title">CARDIO &amp; HEALTH</h1>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="ch-main">
                {/* LEFT */}
                <div>
                    <div className="ch-section-label">
                        <span className="ch-label-line" />
                        OVERVIEW
                    </div>
                    <p className="ch-overview-text">
                        Elevate your heart rate and build unstoppable endurance in our state-of-the-art cardio
                        theater. Equipped with the latest treadmills, ellipticals, stair climbers, and rowers
                        featuring personal entertainment screens and performance tracking to make every minute
                        of your cardio session count.
                    </p>

                    <h2 className="ch-benefits-title">KEY BENEFITS</h2>
                    <div className="ch-benefits-grid">
                        {benefits.map(b => (
                            <div className="ch-benefit-card" key={b}>
                                <div className="ch-benefit-icon"><CheckIcon /></div>
                                <span className="ch-benefit-text">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT CTA */}
                <div className="ch-cta-card">
                    <div className="ch-cta-title">READY TO START?</div>
                    <p className="ch-cta-desc">
                        Transform your life today with our cardio &amp; health program. Unlock your true
                        potential with the best facilities and coaching.
                    </p>
                    <button className="ch-join-btn" onClick={() => navigate("/pricing")}>JOIN NOW</button>
                    <p className="ch-cta-note">Plans start at just $29/month</p>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="ch-footer">
                <div className="ch-footer-top">
                    <div className="ch-footer-brand">
                        <div className="ch-footer-brand-logo">
                            <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div className="ch-brand-text">
                                FITNESS <span style={{ color: gold }}>SPORTS</span>
                            </div>
                        </div>
                        <p>
                            Forging stronger bodies and better habits with expert coaching, motivating spaces,
                            and a community that keeps you moving.
                        </p>
                    </div>

                    <div>
                        <div className="ch-footer-col-title">Quick Links</div>
                        <ul className="ch-footer-links">
                            {footerLinks.map(l => (
                                <li key={l}><a href="#">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="ch-footer-col-title">Working Hours</div>
                        <div className="ch-hours">
                            <div className="ch-hour-row">
                                <span className="ch-hour-day">Mon – Fri</span>
                                <span>5:00 AM – 11:00 PM</span>
                            </div>
                            <div className="ch-hour-row">
                                <span className="ch-hour-day">Saturday</span>
                                <span>6:00 AM – 10:00 PM</span>
                            </div>
                            <div className="ch-hour-row">
                                <span className="ch-hour-day">Sunday</span>
                                <span>8:00 AM – 8:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="ch-footer-col-title">Newsletter</div>
                        <p className="ch-newsletter-desc">
                            Subscribe to get class updates, wellness tips, and special member offers.
                        </p>
                        <div className="ch-newsletter-row">
                            <input
                                className="ch-newsletter-input"
                                placeholder="Email Address"
                                value={newsletter}
                                onChange={e => setNewsletter(e.target.value)}
                            />
                            <button className="ch-newsletter-btn">GO</button>
                        </div>
                    </div>
                </div>

                <div className="ch-footer-bottom">
                    <span className="ch-footer-copy">© 2023 Fitness Center. All rights reserved.</span>
                    <div className="ch-footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
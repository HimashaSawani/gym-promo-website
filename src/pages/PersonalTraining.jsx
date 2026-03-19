import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gold = "#D4A017";
const darkBg = "#0d0d0d";
const cardBg = "#161616";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .pt-root {
    background: ${darkBg};
    color: #fff;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .pt-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 64px;
    background: rgba(10,10,10,0.95);
    border-bottom: 1px solid #1e1e1e;
    position: sticky; top: 0; z-index: 50;
  }
  .pt-nav-brand {
    display: flex; align-items: center; gap: 10px;
  }
  .pt-nav-logo-circle {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: #222;
    border: 2px solid #333;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .pt-nav-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 17px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .pt-nav-brand-text span { color: ${gold}; }
  .pt-nav-links {
    display: flex; gap: 36px; list-style: none;
  }
  .pt-nav-links a {
    color: #bbb;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .pt-nav-links a:hover { color: #fff; }
  .pt-nav-cta {
    background: ${gold};
    color: #000;
    border: none;
    padding: 10px 24px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .pt-nav-cta:hover { background: #e6b822; }

  /* ── HERO BANNER ── */
  .pt-hero {
    position: relative;
    height: 320px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    padding: 0 60px 40px;
  }
  .pt-hero-bg {
    position: absolute; inset: 0;
    background: linear-gradient(
      135deg,
      #0a0a0a 0%,
      #141414 30%,
      #1a1a1a 60%,
      #111 100%
    );
  }
  .pt-hero-bg::after {
    content: '';
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1400&q=80') center/cover no-repeat;
    opacity: 0.22;
    filter: brightness(0.6);
  }
  .pt-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%);
  }
  .pt-hero-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; gap: 18px;
  }
  .pt-back-link {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${gold};
    text-decoration: none;
    transition: gap 0.2s;
    cursor: pointer;
    background: none; border: none;
  }
  .pt-back-link:hover { gap: 10px; }
  .pt-back-link svg { width: 14px; height: 14px; }
  .pt-hero-title-row {
    display: flex; align-items: center; gap: 20px;
  }
  .pt-hero-icon-box {
    width: 64px; height: 64px;
    border: 2px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    font-size: 26px;
    flex-shrink: 0;
  }
  .pt-hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(36px, 5vw, 62px);
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 1;
  }

  /* ── MAIN CONTENT ── */
  .pt-main {
    flex: 1;
    padding: 64px 60px 80px;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 48px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* left column */
  .pt-left {}

  .pt-section-label {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 3px;
    color: ${gold};
    text-transform: uppercase;
    margin-bottom: 18px;
  }
  .pt-section-label-line {
    width: 28px; height: 2px;
    background: ${gold};
  }

  .pt-overview-text {
    color: #aaa;
    font-size: 14.5px;
    line-height: 1.85;
    max-width: 580px;
  }

  .pt-benefits-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 32px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin: 44px 0 20px;
  }

  .pt-benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .pt-benefit-card {
    background: ${cardBg};
    border: 1px solid #222;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: border-color 0.2s;
  }
  .pt-benefit-card:hover { border-color: #3a3a3a; }
  .pt-benefit-icon {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1.5px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .pt-benefit-icon svg {
    width: 12px; height: 12px;
  }
  .pt-benefit-text {
    font-size: 14px;
    font-weight: 500;
    color: #ddd;
  }

  /* right — CTA card */
  .pt-cta-card {
    background: #161616;
    border: 1px solid #252525;
    padding: 32px 28px;
    height: fit-content;
    position: sticky;
    top: 80px;
  }
  .pt-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 26px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
    line-height: 1.1;
  }
  .pt-cta-desc {
    color: #888;
    font-size: 13px;
    line-height: 1.75;
    margin-bottom: 28px;
  }
  .pt-cta-price {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    margin-bottom: 24px;
  }
  .pt-cta-price-dollar {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 400;
    font-size: 22px;
    color: ${gold};
    padding-bottom: 8px;
  }
  .pt-cta-price-amount {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 76px;
    color: ${gold};
    line-height: 1;
  }
  .pt-cta-price-per {
    color: #888;
    font-size: 14px;
    padding-bottom: 10px;
    margin-left: 4px;
  }
  .pt-join-btn {
    width: 100%;
    background: ${gold};
    color: #000;
    border: none;
    padding: 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    margin-bottom: 12px;
  }
  .pt-join-btn:hover { background: #e6b822; }
  .pt-cta-note {
    text-align: center;
    color: #555;
    font-size: 12px;
  }

  /* ── FOOTER ── */
  .pt-footer {
    background: #111;
    border-top: 1px solid #1e1e1e;
    padding: 56px 60px 0;
  }
  .pt-footer-top {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1.4fr 1.4fr;
    gap: 40px;
    padding-bottom: 48px;
  }
  .pt-footer-brand-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 14px;
  }
  .pt-footer-brand p {
    color: #555; font-size: 13px;
    line-height: 1.8; max-width: 230px;
  }
  .pt-footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 18px;
  }
  .pt-footer-links {
    list-style: none;
    display: flex; flex-direction: column; gap: 12px;
  }
  .pt-footer-links a {
    color: #555; font-size: 13px;
    text-decoration: none; transition: color 0.2s;
  }
  .pt-footer-links a:hover { color: ${gold}; }
  .pt-hours { display: flex; flex-direction: column; gap: 0; }
  .pt-hour-row {
    display: flex; justify-content: space-between;
    font-size: 12.5px; color: #555;
    padding: 9px 0;
    border-bottom: 1px solid #1e1e1e;
  }
  .pt-hour-row:last-child { border-bottom: none; }
  .pt-hour-day { color: #777; min-width: 90px; }
  .pt-newsletter-desc {
    color: #555; font-size: 13px;
    line-height: 1.7; margin-bottom: 16px;
  }
  .pt-newsletter-row { display: flex; }
  .pt-newsletter-input {
    flex: 1;
    background: #1a1a1a;
    border: 1px solid #252525;
    border-right: none;
    color: #fff;
    padding: 10px 14px;
    font-size: 13px;
    font-family: 'Barlow', sans-serif;
    outline: none;
    transition: border-color 0.2s;
  }
  .pt-newsletter-input::placeholder { color: #3a3a3a; }
  .pt-newsletter-input:focus { border-color: ${gold}; }
  .pt-newsletter-btn {
    background: ${gold};
    color: #000;
    border: none;
    padding: 10px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .pt-newsletter-btn:hover { background: #e6b822; }
  .pt-footer-bottom {
    border-top: 1px solid #1e1e1e;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pt-footer-copy { color: #3a3a3a; font-size: 12px; }
  .pt-footer-legal { display: flex; gap: 24px; }
  .pt-footer-legal a {
    color: #3a3a3a; font-size: 12px;
    text-decoration: none; transition: color 0.2s;
  }
  .pt-footer-legal a:hover { color: #888; }
`;

const CheckIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="#D4A017" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6.5L4.5 9L10 3" />
    </svg>
);

const ChevronLeftIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3L5 8L10 13" />
    </svg>
);

const benefits = [
    "Customized Workout Plans",
    "Nutritional Guidance",
    "Weekly Progress Tracking",
    "1-on-1 Expert Attention",
];

export default function PersonalTraining() {
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState("");

    return (
        <div className="pt-root">
            <style>{styles}</style>

            {/* NAV */}
            <nav className="pt-nav">
                <div className="pt-nav-brand">
                    <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div className="pt-nav-brand-text">FITNESS <span>SPORTS</span></div>
                </div>
                <ul className="pt-nav-links">
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#about")}>About</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#programs")}>Services</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#contact")}>Contact</a></li>
                </ul>
                <button className="pt-nav-cta" onClick={() => navigate("/pricing")}>JOIN NOW</button>
            </nav>

            {/* HERO */}
            <div className="pt-hero">
                <div className="pt-hero-bg" />
                <div className="pt-hero-overlay" />
                <div className="pt-hero-content">
                    <button className="pt-back-link" onClick={() => navigate("/")}>
                        <ChevronLeftIcon />
                        BACK TO HOME
                    </button>
                    <div className="pt-hero-title-row">
                        <div className="pt-hero-icon-box">🏋️</div>
                        <h1 className="pt-hero-title">PERSONAL TRAINING</h1>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="pt-main">
                {/* LEFT */}
                <div className="pt-left">
                    <div className="pt-section-label">
                        <span className="pt-section-label-line" />
                        OVERVIEW
                    </div>
                    <p className="pt-overview-text">
                        Our personal training program is designed to deliver maximum results in minimum time.
                        Whether you're a beginner looking to learn the ropes or an advanced athlete aiming to
                        break plateaus, our certified trainers will craft a personalized roadmap just for you.
                        We focus on form, progression, and accountability.
                    </p>

                    <h2 className="pt-benefits-title">KEY BENEFITS</h2>
                    <div className="pt-benefits-grid">
                        {benefits.map(b => (
                            <div className="pt-benefit-card" key={b}>
                                <div className="pt-benefit-icon"><CheckIcon /></div>
                                <span className="pt-benefit-text">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — CTA */}
                <div className="pt-cta-card">
                    <div className="pt-cta-title">READY TO START?</div>
                    <p className="pt-cta-desc">
                        Transform your life today with our personal training program. Unlock your true
                        potential with the best facilities and coaching.
                    </p>
                    <div className="pt-cta-price">
                        <span className="pt-cta-price-dollar">$</span>
                        <span className="pt-cta-price-amount">75</span>
                        <span className="pt-cta-price-per">/ session</span>
                    </div>
                    <button className="pt-join-btn" onClick={() => navigate("/pricing")}>JOIN NOW</button>
                    <p className="pt-cta-note">Plans start at just $75/month</p>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="pt-footer">
                <div className="pt-footer-top">
                    <div className="pt-footer-brand">
                        <div className="pt-footer-brand-logo">
                            <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div className="pt-nav-brand-text">
                                FITNESS <span style={{ color: gold }}>SPORTS</span>
                            </div>
                        </div>
                        <p>
                            Forging champions since 2023. We provide the equipment, the expertise,
                            and the environment. You provide the sweat.
                        </p>
                    </div>

                    <div>
                        <div className="pt-footer-col-title">Quick Links</div>
                        <ul className="pt-footer-links">
                            {["Home", "About Us", "Services", "Contact"].map(l => (
                                <li key={l}><a href="#">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="pt-footer-col-title">Working Hours</div>
                        <div className="pt-hours">
                            <div className="pt-hour-row">
                                <span className="pt-hour-day">Mon – Fri:</span>
                                <span>5:00 AM – 11:00 PM</span>
                            </div>
                            <div className="pt-hour-row">
                                <span className="pt-hour-day">Saturday:</span>
                                <span>6:00 AM – 10:00 PM</span>
                            </div>
                            <div className="pt-hour-row">
                                <span className="pt-hour-day">Sunday:</span>
                                <span>8:00 AM – 8:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="pt-footer-col-title">Newsletter</div>
                        <p className="pt-newsletter-desc">
                            Subscribe to get tips, nutrition guides, and special offers.
                        </p>
                        <div className="pt-newsletter-row">
                            <input
                                className="pt-newsletter-input"
                                placeholder="Email Address"
                                value={newsletter}
                                onChange={e => setNewsletter(e.target.value)}
                            />
                            <button className="pt-newsletter-btn">GO</button>
                        </div>
                    </div>
                </div>

                <div className="pt-footer-bottom">
                    <span className="pt-footer-copy">© 2023 Fitness Center. All rights reserved.</span>
                    <div className="pt-footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gold = "#D4A017";
const darkBg = "#0d0d0d";
const cardBg = "#161616";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .me-root {
    background: ${darkBg};
    color: #fff;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .me-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 64px;
    background: rgba(10,10,10,0.97);
    border-bottom: 1px solid #1e1e1e;
    position: sticky; top: 0; z-index: 50;
  }
  .me-nav-brand { display: flex; align-items: center; gap: 10px; }
  .me-nav-logo-circle {
    width: 38px; height: 38px; border-radius: 50%;
    background: #222; border: 2px solid #333;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .me-nav-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 17px;
    letter-spacing: 1.5px; text-transform: uppercase;
  }
  .me-nav-brand-text span { color: ${gold}; }
  .me-nav-links { display: flex; gap: 36px; list-style: none; }
  .me-nav-links a {
    color: #bbb; text-decoration: none;
    font-size: 13px; font-weight: 500;
    letter-spacing: 1.5px; text-transform: uppercase;
    transition: color 0.2s;
  }
  .me-nav-links a:hover { color: #fff; }
  .me-nav-cta {
    background: ${gold}; color: #000; border: none;
    padding: 10px 24px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 14px; letter-spacing: 2px;
    cursor: pointer; transition: background 0.2s;
  }
  .me-nav-cta:hover { background: #e6b822; }

  /* ── HERO ── */
  .me-hero {
    position: relative;
    height: 340px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0 60px 44px;
  }
  .me-hero-bg {
    position: absolute; inset: 0;
    background: url('https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=1400&q=80')
      center/cover no-repeat;
    filter: brightness(0.28);
  }
  .me-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(5,5,5,0.85) 100%);
  }
  .me-hero-content {
    position: relative; z-index: 2;
    display: flex; flex-direction: column; gap: 22px;
  }
  .me-back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase;
    color: ${gold}; background: none; border: none;
    cursor: pointer; transition: gap 0.2s; width: fit-content;
  }
  .me-back-btn:hover { gap: 11px; }
  .me-back-btn svg { width: 14px; height: 14px; flex-shrink: 0; }
  .me-hero-title-row {
    display: flex; align-items: center; gap: 22px;
  }
  .me-hero-icon-box {
    width: 66px; height: 66px;
    border: 2px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    font-size: 28px; flex-shrink: 0;
    background: rgba(212,160,23,0.06);
  }
  .me-hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(36px, 5vw, 64px);
    text-transform: uppercase;
    letter-spacing: 1px; line-height: 1;
  }

  /* ── MAIN ── */
  .me-main {
    flex: 1;
    padding: 68px 60px 90px;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 52px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
  }

  /* LEFT */
  .me-section-label {
    display: flex; align-items: center; gap: 10px;
    font-size: 11px; font-weight: 700;
    letter-spacing: 3px; color: ${gold};
    text-transform: uppercase; margin-bottom: 18px;
  }
  .me-label-line { width: 28px; height: 2px; background: ${gold}; }

  .me-overview-text {
    color: #aaa; font-size: 14.5px;
    line-height: 1.85; max-width: 600px;
  }

  .me-benefits-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 32px;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin: 44px 0 20px;
  }

  .me-benefits-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }
  .me-benefit-card {
    background: ${cardBg};
    border: 1px solid #222;
    border-left: 3px solid #222;
    padding: 16px 20px;
    display: flex; align-items: center; gap: 14px;
    transition: border-color 0.2s;
  }
  .me-benefit-card:hover {
    border-color: #333;
    border-left-color: ${gold};
  }
  .me-benefit-icon {
    width: 28px; height: 28px; border-radius: 50%;
    border: 1.5px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .me-benefit-icon svg { width: 12px; height: 12px; }
  .me-benefit-text { font-size: 14px; font-weight: 500; color: #ddd; }

  /* RIGHT — CTA card */
  .me-cta-card {
    background: #161616;
    border: 1px solid #252525;
    padding: 32px 28px;
    height: fit-content;
    position: sticky; top: 80px;
  }
  .me-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 26px;
    text-transform: uppercase; letter-spacing: 0.5px;
    margin-bottom: 14px; line-height: 1.1;
  }
  .me-cta-desc {
    color: #888; font-size: 13px; line-height: 1.75;
    margin-bottom: 28px;
  }
  .me-join-btn {
    width: 100%; background: ${gold};
    color: #000; border: none; padding: 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: 16px;
    letter-spacing: 3px; text-transform: uppercase;
    cursor: pointer; transition: background 0.2s; margin-bottom: 12px;
  }
  .me-join-btn:hover { background: #e6b822; }
  .me-cta-note {
    text-align: center; color: #555; font-size: 12px;
  }

  /* ── FOOTER ── */
  .me-footer {
    background: #111;
    border-top: 1px solid #1e1e1e;
    padding: 56px 60px 0;
  }
  .me-footer-top {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1.3fr 1.4fr;
    gap: 40px; padding-bottom: 48px;
  }
  .me-footer-brand-logo {
    display: flex; align-items: center; gap: 10px; margin-bottom: 14px;
  }
  .me-footer-brand p {
    color: #555; font-size: 13px; line-height: 1.8; max-width: 230px;
  }
  .me-footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 13px;
    letter-spacing: 3px; text-transform: uppercase;
    color: #fff; margin-bottom: 18px;
  }
  .me-footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .me-footer-links a {
    color: #555; font-size: 13px; text-decoration: none; transition: color 0.2s;
  }
  .me-footer-links a:hover { color: ${gold}; }
  .me-hours { display: flex; flex-direction: column; }
  .me-hour-row {
    display: flex; justify-content: space-between;
    font-size: 12.5px; color: #555;
    padding: 9px 0; border-bottom: 1px solid #1e1e1e;
  }
  .me-hour-row:last-child { border-bottom: none; }
  .me-hour-day { color: #777; min-width: 90px; }
  .me-newsletter-desc {
    color: #555; font-size: 13px; line-height: 1.7; margin-bottom: 16px;
  }
  .me-newsletter-row { display: flex; }
  .me-newsletter-input {
    flex: 1; background: #1a1a1a;
    border: 1px solid #252525; border-right: none;
    color: #fff; padding: 10px 14px;
    font-size: 13px; font-family: 'Barlow', sans-serif;
    outline: none; transition: border-color 0.2s;
  }
  .me-newsletter-input::placeholder { color: #3a3a3a; }
  .me-newsletter-input:focus { border-color: ${gold}; }
  .me-newsletter-btn {
    background: ${gold}; color: #000; border: none;
    padding: 10px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 13px; letter-spacing: 1px;
    cursor: pointer; transition: background 0.2s;
  }
  .me-newsletter-btn:hover { background: #e6b822; }
  .me-footer-bottom {
    border-top: 1px solid #1e1e1e; padding: 20px 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .me-footer-copy { color: #3a3a3a; font-size: 12px; }
  .me-footer-legal { display: flex; gap: 24px; }
  .me-footer-legal a {
    color: #3a3a3a; font-size: 12px; text-decoration: none; transition: color 0.2s;
  }
  .me-footer-legal a:hover { color: #888; }
`;

const CheckIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="#D4A017" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6.5L4.5 9L10 3" />
    </svg>
);

const ChevronLeft = () => (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 3L5 8L10 13" />
    </svg>
);

const benefits = [
    "Olympic Lifting Platforms",
    "Dumbbells up to 150lbs",
    "Professional Power Racks",
    "Chalk-Friendly Environment",
];

const footerLinks = ["Home", "About Us", "Services", "Contact", "Pricing Plans"];

export default function ModernEquipment() {
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState("");

    return (
        <div className="me-root">
            <style>{styles}</style>

            {/* NAV */}
            <nav className="me-nav">
                <div className="me-nav-brand">
                    <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div className="me-nav-brand-text">FITNESS <span>SPORTS</span></div>
                </div>
                <ul className="me-nav-links">
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#about")}>About</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#programs")}>Services</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#contact")}>Contact</a></li>
                </ul>
                <button className="me-nav-cta" onClick={() => navigate("/pricing")}>JOIN NOW</button>
            </nav>

            {/* HERO */}
            <div className="me-hero">
                <div className="me-hero-bg" />
                <div className="me-hero-overlay" />
                <div className="me-hero-content">
                    <button className="me-back-btn" onClick={() => navigate("/")}>
                        <ChevronLeft />
                        BACK TO HOME
                    </button>
                    <div className="me-hero-title-row">
                        <div className="me-hero-icon-box">⚙️</div>
                        <h1 className="me-hero-title">MODERN EQUIPMENT</h1>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div className="me-main">
                {/* LEFT */}
                <div>
                    <div className="me-section-label">
                        <span className="me-label-line" />
                        OVERVIEW
                    </div>
                    <p className="me-overview-text">
                        Step into our dedicated strength zone featuring an unparalleled selection of free weights.
                        From 5lb to 150lb dumbbells, multiple Olympic lifting platforms, and professional-grade
                        power racks, you'll have everything needed to build serious strength and muscle mass
                        without waiting for equipment.
                    </p>

                    <h2 className="me-benefits-title">KEY BENEFITS</h2>
                    <div className="me-benefits-grid">
                        {benefits.map(b => (
                            <div className="me-benefit-card" key={b}>
                                <div className="me-benefit-icon"><CheckIcon /></div>
                                <span className="me-benefit-text">{b}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="me-cta-card">
                    <div className="me-cta-title">READY TO START?</div>
                    <p className="me-cta-desc">
                        Transform your life today with our free weights program. Unlock your true potential with
                        the best facilities and coaching.
                    </p>
                    <button className="me-join-btn" onClick={() => navigate("/pricing")}>JOIN NOW</button>
                    <p className="me-cta-note">Plans start at just $29/month</p>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="me-footer">
                <div className="me-footer-top">
                    <div className="me-footer-brand">
                        <div className="me-footer-brand-logo">
                            <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div className="me-nav-brand-text">
                                FITNESS <span style={{ color: gold }}>SPORTS</span>
                            </div>
                        </div>
                        <p>Forging champions since 2023. We provide the equipment, the expertise, and the environment. You provide the sweat.</p>
                    </div>

                    <div>
                        <div className="me-footer-col-title">Quick Links</div>
                        <ul className="me-footer-links">
                            {footerLinks.map(l => (
                                <li key={l}><a href="#">{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="me-footer-col-title">Working Hours</div>
                        <div className="me-hours">
                            <div className="me-hour-row">
                                <span className="me-hour-day">Mon – Fri:</span>
                                <span>5:00 AM – 11:00 PM</span>
                            </div>
                            <div className="me-hour-row">
                                <span className="me-hour-day">Saturday:</span>
                                <span>6:00 AM – 10:00 PM</span>
                            </div>
                            <div className="me-hour-row">
                                <span className="me-hour-day">Sunday:</span>
                                <span>8:00 AM – 8:00 PM</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="me-footer-col-title">Newsletter</div>
                        <p className="me-newsletter-desc">
                            Subscribe to get tips, nutrition guides, and special offers.
                        </p>
                        <div className="me-newsletter-row">
                            <input
                                className="me-newsletter-input"
                                placeholder="Email Address"
                                value={newsletter}
                                onChange={e => setNewsletter(e.target.value)}
                            />
                            <button className="me-newsletter-btn">GO</button>
                        </div>
                    </div>
                </div>

                <div className="me-footer-bottom">
                    <span className="me-footer-copy">© 2023 Fitness Center. All rights reserved.</span>
                    <div className="me-footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
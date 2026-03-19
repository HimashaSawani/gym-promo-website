import { useState } from "react";
import { useNavigate } from "react-router-dom";

const gold = "#D4A017";
const darkBg = "#0d0d0d";
const cardBg = "#161616";
const proCardBg = "#1a1a1a";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .fp-root {
    background: ${darkBg};
    color: #fff;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── NAV ── */
  .fp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 48px;
    height: 64px;
    background: #111;
    border-bottom: 1px solid #1e1e1e;
    position: sticky; top: 0; z-index: 50;
  }
  .fp-nav-brand {
    display: flex; align-items: center; gap: 10px;
  }
  .fp-nav-logo-circle {
    width: 38px; height: 38px;
    border-radius: 50%;
    background: #222;
    border: 2px solid #333;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .fp-nav-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 17px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }
  .fp-nav-brand-text span { color: ${gold}; }
  .fp-nav-links {
    display: flex; gap: 36px; list-style: none;
  }
  .fp-nav-links a {
    color: #bbb;
    text-decoration: none;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .fp-nav-links a:hover { color: #fff; }
  .fp-nav-cta {
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
  .fp-nav-cta:hover { background: #e6b822; }

  /* ── PRICING SECTION ── */
  .fp-pricing {
    flex: 1;
    padding: 80px 48px 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .fp-label {
    display: flex; align-items: center; gap: 12px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    color: ${gold};
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .fp-label-line {
    width: 32px; height: 1px;
    background: ${gold};
  }

  .fp-heading {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(48px, 7vw, 80px);
    text-transform: uppercase;
    text-align: center;
    line-height: 1;
    margin-bottom: 4px;
  }
  .fp-heading .fp-gold { color: ${gold}; display: block; }

  .fp-subtext {
    text-align: center;
    color: #999;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.7;
    max-width: 480px;
    margin: 18px auto 36px;
  }

  /* toggle */
  .fp-toggle {
    display: flex; align-items: center; gap: 14px;
    margin-bottom: 52px;
  }
  .fp-toggle-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    color: #fff;
  }
  .fp-switch {
    position: relative;
    width: 48px; height: 26px;
    cursor: pointer;
  }
  .fp-switch-track {
    position: absolute; inset: 0;
    background: #333;
    border-radius: 13px;
    transition: background 0.2s;
  }
  .fp-switch-track.on { background: ${gold}; }
  .fp-switch-thumb {
    position: absolute;
    top: 3px; left: 3px;
    width: 20px; height: 20px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.25s;
  }
  .fp-switch-thumb.on { transform: translateX(22px); }
  .fp-save-badge {
    background: ${gold};
    color: #000;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 1.5px;
    padding: 3px 10px;
    border-radius: 2px;
  }

  /* cards */
  .fp-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 960px;
    align-items: start;
  }

  .fp-card {
    background: ${cardBg};
    border: 1px solid #242424;
    padding: 32px 28px 28px;
    position: relative;
    transition: border-color 0.3s;
  }
  .fp-card:hover { border-color: #3a3a3a; }
  .fp-card.pro {
    background: ${proCardBg};
    border: 2px solid ${gold};
    margin-top: -6px;
  }

  .fp-popular-badge {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    background: ${gold};
    color: #000;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 11px;
    letter-spacing: 2.5px;
    padding: 5px 16px;
    white-space: nowrap;
  }

  .fp-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  .fp-card-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 28px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  .fp-card-icon { font-size: 22px; color: ${gold}; }
  .fp-card-desc {
    color: #888;
    font-size: 13px;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  /* price */
  .fp-price {
    display: flex;
    align-items: flex-end;
    margin-bottom: 28px;
  }
  .fp-price-dollar {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 72px;
    line-height: 1;
  }
  .fp-price-meta {
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 8px;
    margin-left: 2px;
  }
  .fp-price-slash { color: #666; font-size: 15px; line-height: 1; }
  .fp-price-period { color: #666; font-size: 12px; line-height: 1.4; }

  /* features */
  .fp-features {
    list-style: none;
    display: flex; flex-direction: column; gap: 12px;
    margin-bottom: 32px;
    min-height: 160px;
  }
  .fp-feature {
    display: flex; align-items: center; gap: 10px;
    font-size: 13.5px; color: #ccc;
  }
  .fp-feature-icon {
    width: 22px; height: 22px;
    border-radius: 50%;
    border: 1.5px solid ${gold};
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .fp-feature-icon svg { width: 10px; height: 10px; }

  /* buttons */
  .fp-select-btn {
    width: 100%;
    padding: 14px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 14px;
    letter-spacing: 3px;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
  }
  .fp-select-btn.basic  { background: #222; color: #fff; border: 1px solid #2e2e2e; }
  .fp-select-btn.basic:hover  { background: #2a2a2a; }
  .fp-select-btn.pro    { background: ${gold}; color: #000; }
  .fp-select-btn.pro:hover    { background: #e6b822; }
  .fp-select-btn.elite  { background: #222; color: #fff; border: 1px solid #2e2e2e; }
  .fp-select-btn.elite:hover  { background: #2a2a2a; }

  /* ── FOOTER ── */
  .fp-footer {
    background: #111;
    border-top: 1px solid #1e1e1e;
    padding: 56px 48px 0;
  }
  .fp-footer-top {
    display: grid;
    grid-template-columns: 1.8fr 1fr 1.2fr 1.4fr;
    gap: 40px;
    padding-bottom: 48px;
  }
  .fp-footer-brand-logo {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 16px;
  }
  .fp-footer-brand p {
    color: #666; font-size: 13px; line-height: 1.8; max-width: 230px;
  }
  .fp-footer-col-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700; font-size: 13px;
    letter-spacing: 3px; text-transform: uppercase;
    color: #fff; margin-bottom: 18px;
  }
  .fp-footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .fp-footer-links a {
    color: #666; font-size: 13px; text-decoration: none; transition: color 0.2s;
  }
  .fp-footer-links a:hover { color: ${gold}; }
  .fp-hours { display: flex; flex-direction: column; gap: 0; }
  .fp-hour-row {
    display: flex; justify-content: space-between;
    font-size: 12.5px; color: #555;
    padding: 9px 0; border-bottom: 1px solid #1e1e1e;
  }
  .fp-hour-row:last-child { border-bottom: none; }
  .fp-hour-day { color: #777; min-width: 90px; }
  .fp-newsletter-desc {
    color: #666; font-size: 13px; line-height: 1.7; margin-bottom: 16px;
  }
  .fp-newsletter-row { display: flex; }
  .fp-newsletter-input {
    flex: 1; background: #1a1a1a;
    border: 1px solid #2a2a2a; border-right: none;
    color: #fff; padding: 10px 14px;
    font-size: 13px; font-family: 'Barlow', sans-serif;
    outline: none; transition: border-color 0.2s;
  }
  .fp-newsletter-input::placeholder { color: #444; }
  .fp-newsletter-input:focus { border-color: ${gold}; }
  .fp-newsletter-btn {
    background: ${gold}; color: #000; border: none;
    padding: 10px 18px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800; font-size: 13px; letter-spacing: 1px;
    cursor: pointer; transition: background 0.2s;
  }
  .fp-newsletter-btn:hover { background: #e6b822; }
  .fp-footer-bottom {
    border-top: 1px solid #1e1e1e; padding: 20px 0;
    display: flex; justify-content: space-between; align-items: center;
  }
  .fp-footer-copy { color: #444; font-size: 12px; }
  .fp-footer-legal { display: flex; gap: 24px; }
  .fp-footer-legal a {
    color: #444; font-size: 12px; text-decoration: none; transition: color 0.2s;
  }
  .fp-footer-legal a:hover { color: #888; }
`;

const CheckIcon = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="#D4A017" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5L5 9L9.5 3.5" />
    </svg>
);

const plans = [
    {
        key: "basic",
        name: "BASIC",
        icon: "⚡",
        desc: "Perfect for getting started and maintaining a steady routine.",
        monthlyPrice: 29,
        annualPrice: 290,
        features: ["Access to Gym Floor", "Locker Room Access", "Free Wi-Fi", "1 Free Assessment", "Standard Equipment"],
    },
    {
        key: "pro",
        name: "PRO",
        icon: "☆",
        desc: "Our most popular plan for dedicated fitness enthusiasts.",
        monthlyPrice: 59,
        annualPrice: 590,
        features: ["Everything in Basic", "Unlimited Group Classes", "Guest Pass (2/month)", "Sauna Access", "Advanced Recovery Tools"],
        popular: true,
    },
    {
        key: "elite",
        name: "ELITE",
        icon: "🏆",
        desc: "The ultimate experience with priority access and coaching.",
        monthlyPrice: 99,
        annualPrice: 990,
        features: ["Everything in Pro", "2 Personal Training Sessions", "Custom Nutrition Plan", "Unlimited Guest Passes", "Priority Booking & Towel Service"],
    },
];

export default function FitnessPricingAnnual() {
    const navigate = useNavigate();
    // default: annual = true (matches the screenshot)
    const [annual, setAnnual] = useState(true);
    const [newsletter, setNewsletter] = useState("");

    return (
        <div className="fp-root">
            <style>{styles}</style>

            {/* NAV */}
            <nav className="fp-nav">
                <div className="fp-nav-brand">
                    <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div className="fp-nav-brand-text">FITNESS <span>SPORTS</span></div>
                </div>
                <ul className="fp-nav-links">
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/")}>Home</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#about")}>About</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#programs")}>Services</a></li>
                    <li><a style={{ cursor: 'pointer' }} onClick={() => navigate("/#contact")}>Contact</a></li>
                </ul>
                <button className="fp-nav-cta">JOIN NOW</button>
            </nav>

            {/* PRICING */}
            <section className="fp-pricing">
                <div className="fp-label">
                    <span className="fp-label-line" />
                    PRICING PLANS
                    <span className="fp-label-line" />
                </div>

                <h2 className="fp-heading">
                    CHOOSE YOUR
                    <span className="fp-gold">JOURNEY</span>
                </h2>

                <p className="fp-subtext">
                    No hidden fees. Cancel anytime. Choose the plan that best fits your fitness goals and start transforming today.
                </p>

                {/* Toggle */}
                <div className="fp-toggle">
                    <span className="fp-toggle-label" style={{ color: !annual ? "#fff" : "#666" }}>MONTHLY</span>
                    <div className="fp-switch" onClick={() => setAnnual(a => !a)} role="switch" aria-checked={annual}>
                        <div className={`fp-switch-track ${annual ? "on" : ""}`} />
                        <div className={`fp-switch-thumb ${annual ? "on" : ""}`} />
                    </div>
                    <span className="fp-toggle-label" style={{ color: annual ? "#fff" : "#666" }}>ANNUALLY</span>
                    <span className="fp-save-badge">SAVE 20%</span>
                </div>

                {/* Cards */}
                <div className="fp-cards">
                    {plans.map(plan => (
                        <div key={plan.key} className={`fp-card ${plan.key === "pro" ? "pro" : ""}`}>
                            {plan.popular && <div className="fp-popular-badge">MOST POPULAR</div>}
                            <div className="fp-card-header">
                                <div className="fp-card-name">{plan.name}</div>
                                <div className="fp-card-icon">{plan.icon}</div>
                            </div>
                            <p className="fp-card-desc">{plan.desc}</p>
                            <div className="fp-price">
                                <div className="fp-price-dollar">
                                    ${annual ? plan.annualPrice : plan.monthlyPrice}
                                </div>
                                <div className="fp-price-meta">
                                    <span className="fp-price-slash">/</span>
                                    <span className="fp-price-period">{annual ? "year" : "month"}</span>
                                </div>
                            </div>
                            <ul className="fp-features">
                                {plan.features.map(f => (
                                    <li key={f} className="fp-feature">
                                        <div className="fp-feature-icon"><CheckIcon /></div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className={`fp-select-btn ${plan.key}`}>
                                SELECT {plan.name}
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="fp-footer">
                <div className="fp-footer-top">
                    <div className="fp-footer-brand">
                        <div className="fp-footer-brand-logo">
                            <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                            <div className="fp-nav-brand-text">FITNESS <span style={{ color: gold }}>SPORTS</span></div>
                        </div>
                        <p>Forging champions since 2023. We provide the equipment, the expertise, and the environment. You provide the sweat.</p>
                    </div>
                    <div>
                        <div className="fp-footer-col-title">Quick Links</div>
                        <ul className="fp-footer-links">
                            {["Home", "About Us", "Services", "Contact"].map(l => (
                                <li key={l}><a href="#">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="fp-footer-col-title">Working Hours</div>
                        <div className="fp-hours">
                            <div className="fp-hour-row"><span className="fp-hour-day">Mon – Fri:</span><span>5:00 AM – 11:00 PM</span></div>
                            <div className="fp-hour-row"><span className="fp-hour-day">Saturday:</span><span>6:00 AM – 10:00 PM</span></div>
                            <div className="fp-hour-row"><span className="fp-hour-day">Sunday:</span><span>8:00 AM – 8:00 PM</span></div>
                        </div>
                    </div>
                    <div>
                        <div className="fp-footer-col-title">Newsletter</div>
                        <p className="fp-newsletter-desc">Subscribe to get tips, nutrition guides, and special offers.</p>
                        <div className="fp-newsletter-row">
                            <input className="fp-newsletter-input" placeholder="Email Address"
                                value={newsletter} onChange={e => setNewsletter(e.target.value)} />
                            <button className="fp-newsletter-btn">GO</button>
                        </div>
                    </div>
                </div>
                <div className="fp-footer-bottom">
                    <span className="fp-footer-copy">© 2023 Fitness Center. All rights reserved.</span>
                    <div className="fp-footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
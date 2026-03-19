import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Viewport Observer Hook for Animations
const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);
  return { ref, inView };
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');

  :root {
    --bg-main: #111111;
    --bg-alt: #151515;
    --bg-darker: #0d0d0d;
    --bg-card: #1a1a1a;
    --bg-nav: rgba(10,10,10,0.92);
    --text-main: #ffffff;
    --text-muted: #aaaaaa;
    --text-dim: #666666;
    --border-color: #222222;
    --border-light: #1e1e1e;
    --gold: #D4A017;
    --gold-hover: #e6b020;
    --input-bg: #222222;
  }

  [data-theme="light"] {
    --bg-main: #fcfcfc;
    --bg-alt: #ffffff;
    --bg-darker: #f5f5f5;
    --bg-card: #ffffff;
    --bg-nav: rgba(255,255,255,0.92);
    --text-main: #111111;
    --text-muted: #555555;
    --text-dim: #777777;
    --border-color: #dddddd;
    --border-light: #eeeeee;
    --gold: #b3840e;
    --gold-hover: #d19a10;
    --input-bg: #ffffff;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: var(--bg-main);
    color: var(--text-main);
    font-family: 'Barlow', sans-serif;
    transition: background 0.4s ease, color 0.4s ease;
  }

  .gym-app {
    background: var(--bg-main);
    min-height: 100vh;
    font-family: 'Barlow', sans-serif;
    color: var(--text-main);
    transition: background 0.4s ease, color 0.4s ease;
  }

  /* Animations */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-on-scroll {
    opacity: 0;
  }
  .animate-on-scroll.is-visible {
    animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 60px;
    background: var(--bg-nav);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid rgba(212,160,23,0.15);
    transition: background 0.4s ease;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px;
  }
  .nav-logo-icon {
    width: 38px; height: 38px;
    background: var(--gold);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
  }
  .nav-logo-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
    font-size: 18px;
    letter-spacing: 1px;
    color: var(--text-main);
  }
  .nav-logo-text span { color: var(--gold); }
  .nav-center {
    display: flex; gap: 30px; align-items: center;
  }
  .nav-links {
    display: flex; gap: 32px; list-style: none;
  }
  .nav-links li {
    color: var(--text-muted);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .nav-links li:hover { color: var(--gold); }
  
  .nav-search {
    padding: 8px 14px;
    width: 200px;
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    color: var(--text-main);
    border-radius: 20px;
    font-size: 13px; outline: none; transition: border 0.3s, width 0.3s;
  }
  .nav-search:focus { border-color: var(--gold); width: 240px; }
  
  .theme-toggle {
    background: none; border: none; cursor: pointer; color: var(--text-main);
    display: flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 50%;
    transition: background 0.2s;
  }
  .theme-toggle:hover { background: var(--border-color); }
  
  .nav-cta {
    background: var(--gold);
    color: #000;
    border: none;
    padding: 10px 22px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .nav-cta:hover { background: var(--gold-hover); }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: linear-gradient(160deg, var(--bg-darker) 0%, var(--bg-main) 50%, var(--bg-darker) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 120px 20px 80px;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,160,23,0.07) 0%, transparent 70%);
  }
  .hero-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(56px, 10vw, 110px);
    line-height: 0.95;
    text-transform: uppercase;
    letter-spacing: -1px;
    margin-bottom: 4px;
    position: relative; z-index: 10;
  }
  .hero-title .gold { color: var(--gold); }
  .hero-subtitle {
    font-size: 15px;
    color: var(--text-muted);
    max-width: 440px;
    line-height: 1.7;
    margin: 20px auto 36px;
    font-weight: 300;
    position: relative; z-index: 10;
  }
  .hero-btns {
    display: flex; gap: 16px; align-items: center; justify-content: center; position: relative; z-index: 10;
  }
  .btn-primary {
    background: var(--gold);
    color: #fff; text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    border: none;
    padding: 14px 28px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { background: var(--gold-hover); transform: scale(1.02); }
  .btn-outline {
    background: transparent;
    color: var(--text-main);
    border: none;
    padding: 14px 0;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 2px;
    cursor: pointer;
    transition: color 0.2s;
  }
  .btn-outline:hover { color: var(--gold); }

  /* SECTION LABEL */
  .section-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 4px;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex; align-items: center; gap: 10px;
  }
  .section-label::before, .section-label::after {
    content: '';
    display: inline-block;
    width: 28px; height: 1px;
    background: var(--gold);
  }

  /* ABOUT */
  .about {
    background: var(--bg-alt);
    padding: 100px 60px;
    display: flex; gap: 60px; align-items: center;
  }
  .about-img {
    flex-shrink: 0;
    width: 340px; height: 280px;
    background: var(--border-color);
    border-radius: 4px;
    overflow: hidden;
    border: 2px solid var(--border-color);
  }
  .about-img img { width: 100%; height: 100%; object-fit: cover; }
  .about-content { flex: 1; }
  .about-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(38px, 5vw, 60px);
    text-transform: uppercase;
    line-height: 1;
    margin-bottom: 20px;
  }
  .about-text {
    color: var(--text-muted);
    font-size: 14px; line-height: 1.8; margin-bottom: 12px;
  }
  .about-features {
    display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px; margin: 24px 0 28px;
  }
  .about-feature {
    display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--text-muted);
  }
  .feature-dot {
    width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--gold);
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .feature-dot svg { width: 9px; height: 9px; fill: var(--gold); }

  /* PROGRAMS */
  .programs {
    padding: 100px 60px;
    background: var(--bg-main);
    text-align: center;
  }
  .programs-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900; font-size: clamp(38px, 5vw, 64px);
    text-transform: uppercase; line-height: 1; margin-bottom: 8px;
  }
  .programs-title .gold { color: var(--gold); }
  .programs-subtitle {
    color: var(--text-muted); font-size: 14px; max-width: 400px;
    margin: 0 auto 32px; line-height: 1.7;
  }

  
  .programs-grid {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: left;
  }
  .program-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    overflow: hidden; transition: border-color 0.3s, transform 0.3s;
  }
  .program-card:hover { border-color: var(--gold); transform: translateY(-4px); }
  .program-img { position: relative; height: 180px; background: var(--border-color); overflow: hidden; }
  .program-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.7); transition: transform 0.5s; }
  .program-card:hover .program-img img { transform: scale(1.05); filter: brightness(0.9); }
  .program-icon {
    position: absolute; top: 14px; right: 14px; width: 36px; height: 36px;
    background: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 15px;
  }
  .program-body { padding: 22px; }
  .program-name {
    font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 20px; text-transform: uppercase; margin-bottom: 6px;
  }
  .program-divider { width: 30px; height: 2px; background: var(--gold); margin-bottom: 12px; transition: width 0.3s; }
  .program-card:hover .program-divider { width: 50px; }
  .program-desc { color: var(--text-dim); font-size: 13px; line-height: 1.7; margin-bottom: 18px; }

  /* CONTACT */
  .contact { background: var(--bg-alt); padding: 90px 60px; display: flex; gap: 80px; }
  .contact-left { flex: 1; }
  .contact-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(40px, 5vw, 72px); text-transform: uppercase; line-height: 1; margin-bottom: 20px; }
  .contact-desc { color: var(--text-muted); font-size: 14px; line-height: 1.7; max-width: 360px; margin-bottom: 32px; }
  .contact-info { display: flex; flex-direction: column; gap: 14px; }
  .contact-info-item { display: flex; align-items: flex-start; gap: 12px; }
  .contact-icon { width: 22px; height: 22px; color: var(--gold); flex-shrink: 0; margin-top: 2px; }
  .contact-info-label { font-size: 10px; letter-spacing: 2px; color: var(--gold); font-weight: 600; text-transform: uppercase; margin-bottom: 2px; }
  .contact-info-val { color: var(--text-muted); font-size: 13px; }
  .contact-right { width: 360px; flex-shrink: 0; background: var(--bg-card); padding: 30px; border: 1px solid var(--border-color); border-radius: 4px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
  .form-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 20px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 20px; }
  .form-row { display: flex; gap: 12px; margin-bottom: 12px; }
  .form-group { flex: 1; }
  .form-label { display: block; font-size: 10px; letter-spacing: 2px; color: var(--text-dim); text-transform: uppercase; margin-bottom: 6px; }
  .form-input, .form-textarea { width: 100%; background: var(--input-bg); border: 1px solid var(--border-color); color: var(--text-main); padding: 12px 14px; font-size: 13px; font-family: 'Barlow', sans-serif; outline: none; transition: border-color 0.2s; border-radius: 4px; }
  .form-input:focus, .form-textarea:focus { border-color: var(--gold); }
  .form-textarea { resize: none; height: 90px; margin-bottom: 10px; }
  .submit-btn { width: 100%; margin-top: 14px; background: var(--gold); color: #fff; border: none; padding: 14px; font-family: 'Barlow Condensed', sans-serif; font-weight: 800; font-size: 15px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: background 0.2s; display: flex; align-items: center; justify-content: center; gap: 8px; text-shadow: 0 1px 2px rgba(0,0,0,0.2); border-radius: 4px; }
  .submit-btn:hover { background: var(--gold-hover); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .form-status { font-size: 12px; margin-top: 14px; text-align: center; font-weight: 600; padding: 10px; border-radius: 4px; }
  .form-status.success { background: rgba(85,221,153,0.1); color: #5d9; }
  .form-status.error { background: rgba(255,85,85,0.1); color: #f55; }

  /* FOOTER */
  .footer { background: var(--bg-darker); border-top: 1px solid var(--border-light); padding: 60px 60px 30px; }
  .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.2fr; gap: 40px; margin-bottom: 50px; }
  .footer-brand p { color: var(--text-dim); font-size: 13px; line-height: 1.8; margin-top: 14px; max-width: 220px; }
  .footer-col-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: var(--text-main); margin-bottom: 16px; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .footer-links a { color: var(--text-dim); font-size: 13px; text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .footer-links a:hover { color: var(--gold); }
  .footer-hours { display: flex; flex-direction: column; gap: 8px; }
  .footer-hour { display: flex; justify-content: space-between; font-size: 12px; color: var(--text-dim); border-bottom: 1px solid var(--border-light); padding-bottom: 8px; }
  .footer-hour:last-child { border-bottom: none; }
  .newsletter-input-row { display: flex; gap: 0; }
  .newsletter-input { flex: 1; background: var(--input-bg); border: 1px solid var(--border-color); border-right: none; color: var(--text-main); padding: 10px 14px; font-size: 13px; font-family: 'Barlow', sans-serif; outline: none; border-radius: 4px 0 0 4px; }
  .newsletter-btn { background: var(--gold); color: #fff; border: none; padding: 10px 16px; font-weight: 800; font-size: 13px; cursor: pointer; transition: background 0.2s; border-radius: 0 4px 4px 0; }
  .newsletter-btn:hover { background: var(--gold-hover); }
  .footer-bottom { border-top: 1px solid var(--border-light); padding-top: 24px; text-align: center; color: var(--text-dim); font-size: 12px; }
`;

// SVG Icons
const CheckIcon = () => (<svg viewBox="0 0 10 10" style={{ width: 9, height: 9, fill: 'var(--gold)' }}><path d="M1.5 5.5L4 8L8.5 2.5" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const ArrowIcon = () => (<svg viewBox="0 0 16 16" style={{ width: 13, height: 13, fill: 'currentColor' }}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>);
const LocationIcon = () => (<svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg>);
const PhoneIcon = () => (<svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" /></svg>);
const EmailIcon = () => (<svg viewBox="0 0 24 24" style={{ width: 20, height: 20 }} fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>);
const SendIcon = () => (<svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }} fill="none" stroke="#fff" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>);
const MoonIcon = () => (<svg viewBox="0 0 24 24" style={{width: 18, height: 18}} fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>);
const SunIcon = () => (<svg viewBox="0 0 24 24" style={{width: 18, height: 18}} fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>);

const programsData = [
  { name: "PERSONAL\nTRAINING", icon: "💪", desc: "One-on-one sessions tailored specifically to your goals, body type, and schedule. Expert guidance every step.", img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80", path: "/personal-training" },
  { name: "GROUP\nCLASSES", icon: "❤️", desc: "Join our high-energy group workouts including HIIT, Yoga, and Spin classes led by certified instructors.", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80", path: "/group-classes" },
  { name: "MODERN\nEQUIPMENT", icon: "⚡", desc: "Access the latest state-of-the-art machines and free weights designed for maximum performance and safety.", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80", path: "/modern-equipment" },
  { name: "CARDIO &\nHEALTH", icon: "🏆", desc: "Customized meal plans and nutritional advice to complement your workout routine and accelerate results.", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80", path: "/cardio-health" }
];

const features = ["State-of-the-art Equipment", "Certified Professional Trainers", "Tailored Nutrition Plans", "24/7 Facility Access", "Luxury Locker Rooms", "Recovery & Massage Zone"];

export default function FitnessSportsCenter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success, error
  const [newsletter, setNewsletter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);

  // Filter programs based on search query
  const filteredPrograms = programsData.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation Refs
  const { ref: heroRef, inView: heroInView } = useInView({ threshold: 0.1 });
  const { ref: aboutRef, inView: aboutInView } = useInView({ threshold: 0.2 });
  const { ref: programsRef, inView: programsInView } = useInView({ threshold: 0.2 });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.hash]);

  // Handle Form Submission with mock API integration
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name === "" || form.email === "" || form.message === "") return;

    setFormStatus("loading");
    try {
      // Free jsonplaceholder API to simulate real POST request
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });
      if (res.ok) {
        setFormStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
      }
    } catch(err) {
      setFormStatus("error");
    }
  };

  return (
    <div className="gym-app" data-theme={isDark ? "dark" : "light"}>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => scrollTo('hero')}>
          <img src="/images/logo.jpg" alt="Fitness Sports Center Logo" style={{ height: '52px', width: '52px', borderRadius: '50%', objectFit: 'cover' }} />
          <div className="nav-logo-text">FITNESS <span>SPORTS</span></div>
        </div>
        <div className="nav-center">
          <ul className="nav-links">
            <li style={{ cursor: 'pointer' }} onClick={() => scrollTo('hero')}>HOME</li>
            <li style={{ cursor: 'pointer' }} onClick={() => scrollTo('about')}>ABOUT</li>
            <li style={{ cursor: 'pointer' }} onClick={() => scrollTo('programs')}>SERVICES</li>
            <li style={{ cursor: 'pointer' }} onClick={() => scrollTo('contact')}>CONTACT</li>
          </ul>
          <input 
            type="text" 
            className="nav-search" 
            placeholder="🔍 Search programs..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.length > 0) scrollTo('programs');
            }}
          />
          <button className="theme-toggle" onClick={() => setIsDark(!isDark)} title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <button className="nav-cta" onClick={() => navigate("/pricing")}>JOIN NOW</button>
      </nav>

      {/* HERO */}
      <section id="hero" className="hero">
        <div ref={heroRef} className={`animate-on-scroll ${heroInView ? 'is-visible' : ''}`}>
          <div className="section-label" style={{ justifyContent: 'center' }}>EST. 2023</div>
          <h1 className="hero-title">
            UNLEASH YOUR<br />
            <span className="gold">POTENTIAL</span>
          </h1>
          <p className="hero-subtitle">
            Premium equipment, expert trainers, and a community dedicated to pushing you beyond your limits. Join the elite.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/pricing")}>START YOUR JOURNEY <ArrowIcon /></button>
            <button className="btn-outline" onClick={() => scrollTo('about')}>LEARN MORE</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about">
        <div className={`about-img animate-on-scroll ${aboutInView ? 'is-visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
          <img src="https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&q=80" alt="gym" />
        </div>
        <div ref={aboutRef} className={`about-content animate-on-scroll ${aboutInView ? 'is-visible' : ''}`}>
          <div className="section-label">ABOUT US</div>
          <h2 className="about-title">WE BUILD<br />CHAMPIONS</h2>
          <p className="about-text">
            Founded in 2023, Fitness Sports Center was born out of a passion for pushing human performance. We are more than just a gym; we are a community of dedicated individuals striving for greatness.
          </p>
          <p className="about-text">
            Our facility is equipped with everything you need to transform your body and mind, supported by expert guidance and a focused training environment.
          </p>
          <div className="about-features">
            {features.map(f => (
              <div className="about-feature" key={f}>
                <div className="feature-dot"><CheckIcon /></div>
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="programs">
        <div ref={programsRef} className={`animate-on-scroll ${programsInView ? 'is-visible' : ''}`}>
          <div className="section-label" style={{ justifyContent: 'center' }}>WHAT WE OFFER</div>
          <h2 className="programs-title">
            ELITE TRAINING<br />
            <span className="gold">PROGRAMS</span>
          </h2>
          <p className="programs-subtitle">
            Choose from our range of specialized training options designed to help you achieve your ultimate fitness goals.
          </p>
          
          <div className="programs-grid">
            {filteredPrograms.length > 0 ? filteredPrograms.map((p, i) => (
              <div className="program-card" key={i}>
                <div className="program-img">
                  <img src={p.img} alt={p.name} />
                  <div className="program-icon">{p.icon}</div>
                </div>
                <div className="program-body">
                  <div className="program-name">{p.name.split("\n").map((l, j) => <span key={j}>{l}<br /></span>)}</div>
                  <div className="program-divider" />
                  <p className="program-desc">{p.desc}</p>
                  <button className="btn-outline" style={{ color: "var(--gold)", padding: 0 }} onClick={() => navigate(p.path)}>EXPLORE <ArrowIcon /></button>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', gridColumn: 'span 4' }}>Our search didn't locate any matching programs. Try a different keyword!</p>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact">
        <div className="contact-left">
          <div className="section-label">GET IN TOUCH</div>
          <h2 className="contact-title">START YOUR<br />TRANSFORMATION</h2>
          <p className="contact-desc">
            Ready to take the first step? Contact us today to schedule a tour, meet our trainers, or sign up for a membership.
          </p>
          <div className="contact-info">
            <div className="contact-info-item">
              <LocationIcon />
              <div>
                <div className="contact-info-label">Location</div>
                <div className="contact-info-val">123 Iron Street, Muscle City, MC 90210</div>
              </div>
            </div>
            <div className="contact-info-item">
              <PhoneIcon />
              <div>
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-val">+1 (555) 123-4567</div>
              </div>
            </div>
            <div className="contact-info-item">
              <EmailIcon />
              <div>
                <div className="contact-info-label">Email</div>
                <div className="contact-info-val">info@fitnesssportscenter.com</div>
              </div>
            </div>
          </div>
        </div>
        <form className="contact-right" onSubmit={handleSubmit}>
          <div className="form-title">SEND A MESSAGE</div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name</label>
              <input required className="form-input" placeholder="John Doe"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input required type="email" className="form-input" placeholder="john@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
          </div>
          <label className="form-label">Your Message</label>
          <textarea required className="form-textarea" placeholder="How can we help you achieve your goals?"
            value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
          
          <button type="submit" className="submit-btn" disabled={formStatus === "loading"}>
            {formStatus === "loading" ? "SENDING..." : "SEND MESSAGE"} <SendIcon />
          </button>

          {formStatus === "success" && <div className="form-status success">Message sent successfully! We will get back to you shortly.</div>}
          {formStatus === "error" && <div className="form-status error">Failed to send message. Please try again later.</div>}
        </form>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="nav-logo-icon">
                <img src="/images/logo.jpg" alt="Logo" style={{ height: '46px', width: '46px', borderRadius: '50%', objectFit: 'cover' }} />
              </div>
              <div className="nav-logo-text">FITNESS <span style={{ color: 'var(--gold)' }}>SPORTS</span></div>
            </div>
            <p>Forging champions since 2023. We provide the equipment, the expertise, and the environment. You provide the sweat.</p>
          </div>
          <div>
            <div className="footer-col-title">Quick Links</div>
            <ul className="footer-links">
              <li onClick={() => scrollTo("hero")}><a>Home</a></li>
              <li onClick={() => scrollTo("programs")}><a>Services</a></li>
              <li onClick={() => navigate("/pricing")}><a>Join Now</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Working Hours</div>
            <div className="footer-hours">
              <div className="footer-hour"><span>Mon – Fri</span><span>5:00 AM – 11:00 PM</span></div>
              <div className="footer-hour"><span>Saturday</span><span>6:00 AM – 10:00 PM</span></div>
              <div className="footer-hour"><span>Sunday</span><span>8:00 AM – 8:00 PM</span></div>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Newsletter</div>
            <p style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.7, marginBottom: 14 }}>
              Subscribe to get tips, nutrition guides, and special offers.
            </p>
            <div className="newsletter-input-row">
              <input className="newsletter-input" placeholder="Email Address"
                value={newsletter} onChange={e => setNewsletter(e.target.value)} />
              <button className="newsletter-btn">GO</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          © 2023 Fitness Sports Center. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
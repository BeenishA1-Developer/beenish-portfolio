import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   THEME TOKENS
───────────────────────────────────────────── */
const DARK = {
  bg: "#060810",
  surface: "#0b0f18",
  surface2: "#101520",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(0,229,255,0.3)",
  accent: "#00e5ff",
  accentRgb: "0,229,255",
  text: "#e6e8f0",
  muted: "#5a6478",
  mutedMid: "#8892a4",
  navBg: "rgba(6,8,16,0.88)",
  cardBg: "#0b0f18",
  cardHover: "#12182a",
  statBg: "#0e1420",
  pillBg: "#0e1420",
  shadow: "0 8px 32px rgba(0,229,255,0.18)",
  btnShadow: "0 8px 28px rgba(0,229,255,0.25)",
};

const LIGHT = {
  bg: "#f4f6fb",
  surface: "#ffffff",
  surface2: "#edf0f7",
  border: "rgba(0,0,0,0.08)",
  borderHover: "rgba(0,110,200,0.4)",
  accent: "#006ec8",
  accentRgb: "0,110,200",
  text: "#0d1526",
  muted: "#7a8599",
  mutedMid: "#5a6478",
  navBg: "rgba(244,246,251,0.92)",
  cardBg: "#ffffff",
  cardHover: "#f0f4ff",
  statBg: "#edf0f7",
  pillBg: "#edf0f7",
  shadow: "0 8px 32px rgba(0,110,200,0.14)",
  btnShadow: "0 8px 28px rgba(0,110,200,0.2)",
};

/* ─────────────────────────────────────────────
   DATA  (from Portfolio_Content_Plan.md)
───────────────────────────────────────────── */
const EMAIL    = "developerrra1@gmail.com";
const MAIL_SUBJECT = encodeURIComponent("Portfolio Inquiry - Beenish Ashraf");
const MAIL_BODY = encodeURIComponent(`Hi Beenish,\n\nI reviewed your portfolio and was exceptionally impressed by your work in modern Web and Android development, especially your real-world client projects.\n\I would love to explore a potential opportunity or project with you.\n\nPlease find more details below:\n\n\n\nLooking forward to connecting!`);
const MAIL_HREF = `mailto:${EMAIL}?subject=${MAIL_SUBJECT}&body=${MAIL_BODY}`;
const GITHUB   = "https://github.com/BeenishA1-Developer";
const LINKEDIN = "https://www.linkedin.com/in/beenish-ashraf-39b613371";

const SKILLS_DATA = [
  { label: "Web Development",       items: ["HTML", "CSS", "JavaScript", "TypeScript", "PHP", "React", "Next.js", "MySQL"] },
  { label: "Android Development",   items: ["Kotlin", "Jetpack Compose", "Room DB", "Material 3"] },
  { label: "AI & Tools",            items: ["Prompt Engineering", "Claude API", "Gemini API", "TFLite / MobileNetV2", "Google Colab"] },
  { label: "Design & Problem Solving", items: ["UI/UX Design", "Frontend Architecture", "Responsive Design", "SEO"] },
  { label: "Deployment & Platforms", items: ["Vercel", "Netlify", "Hostinger", "cPanel", "GitHub"] },
];

const STATS = [
  { n: "2+",  label: "Live Client Platforms" },
  { n: "12+", label: "GitHub Projects" },
  { n: "4",   label: "Android Apps" },
  { n: "95%", label: "ML Model Accuracy" },
];

const PROJECTS = [
  { tier:"featured", cat:"client",  name:"Business Nexus Platform",    desc:"Front End Internship project at DevelopersHub Corporation (Certificate: DHC-484). Developed real-world UI components and improved site responsiveness for a dynamic professional networking platform.", stack:["React", "TypeScript", "Tailwind CSS"], live:"https://nexus-iota-five.vercel.app/login", repo:"https://github.com/BeenishA1-Developer/Nexus", isLive:true },
  { tier:"featured", cat:"client",  name:"Bharia Forces Academy",      desc:"Complete real-time educational platform for Pakistani forces test prep. Quiz engine, admin panel, PDF notes, AdSense-ready pages, full SEO. Delivered solo for a real client.", stack:["JavaScript","HTML/CSS","PHP","MySQL"], live:"https://bhariaforcesacademy.com/", repo:"https://github.com/BeenishA1-Developer/bharia-forces-academy", isLive:true  },
  { tier:"featured", cat:"client",  name:"Velvix Time",                desc:"Fully deployed premium luxury timepiece client website with seamless high-end digital experience. Codebase confidential per client NDA.",                                        stack:["HTML","CSS","JavaScript"],             live:"https://velvixtime.wuaze.com/?i=1",                              repo:null,                                                              isLive:true  },
  { tier:"featured", cat:"android", name:"Ramadan Tasbeeh App",        desc:"Advanced spiritual companion app with a persistent digital counter and automated daily resets. Engineered using Jetpack Compose and Room DB with AI-assisted design optimization.", stack:["Kotlin","Jetpack Compose","Room DB","WorkManager"], live:null, repo:"https://github.com/BeenishA1-Developer/RamdanApp", isLive:false },
  { tier:"normal",   cat:"android", name:"Motivator App",              desc:"Feature-rich motivational quotes app built with Jetpack Compose using Room DB for offline storage.",                                                                                stack:["Kotlin","Jetpack Compose","Room DB"],  live:null,                                                             repo:"https://github.com/BeenishA1-Developer/MotivatorApp",             isLive:false },
  { tier:"normal",   cat:"android", name:"Hydro Theme App",            desc:"Android water reminder app with custom fonts and modern Compose UI to help users track daily hydration.",                                                                           stack:["Kotlin","Jetpack Compose"],            live:null,                                                             repo:"https://github.com/BeenishA1-Developer/HydroTheme",              isLive:false },
  { tier:"normal",   cat:"android", name:"Mood Vibes App",             desc:"Sleek mood-based interactive UI app demonstrating complex Jetpack Compose layout architecture.",                                                                                    stack:["Kotlin","Jetpack Compose"],            live:null,                                                             repo:"https://github.com/BeenishA1-Developer/MoodVibes-App",           isLive:false },
  { tier:"normal",   cat:"web",     name:"Luxe Barber",                desc:"Premium modern web experience for a high-end men's grooming and barber shop, built with TypeScript.",                                                                               stack:["TypeScript","HTML","CSS"],             live:null,                                                             repo:"https://github.com/BeenishA1-Developer/BarBer-Site",             isLive:false },
  { tier:"normal",   cat:"web",     name:"GymFit / SJ Beastmode",      desc:"High-energy dynamic landing page for a fitness gym with motivational design elements.",                                                                                             stack:["HTML","CSS","JavaScript"],             live:null,                                                             repo:"https://github.com/BeenishA1-Developer/gymfit-fitness-website",  isLive:false },
  { tier:"normal",   cat:"web",     name:"Sweet Beakers Bakery",       desc:"Complete bakery website with dynamic menu elements and PHP backend integration.",                                                                                                   stack:["PHP","HTML","CSS"],                    live:null,                                                             repo:"https://github.com/BeenishA1-Developer/sweetbeakers-bakery",     isLive:false },
  { tier:"normal",   cat:"web",     name:"Nexus YouTube Downloader",   desc:"Practical functional web tool allowing users to download YouTube videos directly from the browser.",                                                              stack:["HTML","TypeScript"],                   live:null,                                                             repo:"https://github.com/BeenishA1-Developer/nexus-youtube-downloader",isLive:false },
  { tier:"normal",   cat:"web",     name:"Real Estate Portal",         desc:"Property listing and real estate portal with elegant frontend design and JavaScript-powered filters.",                                                                               stack:["JavaScript","HTML","CSS"],             live:null,                                                             repo:"https://github.com/BeenishA1-Developer/Real-State-Website",      isLive:false },
  { tier:"normal",   cat:"web",     name:"E-Commerce Stores",          desc:"Specialized landing pages and storefronts for Kids Wear and Abaya apparel niches.",                                                                                                 stack:["HTML","CSS","JavaScript"],             live:null,                                                             repo:"https://github.com/BeenishA1-Developer/kids-wear-ecommerce",     isLive:false },
];

const EXPERIENCE = [
  { date:"Feb 2026 — Mar 2026", role:"Front End Development Intern", org:"DevelopersHub Corporation", desc:"Successfully completed a 6-week intensive internship focusing on modern Front End technologies. Worked on real-world UI components, improved site responsiveness, and collaborated with dev team (Certificate ID: DHC-484)." },
  { date:"2022 — Jun 2026",  role:"BSc Computer Science",     org:"GCUF · Government College University Faisalabad",  desc:"Final-year student specializing in web development and AI integration. Delivered multiple real client projects alongside academics." },
  { date:"2023 — Present",   role:"Freelance Web Developer",  org:"A1 Web Solutions · Faisalabad, Pakistan",          desc:"End-to-end delivery of full-stack platforms for local businesses — scoping, development, deployment, SEO. Real clients, real ownership." },
  { date:"2024",             role:"ML Developer (Freelance)", org:"Remote Client Project",                             desc:"Developed a high-accuracy fabric defect detection system (95%) using AI-driven methodologies and MobileNetV2. Optimized for edge deployment." },
  { date:"2024 — Present",   role:"AI Tools Builder",         org:"Personal & Freelance",                             desc:"AI agents, SEO dashboards, VS Code extensions, and automation tools — Claude API, Gemini API, custom PHP backends." },
];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
const GithubIcon = ({ s=15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedinIcon = ({ s=15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const MailIcon = ({ s=15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
  </svg>
);
const ExternalIcon = ({ s=13 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const SunIcon = () => (
  <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
  </svg>
);
const MoonIcon = () => (
  <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);
const MenuIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const CloseIcon = () => (
  <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* ─────────────────────────────────────────────
   useInView
───────────────────────────────────────────── */
function useInView(threshold=0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); ob.disconnect(); } }, { threshold });
    if (ref.current) ob.observe(ref.current);
    return () => ob.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay=0, style={} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":"translateY(26px)", transition:`opacity .65s ease ${delay}s,transform .65s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CATEGORY BADGE
───────────────────────────────────────────── */
function CatBadge({ cat, t }) {
  const cfg = {
    client:  { label:"★ Client",  bg:`rgba(${t.accentRgb},.1)`,  color:t.accent,   border:`rgba(${t.accentRgb},.25)` },
    android: { label:"Android",   bg:"rgba(124,58,237,.1)",        color:"#a78bfa",  border:"rgba(124,58,237,.25)"      },
    web:     { label:"Web",       bg:"rgba(244,114,182,.1)",       color:"#f472b6",  border:"rgba(244,114,182,.25)"     },
    ai:      { label:"Built with AI", bg:"rgba(0,229,255,0.1)",     color:t.accent,   border:`rgba(${t.accentRgb},0.4)`  },
  }[cat];
  return (
    <span style={{ fontSize:9, letterSpacing:"0.16em", textTransform:"uppercase", padding:"3px 9px", borderRadius:3, background:cfg.bg, color:cfg.color, border:`1px solid ${cfg.border}`, fontFamily:"'DM Mono',monospace" }}>
      {cfg.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────── */
function ProjectCard({ p, t }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? t.cardHover : t.cardBg,
        border: `1px solid ${hov ? t.borderHover : t.border}`,
        borderTop: p.tier==="featured" ? `3px solid ${t.accent}` : `1px solid ${hov?t.borderHover:t.border}`,
        borderRadius: "8px", padding:"22px",
        display:"flex", flexDirection:"column", gap:12,
        transition:"all .25s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hov ? t.shadow : "0 4px 20px rgba(0,0,0,0.03)",
        height:"100%",
      }}
    >
      {/* top */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:6 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
          <CatBadge cat={p.cat} t={t} />
          {p.isLive && (
            <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:9, color:"#22c55e", letterSpacing:"0.14em", textTransform:"uppercase", fontFamily:"'DM Mono',monospace" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#22c55e", display:"inline-block", animation:"pulseDot 1.6s ease-in-out infinite" }} />
              Live
            </span>
          )}
        </div>
        <div style={{ display:"flex", gap:5, flexShrink:0 }}>
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer"
              style={{ width:28, height:28, border:`1px solid ${t.border}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", color:t.muted, transition:"border-color .2s,color .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=t.accent; e.currentTarget.style.color=t.accent; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.muted; }}
            ><ExternalIcon /></a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer"
              style={{ width:28, height:28, border:`1px solid ${t.border}`, borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", color:t.muted, transition:"border-color .2s,color .2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=t.accent; e.currentTarget.style.color=t.accent; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.muted; }}
            ><GithubIcon /></a>
          )}
        </div>
      </div>
      {/* name */}
      <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.92rem", color:t.text, letterSpacing:"-0.01em", lineHeight:1.3 }}>{p.name}</div>
      {/* desc */}
      <div style={{ fontSize:11.5, color:t.mutedMid, lineHeight:1.85, flex:1 }}>{p.desc}</div>
      {/* stack */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginTop:2 }}>
        {p.stack.map(s => (
          <span key={s} style={{ fontSize:10, color:t.muted, padding:"2px 7px", border:`1px solid ${t.border}`, borderRadius:3, fontFamily:"'DM Mono',monospace" }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION LABEL
───────────────────────────────────────────── */
function SecTag({ label, t }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:t.accent, fontFamily:"'DM Mono',monospace" }}>
      <span style={{ width:18, height:1, background:t.accent, display:"inline-block" }} />{label}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = dark ? DARK : LIGHT;

  const filtered = PROJECTS.filter(p => filter==="all" || p.cat===filter);
  const NAV = ["Skills","Work","Experience","Contact"];
  const W = { maxWidth:1080, margin:"0 auto", padding:"0 20px" };
  const H2 = { fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.85rem,4vw,3rem)", fontWeight:800, letterSpacing:"-0.03em", lineHeight:1.1, marginBottom:10, color:t.text };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400&family=Instrument+Serif:ital@0;1&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{overflow-x:hidden;-webkit-font-smoothing:antialiased;}
        a{text-decoration:none;color:inherit;}
        button{cursor:pointer;border:none;background:none;font-family:inherit;}

        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}
        @keyframes floatB{0%,100%{transform:translateY(-12px)}50%{transform:translateY(12px)}}

        /* ── PROJECT GRID
           ≥ 901px  → 3 columns
           ≤ 900px  → 2 columns   (tablet)
           ≤ 480px  → 2 columns   (mobile — KEY REQUIREMENT)
        */
        .proj-grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:14px;
        }
        @media(max-width:900px){
          .proj-grid{grid-template-columns:repeat(2,1fr);}
        }
        @media(max-width:480px){
          .proj-grid{grid-template-columns:repeat(2,1fr);gap:10px;}
        }

        .skills-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;}
        @media(max-width:700px){.skills-grid{grid-template-columns:1fr;gap:24px;}}

        .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;}

        .exp-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
        @media(max-width:700px){.exp-grid{grid-template-columns:1fr;}}

        .nav-desktop{display:flex;gap:28px;list-style:none;}
        .hamburger{display:none!important;}
        @media(max-width:768px){.nav-desktop{display:none!important;}.hamburger{display:flex!important;}}

        .hero-ctas{display:flex;gap:12px;flex-wrap:wrap;}
        @media(max-width:420px){.hero-ctas{flex-direction:column;}.hero-ctas a{justify-content:center;}}

        .hero-socials{display:flex;gap:20px;flex-wrap:wrap;}

        .clinks{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;}

        .footer-row{display:flex;justify-content:space-between;align-items:center;}
        @media(max-width:560px){.footer-row{flex-direction:column;gap:10px;text-align:center;}}

        .sec{padding:80px 0;}
        @media(max-width:600px){.sec{padding:56px 0;}}

        .filter-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:28px;}
        .grad-text {
           background-image: var(--grad);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           background-clip: text;
           display: inline-block;
        }
      `}</style>

      <div style={{ "--grad": dark ? "linear-gradient(135deg,#00e5ff,#0090ff)" : "linear-gradient(135deg,#006ec8,#0090ff)", fontFamily:"'DM Mono',monospace", background:t.bg, color:t.text, minHeight:"100vh", transition:"background .3s,color .3s" }}>

        {/* ══ NAV ══════════════════════════════════════ */}
        <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, background:t.navBg, backdropFilter:"blur(18px)", borderBottom:`1px solid ${t.border}`, transition:"background .3s" }}>
          <div style={{ ...W, display:"flex", alignItems:"center", justifyContent:"space-between", height:62 }}>

            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:16, color:t.accent, letterSpacing:"-0.02em" }}>
              A1<span style={{ color:t.muted }}>.dev</span>
            </span>

            <ul className="nav-desktop">
              {NAV.map(n => (
                <li key={n}>
                  <a href={`#${n.toLowerCase()}`}
                    style={{ color:t.muted, fontSize:11, letterSpacing:"0.13em", textTransform:"uppercase", transition:"color .2s" }}
                    onMouseEnter={e=>e.currentTarget.style.color=t.accent}
                    onMouseLeave={e=>e.currentTarget.style.color=t.muted}
                  >{n}</a>
                </li>
              ))}
            </ul>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button onClick={()=>setDark(d=>!d)}
                style={{ width:36, height:36, borderRadius:"50%", border:`1px solid ${t.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:t.muted, background:"transparent", transition:"border-color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=t.accent}
                onMouseLeave={e=>e.currentTarget.style.borderColor=t.border}
              >{dark ? <SunIcon/> : <MoonIcon/>}</button>

              <a href={MAIL_HREF}
                style={{ padding:"8px 16px", background:t.accent, color:dark?"#060810":"#fff", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:12, letterSpacing:"0.04em", borderRadius:4, display:"flex", alignItems:"center", gap:6, transition:"opacity .2s,transform .2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.opacity=".85"; e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.opacity="1";   e.currentTarget.style.transform="translateY(0)"; }}
              ><MailIcon s={12}/> Hire Me</a>

              <button className="hamburger" onClick={()=>setMenuOpen(o=>!o)} style={{ color:t.muted, display:"flex", alignItems:"center" }}>
                {menuOpen ? <CloseIcon/> : <MenuIcon/>}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          {menuOpen && (
            <div style={{ background:t.surface, borderTop:`1px solid ${t.border}`, padding:"8px 20px 20px", animation:"fadeUp .2s ease" }}>
              {NAV.map(n=>(
                <a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setMenuOpen(false)}
                  style={{ display:"block", padding:"13px 0", color:t.muted, fontSize:13, letterSpacing:"0.12em", textTransform:"uppercase", borderBottom:`1px solid ${t.border}` }}
                >{n}</a>
              ))}
            </div>
          )}
        </nav>

        {/* ══ HERO ═════════════════════════════════════ */}
        <section id="hero" style={{ minHeight:"100vh", display:"flex", alignItems:"center", paddingTop:62 }}>
          <div style={{ ...W, padding:"80px 20px 60px", position:"relative", width:"100%" }}>

            {/* grid bg */}
            <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:`linear-gradient(${t.border} 1px,transparent 1px),linear-gradient(90deg,${t.border} 1px,transparent 1px)`, backgroundSize:"52px 52px", maskImage:"radial-gradient(ellipse 80% 70% at 10% 50%,black,transparent)", WebkitMaskImage:"radial-gradient(ellipse 80% 70% at 10% 50%,black,transparent)" }} />

            {/* orbs */}
            {dark && <>
              <div style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"rgba(0,229,255,0.055)", filter:"blur(90px)", top:0, right:-40, pointerEvents:"none", animation:"floatA 10s ease-in-out infinite" }}/>
              <div style={{ position:"absolute", width:260, height:260, borderRadius:"50%", background:"rgba(124,58,237,0.07)", filter:"blur(70px)", bottom:60, left:"38%", pointerEvents:"none", animation:"floatB 14s ease-in-out infinite" }}/>
            </>}

            <div style={{ position:"relative", zIndex:1, maxWidth:680 }}>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:22, animation:"fadeUp .7s ease .1s both" }}>
                <span style={{ width:32, height:1, background:`linear-gradient(90deg,${t.accent},transparent)`, display:"inline-block" }}/>
                <span style={{ fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:t.accent, fontFamily:"'DM Mono',monospace" }}>Available for Freelance</span>
              </div>

              <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(3rem,9.5vw,7.8rem)", fontWeight:800, letterSpacing:"-0.04em", lineHeight:0.9, color:t.text, marginBottom:14, animation:"fadeUp .75s ease .2s both" }}>
                Beenish<br/>
                <span className="grad-text">Ashraf</span>
              </h1>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:"clamp(0.7rem,1.4vw,0.85rem)", color:t.muted, letterSpacing:"0.12em", marginBottom:22, animation:"fadeUp .75s ease .28s both" }}>
                <span style={{ color:t.mutedMid }}>Ayesha Ashraf</span>
                <span style={{ margin:"0 10px", color:t.border.replace("0.07","0.3") }}>·</span>
                <span style={{ color:t.accent, fontSize:"0.75em", letterSpacing:"0.2em", textTransform:"uppercase" }}>A1 Web Solutions</span>
              </p>

              <p style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontSize:"clamp(1.05rem,2.2vw,1.55rem)", color:t.mutedMid, marginBottom:22, animation:"fadeUp .75s ease .38s both" }}>
                Multi-Disciplinary Software Developer · Android & Web
              </p>

              <p style={{ maxWidth:510, color:t.muted, fontSize:13, lineHeight:1.95, marginBottom:40, animation:"fadeUp .75s ease .42s both" }}>
                I build modern web platforms & Android applications using Jetpack Compose. Passionate about turning ideas into functional, beautiful digital experiences. Final-year BSCS at GCUF · Faisalabad, Pakistan.
              </p>

              <div className="hero-ctas" style={{ marginBottom:50, animation:"fadeUp .75s ease .52s both" }}>
                <a href="#work"
                  style={{ padding:"13px 28px", background:t.accent, color:dark?"#060810":"#fff", fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:13, letterSpacing:"0.04em", borderRadius:5, display:"inline-flex", alignItems:"center", gap:8, transition:"transform .2s,box-shadow .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=t.btnShadow; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
                >View My Work →</a>
                <a href={MAIL_HREF}
                  style={{ padding:"13px 28px", border:`1px solid ${t.border}`, color:t.mutedMid, fontFamily:"'Syne',sans-serif", fontWeight:600, fontSize:13, letterSpacing:"0.04em", borderRadius:5, display:"inline-flex", alignItems:"center", gap:8, transition:"border-color .2s,color .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=t.accent; e.currentTarget.style.color=t.accent; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.mutedMid; }}
                ><MailIcon/> Get in Touch</a>
              </div>

              <div className="hero-socials" style={{ animation:"fadeUp .75s ease .62s both" }}>
                {[
                  { href:GITHUB,            icon:<GithubIcon/>,   label:"GitHub"   },
                  { href:LINKEDIN,          icon:<LinkedinIcon/>, label:"LinkedIn" },
                  { href:MAIL_HREF, icon:<MailIcon/>,     label:"Email"    },
                ].map(s=>(
                  <a key={s.label} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:6, color:t.muted, fontSize:11, letterSpacing:"0.1em", textTransform:"uppercase", transition:"color .2s" }}
                    onMouseEnter={e=>e.currentTarget.style.color=t.accent}
                    onMouseLeave={e=>e.currentTarget.style.color=t.muted}
                  >{s.icon} {s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ SKILLS ═══════════════════════════════════ */}
        <section id="skills" className="sec" style={{ background:t.surface, transition:"background .3s" }}>
          <div style={W}>
            <Reveal><SecTag label="Skills & Expertise" t={t}/></Reveal>
            <Reveal delay={.05}><h2 style={H2}>What I Build With</h2></Reveal>
            <Reveal delay={.1}><p style={{ color:t.muted, fontSize:13, lineHeight:1.9, marginBottom:44, maxWidth:460 }}>From backend logic to pixel-perfect UIs — and everything in between.</p></Reveal>

            <div className="skills-grid">
              <div>
                {SKILLS_DATA.map((sg,i)=>(
                  <Reveal key={sg.label} delay={i*.07}>
                    <div style={{ marginBottom:26 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11, fontSize:10, letterSpacing:"0.17em", textTransform:"uppercase", color:t.muted, fontFamily:"'DM Mono',monospace" }}>
                        {sg.label}<span style={{ flex:1, height:1, background:t.border }}/>
                      </div>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                        {sg.items.map(item=>(
                          <span key={item}
                            style={{ padding:"5px 11px", border:`1px solid ${t.border}`, borderRadius:4, fontSize:12, color:t.text, background:t.pillBg, fontFamily:"'DM Mono',monospace", transition:"border-color .2s,color .2s", cursor:"default" }}
                            onMouseEnter={e=>{ e.currentTarget.style.borderColor=t.borderHover; e.currentTarget.style.color=t.accent; }}
                            onMouseLeave={e=>{ e.currentTarget.style.borderColor=t.border;      e.currentTarget.style.color=t.text;  }}
                          >{item}</span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={.1}>
                <div className="stats-grid" style={{ background:t.border, border:`1px solid ${t.border}`, borderRadius:6, overflow:"hidden" }}>
                  {STATS.map(s=>(
                    <div key={s.label}
                      style={{ background:t.statBg, padding:"30px 22px", transition:"background .2s", cursor:"default" }}
                      onMouseEnter={e=>e.currentTarget.style.background=t.bg}
                      onMouseLeave={e=>e.currentTarget.style.background=t.statBg}
                    >
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"2.3rem", fontWeight:800, letterSpacing:"-0.04em", color:t.accent, lineHeight:1, marginBottom:7 }}>{s.n}</div>
                      <div style={{ fontSize:11, color:t.muted, letterSpacing:"0.04em", lineHeight:1.5 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ WORK ═════════════════════════════════════ */}
        <section id="work" className="sec" style={{ background:t.bg, transition:"background .3s" }}>
          <div style={W}>
            <Reveal><SecTag label="Portfolio" t={t}/></Reveal>
            <Reveal delay={.05}><h2 style={H2}>Selected Work</h2></Reveal>
            <Reveal delay={.1}><p style={{ color:t.muted, fontSize:13, lineHeight:1.9, marginBottom:32, maxWidth:440 }}>Real projects. Real clients. Real impact.</p></Reveal>

            <Reveal delay={.12}>
              <div className="filter-row">
                {[{key:"all",label:"All Projects"},{key:"ai",label:"Built with AI"},{key:"client",label:"★ Client"},{key:"android",label:"Android"},{key:"web",label:"Web"}].map(f=>(
                  <button key={f.key} onClick={()=>setFilter(f.key)}
                    style={{ padding:"6px 16px", border:`1px solid ${filter===f.key?t.accent:t.border}`, color:filter===f.key?t.accent:t.muted, background:filter===f.key?`rgba(${t.accentRgb},.07)`:"transparent", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:"0.08em", borderRadius:4, transition:"all .2s" }}
                    onMouseEnter={e=>{ if(filter!==f.key){ e.currentTarget.style.borderColor=t.accent; e.currentTarget.style.color=t.accent; } }}
                    onMouseLeave={e=>{ if(filter!==f.key){ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.muted;  } }}
                  >{f.label}</button>
                ))}
              </div>
            </Reveal>

            {/* Cards — 3 col desktop, 2 col tablet+mobile */}
            <div className="proj-grid">
              {filtered.map((p,i)=>(
                <Reveal key={p.name} delay={Math.min(i,5)*.045}>
                  <ProjectCard p={p} t={t}/>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXPERIENCE ═══════════════════════════════ */}
        <section id="experience" className="sec" style={{ background:t.surface, transition:"background .3s" }}>
          <div style={W}>
            <Reveal><SecTag label="Background" t={t}/></Reveal>
            <Reveal delay={.05}><h2 style={H2}>Education & Experience</h2></Reveal>
            <Reveal delay={.1}><p style={{ color:t.muted, fontSize:13, lineHeight:1.9, marginBottom:44, maxWidth:440 }}>Building real things since day one.</p></Reveal>

            <div className="exp-grid">
              {EXPERIENCE.map((e,i)=>(
                <Reveal key={e.role} delay={i*.07}>
                  <div
                    style={{ borderLeft:`2px solid ${t.border}`, paddingLeft:22, position:"relative", transition:"border-color .2s" }}
                    onMouseEnter={ev=>ev.currentTarget.style.borderColor=t.accent}
                    onMouseLeave={ev=>ev.currentTarget.style.borderColor=t.border}
                  >
                    <span style={{ width:9, height:9, borderRadius:"50%", border:`2px solid ${t.accent}`, background:t.bg, position:"absolute", left:-5.5, top:3, display:"block" }}/>
                    <div style={{ fontSize:10, color:t.muted, letterSpacing:"0.1em", marginBottom:6, fontFamily:"'DM Mono',monospace" }}>{e.date}</div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:"0.95rem", color:t.text, marginBottom:4 }}>{e.role}</div>
                    <div style={{ fontSize:12, color:t.accent, marginBottom:10, fontFamily:"'DM Mono',monospace" }}>{e.org}</div>
                    <div style={{ fontSize:12, color:t.mutedMid, lineHeight:1.85 }}>{e.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══════════════════════════════════ */}
        <section id="contact" className="sec" style={{ background:t.bg, transition:"background .3s" }}>
          <div style={{ ...W, textAlign:"center" }}>
            <Reveal><div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:14, fontSize:10, letterSpacing:"0.22em", textTransform:"uppercase", color:t.accent, fontFamily:"'DM Mono',monospace" }}>
              <span style={{ width:18, height:1, background:t.accent, display:"inline-block" }}/>Let's Connect
            </div></Reveal>
            <Reveal delay={.06}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.4rem,6.5vw,5.5rem)", fontWeight:800, letterSpacing:"-0.04em", lineHeight:1.02, marginBottom:18, color:t.text }}>
                Got a project?<br/>
                <span style={{ fontFamily:"'Instrument Serif',serif", fontStyle:"italic", fontWeight:400, color:t.muted }}>Let's talk.</span>
              </h2>
            </Reveal>
            <Reveal delay={.12}>
              <a href={MAIL_HREF}
                style={{ display:"inline-block", fontSize:"clamp(.95rem,2vw,1.1rem)", color:t.accent, borderBottom:`1px solid rgba(${t.accentRgb},.3)`, paddingBottom:3, marginBottom:44, transition:"border-color .2s" }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=t.accent}
                onMouseLeave={e=>e.currentTarget.style.borderColor=`rgba(${t.accentRgb},.3)`}
              >{EMAIL}</a>
            </Reveal>
            <Reveal delay={.18}>
              <div className="clinks">
                {[
                  { href:GITHUB,                        icon:<GithubIcon/>,   label:"GitHub"   },
                  { href:LINKEDIN,                      icon:<LinkedinIcon/>, label:"LinkedIn" },
                  { href:"https://bhariaforcesacademy.com", icon:<ExternalIcon/>, label:"Live Work"},
                ].map(l=>(
                  <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
                    style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"10px 20px", border:`1px solid ${t.border}`, color:t.muted, borderRadius:4, fontSize:12, fontFamily:"'DM Mono',monospace", letterSpacing:"0.05em", transition:"border-color .2s,color .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor=t.accent; e.currentTarget.style.color=t.accent; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor=t.border; e.currentTarget.style.color=t.muted;  }}
                  >{l.icon} {l.label}</a>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════ */}
        <footer style={{ borderTop:`1px solid ${t.border}`, background:t.surface, transition:"background .3s" }}>
          <div style={{ ...W, padding:"22px 20px" }}>
            <div className="footer-row" style={{ fontSize:11, color:t.muted }}>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:t.text, fontSize:13, marginBottom:3 }}>Beenish <span style={{ color:t.muted, fontWeight:400 }}>(Ayesha Ashraf)</span></div>
                <div>A1 Web Solutions · Faisalabad, Pakistan</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div>© 2025 · Built with React</div>
                <div style={{ marginTop:3 }}>GCUF · Graduating June 2026</div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

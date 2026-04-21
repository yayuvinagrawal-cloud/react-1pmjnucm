import { useState, useEffect, useRef } from "react";

/* ─── ICONS ─── */
const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

/* ─── DATA ─── */
const COMPS = [
  {
    name: "Sheila / Star / Noelle / Beekeeper",
    short: "Core Comp",
    icon: "⚔️",
    color: "#3b82f6",
    glow: "59,130,246",
    why: "Solid, balanced comp that keeps pressure on, holds up well, and scales steadily.",
    useWhen: "Pick this if your team coordinates well and your Beekeeper can get value early. Grab bees fast without overcommitting to base.",
    early: "Split at 2:20 after t1 2 mid / 2 base. Only jump into fights you can win.",
    mid: "Use Sheila and Star to control the map, try to get t3 before 6 mins and bb other teams when ur up on iron with tnt!",
    win: "After getting first t3 go for beds with tnt right away!",
  },
  {
    name: "Farmer / Fisher / Star / Amy",
    short: "Stable Econ",
    icon: "💰",
    color: "#10b981",
    glow: "16,185,129",
    why: "Reliable loot with solid defense.",
    useWhen: "Go for this if you're running a stable economy with two bed defenders and want to scale safely into mid game.",
    early: "Don't force bad fights. Keep your economy kits safe.",
    mid: "Focus on armor, enchants, and upgrades.",
    win: "Use your gear edge and push as a team.",
  },
  {
    name: "Lani / Lani / Warden / Fisher",
    short: "Bypass",
    icon: "🏃",
    color: "#ec4899",
    glow: "236,72,153",
    why: "Designed to dodge standard fights and win fast through bed pressure.",
    useWhen: "Use against slow teams or for shorter games.",
    early: "Split lanes. Lani players create angles while Fisher builds.",
    mid: "Keep side pressure and avoid full team fights.",
    win: "Punish openings quickly, break bed, and finish.",
  },
  {
    name: "Davey / Umbra / Fisher / Fisher",
    short: "BB Strat",
    icon: "💥",
    color: "#f59e0b",
    glow: "245,158,11",
    why: "Aggressive bed break comp with Umbra controlling space and double Fisher scaling.",
    useWhen: "Use if your BB is confident, your team plays fast, and you want to hit slow setups before they scale.",
    early: "Let Davey hunt for early openings while both Fishers build value and Umbra controls space.",
    mid: "Force tough fights, pressure sides, and make teams split between base and map.",
    win: "Get one clean opening, send Davey in, and turn pressure into wins.",
  },
  {
    name: "Amy / Umbra / Fisher / Fisher",
    short: "Fisher Fisher",
    icon: "🌊",
    color: "#8b5cf6",
    glow: "139,92,246",
    why: "Safe scaling comp with strong late-game power and good fight control via Amy and Umbra.",
    useWhen: "Pick this if your team wants steady scaling, trusts the Amy player in fights, and can protect both Fishers early.",
    early: "Avoid random fights, keep both Fishers alive, and let Amy only take good trades.",
    mid: "Focus on gear timing, enchants, and Umbra's utility while keeping pressure without pushing too hard.",
    win: "Outscale, win one strong grouped fight, then use map control for bed pressure.",
  },
];

const ROLES = [
  { key: "CYCLE", emoji: "♻️", desc: "Scaling kits like Metal Beekeeper, Farmer", color: "#10b981" },
  { key: "BD", emoji: "🛡️", desc: "Bed defender. Keeps bed safe, HAS COUNTER TNT, protects gen and pchests all dims.", color: "#3b82f6" },
  { key: "MJ", emoji: "⚔️", desc: "Main fighter. Handles most PvP like Sheila, Cait, Silas.", color: "#ef4444" },
  { key: "SJ", emoji: "🤝", desc: "Second fighter. Supports the main and provides impact/advantage like Star, Zeno, and Umbra.", color: "#f59e0b" },
  { key: "BBER", emoji: "💥", desc: "Breaks beds. Finds chances and ends games. Like Ragnar, Davey, and Dino.", color: "#8b5cf6" },
];

const TIPS = {
  "Win Checklist": {
    icon: "✅",
    color: "#3b82f6",
    items: [
      "Don't force early fights unless you're sure you'll win.",
      "Fight mostly in groups of 2 or 3.",
      "Protect scaling kits early.",
      "Get blocks and stone sword first.",
      "One good team fight can win the game.",
      "Vs cheaters: don't ego fight. Build gear, stack blocks and TNT rain and bb! PLAY KITS LIKE AMY OR FREYA THAT DON'T REQUIRE KILLS AND JUST CYCLE DIMS",
    ]
  },
  "Fisher Fisher": {
    icon: "🌊",
    color: "#8b5cf6",
    items: [
      "Don't mess around early. Double Fisher works only if both survive and build value.",
      "Fighters should hold back and trade wisely, not risk everything on every chance.",
      "After t1 make sure to JUMP on any fish that's not dim gold or ems!",
      "Get fishing rod early and try to build value as fast as possible.",
    ]
  },
  "Real Strats": {
    icon: "🧠",
    color: "#10b981",
    items: [
      "Core comps work best when everyone sticks to their role, not freelancing.",
      "Don't throw your scaling kits into pointless fights just because the team wants excitement.",
      "If your comp scales, survive to mid game cleanly — not pretend to dominate early.",
      "Most games end with one good grouped fight and quick finish, not random kills.",
    ]
  },
  "BB Strats": {
    icon: "💥",
    color: "#f59e0b",
    items: [
      "Your BB should not ego fight. Their job is to watch spacing and punish openings.",
      "Pressure first, break second. Good bed breaks come after forcing defenders out of position.",
      "If the map is locked, threaten side lanes and make the enemy split before committing.",
      "When one opening appears, everyone collapses fast — no hesitation.",
    ]
  },
};

/* ─── PARTICLE BACKGROUND ─── */
function Particles({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(147,197,253,${p.opacity})`
          : `rgba(59,130,246,${p.opacity * 0.6})`;
        ctx.fill();
      });
      // connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = dark
              ? `rgba(147,197,253,${0.06 * (1 - dist / 100)})`
              : `rgba(59,130,246,${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, [dark]);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} />;
}

/* ─── SCANLINE OVERLAY ─── */
const Scanlines = () => (
  <div style={{
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1,
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
  }} />
);

/* ─── GLITCH TEXT ─── */
function GlitchText({ children, style }) {
  return (
    <span className="glitch-wrap" style={{ position: "relative", display: "inline-block", ...style }}>
      {children}
      <span className="glitch-a" aria-hidden>{children}</span>
      <span className="glitch-b" aria-hidden>{children}</span>
    </span>
  );
}

/* ─── COMP CARD ─── */
function CompCard({ comp, dark }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => setOpen(o => !o)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        border: `1px solid ${open || hovered ? comp.color + "60" : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
        background: open
          ? dark ? `rgba(${comp.glow},0.12)` : `rgba(${comp.glow},0.06)`
          : dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.7)",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
        transform: hovered ? "translateY(-3px) scale(1.01)" : "none",
        boxShadow: open || hovered ? `0 0 30px rgba(${comp.glow},0.2), 0 8px 32px rgba(0,0,0,0.15)` : dark ? "0 2px 12px rgba(0,0,0,0.25)" : "0 2px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        position: "relative",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      {/* top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent 0%, ${comp.color} 40%, ${comp.color} 60%, transparent 100%)`,
        opacity: open || hovered ? 1 : 0.3,
        transition: "opacity 0.3s",
      }} />

      {/* corner decoration */}
      <div style={{
        position: "absolute", top: 12, right: 12,
        width: 32, height: 32, opacity: 0.08,
        border: `2px solid ${comp.color}`,
        borderRadius: 6,
        transform: "rotate(15deg)",
        pointerEvents: "none",
      }} />

      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: `rgba(${comp.glow},0.15)`,
            border: `1px solid rgba(${comp.glow},0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, flexShrink: 0,
            boxShadow: `0 0 12px rgba(${comp.glow},0.2)`,
          }}>{comp.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
              color: comp.color, marginBottom: 2, fontFamily: "'Space Mono', monospace",
            }}>{comp.short}</div>
            <div style={{
              fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em",
              color: dark ? "rgba(255,255,255,0.9)" : "#0f172a",
              lineHeight: 1.3,
            }}>{comp.name}</div>
          </div>
          <div style={{
            width: 22, height: 22, borderRadius: "50%",
            border: `1.5px solid ${dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "none",
            flexShrink: 0,
          }}>▼</div>
        </div>

        <p style={{
          fontSize: 12, lineHeight: 1.65, margin: "0 0 0",
          color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)",
        }}>{comp.why}</p>

        {/* Expanded */}
        <div style={{
          overflow: "hidden",
          maxHeight: open ? 600 : 0,
          transition: "max-height 0.5s cubic-bezier(.22,1,.36,1)",
        }}>
          <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Use when", text: comp.useWhen, icon: "🎯" },
              { label: "Early game", text: comp.early, icon: "⚡" },
              { label: "Mid game", text: comp.mid, icon: "🔄" },
              { label: "Win condition", text: comp.win, icon: "🏆" },
            ].map(phase => (
              <div key={phase.label} style={{
                borderRadius: 10, padding: "10px 12px",
                background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{ fontSize: 11 }}>{phase.icon}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: comp.color, fontFamily: "'Space Mono', monospace",
                  }}>{phase.label}</span>
                </div>
                <p style={{ margin: 0, fontSize: 12, lineHeight: 1.65, color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)" }}>{phase.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── TIPS PANEL ─── */
function TipsPanel({ dark }) {
  const [active, setActive] = useState("Win Checklist");
  const data = TIPS[active];

  return (
    <div style={{
      borderRadius: 20,
      border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
      background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.75)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      overflow: "hidden",
      boxShadow: dark ? "0 20px 50px rgba(0,0,0,0.4)" : "0 8px 30px rgba(0,0,0,0.06)",
    }}>
      {/* Tab bar */}
      <div style={{
        display: "flex", overflowX: "auto",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
        scrollbarWidth: "none",
        background: dark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
      }}>
        {Object.keys(TIPS).map(tab => {
          const t = TIPS[tab];
          const isActive = tab === active;
          return (
            <button key={tab} onClick={() => setActive(tab)} style={{
              flex: "1 0 auto",
              padding: "11px 14px",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.04em",
              color: isActive ? t.color : dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
              borderBottom: isActive ? `2px solid ${t.color}` : "2px solid transparent",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}>{t.icon} {tab}</button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {data.items.map((item, i) => (
          <div key={i} style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            borderRadius: 12, padding: "11px 13px",
            background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"}`,
            transition: "transform 0.2s",
          }}>
            <div style={{
              flexShrink: 0, width: 24, height: 24, borderRadius: 6,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 800, fontFamily: "'Space Mono', monospace",
              background: `${data.color}20`,
              color: data.color,
              border: `1px solid ${data.color}40`,
            }}>{i + 1}</div>
            <p style={{ margin: 0, paddingTop: 2, fontSize: 12.5, lineHeight: 1.65, color: dark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)" }}>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── ROLES GRID ─── */
function RolesSection({ dark }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{
      borderRadius: 20,
      border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
      background: dark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.75)",
      backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
      padding: "20px",
      boxShadow: dark ? "0 20px 50px rgba(0,0,0,0.4)" : "0 8px 30px rgba(0,0,0,0.06)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, fontFamily: "'Space Mono', monospace", letterSpacing: "-0.02em", color: dark ? "#fff" : "#0f172a" }}>Roles</h2>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
          color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
          fontFamily: "'Space Mono', monospace",
        }}>DEFINITIONS</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
        {ROLES.map(r => (
          <div
            key={r.key}
            onMouseEnter={() => setHovered(r.key)}
            onMouseLeave={() => setHovered(null)}
            style={{
              borderRadius: 14, padding: "14px 13px",
              background: hovered === r.key ? `rgba(${r.color.replace('#','').match(/.{2}/g).map(x=>parseInt(x,16)).join(',')},0.1)` : dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              border: `1px solid ${hovered === r.key ? r.color + "50" : dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              transition: "all 0.2s",
              transform: hovered === r.key ? "translateY(-2px)" : "none",
              cursor: "default",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 7 }}>{r.emoji}</div>
            <div style={{
              fontSize: 10, fontWeight: 800, letterSpacing: "0.18em", fontFamily: "'Space Mono', monospace",
              color: r.color, marginBottom: 5,
            }}>{r.key}</div>
            <p style={{ margin: 0, fontSize: 11, lineHeight: 1.6, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)" }}>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("comps");
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScroll = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setHeaderVisible(y < lastScroll.current || y < 60);
      lastScroll.current = y;
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    const id = "bw-ext-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Outfit:wght@400;500;600;700;800;900&display=swap";
      document.head.appendChild(l);
    }
  }, []);

  if (!mounted) return null;

  const bg = dark
    ? "linear-gradient(160deg, #050a14 0%, #080d1a 50%, #06091200 100%)"
    : "linear-gradient(160deg, #e8eeff 0%, #f4f6ff 50%, #eff0ff 100%)";

  return (
    <div style={{
      minHeight: "100vh",
      background: bg,
      color: dark ? "#e8edf5" : "#0f172a",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      <style>{`
        @keyframes glitch-a {
          0%,100% { clip-path: inset(0 0 98% 0); transform: translateX(-2px); }
          25% { clip-path: inset(30% 0 50% 0); transform: translateX(2px); }
          50% { clip-path: inset(70% 0 10% 0); transform: translateX(-2px); }
          75% { clip-path: inset(10% 0 80% 0); transform: translateX(1px); }
        }
        @keyframes glitch-b {
          0%,100% { clip-path: inset(90% 0 2% 0); transform: translateX(2px); }
          25% { clip-path: inset(50% 0 30% 0); transform: translateX(-1px); }
          50% { clip-path: inset(20% 0 70% 0); transform: translateX(2px); }
          75% { clip-path: inset(60% 0 20% 0); transform: translateX(-2px); }
        }
        .glitch-a {
          position: absolute; inset: 0;
          color: #3b82f6;
          animation: glitch-a 4s infinite;
          opacity: 0.6;
        }
        .glitch-b {
          position: absolute; inset: 0;
          color: #ec4899;
          animation: glitch-b 4s infinite 0.1s;
          opacity: 0.4;
        }
        @keyframes fadeup {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.2; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }
        @keyframes float {
          0%,100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .fade-in { animation: fadeup 0.6s cubic-bezier(.22,1,.36,1) both; }
        .fade-in-1 { animation-delay: 0.08s; }
        .fade-in-2 { animation-delay: 0.16s; }
        .fade-in-3 { animation-delay: 0.24s; }
        .fade-in-4 { animation-delay: 0.32s; }
        .pulse { animation: pulse-ring 2.5s ease-in-out infinite; }
        .float-anim { animation: float 3s ease-in-out infinite; }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)"}; border-radius: 99px; }
        body { margin: 0; }
        button { font-family: inherit; }
      `}</style>

      <Particles dark={dark} />
      <Scanlines />

      {/* Ambient glows */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{
          position: "absolute", width: 600, height: 600, borderRadius: "50%",
          background: dark ? "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)" : "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          top: -200, left: -100,
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: dark ? "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)" : "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
          bottom: 0, right: -100,
        }} />
      </div>

      {/* ── STICKY NAV ── */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s cubic-bezier(.22,1,.36,1)",
      }}>
        <div style={{
          padding: "10px 16px",
          background: dark ? "rgba(5,10,20,0.85)" : "rgba(240,244,255,0.9)",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, boxShadow: "0 0 12px rgba(59,130,246,0.4)",
            }}>🛏</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, fontFamily: "'Space Mono', monospace", color: dark ? "#fff" : "#0f172a" }}>BEDWARS</div>
              <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", fontFamily: "'Space Mono', monospace" }}>SQUADS META</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Tab switcher */}
            <div style={{
              display: "flex", gap: 3,
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderRadius: 10, padding: 3,
              border: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
            }}>
              {[["comps", "⚔️ Comps"], ["tips", "📋 Tips"], ["roles", "👥 Roles"]].map(([key, label]) => (
                <button key={key} onClick={() => setTab(key)} style={{
                  padding: "5px 11px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace",
                  background: tab === key ? dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" : "transparent",
                  color: tab === key ? dark ? "#fff" : "#0f172a" : dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                  transition: "all 0.2s",
                }}>{label}</button>
              ))}
            </div>

            {/* Dark toggle */}
            <button onClick={() => setDark(d => !d)} style={{
              width: 34, height: 34, borderRadius: 10, border: "none", cursor: "pointer",
              background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
              transition: "all 0.2s",
            }}>{dark ? <SunIcon /> : <MoonIcon />}</button>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{ position: "relative", zIndex: 2, padding: "40px 16px 20px", maxWidth: 900, margin: "0 auto" }}>
        <div className="fade-in" style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            borderRadius: 999, padding: "5px 14px",
            background: dark ? "rgba(59,130,246,0.12)" : "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.3)",
            marginBottom: 18,
          }}>
            <div className="pulse" style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#3b82f6",
              boxShadow: "0 0 8px #3b82f6",
            }} />
            <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: "#3b82f6" }}>Roblox BedWars · Ranked Squads</span>
          </div>

          <h1 style={{ margin: "0 0 12px", lineHeight: 1.05 }}>
            <GlitchText style={{
            fontSize: "clamp(2.4rem, 9vw, 5rem)",
            fontWeight: 900,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "-0.05em",
            color: dark ? "#ffffff" : "#0f172a",
            display: "block",
            textShadow: dark ? "0 0 30px rgba(37,99,235,0.18)" : "none",
          }}>SQUADS</GlitchText>
            <span style={{
              fontSize: "clamp(1.1rem, 4vw, 1.8rem)",
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.08em",
              background: "linear-gradient(90deg, #60a5fa 0%, #2563eb 45%, #dc2626 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}>COMPS · ROLES · WIN CONDITIONS</span>
          </h1>

          <p style={{
            fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: "0 auto",
            color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.45)",
          }}>
            Ranked squads structure, roles, and execution — clean reference for 4-stack teams.
          </p>

          {/* Stats row */}
          <div className="fade-in fade-in-1" style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { val: "5", label: "Comps", color: "#3b82f6" },
              { val: "5", label: "Roles", color: "#10b981" },
              { val: "4", label: "Strat Guides", color: "#8b5cf6" },
            ].map(s => (
              <div key={s.label} style={{
                borderRadius: 14, padding: "12px 22px",
                background: dark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                backdropFilter: "blur(12px)",
                textAlign: "center",
              }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, fontFamily: "'Space Mono', monospace", color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)", marginTop: 2, fontFamily: "'Space Mono', monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        {tab === "comps" && (
          <div className="fade-in fade-in-2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {COMPS.map((comp, i) => <CompCard key={i} comp={comp} dark={dark} />)}
          </div>
        )}

        {tab === "tips" && (
          <div className="fade-in fade-in-2">
            <TipsPanel dark={dark} />
          </div>
        )}

        {tab === "roles" && (
          <div className="fade-in fade-in-2">
            <RolesSection dark={dark} />
          </div>
        )}

        <div style={{ marginTop: 32, textAlign: "center", fontSize: 10, fontFamily: "'Space Mono', monospace", letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.2)" }}>
          BEDWARS SQUADS META REFERENCE · 4-STACK RANKED PLAY
        </div>
      </div>
    </div>
  );
}

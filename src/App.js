import { useState, useEffect } from "react";

/* ─── FONT LOADER ─── */
function useFonts() {
  useEffect(() => {
    const id = "bw-apple-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Fira+Mono:wght@400;500;700&display=swap";
      document.head.appendChild(l);
    }
  }, []);
}

/* ─── ICONS ─── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4"/>
    <line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
    <line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const ChevronIcon = ({ open }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    style={{ transition: "transform 0.3s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

/* ─── DATA ─── */
const COMPS = [
  {
    name: "Sheila / Star / Noelle / Beekeeper",
    short: "Core Comp", icon: "⚔️",
    color: "#007AFF", rgb: "0,122,255",
    why: "Solid, balanced comp that keeps pressure on, holds up well, and scales steadily.",
    useWhen: "Pick this if your team coordinates well and your Beekeeper can get value early. Grab bees fast without overcommitting to base.",
    early: "Split at 2:20 after t1 2 mid / 2 base. Only jump into fights you can win.",
    mid: "Use Sheila and Star to control the map, try to get t3 before 6 mins and bb other teams when ur up on iron with tnt!",
    win: "After getting first t3 go for beds with tnt right away!",
  },
  {
    name: "Farmer / Fisher / Star / Amy",
    short: "Stable Econ", icon: "💰",
    color: "#34C759", rgb: "52,199,89",
    why: "Reliable loot with solid defense.",
    useWhen: "Go for this if you're running a stable economy with two bed defenders and want to scale safely into mid game.",
    early: "Don't force bad fights. Keep your economy kits safe.",
    mid: "Focus on armor, enchants, and upgrades.",
    win: "Use your gear edge and push as a team.",
  },
  {
    name: "Lani / Lani / Warden / Fisher",
    short: "Bypass", icon: "🏃",
    color: "#FF2D55", rgb: "255,45,85",
    why: "Designed to dodge standard fights and win fast through bed pressure.",
    useWhen: "Use against slow teams or for shorter games.",
    early: "Split lanes. Lani players create angles while Fisher builds.",
    mid: "Keep side pressure and avoid full team fights.",
    win: "Punish openings quickly, break bed, and finish.",
  },
  {
    name: "Davey / Umbra / Fisher / Fisher",
    short: "BB Strat", icon: "💥",
    color: "#FF9F0A", rgb: "255,159,10",
    why: "Aggressive bed break comp with Umbra controlling space and double Fisher scaling.",
    useWhen: "Use if your BB is confident, your team plays fast, and you want to hit slow setups before they scale.",
    early: "Let Davey hunt for early openings while both Fishers build value and Umbra controls space.",
    mid: "Force tough fights, pressure sides, and make teams split between base and map.",
    win: "Get one clean opening, send Davey in, and turn pressure into wins.",
  },
  {
    name: "Amy / Umbra / Fisher / Fisher",
    short: "Fisher Fisher", icon: "🌊",
    color: "#BF5AF2", rgb: "191,90,242",
    why: "Safe scaling comp with strong late-game power and good fight control via Amy and Umbra.",
    useWhen: "Pick this if your team wants steady scaling, trusts the Amy player in fights, and can protect both Fishers early.",
    early: "Avoid random fights, keep both Fishers alive, and let Amy only take good trades.",
    mid: "Focus on gear timing, enchants, and Umbra's utility while keeping pressure without pushing too hard.",
    win: "Outscale, win one strong grouped fight, then use map control for bed pressure.",
  },
];

const ROLES = [
  { key: "CYCLE", emoji: "♻️", desc: "Scaling kits like Metal Beekeeper, Farmer.", color: "#34C759", rgb: "52,199,89" },
  { key: "BD", emoji: "🛡️", desc: "Bed defender. Keeps bed safe, HAS COUNTER TNT, protects gen and pchests all dims.", color: "#007AFF", rgb: "0,122,255" },
  { key: "MJ", emoji: "⚔️", desc: "Main fighter. Handles most PvP like Sheila, Cait, Silas.", color: "#FF2D55", rgb: "255,45,85" },
  { key: "SJ", emoji: "🤝", desc: "Second fighter. Supports the main and provides impact/advantage like Star, Zeno, and Umbra.", color: "#FF9F0A", rgb: "255,159,10" },
  { key: "BBER", emoji: "💥", desc: "Breaks beds. Finds chances and ends games. Like Ragnar, Davey, and Dino.", color: "#BF5AF2", rgb: "191,90,242" },
];

const GUIDES = {
  "Win Checklist": {
    icon: "✅", color: "#007AFF", rgb: "0,122,255",
    items: [
      "Don't force early fights unless you're sure you'll win.",
      "Fight mostly in groups of 2 or 3.",
      "Protect scaling kits early.",
      "Get blocks and stone sword first.",
      "One good team fight can win the game.",
      "Vs cheaters: don't ego fight. Build gear, stack blocks and TNT rain. Play Amy or Freya — kits that don't need kills.",
    ],
  },
  "Fisher Fisher": {
    icon: "🎣", color: "#BF5AF2", rgb: "191,90,242",
    items: [
      "Don't mess around early. Double Fisher only works if both survive and build value.",
      "Fighters should hold back and trade wisely, not risk everything on every chance.",
      "After t1 make sure to JUMP on any fish that's not dim gold or ems!",
      "Get fishing rod early and try to build value as fast as possible.",
    ],
  },
  "Real Strats": {
    icon: "🧠", color: "#34C759", rgb: "52,199,89",
    items: [
      "Core comps work best when everyone sticks to their role, not freelancing.",
      "Don't throw your scaling kits into pointless fights just because the team wants excitement.",
      "If your comp scales, survive to mid game cleanly — not pretend to dominate early.",
      "Most games end with one good grouped fight and quick finish, not random kills.",
    ],
  },
  "BB Strats": {
    icon: "💥", color: "#FF9F0A", rgb: "255,159,10",
    items: [
      "Your BB should not ego fight. Their job is to watch spacing and punish openings.",
      "Pressure first, break second. Good bed breaks come after forcing defenders out of position.",
      "If the map is locked, threaten side lanes and make the enemy split before committing.",
      "When one opening appears, everyone collapses fast — no hesitation.",
    ],
  },
};

/* ─── SOFT BLOBS ─── */
function Blobs({ dark }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{
        position: "absolute", width: "55vw", height: "55vw", maxWidth: 480, maxHeight: 480,
        borderRadius: "50%", top: "-12%", left: "-8%",
        background: dark ? "radial-gradient(circle, rgba(0,122,255,0.1) 0%, transparent 70%)"
                         : "radial-gradient(circle, rgba(0,122,255,0.07) 0%, transparent 70%)",
      }}/>
      <div style={{
        position: "absolute", width: "45vw", height: "45vw", maxWidth: 400, maxHeight: 400,
        borderRadius: "50%", bottom: "8%", right: "-8%",
        background: dark ? "radial-gradient(circle, rgba(191,90,242,0.08) 0%, transparent 70%)"
                         : "radial-gradient(circle, rgba(191,90,242,0.05) 0%, transparent 70%)",
      }}/>
    </div>
  );
}

/* ─── COMP CARD ─── */
function CompCard({ comp, dark }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        borderRadius: 20,
        background: dark ? "rgba(28,28,30,0.88)" : "rgba(255,255,255,0.9)",
        border: `1px solid ${open ? `rgba(${comp.rgb},0.38)` : dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        boxShadow: open
          ? `0 8px 36px rgba(${comp.rgb},0.18), 0 2px 10px rgba(0,0,0,0.1)`
          : dark ? "0 2px 16px rgba(0,0,0,0.28)" : "0 2px 14px rgba(0,0,0,0.06)",
        cursor: "pointer",
        transition: "border-color 0.3s, box-shadow 0.3s",
        overflow: "hidden",
        WebkitTapHighlightColor: "transparent",
        userSelect: "none",
      }}
    >
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${comp.color}, transparent)`,
        opacity: open ? 1 : 0.35, transition: "opacity 0.3s",
      }}/>

      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 13, flexShrink: 0,
            background: `rgba(${comp.rgb},0.13)`,
            border: `1px solid rgba(${comp.rgb},0.22)`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20,
          }}>{comp.icon}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
              textTransform: "uppercase", color: comp.color,
              fontFamily: "'Fira Mono', monospace", marginBottom: 3,
            }}>{comp.short}</div>
            <div style={{
              fontSize: 14, fontWeight: 700, lineHeight: 1.25,
              color: dark ? "rgba(255,255,255,0.92)" : "#1c1c1e",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>{comp.name}</div>
          </div>
          <div style={{
            width: 28, height: 28, flexShrink: 0, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.05)",
            color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.38)",
          }}><ChevronIcon open={open}/></div>
        </div>

        <p style={{
          margin: "11px 0 0", fontSize: 13, lineHeight: 1.65,
          color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
        }}>{comp.why}</p>

        <div style={{
          overflow: "hidden",
          maxHeight: open ? 800 : 0, opacity: open ? 1 : 0,
          transition: "max-height 0.45s cubic-bezier(0.32,0.72,0,1), opacity 0.28s ease",
        }}>
          <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Use when", text: comp.useWhen, icon: "🎯" },
              { label: "Early", text: comp.early, icon: "⚡" },
              { label: "Mid", text: comp.mid, icon: "🔄" },
              { label: "Win condition", text: comp.win, icon: "🏆" },
            ].map(p => (
              <div key={p.label} style={{
                borderRadius: 12, padding: "11px 14px",
                background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5 }}>
                  <span style={{ fontSize: 12 }}>{p.icon}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
                    textTransform: "uppercase", color: comp.color,
                    fontFamily: "'Fira Mono', monospace",
                  }}>{p.label}</span>
                </div>
                <p style={{
                  margin: 0, fontSize: 13, lineHeight: 1.65,
                  color: dark ? "rgba(255,255,255,0.52)" : "rgba(0,0,0,0.52)",
                }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── GUIDES SECTION ─── */
function GuidesSection({ dark }) {
  const [active, setActive] = useState("Win Checklist");
  const guide = GUIDES[active];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* scrollable pill tabs */}
      <div style={{
        display: "flex", gap: 8, overflowX: "auto", paddingBottom: 2,
        scrollbarWidth: "none", WebkitOverflowScrolling: "touch",
      }}>
        {Object.keys(GUIDES).map(name => {
          const g = GUIDES[name];
          const isA = name === active;
          return (
            <button key={name} onClick={() => setActive(name)} style={{
              flexShrink: 0, padding: "7px 15px", borderRadius: 999,
              border: isA ? `1.5px solid rgba(${g.rgb},0.5)` : `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
              background: isA ? `rgba(${g.rgb},0.12)` : dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
              cursor: "pointer", fontSize: 12, fontWeight: 700,
              fontFamily: "'Nunito', sans-serif",
              color: isA ? g.color : dark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)",
              transition: "all 0.22s",
              WebkitTapHighlightColor: "transparent",
            }}>
              {g.icon} {name}
            </button>
          );
        })}
      </div>

      <div style={{
        borderRadius: 20,
        background: dark ? "rgba(28,28,30,0.88)" : "rgba(255,255,255,0.9)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        overflow: "hidden",
        boxShadow: dark ? "0 4px 24px rgba(0,0,0,0.28)" : "0 4px 20px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          padding: "12px 18px 11px",
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"}`,
          display: "flex", alignItems: "center", gap: 9,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%", background: guide.color,
            boxShadow: `0 0 8px rgba(${guide.rgb},0.7)`,
          }}/>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
            color: guide.color, fontFamily: "'Fira Mono', monospace",
          }}>{active.toUpperCase()}</span>
        </div>
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.items.map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              borderRadius: 12, padding: "12px 14px",
              background: dark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.025)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.05)"}`,
            }}>
              <div style={{
                flexShrink: 0, width: 26, height: 26, borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 800, fontFamily: "'Fira Mono', monospace",
                background: `rgba(${guide.rgb},0.14)`, color: guide.color,
                border: `1px solid rgba(${guide.rgb},0.28)`,
              }}>{i + 1}</div>
              <p style={{
                margin: 0, paddingTop: 3, fontSize: 13.5, lineHeight: 1.65,
                color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.58)",
              }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── ROLES SECTION ─── */
function RolesSection({ dark }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
      {ROLES.map(r => (
        <div key={r.key} style={{
          borderRadius: 18, padding: "18px 14px",
          background: dark ? "rgba(28,28,30,0.88)" : "rgba(255,255,255,0.9)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          boxShadow: dark ? "0 2px 16px rgba(0,0,0,0.25)" : "0 2px 12px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12, marginBottom: 12,
            background: `rgba(${r.rgb},0.13)`, border: `1px solid rgba(${r.rgb},0.22)`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
          }}>{r.emoji}</div>
          <div style={{
            fontSize: 10, fontWeight: 800, letterSpacing: "0.16em",
            fontFamily: "'Fira Mono', monospace", color: r.color, marginBottom: 7,
          }}>{r.key}</div>
          <p style={{
            margin: 0, fontSize: 12, lineHeight: 1.6,
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.48)",
          }}>{r.desc}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── iOS-STYLE BOTTOM TAB BAR ─── */
function TabBar({ tab, setTab, dark }) {
  const tabs = [
    { key: "comps", label: "Comps", icon: "⚔️" },
    { key: "guides", label: "Guides", icon: "📋" },
    { key: "roles", label: "Roles", icon: "👥" },
  ];
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 200,
      background: dark ? "rgba(14,14,18,0.92)" : "rgba(245,245,250,0.92)",
      backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
      borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
      display: "flex",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
    }}>
      {tabs.map(t => {
        const isA = t.key === tab;
        return (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, border: "none", background: "none", cursor: "pointer",
            padding: "10px 0 12px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            WebkitTapHighlightColor: "transparent",
            transition: "opacity 0.15s",
          }}>
            <span style={{ fontSize: 21, lineHeight: 1 }}>{t.icon}</span>
            <span style={{
              fontSize: 10, fontWeight: isA ? 800 : 500,
              fontFamily: "'Nunito', sans-serif",
              color: isA ? "#007AFF" : dark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.38)",
              transition: "color 0.2s",
              letterSpacing: isA ? "0.01em" : 0,
            }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── MAIN ─── */
export default function App() {
  useFonts();
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("comps");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div style={{
      minHeight: "100vh",
      background: dark
        ? "linear-gradient(175deg, #08080f 0%, #0b0b14 55%, #090b12 100%)"
        : "linear-gradient(175deg, #f2f2f7 0%, #fafafa 55%, #f0f0f5 100%)",
      color: dark ? "#f0f0f5" : "#1c1c1e",
      fontFamily: "'Nunito', -apple-system, sans-serif",
      position: "relative", overflowX: "hidden",
      paddingBottom: 86,
    }}>
      <style>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,122,255,0.45); }
          50%     { box-shadow: 0 0 0 7px rgba(0,122,255,0); }
        }
        .au   { animation: fade-up 0.52s cubic-bezier(0.32,0.72,0,1) both; }
        .au1  { animation-delay: 0.07s; }
        .au2  { animation-delay: 0.14s; }
        .au3  { animation-delay: 0.21s; }
        .live { animation: badge-pulse 2.6s ease-in-out infinite; }
        * { box-sizing: border-box; }
        body { margin: 0; -webkit-font-smoothing: antialiased; }
        ::-webkit-scrollbar { display: none; }
        button { font-family: inherit; }
      `}</style>

      <Blobs dark={dark}/>

      {/* NAV */}
      <div style={{
        position: "sticky", top: 0, zIndex: 100,
        background: dark ? "rgba(8,8,15,0.84)" : "rgba(242,242,247,0.84)",
        backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
        borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
      }}>
        <div style={{
          maxWidth: 900, margin: "0 auto", padding: "12px 18px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, fontSize: 17,
              background: "linear-gradient(135deg, #0050c8 0%, #007AFF 55%, #34aadc 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(0,122,255,0.4)",
            }}>🛏</div>
            <div>
              <div style={{
                fontSize: 14, fontWeight: 900, letterSpacing: "-0.02em",
                color: dark ? "#fff" : "#1c1c1e", lineHeight: 1.1,
              }}>BedWars</div>
              <div style={{
                fontSize: 9.5, fontWeight: 600, letterSpacing: "0.07em",
                textTransform: "uppercase", fontFamily: "'Fira Mono', monospace",
                color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
              }}>Squads Meta</div>
            </div>
          </div>
          <button onClick={() => setDark(d => !d)} style={{
            width: 36, height: 36, borderRadius: 10, border: "none", cursor: "pointer",
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
            transition: "background 0.2s",
            WebkitTapHighlightColor: "transparent",
          }}>
            {dark ? <SunIcon/> : <MoonIcon/>}
          </button>
        </div>
      </div>

      {/* HERO */}
      <div className="au" style={{
        maxWidth: 900, margin: "0 auto",
        padding: "38px 18px 20px", textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "5px 14px", borderRadius: 999, marginBottom: 20,
          background: "rgba(0,122,255,0.1)", border: "1px solid rgba(0,122,255,0.24)",
        }}>
          <div className="live" style={{
            width: 7, height: 7, borderRadius: "50%", background: "#007AFF",
          }}/>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: "#007AFF",
            fontFamily: "'Fira Mono', monospace",
          }}>Roblox BedWars · Ranked Squads</span>
        </div>

        <h1 style={{
          margin: "0 0 8px",
          fontSize: "clamp(2.8rem, 11vw, 5.2rem)",
          fontWeight: 900, letterSpacing: "-0.045em", lineHeight: 1.0,
          color: dark ? "#ffffff" : "#1c1c1e",
        }}>Squads</h1>

        <p style={{
          margin: "0 0 6px",
          fontSize: "clamp(1rem, 4vw, 1.5rem)",
          fontWeight: 800, letterSpacing: "-0.02em",
          background: "linear-gradient(90deg, #007AFF 0%, #5AC8FA 50%, #34C759 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>Comps · Roles · Win conditions</p>

        <p style={{
          margin: "14px auto 0", maxWidth: 420,
          fontSize: 14, lineHeight: 1.7,
          color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.42)",
        }}>
          Clean reference for 4-stack ranked play — structure, roles, and execution.
        </p>

        {/* stats */}
        <div className="au1" style={{
          display: "flex", justifyContent: "center", gap: 8, marginTop: 22, flexWrap: "wrap",
        }}>
          {[
            { val: "5", label: "Comps", color: "#007AFF" },
            { val: "5", label: "Roles", color: "#34C759" },
            { val: "4", label: "Guides", color: "#BF5AF2" },
          ].map(s => (
            <div key={s.label} style={{
              padding: "10px 22px", borderRadius: 14,
              background: dark ? "rgba(28,28,30,0.88)" : "rgba(255,255,255,0.9)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
              backdropFilter: "blur(16px)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
            }}>
              <span style={{
                fontSize: "1.6rem", fontWeight: 900,
                fontFamily: "'Fira Mono', monospace", color: s.color,
              }}>{s.val}</span>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
                textTransform: "uppercase", fontFamily: "'Fira Mono', monospace",
                color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.32)",
              }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="au2" style={{
        maxWidth: 900, margin: "0 auto", padding: "6px 18px",
      }}>
        {tab === "comps"  && <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{COMPS.map((c,i) => <CompCard key={i} comp={c} dark={dark}/>)}</div>}
        {tab === "guides" && <GuidesSection dark={dark}/>}
        {tab === "roles"  && <RolesSection dark={dark}/>}
      </div>

      {/* FOOTER */}
      <div className="au3" style={{ maxWidth: 900, margin: "20px auto 0", padding: "0 18px" }}>
        <div style={{
          borderRadius: 22, padding: "22px 22px",
          background: dark
            ? "linear-gradient(135deg, rgba(0,122,255,0.09), rgba(191,90,242,0.07))"
            : "linear-gradient(135deg, rgba(0,122,255,0.06), rgba(191,90,242,0.04))",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          textAlign: "center",
        }}>
          <h3 style={{
            margin: "0 0 8px",
            fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
            fontWeight: 900, letterSpacing: "-0.025em",
            color: dark ? "#fff" : "#1c1c1e",
          }}>Play cleaner. Scale faster.</h3>
          <p style={{
            margin: "0 auto", fontSize: 13, lineHeight: 1.7, maxWidth: 420,
            color: dark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.48)",
          }}>
            Use this as a clean squads reference instead of random callouts and bad queue habits.
          </p>
          <div style={{
            marginTop: 14, fontSize: 11, fontWeight: 700,
            fontFamily: "'Fira Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase",
            color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.22)",
          }}>made by justcyril</div>
        </div>
      </div>

      <TabBar tab={tab} setTab={setTab} dark={dark}/>
    </div>
  );
}

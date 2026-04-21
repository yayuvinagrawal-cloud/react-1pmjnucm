import React, { useState, useEffect } from "react";

const SUN = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MOON = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredComp, setHoveredComp] = useState(null);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("bw-dark");
    if (saved) setIsDark(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("bw-dark", JSON.stringify(isDark));
    }
  }, [isDark, mounted]);

  useEffect(() => {
    if (!document.getElementById("bw-fonts")) {
      const link = document.createElement("link");
      link.id = "bw-fonts";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const comps = [
    {
      name: "Sheila / Star / Noelle / Beekeeper",
      tag: "Core comp",
      accent: isDark ? "#60a5fa" : "#2563eb",
      accentBg: isDark ? "rgba(96,165,250,0.08)" : "rgba(37,99,235,0.06)",
      glow: isDark
        ? "0 0 40px rgba(96,165,250,0.18)"
        : "0 8px 40px rgba(37,99,235,0.14)",
      icon: "⚔️",
      why: "Solid, balanced comp that keeps pressure on, holds up well, and scales steadily.",
      useWhen:
        "Pick this if your team coordinates well and your Beekeeper can get value early. Grab bees fast without overcommitting to base.",
      early: "Split 2 mid / 2 base. Only jump into fights you can win.",
      mid: "Use Sheila and Star to control the map and force one clean team fight.",
      win: "After winning a fight, hit their bed right away.",
    },
    {
      name: "Farmer / Fisher / Star / Amy",
      tag: "Stable econ",
      accent: isDark ? "#34d399" : "#059669",
      accentBg: isDark ? "rgba(52,211,153,0.08)" : "rgba(5,150,105,0.06)",
      glow: isDark
        ? "0 0 40px rgba(52,211,153,0.18)"
        : "0 8px 40px rgba(5,150,105,0.14)",
      icon: "💰",
      why: "Steady scaling with solid defense.",
      useWhen:
        "Go for this if you're running a stable economy with two bed defenders and want to scale safely into mid game.",
      early: "Don't force bad fights. Keep your economy kits safe.",
      mid: "Focus on armor, enchants, and upgrades.",
      win: "Use your gear edge and push as a team.",
    },
    {
      name: "Lani / Lani / Warden / Fisher",
      tag: "Bypass",
      accent: isDark ? "#f472b6" : "#db2777",
      accentBg: isDark ? "rgba(244,114,182,0.08)" : "rgba(219,39,119,0.06)",
      glow: isDark
        ? "0 0 40px rgba(244,114,182,0.18)"
        : "0 8px 40px rgba(219,39,119,0.14)",
      icon: "🏃",
      why: "Designed to dodge standard fights and win fast through bed pressure.",
      useWhen: "Use against slow teams or for shorter games.",
      early: "Split lanes. Lani players create angles while Fisher builds.",
      mid: "Keep side pressure and avoid full team fights.",
      win: "Punish openings quickly, break bed, and finish.",
    },
    {
      name: "Davey / Umbra / Fisher / Fisher",
      tag: "BB strat",
      accent: isDark ? "#f59e0b" : "#d97706",
      accentBg: isDark ? "rgba(245,158,11,0.08)" : "rgba(217,119,6,0.06)",
      glow: isDark
        ? "0 0 40px rgba(245,158,11,0.18)"
        : "0 8px 40px rgba(217,119,6,0.14)",
      icon: "💥",
      why: "Aggressive bed break comp that builds fast pressure with Umbra controlling space and double Fisher scaling.",
      useWhen:
        "Use if your BB is confident, your team plays fast, and you want to hit slow setups before they scale.",
      early: "Let Davey hunt for early openings while both Fishers build value and Umbra controls space.",
      mid: "Force tough fights, pressure sides, and make teams split between base and map.",
      win: "Get one clean opening, send Davey in, and turn pressure into wins.",
    },
    {
      name: "Amy / Umbra / Fisher / Fisher",
      tag: "Fisher Fisher",
      accent: isDark ? "#a78bfa" : "#7c3aed",
      accentBg: isDark ? "rgba(167,139,250,0.08)" : "rgba(124,58,237,0.06)",
      glow: isDark
        ? "0 0 40px rgba(167,139,250,0.18)"
        : "0 8px 40px rgba(124,58,237,0.14)",
      icon: "🌊",
      why: "Safe scaling comp with strong late-game power and good fight control via Amy and Umbra.",
      useWhen:
        "Pick this if your team wants steady scaling, trusts the Amy player in fights, and can protect both Fishers early.",
      early: "Avoid random fights, keep both Fishers alive, and let Amy only take good trades.",
      mid: "Focus on gear timing, enchants, and Umbra's utility while keeping pressure without pushing too hard.",
      win: "Outscale, win one strong grouped fight, then use map control for bed pressure.",
    },
  ];

  const roles = [
    {
      key: "CYCLE",
      emoji: "♻️",
      desc: "Scaling kits like Beekeeper, Farmer, and Fisher.",
    },
    {
      key: "BD",
      emoji: "🛡️",
      desc: "Bed defender. Keeps base steady and protects the gen.",
    },
    {
      key: "MJ",
      emoji: "⚡",
      desc: "Main fighter. Handles most PvP. Amy and Freya are examples.",
    },
    {
      key: "SJ",
      emoji: "🤝",
      desc: "Second fighter. Supports the main one.",
    },
    {
      key: "BBER",
      emoji: "💥",
      desc: "Breaks beds. Finds chances and ends games.",
    },
  ];

  const quickGuide = [
    "Don't force early fights unless you're sure you'll win.",
    "Fight mostly in groups of 2 or 3.",
    "Protect scaling kits early.",
    "Get blocks and stone sword first.",
    "One good team fight can win the game.",
    "Vs cheaters: don't ego fight. Build gear, stack blocks and TNT, let one player hunt for openings.",
  ];

  const fisherFisherStrats = [
    "Don't mess around early. Double Fisher works only if both survive and build value.",
    "Fighters should hold back and trade wisely, not risk everything on every chance.",
    "Time your gear upgrades together. Don't let one side get ahead while the other lags.",
    "Once both Fishers are set, push for grouped fights and build map control.",
  ];

  const realStrats = [
    "Core comps work best when everyone sticks to their role, not freelancing.",
    "Don't throw your scaling kits into pointless fights just because the team wants excitement.",
    "If your comp scales, survive to mid game cleanly, not pretend to dominate early.",
    "Most games end with one good grouped fight and quick finish, not random kills.",
  ];

  const bbStrats = [
    "Your BB should not perma ego fight. Their job is to watch spacing and punish openings.",
    "Pressure first, break second. Good bed breaks usually come after forcing defenders out of position.",
    "If the map is locked, threaten side lanes and make the enemy split before committing.",
    "When one opening appears, everyone should understand the conversion instantly and collapse fast.",
  ];

  const d = isDark;

  const styles = {
    miniGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 20,
      marginTop: 24,
    },
    page: {
      minHeight: "100vh",
      background: d
        ? "linear-gradient(135deg, #080c14 0%, #0c1220 40%, #0a0f1c 100%)"
        : "linear-gradient(135deg, #f0f4ff 0%, #fafbff 50%, #f5f0ff 100%)",
      color: d ? "#e8edf5" : "#0f172a",
      fontFamily: "'Sora', sans-serif",
      transition: "background 0.5s ease, color 0.4s ease",
      position: "relative",
      overflow: "hidden",
    },
    meshLayer: {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      background: d
        ? `radial-gradient(ellipse 80% 60% at 20% 10%, rgba(59,130,246,0.08) 0%, transparent 60%),
           radial-gradient(ellipse 60% 50% at 80% 80%, rgba(139,92,246,0.07) 0%, transparent 60%),
           radial-gradient(ellipse 50% 40% at 60% 30%, rgba(16,185,129,0.04) 0%, transparent 60%)`
        : `radial-gradient(ellipse 80% 60% at 20% 10%, rgba(99,102,241,0.08) 0%, transparent 60%),
           radial-gradient(ellipse 60% 50% at 80% 80%, rgba(168,85,247,0.06) 0%, transparent 60%),
           radial-gradient(ellipse 50% 40% at 60% 30%, rgba(59,130,246,0.05) 0%, transparent 60%)`,
    },
    gridPattern: {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 0,
      opacity: d ? 0.03 : 0.025,
      backgroundImage: `linear-gradient(${d ? "#fff" : "#000"} 1px, transparent 1px), linear-gradient(90deg, ${d ? "#fff" : "#000"} 1px, transparent 1px)`,
      backgroundSize: "60px 60px",
    },
    content: {
      position: "relative",
      zIndex: 1,
      maxWidth: 1280,
      margin: "0 auto",
      padding: "40px 24px 60px",
    },
    heroCard: {
      borderRadius: 28,
      border: `1px solid ${d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      background: d ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: d
        ? "0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)"
        : "0 20px 60px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.03)",
      marginBottom: 28,
      overflow: "hidden",
    },
    heroBar: {
      padding: "14px 28px",
      borderBottom: `1px solid ${d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap",
    },
    heroBarLeft: {
      display: "flex",
      alignItems: "center",
      gap: 12,
    },
    dot: (color) => ({
      width: 12,
      height: 12,
      borderRadius: "50%",
      background: color,
      opacity: 0.8,
    }),
    pill: {
      borderRadius: 999,
      background: d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      border: `1px solid ${d ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`,
      padding: "5px 14px",
      fontSize: 12,
      fontWeight: 500,
      color: d ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
    },
    darkToggle: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      borderRadius: 999,
      border: `1px solid ${d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
      background: d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
      padding: "6px 14px 6px 10px",
      fontSize: 13,
      fontWeight: 600,
      color: d ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)",
      transition: "all 0.3s ease",
      userSelect: "none",
    },
    heroBody: {
      display: "grid",
      gap: 32,
      padding: "40px 28px",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      alignItems: "end",
    },
    badge: {
      display: "inline-flex",
      borderRadius: 999,
      border: `1px solid ${d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"}`,
      background: d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
      padding: "5px 14px",
      fontSize: 13,
      fontWeight: 500,
      color: d ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)",
      marginBottom: 16,
    },
    h1: {
      fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.1,
      margin: 0,
      color: d ? "#ffffff" : "#0f172a",
    },
    heroSub: {
      marginTop: 14,
      fontSize: 16,
      lineHeight: 1.65,
      color: d ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)",
      maxWidth: 500,
    },
    statsGrid: {
      display: "grid",
      gap: 10,
      minWidth: 220,
    },
    statCard: {
      borderRadius: 18,
      border: `1px solid ${d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
      background: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
      padding: "16px 20px",
    },
    statLabel: {
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      color: d ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.35)",
    },
    statVal: {
      fontSize: 16,
      fontWeight: 650,
      marginTop: 6,
      color: d ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.8)",
    },
    twoCol: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: 24,
      marginBottom: 24,
    },
    section: {
      borderRadius: 28,
      border: `1px solid ${d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      background: d ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: d
        ? "0 0 0 1px rgba(255,255,255,0.03), 0 20px 50px rgba(0,0,0,0.35)"
        : "0 20px 50px rgba(0,0,0,0.05)",
      padding: "28px",
    },
    sectionHead: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
      gap: 12,
      flexWrap: "wrap",
    },
    h2: {
      fontSize: "1.45rem",
      fontWeight: 700,
      letterSpacing: "-0.025em",
      margin: 0,
    },
    smallPill: {
      borderRadius: 999,
      background: d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
      padding: "4px 12px",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: d ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
    },
    checkItem: (i) => ({
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      borderRadius: 16,
      padding: "14px 16px",
      background: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
      border: `1px solid ${d ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`,
    }),
    numBadge: (i) => {
      const accent = ["#60a5fa", "#34d399", "#f472b6", "#a78bfa", "#fb923c", "#facc15"][i % 6];
      return {
        flexShrink: 0,
        width: 30,
        height: 30,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        fontWeight: 700,
        background: d ? `${accent}18` : `${accent}20`,
        color: accent,
        border: `1px solid ${accent}35`,
      };
    },
    checkText: {
      paddingTop: 5,
      fontSize: 13,
      lineHeight: 1.6,
      color: d ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
      margin: 0,
    },
    rolesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: 12,
    },
    roleCard: {
      borderRadius: 18,
      padding: "18px",
      border: `1px solid ${d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      background: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      cursor: "default",
    },
    roleKey: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.2em",
      color: d ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
    },
    roleDesc: {
      marginTop: 8,
      marginBottom: 0,
      fontSize: 12.5,
      lineHeight: 1.6,
      color: d ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
    },
    compsSection: {
      borderRadius: 28,
      border: `1px solid ${d ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
      background: d ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      boxShadow: d
        ? "0 0 0 1px rgba(255,255,255,0.03), 0 30px 70px rgba(0,0,0,0.4)"
        : "0 30px 70px rgba(0,0,0,0.06)",
      padding: "32px 28px",
    },
    compsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 20,
      marginTop: 24,
    },
    compCard: (comp, isHovered) => ({
      borderRadius: 22,
      border: `1px solid ${
        isHovered ? `${comp.accent}45` : d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"
      }`,
      background: isHovered ? comp.accentBg : d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
      padding: "22px",
      cursor: "default",
      transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
      transform: isHovered ? "translateY(-5px) scale(1.01)" : "translateY(0) scale(1)",
      boxShadow: isHovered ? comp.glow : "none",
      position: "relative",
      overflow: "hidden",
    }),
    compGlowBar: (accent) => ({
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 2,
      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
      opacity: 0.9,
    }),
    compTag: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: d ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
    },
    compName: {
      fontSize: "1rem",
      fontWeight: 700,
      letterSpacing: "-0.02em",
      marginTop: 6,
      marginBottom: 12,
      color: d ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)",
    },
    compWhy: {
      fontSize: 12.5,
      lineHeight: 1.65,
      color: d ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)",
      marginBottom: 14,
    },
    infoBox: {
      borderRadius: 14,
      padding: "12px 14px",
      background: d ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
      border: `1px solid ${d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      marginBottom: 8,
    },
    infoLabel: (accent) => ({
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: accent,
      marginBottom: 5,
    }),
    infoText: {
      fontSize: 12,
      lineHeight: 1.6,
      color: d ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
      margin: 0,
    },
    footer: {
      marginTop: 24,
      textAlign: "center",
      fontSize: 12,
      color: d ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)",
      fontWeight: 500,
      letterSpacing: "0.04em",
    },
  };

  if (!mounted) return null;

  return (
    <div style={styles.page}>
      <div style={styles.meshLayer} />
      <div style={styles.gridPattern} />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .bw-fadeup {
          animation: fadeUp 0.55s cubic-bezier(0.22,1,0.36,1) both;
        }

        .bw-fadeup-1 { animation-delay: 0.05s; }
        .bw-fadeup-2 { animation-delay: 0.12s; }
        .bw-fadeup-4 { animation-delay: 0.24s; }

        .check-row:hover {
          background: ${d ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)"} !important;
          transform: translateX(3px);
        }

        .role-card:hover {
          transform: translateY(-3px);
          box-shadow: ${d ? "0 8px 30px rgba(0,0,0,0.3)" : "0 8px 24px rgba(0,0,0,0.07)"};
        }

        .dark-toggle:hover {
          background: ${d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"} !important;
        }

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: ${d ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)"};
          border-radius: 999px;
        }
      `}</style>

      <div style={styles.content}>
        <div style={styles.heroCard} className="bw-fadeup">
          <div style={styles.heroBar}>
            <div style={styles.heroBarLeft}>
              <div style={styles.dot("#f87171")} />
              <div style={styles.dot("#fbbf24")} />
              <div style={styles.dot("#4ade80")} />
              <div style={styles.pill}>squads reference</div>
            </div>

            <button
              onClick={() => setIsDark(!isDark)}
              style={styles.darkToggle}
              className="dark-toggle"
            >
              {isDark ? <SUN /> : <MOON />}
              <span>{isDark ? "Light mode" : "Dark mode"}</span>
            </button>
          </div>

          <div style={styles.heroBody}>
            <div>
              <div style={styles.badge}>Roblox BedWars · Ranked Squads</div>
              <h1 style={styles.h1}>
                Squads comps,
                <br />
                roles &amp; win conditions
              </h1>
              <p style={styles.heroSub}>
                A clean reference for ranked squads focused on structure, roles,
                and execution.
              </p>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Best for</div>
                <div style={styles.statVal}>4-stack ranked teams</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Focus</div>
                <div style={styles.statVal}>Roles and coordination</div>
              </div>
              <div style={styles.statCard}>
                <div style={styles.statLabel}>Approach</div>
                <div style={styles.statVal}>Convert advantages fast</div>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.twoCol} className="bw-fadeup bw-fadeup-1">
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h2 style={styles.h2}>Win checklist</h2>
              <span style={styles.smallPill}>core</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickGuide.map((item, i) => (
                <div key={i} style={styles.checkItem(i)} className="check-row">
                  <div style={styles.numBadge(i)}>{i + 1}</div>
                  <p style={styles.checkText}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h2 style={styles.h2}>Roles</h2>
              <span style={styles.smallPill}>definitions</span>
            </div>

            <div style={styles.rolesGrid}>
              {roles.map((r) => (
                <div key={r.key} style={styles.roleCard} className="role-card">
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{r.emoji}</div>
                  <div style={styles.roleKey}>{r.key}</div>
                  <p style={styles.roleDesc}>{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.compsSection} className="bw-fadeup bw-fadeup-2">
          <div style={styles.sectionHead}>
            <div>
              <h2 style={{ ...styles.h2, fontSize: "1.65rem" }}>
                Recommended comps
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 13,
                  color: d ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
                }}
              >
                Hover a comp to highlight it.
              </p>
            </div>
            <span style={styles.smallPill}>ranked squads</span>
          </div>

          <div style={styles.compsGrid}>
            {comps.map((comp, ci) => {
              const isHovered = hoveredComp === ci;

              return (
                <div
                  key={comp.name}
                  style={styles.compCard(comp, isHovered)}
                  onMouseEnter={() => setHoveredComp(ci)}
                  onMouseLeave={() => setHoveredComp(null)}
                >
                  {isHovered && <div style={styles.compGlowBar(comp.accent)} />}

                  <div style={styles.compTag}>{comp.tag}</div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 4,
                    }}
                  >
                    <span style={{ fontSize: 22 }}>{comp.icon}</span>
                    <div style={styles.compName}>{comp.name}</div>
                  </div>

                  <p style={styles.compWhy}>{comp.why}</p>

                  {[
                    { label: "Use when", text: comp.useWhen },
                    { label: "Early", text: comp.early },
                    { label: "Mid", text: comp.mid },
                    { label: "Win condition", text: comp.win },
                  ].map((phase) => (
                    <div key={phase.label} style={styles.infoBox}>
                      <div style={styles.infoLabel(comp.accent)}>
                        {phase.label}
                      </div>
                      <p style={styles.infoText}>{phase.text}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.twoCol} className="bw-fadeup bw-fadeup-4">
          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h2 style={styles.h2}>Fisher Fisher strats</h2>
              <span style={styles.smallPill}>double fisher</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {fisherFisherStrats.map((item, i) => (
                <div key={i} style={styles.checkItem(i)} className="check-row">
                  <div style={styles.numBadge(i)}>{i + 1}</div>
                  <p style={styles.checkText}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.section}>
            <div style={styles.sectionHead}>
              <h2 style={styles.h2}>Real strats</h2>
              <span style={styles.smallPill}>macro</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {realStrats.map((item, i) => (
                <div key={i} style={styles.checkItem(i)} className="check-row">
                  <div style={styles.numBadge(i)}>{i + 1}</div>
                  <p style={styles.checkText}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={styles.section} className="bw-fadeup bw-fadeup-4">
          <div style={styles.sectionHead}>
            <h2 style={styles.h2}>BB strats</h2>
            <span style={styles.smallPill}>bed break</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {bbStrats.map((item, i) => (
              <div key={i} style={styles.checkItem(i)} className="check-row">
                <div style={styles.numBadge(i)}>{i + 1}</div>
                <p style={styles.checkText}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          BedWars Squads Meta Reference · 4-stack ranked play
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useMemo } from "react";

/* ─── FONT LOADER ─── */
function useFonts() {
  useEffect(() => {
    const id = "bw-apple-fonts";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap";
      document.head.appendChild(l);
    }
  }, []);
}

/* ─── ICONS ─── */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    style={{
      transition: "transform 0.3s ease",
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── DATA ─── */
const COMPS = [
  {
    name: "Builder / Builder / Miner / Miner",
    short: "Rush Comp",
    icon: "🏗️",
    color: "#ef4444",
    rgb: "239,68,68",
    why: "Aggressive early game composition focused on breaking beds quickly with enhanced building and mining speed.",
    useWhen: "Use this when you want to end games fast and your team has good aim for early fights.",
    early: "Rush beds immediately after spawn. Use enhanced building to create bridges and ladders.",
    mid: "Focus on breaking multiple beds while your Builders create safe paths for your team.",
    win: "Once you have bed advantage, use your Miners to create TNT traps and finish the game."
  },
  {
    name: "Angel / Angel / Bigman / Bigman",
    short: "Defense Comp",
    icon: "🛡️",
    color: "#2f6bff",
    rgb: "47,107,255",
    why: "Tanky composition with high health pools and strong defensive capabilities.",
    useWhen: "Pick this when facing aggressive rush teams or when you need to survive longer.",
    early: "Stay defensive and let your Angels heal the team while Bigmans soak damage.",
    mid: "Use your size advantage to control space and protect your beds effectively.",
    win: "Outlast the enemy and use your superior health to win team fights."
  },
  {
    name: "Trinity / Trinity / Spirit / Spirit",
    short: "Support Comp",
    icon: "✨",
    color: "#8b5cf6",
    rgb: "139,92,246",
    why: "Healing and support focused composition that keeps the team alive longer.",
    useWhen: "Use this when your team needs better sustain or when facing high damage comps.",
    early: "Focus on keeping everyone healed and use Spirit's mobility to dodge fights.",
    mid: "Position your healers safely while they provide constant support to fighters.",
    win: "Your superior sustain allows you to outlast enemies in prolonged fights."
  },
  {
    name: "Metal Detector / Builder / Miner / Fisherman",
    short: "Econ Comp",
    icon: "💰",
    color: "#10b981",
    rgb: "16,185,129",
    why: "Economy focused composition that generates resources efficiently.",
    useWhen: "Pick this when you want stable scaling and better late game power.",
    early: "Let your Metal Detector find emeralds while Fisherman provides steady income.",
    mid: "Use your economic advantage to get better gear and upgrades faster.",
    win: "Your gear lead and better upgrades will carry you to victory."
  },
  {
    name: "Cowgirl / Builder / Miner / Spirit",
    short: "Hybrid Comp",
    icon: "🤠",
    color: "#f59e0b",
    rgb: "245,158,11",
    why: "Balanced composition with good damage, building, and mobility.",
    useWhen: "Use this for general situations where you need versatility.",
    early: "Use Cowgirl's lasso to control space while Builders create paths.",
    mid: "Balance between breaking beds and defending your own base.",
    win: "Your versatility allows you to adapt to different situations."
  }
];

const ROLES = [

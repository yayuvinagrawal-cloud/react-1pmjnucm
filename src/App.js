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
    name: "Sheila / Star / Noelle / Beekeeper",
    short: "Core Comp",
    icon: "⚔️",
    color: "#2f6bff",
    rgb: "47,107,255",
    why: "Solid balanced comp that keeps pressure on, survives well, and scales cleanly if your team stays organized.",
    useWhen:
      "Run this when your team has chemistry and your Beekeeper knows how to get early value without griefing their own tempo.",
    early:
      "Split 2 mid and 2 base after t1. Take good fights only and don't waste tempo on ego pushes.",
    mid:
      "Use Sheila and Star to keep map pressure, secure upgrades fast, and try to hit first t3 before around 6 minutes.",
    win:
      "Once you get first t3, convert that lead into bed pressure fast with TNT and grouped pushes.",
  },
  {
    name: "Farmer / Fisher / Star / Amy",
    short: "Stable Econ",
    icon: "💰",
    color: "#10b981",
    rgb: "16,185,129",
    why: "Reliable loot flow with solid defense and safer scaling into the mid game.",
    useWhen:
      "Use this if you want a stable economy with two players protecting the game state while the comp scales up.",
    early:
      "Do not force bad fights. Keep your economy kits alive and let your fighters take cleaner trades.",
    mid:
      "Play for armor timing, enchants, generator control, and safe pressure instead of random scraps.",
    win:
      "Use your gear lead to win one clean grouped fight and roll that into bed pressure.",
  },
  {
    name: "Lani / Lani / Warden / Fisher",
    short: "Bypass",
    icon: "🏃",
    color: "#ef4444",
    rgb: "239,68,68",
    why: "Made to dodge standard fights and win faster through movement, side pressure, and bed threat.",
    useWhen:
      "Pick this into slower teams or when you want to speed the game up and force chaos.",
    early:
      "Split lanes early. Lani players create angles while Fisher builds value and Warden stabilizes fights.",
    mid:
      "Keep pressure on side lanes and avoid flipping full team fights unless you have a clear edge.",
    win:
      "Punish openings instantly, get bed damage, and finish before slower comps fully scale.",
  },
  {
    name: "Davey / Umbra / Fisher / Fisher",
    short: "BB Strat",
    icon: "💥",
    color: "#f59e0b",
    rgb: "245,158,11",
    why: "Aggressive bed break comp with strong pressure windows and good scaling from double Fisher.",
    useWhen:
      "Use this if your BB is confident, your team plays fast, and you want to break slow teams before they stabilize.",
    early:
      "Let Davey look for clean openings while both Fishers build value and Umbra controls pressure space.",
    mid:
      "Force hard choices, threaten multiple lanes, and make teams split between map control and base defense.",
    win:
      "Get one real opening, send Davey through, and turn the pressure into a fast finish.",
  },
  {
    name: "Amy / Umbra / Fisher / Fisher",
    short: "Fisher Fisher",
    icon: "🌊",
    color: "#8b5cf6",
    rgb: "139,92,246",
    why: "Safe scaling comp with strong late-game power and clean fight control if your team stays patient.",
    useWhen:
      "Pick this if your team wants steady scaling, trusts the Amy player in fights, and can keep both Fishers safe early.",
    early:
      "Avoid random fights, keep both Fishers alive, and only let Amy take strong trades.",
    mid:
      "Play around gear spikes, enchants, and Umbra utility while keeping pressure without overcommitting.",
    win:
      "Outscale, win one big grouped fight, then use map control to take bed and close.",
  },
  {
    name: "Lucia / Umbra / Baker / Whisper",
    short: "Macro Core",
    icon: "🧠",
    color: "#06b6d4",
    rgb: "6,182,212",
    why: "Strong macro comp with eco, intel, sustain, and real pressure threat. Good for duo-q or cleaner coordinated games.",
    useWhen:
      "Use this when you want a safer comp that still has map pressure and cleaner rotations instead of random all-in fighting.",
    early:
      "Let Lucia and Whisper stabilize macro while Baker keeps tempo clean and Umbra looks for smart entries instead of forced ones.",
    mid:
      "Use owl info and Umbra pressure to create cleaner fights. Keep your resets tight and don't waste your scaling by overforcing.",
    win:
      "Scale into better gear, keep map control, then convert one clean pressure window into bed damage and a grouped finish.",
  },
];

const ROLES = [
  {
    key: "CYCLE",
    emoji: "♻️",
    desc: "Scaling kits like Metal Beekeeper and Farmer. Their job is value first.",
    color: "#10b981",
    rgb: "16,185,129",
    kits: ["Bee Keeper", "Metal", "Farmer", "Star", "Thalya", "Sigrid", "Davey", "Double Fisher", "Lucia"],
  },
  {
    key: "BD",
    emoji: "🛡️",
    desc: "Bed defender. Keeps bed safe, watches gen and pchests, and has counter TNT ready.",
    color: "#2f6bff",
    rgb: "47,107,255",
    kits: ["Noelle", "Wren", "Fisher", "Baker", "Zola"],
  },
  {
    key: "MJ",
    emoji: "⚔️",
    desc: "Main fighter. Handles most PvP and sets the pace in bigger fights.",
    color: "#ef4444",
    rgb: "239,68,68",
    kits: ["Sheila Aery", "Silas", "Amy", "Freya", "Cait", "Mech", "Lucia", "Umbra"],
  },
  {
    key: "SJ",
    emoji: "🤝",
    desc: "Second fighter. Supports the main and adds utility, peel, and pressure.",
    color: "#f59e0b",
    rgb: "245,158,11",
    kits: ["Star", "Amy", "Mech", "Zeno", "Lassy", "Wren", "Noelle", "Umeko", "Umbra", "Nahla", "Melody", "Whisper", "Baker"],
  },
  {
    key: "BBER",
    emoji: "💥",
    desc: "Bed breaker. Tracks openings, finds angles, and ends games.",
    color: "#8b5cf6",
    rgb: "139,92,246",
    kits: ["Ragnar", "DinoTamer", "Sigrid", "Umbra", "Triton", "Davey", "Amy", "Smoke", "Milo", "Regent", "Mech"],
  },
];

const GUIDES = {
  "Win Checklist": {
    icon: "✅",
    color: "#2f6bff",
    rgb: "47,107,255",
    items: [
      "Don't force early fights unless you know the fight is good.",
      "Take fights mostly in pairs or grouped swings.",
      "Protect scaling kits early instead of sending them into random scraps.",
      "Get blocks and stone sword first so early game has structure.",
      "Most games are won off one clean grouped fight and a fast conversion.",
      "Vs cheaters, don't ego fight. Stack gear, keep blocks, and TNT rain when needed.",
    ],
  },
  "Fisher Fisher": {
    icon: "🎣",
    color: "#8b5cf6",
    rgb: "139,92,246",
    items: [
      "Double Fisher only works if both stay alive and keep building value.",
      "Your fighters should hold tempo, not flip every chance they see.",
      "After t1, jump on fish timing whenever it doesn't cost dim gold or ems.",
      "Get rod early and build value as fast as possible without inting.",
    ],
  },
  "Real Strats": {
    icon: "🧠",
    color: "#3b82f6",
    rgb: "59,130,246",
    items: [
      "Core comps work best when everyone sticks to their role and timing.",
      "Do not throw scaling kits into pointless fights just for excitement.",
      "If your comp scales, survive early and arrive to mid game clean.",
      "Good squads win with structure, pressure windows, and fast conversion.",
    ],
  },
  "BB Strats": {
    icon: "💥",
    color: "#f59e0b",
    rgb: "245,158,11",
    items: [
      "Your BB should not ego fight. Their job is spacing, angles, and punish windows.",
      "Pressure first, break second. Good bed breaks come after defenders get moved.",
      "If the map is locked, threaten side lanes and make the enemy split.",
      "When an opening appears, the whole team commits fast with no hesitation.",
    ],
  },
};

const TIMING_ITEMS = [
  "Add timing and early game focus - prioritize stone sword and blocks first.",
  "Split again after t1 to maintain map pressure and control space.",
  "Try to get iron armour before guards spawn at 3 minutes.",
  "Aim for 5-6 minute t3 timing to scale efficiently.",
  "If you get first t3, use it immediately and bedbreak all other teams.",
  "Try to get enchants around t3 for better scaling potential.",
  "Forest farm if possible as main jugg to build value safely.",
  "Second jugg should start coming with you and bbing with that first t3.",
  "Try not to get reset and feed bounty to maintain momentum.",
  "By 20 minutes after beds break, get at least 1k blocks, 2-3 teslas, and as many fireballs and TNT as you can.",
  "In late-game, don't ego fight too much and try to stick together with your team behind blocks.",
  "Don't be too open - always be aware of your surroundings and stay vigilant.",
];

const DRAFT_KITS = [
  // ECONOMY / CYCLE
  { name: "Beekeeper", roles: ["economy"] },
  { name: "Farmer", roles: ["economy"] },
  { name: "Metal Detector", roles: ["economy"] },
  { name: "Yuzi", roles: ["economy", "bedbreaker"] },
  { name: "Davey", roles: ["economy", "bedbreaker"] },
  { name: "Triton", roles: ["economy", "bedbreaker"] },

  // MAIN JUGG
  { name: "Lucia", roles: ["juggernaut", "economy"] },
  { name: "Aery", roles: ["juggernaut"] },
  { name: "Barbarian", roles: ["juggernaut"] },
  { name: "Amy", roles: ["juggernaut", "support"] },
  { name: "Sheila", roles: ["juggernaut"] },
  { name: "Freya", roles: ["juggernaut", "support"] },
  { name: "Grim Reaper", roles: ["juggernaut"] },
  { name: "Warden", roles: ["juggernaut"] },
  { name: "Nyx", roles: ["juggernaut"] },

  // SJ / FLEX
  { name: "Umbra", roles: ["support", "juggernaut"] },
  { name: "Lani", roles: ["support", "juggernaut"] },
  { name: "Hannah", roles: ["support", "defender"] },

  // SUPPORT
  { name: "Whisper", roles: ["support"] },
  { name: "Star Collector", roles: ["support"] },
  { name: "Melody", roles: ["support"] },
  { name: "Lassy", roles: ["support"] },
  { name: "Zeno", roles: ["support"] },
  { name: "Smoke", roles: ["support"] },
  { name: "Milo", roles: ["support"] },
  { name: "Regent", roles: ["support"] },

  // BED BREAKERS
  { name: "Ragnar", roles: ["bedbreaker"] },
  { name: "Dino Tamer", roles: ["bedbreaker"] },

  // DEFENDER
  { name: "Noelle", roles: ["defender"] },
  { name: "Builder", roles: ["defender"] },
  { name: "Marina", roles: ["defender"] },
  { name: "Fisher", roles: ["defender", "economy"] },
  { name: "Wren", roles: ["defender"] },
  { name: "Zola", roles: ["defender"] },

  // HYBRID
  { name: "Baker", roles: ["support", "defender"] },

  // LOW META / OPTIONAL
  { name: "Eldertree", roles: ["juggernaut"] },
];

function getKit(name) {
  return DRAFT_KITS.find((k) => k.name === name);
}

function evaluateDraft(picks) {
  const chosen = picks.map(getKit).filter(Boolean);
  const hasRole = (role) => chosen.some((k) => k.roles.includes(role));

  const hasEconomy = hasRole("economy");
  const hasJuggernaut = hasRole("juggernaut");
  const hasSupport = hasRole("support");
  const hasDefender = hasRole("defender");

  const warnings = [];
  const positives = [];
  const suggestions = [];

  if (!hasDefender) {
    warnings.push("No BD detected — add a bed defender.");
    suggestions.push("Add Noelle, Builder, Fisher, Wren, or Baker.");
  }

  if (!hasJuggernaut) {
    warnings.push("No real frontline detected — early fights will be harder to convert cleanly.");
    suggestions.push("Add Lucia, Aery, Sheila, Amy, or Warden.");
  }

  if (!hasEconomy) {
    warnings.push("No economy slot detected — your comp can fall behind on real gear timings.");
    suggestions.push("Add Beekeeper, Farmer, Metal Detector, or Lucia.");
  }

  if (!hasSupport) {
    warnings.push("No support slot detected — your team loses sustain, intel, or cleaner commit help.");
    suggestions.push("Add Whisper, Baker, Star Collector, or Umbra.");
  }

  if (picks.includes("Lucia") && picks.includes("Whisper")) {
    positives.push("Lucia + Whisper = strong macro pressure core and very good duo-q combo.");
  }

  if (picks.includes("Umbra") && picks.includes("Whisper")) {
    positives.push("Umbra + Whisper = cleaner engage timing and better pressure setup.");
  }

  if (picks.includes("Lucia") && picks.includes("Baker")) {
    positives.push("Lucia + Baker = safe scaling core with cleaner resets.");
  }

  if (picks.includes("Warden") && picks.includes("Lani")) {
    positives.push("Warden + Lani = strong bypass pressure duo.");
  }

  if (hasEconomy && hasJuggernaut && hasSupport && hasDefender) {
    positives.push("Comp check passed — all core roles are covered.");
  }

  return {
    hasEconomy,
    hasJuggernaut,
    hasSupport,
    hasDefender,
    warnings,
    positives,
    suggestions: [...new Set(suggestions)],
  };
}


/* ─── COUNTER STRATEGIES ─── */
const COUNTERS = [
  {
    target: "Double Fisher",
    icon: "🎣",
    color: "#8b5cf6",
    rgb: "139,92,246",
    strategies: [
      "Force early fights before they scale",
      "Target fishers with fireball + TNT",
      "Use knockback to separate them"
    ],
    recommended: ["Sheila", "Star", "Umbra", "Amy"],
    avoid: ["Single target damage", "Letting them group"]
  },
  {
    target: "BB Comp",
    icon: "💥",
    color: "#f59e0b",
    rgb: "245,158,11",
    strategies: [
      "Stack beds with obsidian",
      "Use anti-knockback enchant",
      "Keep distance from base",
      "Counter with your own BB pressure"
    ],
    recommended: ["Noelle", "Wren", "Baker", "Zola"],
    avoid: ["Exposing bed location", "Solo fights near base"]
  },
  {
    target: "Cheater Comp",
    icon: "😈",
    color: "#ef4444",
    rgb: "239,68,68",
    strategies: [
      "Report immediately",
      "Play defensively, don't ego",
      "Use map control to your advantage",
      "Stack gear and wait for staff"
    ],
    recommended: ["Any defensive comp", "Generator control", "Map pressure"],
    avoid: ["Fair fights", "Getting tilted"]
  }
];

/* ─── PRACTICE DRILLS ─── */
const PRACTICE = [
  {
    name: "Bed Defense",
    icon: "🛡️",
    difficulty: "Beginner",
    color: "#10b981",
    rgb: "16,185,129",
    description: "Practice defending your bed against different attack angles",
    drills: [
      "Place 10 beds in different positions",
      "Defend against fireball + sword combos",
      "Practice pillar jumping defense",
      "Test different block placements"
    ],
    tips: ["Always have blocks ready", "Stay calm under pressure", "Use elevation to your advantage"]
  },
  {
    name: "Generator Control",
    icon: "⚡",
    difficulty: "Intermediate",
    color: "#3b82f6",
    rgb: "59,130,246",
    description: "Learn to control and upgrade generators effectively",
    drills: [
      "Time generator upgrades perfectly",
      "Practice stealing enemy gens",
      "Defend your gen while upgrading",
      "Coordinate gen control with team"
    ],
    tips: ["Know upgrade costs", "Time upgrades with fights", "Protect your gen at all costs"]
  },
  {
    name: "Team Coordination",
    icon: "🤝",
    difficulty: "Advanced",
    color: "#8b5cf6",
    rgb: "139,92,246",
    description: "Master team communication and positioning",
    drills: [
      "Practice calling out enemy positions",
      "Coordinate group fights",
      "Learn to rotate as a team",
      "Master bed break timing"
    ],
    tips: ["Use voice chat effectively", "Know your roles", "Trust your team"]
  }
];

/* ─── SNOW ─── */
function SnowLayer({ dark }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: `${(i * 2.9 + (i % 7) * 11) % 100}%`,
        size: 2 + (i % 4),
        duration: 8 + (i % 6) * 1.2,
        delay: (i % 10) * 0.8,
        opacity: dark ? 0.45 - (i % 5) * 0.05 : 0.3 - (i % 5) * 0.035,
      })),
    [dark]
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          style={{
            position: "absolute",
            left: flake.left,
            top: -20,
            width: flake.size,
            height: flake.size,
            borderRadius: "50%",
            background: dark ? "rgba(255,255,255,0.95)" : "rgba(20,20,20,0.65)",
            filter: `blur(${flake.size > 4 ? 0.6 : 0}px)`,
            opacity: flake.opacity,
            animation: `snow-fall ${flake.duration}s linear ${flake.delay}s infinite, snow-sway ${3.6 + (flake.id % 5)}s ease-in-out ${flake.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── BACKGROUND LIGHTS ─── */
function Ambient({ dark }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "46vw",
          height: "46vw",
          maxWidth: 420,
          maxHeight: 420,
          borderRadius: "50%",
          top: "-8%",
          left: "-10%",
          background: dark
            ? "radial-gradient(circle, rgba(47,107,255,0.14) 0%, transparent 72%)"
            : "radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 72%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "34vw",
          height: "34vw",
          maxWidth: 320,
          maxHeight: 320,
          borderRadius: "50%",
          top: "14%",
          right: "-6%",
          background: dark
            ? "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 72%)"
            : "radial-gradient(circle, rgba(0,0,0,0.055) 0%, transparent 72%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "40vw",
          height: "40vw",
          maxWidth: 360,
          maxHeight: 360,
          borderRadius: "50%",
          bottom: "-6%",
          right: "6%",
          background: dark
            ? "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 75%)"
            : "radial-gradient(circle, rgba(0,0,0,0.045) 0%, transparent 75%)",
        }}
      />
    </div>
  );
}

/* ─── FEATURE STRIP ─── */
function FeaturedStrip({ dark }) {
  const items = [
    { label: "Structured meta", value: "Clean comps" },
    { label: "Role clarity", value: "Less chaos" },
    { label: "Win plans", value: "Better converts" },
  ];

  return (
    <div
      style={{
        marginTop: 28,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 10,
        width: "100%",
        maxWidth: 760,
        marginInline: "auto",
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            borderRadius: 18,
            padding: "15px 16px",
            background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.86)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: dark ? "0 10px 24px rgba(0,0,0,0.2)" : "0 10px 22px rgba(0,0,0,0.05)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
              color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)",
              marginBottom: 6,
            }}
          >
            {item.label}
          </div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: dark ? "#ffffff" : "#3b82f6",
            }}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── DRAFT BUILDER SECTION ─── */
function DraftBuilderSection({ dark }) {
  const [pick1, setPick1] = useState("Lucia");
  const [pick2, setPick2] = useState("Whisper");
  const [pick3, setPick3] = useState("Umbra");
  const [pick4, setPick4] = useState("Baker");

  const picks = [pick1, pick2, pick3, pick4];
  const result = useMemo(() => evaluateDraft(picks), [pick1, pick2, pick3, pick4]);

  const rolePill = (ok) => ({
    fontSize: 11,
    fontWeight: 800,
    padding: "7px 10px",
    borderRadius: 999,
    border: `1px solid ${ok ? "rgba(16,185,129,0.26)" : "rgba(239,68,68,0.22)"}`,
    background: ok ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.08)",
    color: ok ? "#10b981" : "#ef4444",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
  });

  return (
    <div
      style={{
        borderRadius: 24,
        background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        overflow: "hidden",
        boxShadow: dark ? "0 12px 34px rgba(0,0,0,0.24)" : "0 12px 32px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          padding: "13px 18px 12px",
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          display: "flex",
          alignItems: "center",
          gap: 9,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#06b6d4",
            boxShadow: "0 0 10px #06b6d4",
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.1em",
            color: "#06b6d4",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          DRAFT BUILDER
        </span>
      </div>

      <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 10,
          }}
        >
          {[pick1, pick2, pick3, pick4].map((value, i) => (
            <select
              key={i}
              value={value}
              onChange={(e) => {
                const v = e.target.value;
                if (i === 0) setPick1(v);
                if (i === 1) setPick2(v);
                if (i === 2) setPick3(v);
                if (i === 3) setPick4(v);
              }}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                background: dark ? "#111827" : "#ffffff",
                color: dark ? "#ffffff" : "#111827",
                fontSize: 14,
                outline: "none",
              }}
            >
                          {[...DRAFT_KITS]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((kit) => (
                <option key={kit.name} value={kit.name}>
                  {kit.name}
                </option>
            ))}
            </select>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <span style={rolePill(result.hasEconomy)}>Economy {result.hasEconomy ? "✓" : "✕"}</span>
          <span style={rolePill(result.hasJuggernaut)}>Juggernaut {result.hasJuggernaut ? "✓" : "✕"}</span>
          <span style={rolePill(result.hasSupport)}>Support {result.hasSupport ? "✓" : "✕"}</span>
          <span style={rolePill(result.hasDefender)}>BD {result.hasDefender ? "✓" : "✕"}</span>
        </div>

        {result.positives.map((item, i) => (
          <div
            key={`p-${i}`}
            style={{
              borderRadius: 15,
              padding: "12px 14px",
              background: "rgba(16,185,129,0.08)",
              border: "1px solid rgba(16,185,129,0.18)",
              color: "#10b981",
              fontSize: 13.3,
              lineHeight: 1.65,
            }}
          >
            ✔ {item}
          </div>
        ))}

        {result.warnings.map((item, i) => (
          <div
            key={`w-${i}`}
            style={{
              borderRadius: 15,
              padding: "12px 14px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.18)",
              color: "#ef4444",
              fontSize: 13.3,
              lineHeight: 1.65,
            }}
          >
            ⚠ {item}
          </div>
        ))}

        {result.suggestions.length > 0 && (
          <div
            style={{
              borderRadius: 15,
              padding: "12px 14px",
              background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.022)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              color: dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.62)",
              fontSize: 13.3,
              lineHeight: 1.65,
            }}
          >
            <strong style={{ color: dark ? "#fff" : "#0f0f10" }}>Suggested fixes:</strong> {result.suggestions.join(" ")}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── COMP CARD ─── */
function CompCard({ comp, dark, isFavorite, onToggleFavorite }) {
  const [open, setOpen] = useState(false);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div
      className="compCard"
      onClick={() => setOpen((o) => !o)}
      style={{
        borderRadius: 24,
        background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
        border: `1px solid ${
          open
            ? `rgba(${comp.rgb},0.34)`
            : dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"
        }`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        boxShadow: open
          ? dark
            ? `0 18px 44px rgba(0,0,0,0.34), 0 0 0 1px rgba(${comp.rgb},0.08)`
            : `0 14px 38px rgba(0,0,0,0.08), 0 0 0 1px rgba(${comp.rgb},0.08)`
          : dark
          ? "0 10px 30px rgba(0,0,0,0.24)"
          : "0 10px 26px rgba(0,0,0,0.05)",
        cursor: "pointer",
        overflow: "hidden",
        transition: "0.28s ease",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, transparent 0%, ${comp.color} 50%, transparent 100%)`,
          opacity: open ? 1 : 0.52,
          transition: "opacity 0.3s ease",
        }}
      />
      <div style={{ padding: "22px 20px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              flexShrink: 0,
              background: `linear-gradient(135deg, rgba(${comp.rgb},0.2), rgba(${comp.rgb},0.08))`,
              border: `1px solid rgba(${comp.rgb},0.22)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 21,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12)`,
            }}
          >
            {comp.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: comp.color,
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: 4,
              }}
            >
              {comp.short}
            </div>
            <div
              style={{
                fontSize: 15,
                fontWeight: 800,
                lineHeight: 1.25,
                color: dark ? "#f8f8fb" : "#0f0f10",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {comp.name}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              onClick={handleFavoriteClick}
              style={{
                width: 32,
                height: 32,
                flexShrink: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: isFavorite ? "#f59e0b" : (dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"),
                fontSize: 16,
                transition: "all 0.2s ease",
              }}
            >
              {isFavorite ? "⭐" : "☆"}
            </button>

            <div
              style={{
                width: 32,
                height: 32,
                flexShrink: 0,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)",
                color: dark ? "rgba(255,255,255,0.46)" : "rgba(0,0,0,0.4)",
              }}
            >
              <ChevronIcon open={open} />
            </div>
          </div>
        </div>

        <p
          style={{
            margin: "14px 0 0",
            fontSize: 13.4,
            lineHeight: 1.7,
            color: dark ? "rgba(255,255,255,0.52)" : "rgba(0,0,0,0.56)",
          }}
        >
          {comp.why}
        </p>

        <div
          style={{
            overflow: "hidden",
            maxHeight: open ? 900 : 0,
            opacity: open ? 1 : 0,
            transition:
              "max-height 0.45s cubic-bezier(0.32,0.72,0,1), opacity 0.25s ease",
          }}
        >
          <div style={{ paddingTop: 14, display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              { label: "Use when", text: comp.useWhen, icon: "🎯" },
              { label: "Early", text: comp.early, icon: "⚡" },
              { label: "Mid", text: comp.mid, icon: "🔄" },
              { label: "Win condition", text: comp.win, icon: "🏆" },
            ].map((p) => (
              <div
                key={p.label}
                style={{
                  borderRadius: 15,
                  padding: "12px 14px",
                  background: dark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.024)",
                  border: `1px solid ${
                    dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.055)"
                  }`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                  <span style={{ fontSize: 12 }}>{p.icon}</span>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: comp.color,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    {p.label}
                  </span>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.68,
                    color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                  }}
                >
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── COUNTERS SECTION ─── */
function CountersSection({ dark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {COUNTERS.map((counter, i) => (
        <div
          key={i}
          style={{
            borderRadius: 22,
            padding: "20px",
            background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: dark ? "0 10px 28px rgba(0,0,0,0.22)" : "0 10px 24px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 24 }}>{counter.icon}</span>
            <h3 style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: dark ? "#ffffff" : "#3b82f6"
            }}>
              Countering {counter.target}
            </h3>
          </div>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{
              margin: "0 0 8px 0",
              fontSize: 14,
              fontWeight: 700,
              color: dark ? "#ffffff" : "#3b82f6"
            }}>
              Strategies
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 13,
              lineHeight: 1.6,
              color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
            }}>
              {counter.strategies.map((strat, j) => (
                <li key={j}>{strat}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <h4 style={{
                margin: "0 0 8px 0",
                fontSize: 12,
                fontWeight: 700,
                color: "#10b981",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Recommended
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {counter.recommended.map((rec, j) => (
                  <span key={j} style={{
                    fontSize: 11,
                    padding: "4px 8px",
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: 8,
                    color: "#10b981"
                  }}>
                    {rec}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <h4 style={{
                margin: "0 0 8px 0",
                fontSize: 12,
                fontWeight: 700,
                color: "#ef4444",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Avoid
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {counter.avoid.map((avoid, j) => (
                  <span key={j} style={{
                    fontSize: 11,
                    padding: "4px 8px",
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: 8,
                    color: "#ef4444"
                  }}>
                    {avoid}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── PRACTICE SECTION ─── */
function PracticeSection({ dark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {PRACTICE.map((drill, i) => (
        <div
          key={i}
          style={{
            borderRadius: 22,
            padding: "20px",
            background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: dark ? "0 10px 28px rgba(0,0,0,0.22)" : "0 10px 24px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 24 }}>{drill.icon}</span>
              <div>
                <h3 style={{
                  margin: 0,
                  fontSize: 18,
                  fontWeight: 700,
                  color: dark ? "#ffffff" : "#3b82f6",
                  marginBottom: 4
                }}>
                  {drill.name}
                </h3>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: drill.color,
                  background: `rgba(${drill.rgb},0.1)`,
                  padding: "2px 8px",
                  borderRadius: 12,
                  border: `1px solid rgba(${drill.rgb},0.2)`
                }}>
                  {drill.difficulty}
                </span>
              </div>
            </div>
          </div>

          <p style={{
            margin: "0 0 16px 0",
            fontSize: 14,
            lineHeight: 1.5,
            color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"
          }}>
            {drill.description}
          </p>

          <div style={{ marginBottom: 16 }}>
            <h4 style={{
              margin: "0 0 8px 0",
              fontSize: 14,
              fontWeight: 700,
              color: dark ? "#ffffff" : "#3b82f6"
            }}>
              Practice Drills
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: 20,
              fontSize: 13,
              lineHeight: 1.6,
              color: dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)"
            }}>
              {drill.drills.map((d, j) => (
                <li key={j}>{d}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{
              margin: "0 0 8px 0",
              fontSize: 12,
              fontWeight: 700,
              color: "#3b82f6",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Pro Tips
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {drill.tips.map((tip, j) => (
                <span key={j} style={{
                  fontSize: 11,
                  padding: "4px 8px",
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: 8,
                  color: "#3b82f6"
                }}>
                  {tip}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── GUIDES SECTION ─── */
function GuidesSection({ dark }) {
  const [active, setActive] = useState("Win Checklist");
  const guide = GUIDES[active];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 2,
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {Object.keys(GUIDES).map((name) => {
          const g = GUIDES[name];
          const isA = name === active;
          return (
            <button
              key={name}
              onClick={() => setActive(name)}
              style={{
                flexShrink: 0,
                padding: "8px 15px",
                borderRadius: 999,
                border: isA
                  ? `1.5px solid rgba(${g.rgb},0.34)`
                  : `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.09)"}`,
                background: isA
                  ? dark
                    ? `rgba(${g.rgb},0.15)`
                    : `rgba(${g.rgb},0.08)`
                  : dark
                  ? "rgba(255,255,255,0.04)"
                  : "rgba(255,255,255,0.72)",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 800,
                fontFamily: "'Inter', sans-serif",
                color: isA ? g.color : dark ? "rgba(255,255,255,0.48)" : "rgba(0,0,0,0.55)",
                transition: "all 0.22s",
                WebkitTapHighlightColor: "transparent",
                boxShadow: isA
                  ? dark
                    ? "0 6px 20px rgba(0,0,0,0.22)"
                    : "0 6px 18px rgba(0,0,0,0.05)"
                  : "none",
              }}
            >
              {g.icon} {name}
            </button>
          );
        })}
      </div>

      <div
        style={{
          borderRadius: 24,
          background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          boxShadow: dark ? "0 12px 34px rgba(0,0,0,0.24)" : "0 12px 32px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            padding: "13px 18px 12px",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: guide.color,
              boxShadow: `0 0 10px rgba(${guide.rgb},0.45)`,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: guide.color,
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {active.toUpperCase()}
          </span>
        </div>

        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {guide.items.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                borderRadius: 15,
                padding: "12px 14px",
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.022)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: `rgba(${guide.rgb},0.12)`,
                  color: guide.color,
                  border: `1px solid rgba(${guide.rgb},0.22)`,
                }}
              >
                {i + 1}
              </div>
              <p
                style={{
                  margin: 0,
                  paddingTop: 2,
                  fontSize: 13.4,
                  lineHeight: 1.68,
                  color: dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.62)",
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TIMING SECTION ─── */
function TimingSection({ dark }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div
        style={{
          borderRadius: 24,
          background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
          border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          boxShadow: dark ? "0 12px 34px rgba(0,0,0,0.24)" : "0 12px 32px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            padding: "13px 18px 12px",
            borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            display: "flex",
            alignItems: "center",
            gap: 9,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#06b6d4",
              boxShadow: "0 0 10px #06b6d4",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.1em",
              color: "#06b6d4",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            GAME TIMING
          </span>
        </div>

        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 8 }}>
          {TIMING_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                borderRadius: 15,
                padding: "12px 14px",
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.022)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  borderRadius: 9,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: "rgba(6,182,212,0.12)",
                  color: "#06b6d4",
                  border: "1px solid rgba(6,182,212,0.22)",
                }}
              >
                {i + 1}
              </div>
              <p
                style={{
                  margin: 0,
                  paddingTop: 2,
                  fontSize: 13.4,
                  lineHeight: 1.68,
                  color: dark ? "rgba(255,255,255,0.62)" : "rgba(0,0,0,0.62)",
                }}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── TAB BAR ─── */
function TabBar({ tab, setTab, dark }) {
  const tabs = [
    { key: "comps",  label: "Comps",  icon: "⚔️" },
    { key: "draft", label: "Draft", icon: "🧠" },
    { key: "counters", label: "Counters", icon: "🛡️" },
    { key: "practice", label: "Practice", icon: "🎯" },
    { key: "guides", label: "Guides", icon: "📋" },
    { key: "timing", label: "Game Timing", icon: "⏱️" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: dark ? "rgba(10,10,14,0.88)" : "rgba(255,255,255,0.82)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        borderTop: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
        display: "flex",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {tabs.map((t) => {
        const isA = t.key === tab;
        return (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              flex: 1,
              border: "none",
              background: "none",
              cursor: "pointer",
              padding: "10px 0 12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <span style={{ fontSize: 21, lineHeight: 1 }}>{t.icon}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: isA ? 800 : 600,
                color: isA ? (dark ? "#ffffff" : "#3b82f6") : dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.4)",
                letterSpacing: isA ? "0.01em" : 0,
              }}
            >
              {t.label}
            </span>
            {isA && (
              <div
                style={{
                  marginTop: 2,
                  width: 20,
                  height: 3,
                  borderRadius: 999,
                  background: dark ? "#ffffff" : "#3b82f6",
                }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds((s) => s + 1);
  }, 1000);
  return () => clearInterval(interval);
}, []);

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

/* ─── MAIN ─── */
export default function App() {
  useFonts();
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setSeconds((s) => s + 1);
  }, 1000);
  return () => clearInterval(interval);
}, []);

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
};
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("comps");
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setMounted(true);
    const savedFavorites = localStorage.getItem("bw-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("bw-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (compName) => {
    setFavorites(prev =>
      prev.includes(compName)
        ? prev.filter(name => name !== compName)
        : [...prev, compName]
    );
  };

  const filteredComps = COMPS.filter(comp =>
    searchQuery === "" ||
    comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
    comp.why.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: dark
          ? "linear-gradient(180deg, #07070a 0%, #0b0b10 46%, #0e1016 100%)"
          : "linear-gradient(180deg, #f7f7f5 0%, #ffffff 46%, #f1f1ee 100%)",
        color: dark ? "#f5f7fb" : "#3b82f6",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflowX: "hidden",
        paddingBottom: 90,
      }}
    >
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          background: ${dark ? "#09090d" : "#f7f7f5"};
        }
        ::-webkit-scrollbar { display: none; }
        button, select { font-family: inherit; }

        select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          color-scheme: dark;
        }

        select option {
          background: #111827;
          color: #ffffff;
        }

        select option:checked {
          background: #2563eb;
          color: #ffffff;
        }

        select option:hover {
          background: #1d4ed8;
          color: #ffffff;
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-dot {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.35); opacity: 0.65; }
        }

        @keyframes snow-fall {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(115vh); }
        }

        @keyframes snow-sway {
          0%,100% { margin-left: -5px; }
          50% { margin-left: 7px; }
        }

        .fade {
          animation: fade-up 0.56s cubic-bezier(0.22, 0.8, 0.2, 1) both;
        }
        .fade1 { animation-delay: 0.06s; }
        .fade2 { animation-delay: 0.12s; }
        .fade3 { animation-delay: 0.18s; }
        .liveDot {
          animation: pulse-dot 2.4s ease-in-out infinite;
        }

        @media (hover: hover) and (pointer: fine) {
          .compCard:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 46px rgba(0,0,0,0.20);
          }
        }
      `}</style>

      <Ambient dark={dark} />
      <SnowLayer dark={dark} />

      {/* NAV */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: dark ? "rgba(7,7,10,0.72)" : "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)"}`,
        }}
      >
        <div
          style={{
            maxWidth: 960,
            margin: "0 auto",
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 12,
                fontSize: 18,
                background: dark
                  ? "linear-gradient(135deg, #111827 0%, #1f2937 45%, #0f172a 100%)"
                  : "linear-gradient(135deg, #ffffff 0%, #f1f1f1 100%)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: dark
                  ? "0 10px 26px rgba(0,0,0,0.28)"
                  : "0 10px 24px rgba(0,0,0,0.08)",
              }}
            >
              🛏
            </div>

            <div>
              <div
                style={{
                  fontSize: 14.5,
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: dark ? "#ffffff" : "#3b82f6",
                  lineHeight: 1.05,
                }}
              >
                BedWars
              </div>
              <div
                style={{
                  fontSize: 9.5,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: dark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.34)",
                }}
              >
                Squads Meta
              </div>
            </div>
          </div>

          <button
            onClick={() => setDark((d) => !d)}
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
              cursor: "pointer",
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.92)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: dark ? "rgba(255,255,255,0.76)" : "rgba(0,0,0,0.72)",
              boxShadow: dark
                ? "0 10px 24px rgba(0,0,0,0.22)"
                : "0 8px 20px rgba(0,0,0,0.06)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      {/* HERO */}
      <div
        className="fade"
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "72px 18px 20px",
          textAlign: "center",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 999,
            marginBottom: 20,
            background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.88)",
            border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)"}`,
            boxShadow: dark
              ? "0 10px 24px rgba(0,0,0,0.18)"
              : "0 8px 22px rgba(0,0,0,0.05)",
          }}
        >
          <div
            className="liveDot"
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: dark ? "#ffffff" : "#3b82f6",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: dark ? "rgba(255,255,255,0.78)" : "rgba(0,0,0,0.75)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Roblox BedWars · Ranked Squads
          </span>
        </div>

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(3.2rem, 12vw, 6.2rem)",
            fontWeight: 900,
            letterSpacing: "-0.07em",
            lineHeight: 0.92,
            color: dark ? "#ffffff" : "#3b82f6",
          }}
        >
          Squads
        </h1>
            <div
  style={{
    marginTop: 18,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 16px",
    borderRadius: 999,
    background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
    border: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
    fontFamily: "'JetBrains Mono', monospace",
    fontWeight: 800,
    letterSpacing: "0.08em",
  }}
>
  ⏱ {formatTime(seconds)}
</div>

        <p
          style={{
            margin: "0 0 10px",
            fontSize: "clamp(1rem, 4vw, 1.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: dark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.82)",
          }}
        >
          Comps · Drafts · Counters
        </p>

        <p
          style={{
            margin: "14px auto 0",
            maxWidth: 560,
            fontSize: 14.4,
            lineHeight: 1.8,
            color: dark ? "rgba(255,255,255,0.46)" : "rgba(0,0,0,0.52)",
          }}
        >
          Clean squads reference built for ranked players who want structure, better roles, and cleaner games.
        </p>

        <div
          className="fade fade1"
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 24,
            flexWrap: "wrap",
          }}
        >
          {[
            { val: "6", label: "Comps" },
            { val: "1", label: "Draft tool" },
            { val: "4", label: "Guides" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                minWidth: 96,
                padding: "13px 19px",
                borderRadius: 18,
                background: dark ? "rgba(16,16,20,0.8)" : "rgba(255,255,255,0.88)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: dark
                  ? "0 12px 28px rgba(0,0,0,0.22)"
                  : "0 10px 24px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <span
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 900,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: dark ? "#ffffff" : "#3b82f6",
                }}
              >
                {s.val}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "'JetBrains Mono', monospace",
                  color: dark ? "rgba(255,255,255,0.34)" : "rgba(0,0,0,0.36)",
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <FeaturedStrip dark={dark} />
      </div>

      {/* CONTENT */}
      <div
        className="fade fade2"
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "12px 18px",
          position: "relative",
          zIndex: 5,
        }}
      >
        {tab === "comps" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                borderRadius: 16,
                padding: "16px",
                background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
                border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.2)" : "0 8px 22px rgba(0,0,0,0.05)",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <input
                    type="text"
                    placeholder="Search comps, kits, or strategies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      paddingLeft: 40,
                      borderRadius: 12,
                      border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                      background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                      color: dark ? "#ffffff" : "#3b82f6",
                      fontSize: 14,
                      outline: "none",
                    }}
                  />
                  <span style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    fontSize: 16
                  }}>
                    🔍
                  </span>
                </div>
                <button
                  onClick={() => setTab(tab === "favorites" ? "comps" : "favorites")}
                  style={{
                    padding: "10px 16px",
                    borderRadius: 12,
                    border: `1px solid ${dark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
                    background: favorites.length > 0 && tab !== "favorites" ? "rgba(245,158,11,0.1)" : "transparent",
                    color: favorites.length > 0 && tab !== "favorites" ? "#f59e0b" : (dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)"),
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  ⭐ {favorites.length > 0 ? favorites.length : ""}
                  {tab === "favorites" ? "All Comps" : "Favorites"}
                </button>
              </div>

              {searchQuery && (
                <div style={{
                  fontSize: 12,
                  color: dark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
                  textAlign: "center"
                }}>
                  Found {filteredComps.length} comp{filteredComps.length !== 1 ? "s" : ""} matching "{searchQuery}"
                </div>
              )}
            </div>

            {(tab === "favorites" ? COMPS.filter(c => favorites.includes(c.name)) : filteredComps).map((c, i) => (
              <CompCard
                key={i}
                comp={c}
                dark={dark}
                isFavorite={favorites.includes(c.name)}
                onToggleFavorite={() => toggleFavorite(c.name)}
              />
            ))}

            {tab === "favorites" && favorites.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
                <h3 style={{ margin: "0 0 8px 0", color: dark ? "#ffffff" : "#3b82f6" }}>
                  No Favorite Comps Yet
                </h3>
                <p style={{ margin: 0, fontSize: 14 }}>
                  Tap the star icon on any comp to add it to your favorites!
                </p>
              </div>
            )}

            {filteredComps.length === 0 && searchQuery && (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ margin: "0 0 8px 0", color: dark ? "#ffffff" : "#3b82f6" }}>
                  No Comps Found
                </h3>
                <p style={{ margin: 0, fontSize: 14 }}>
                  Try adjusting your search terms or browse all comps.
                </p>
              </div>
            )}
          </div>
        )}

        {tab === "draft" && <DraftBuilderSection dark={dark} />}
        {tab === "counters" && <CountersSection dark={dark} />}
        {tab === "practice" && <PracticeSection dark={dark} />}
        {tab === "guides" && <GuidesSection dark={dark} />}
        {tab === "timing" && <TimingSection dark={dark} />}
      </div>

      {/* FOOTER */}
      <div
        className="fade fade3"
        style={{
          maxWidth: 960,
          margin: "24px auto 0",
          padding: "0 18px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            borderRadius: 28,
            padding: "28px 22px",
            background: dark
              ? "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.025))"
              : "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(247,247,244,0.96))",
            border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            textAlign: "center",
            boxShadow: dark ? "0 16px 38px rgba(0,0,0,0.24)" : "0 14px 34px rgba(0,0,0,0.06)",
          }}
        >
          <h3
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(1.15rem, 4vw, 1.6rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: dark ? "#ffffff" : "#3b82f6",
            }}
          >
            Play cleaner. Scale faster.
          </h3>

          <p
            style={{
              margin: "0 auto",
              maxWidth: 460,
              fontSize: 13.4,
              lineHeight: 1.72,
              color: dark ? "rgba(255,255,255,0.48)" : "rgba(0,0,0,0.52)",
            }}
          >
            A cleaner squads reference for better calls, better role discipline, and less random queue gameplay.
          </p>

          <div
            style={{
              marginTop: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 999,
              background: dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: dark ? "#ffffff" : "#3b82f6",
              }}
            />
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 800,
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: dark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
              }}
            >
              made by justcyril
            </span>
          </div>
        </div>
      </div>

      <TabBar tab={tab} setTab={setTab} dark={dark} />
    </div>
  );
}

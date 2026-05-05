import { useEffect, useMemo, useState } from "react";

function useFonts() {
  useEffect(() => {
    const id = "bw-premium-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;600;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);
}

function GlossMouseLayer() {
  const [pos, setPos] = useState({ x: 50, y: 18 });

  useEffect(() => {
    const move = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      className="glossMouse"
      style={{
        "--mx": `${pos.x}%`,
        "--my": `${pos.y}%`,
      }}
    />
  );
}

function useCardGloss() {
  useEffect(() => {
    const move = (e) => {
      const card = e.target.closest(
        ".glassCard, .buildCard, .draftPanel, .draftResult, .roleCard, .counterCard, .timeCard, .practiceCard, .statCard"
      );

      if (!card) return;

      const rect = card.getBoundingClientRect();
      card.style.setProperty("--card-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--card-y", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
}

const META_BUILDS = [
  {
    name: "Cait / Lassy / Star / Metal / Noelle",
    tag: "Most Reliable",
    tier: "S",
    icon: "◎",
    accent: "#38bdf8",
    gradient: "linear-gradient(135deg, #38bdf8, #2563eb)",
    why:
      "This build has pressure, setup, economy, sustain, and base control. Cait gets clean contract value, Lassy creates pick windows, Star keeps fights stable, Metal scales the team, and Noelle protects the bed.",
    early:
      "Cait and Lassy pressure together without taking random solo deaths. Metal farms value. Noelle stays disciplined and calls incoming pressure early.",
    mid:
      "Use Lassy to force one target out of position, then let Cait finish or secure contract value. Turn Metal economy into armor, upgrades, and clean grouped pressure.",
    win:
      "Group when you have gear advantage, force one pick, then convert instantly into bed pressure.",
    bestInto: "Balanced teams, greedy economy teams, and players who overextend.",
    weakness: "If Cait wastes contracts or Lassy misses setup windows, pressure drops fast.",
  },
  {
    name: "Cait / Cait / Metal / Noelle / Star",
    tag: "Contract Pressure",
    tier: "S",
    icon: "◇",
    accent: "#60a5fa",
    gradient: "linear-gradient(135deg, #60a5fa, #1d4ed8)",
    why:
      "Double Cait creates constant contract pressure. One Cait can pressure the front while the other punishes weak targets. Metal gives scaling, Star gives sustain, and Noelle keeps bed safe.",
    early:
      "Both Cait players should avoid random solo fights. Pick smart targets, pressure with teammates, and let Metal quietly stack resources.",
    mid:
      "Rotate pressure between two contract targets. If one target escapes, the other Cait should still be creating value somewhere else.",
    win:
      "Once Cait value is built up, force grouped fights and snowball kills into bed pressure.",
    bestInto: "Teams with weak peel, exposed economy kits, or messy positioning.",
    weakness: "Needs smart Cait players. If both Caits chase bad fights, the build feels useless.",
  },
  {
    name: "Silas / Cait / Lassy / Metal / Noelle",
    tag: "Aura Core",
    tier: "S",
    icon: "✦",
    accent: "#22d3ee",
    gradient: "linear-gradient(135deg, #22d3ee, #0891b2)",
    why:
      "Silas makes every team fight stronger while Cait and Lassy create pick pressure. Metal handles economy, and Noelle keeps the team from losing bed for free.",
    early:
      "Silas should stay near the team instead of playing alone. Cait and Lassy look for safe pressure while Metal gets value.",
    mid:
      "Before a full fight, group with Silas so the aura actually matters. Lassy pulls a target, Cait pressures, and everyone collapses together.",
    win:
      "Win repeated fights with the aura advantage, then push bed when the enemy team is low or split.",
    bestInto: "Teams that like long fights or stack together.",
    weakness: "Bad spacing ruins the build. Silas has to be near the team to matter.",
  },
  {
    name: "Warden / Melody / Melody / Hannah / Fisher",
    tag: "Sustain Wall",
    tier: "A+",
    icon: "◌",
    accent: "#67e8f9",
    gradient: "linear-gradient(135deg, #67e8f9, #0ea5e9)",
    why:
      "This build is built to survive. Warden holds the front, double Melody keeps the team alive, Hannah adds utility, and Fisher scales the economy.",
    early:
      "Do not force pointless solo plays. Stay close enough that Melody healing matters and let Fisher build value.",
    mid:
      "Take grouped fights when the team is ready. The goal is to outlast, not instantly burst everyone.",
    win:
      "Drag fights out, stack gear, and slowly crush teams that cannot break through the healing.",
    bestInto: "Aggressive teams that keep running into grouped fights.",
    weakness: "Fast bed pressure can punish it before the sustain becomes annoying.",
  },
  {
    name: "Davey / Umbra / Umbra / Fisher / Fisher",
    tag: "Bed Pressure",
    tier: "A+",
    icon: "✧",
    accent: "#93c5fd",
    gradient: "linear-gradient(135deg, #93c5fd, #3b82f6)",
    why:
      "This build is made to create openings. Double Umbra controls space, double Fisher scales, and Davey waits for the right bed break timing.",
    early:
      "Fisher players should scale safely. Umbra players hold pressure without wasting their main engage tools. Davey scouts bed angles.",
    mid:
      "Use Umbra pressure to split defenders. When the enemy rotates badly, Davey goes in immediately.",
    win:
      "Get one clean opening, break the bed, then use the economy lead to finish the game.",
    bestInto: "Slow defensive teams that overprotect one lane.",
    weakness: "If Davey gets tracked or the team has no counter-pressure, the build can stall.",
  },
];

const META_KITS = [
  { name: "Cait", roles: ["Frontline", "Pressure"] },
  { name: "Lassy", roles: ["Support", "Pressure"] },
  { name: "Star", roles: ["Support"] },
  { name: "Metal", roles: ["Economy"] },
  { name: "Noelle", roles: ["Defender"] },
  { name: "Silas", roles: ["Frontline", "Support"] },
  { name: "Warden", roles: ["Frontline"] },
  { name: "Sheila", roles: ["Frontline"] },
  { name: "Nyx", roles: ["Frontline", "Pressure"] },
  { name: "Freya", roles: ["Frontline"] },
  { name: "Lucia", roles: ["Economy", "Frontline"] },
  { name: "Aery", roles: ["Frontline"] },
  { name: "Amy", roles: ["Frontline", "Support"] },
  { name: "Melody", roles: ["Support"] },
  { name: "Hannah", roles: ["Support", "Defender"] },
  { name: "Fisher", roles: ["Economy", "Defender"] },
  { name: "Davey", roles: ["Bed Breaker", "Pressure"] },
  { name: "Pirate Davey", roles: ["Bed Breaker", "Pressure"] },
  { name: "Umbra", roles: ["Support", "Bed Breaker", "Pressure"] },
  { name: "Archer", roles: ["Ranged", "Pressure"] },
  { name: "Umeko", roles: ["Ranged", "Pressure"] },
  { name: "Uma", roles: ["Ranged", "Pressure"] },
  { name: "Wren", roles: ["Defender"] },
  { name: "Whim", roles: ["Ranged", "Pressure"] },
];

const EXTRA_KITS = [
  { name: "Farmer", roles: ["Economy"] },
  { name: "Beekeeper", roles: ["Economy"] },
  { name: "Eldertree", roles: ["Frontline"] },
  { name: "Baker", roles: ["Support", "Defender"] },
  { name: "Whisper", roles: ["Support"] },
  { name: "Ragnar", roles: ["Bed Breaker"] },
  { name: "Triton", roles: ["Bed Breaker"] },
  { name: "Sigrid", roles: ["Bed Breaker"] },
  { name: "Dino Tamer", roles: ["Bed Breaker", "Pressure"] },
  { name: "Zeno", roles: ["Ranged"] },
  { name: "Zola", roles: ["Defender"] },
  { name: "Lani", roles: ["Support", "Pressure"] },
  { name: "Smoke", roles: ["Support", "Pressure"] },
  { name: "Marina", roles: ["Defender"] },
];

const ROLE_GUIDE = [
  {
    role: "Frontline",
    icon: "⚔",
    job: "Starts fights, takes space, and protects the support players.",
    kits: ["Cait", "Silas", "Warden", "Sheila", "Nyx", "Freya", "Lucia", "Eldertree"],
  },
  {
    role: "Support",
    icon: "✚",
    job: "Keeps fights clean with healing, setup, peel, or utility.",
    kits: ["Star", "Lassy", "Melody", "Hannah", "Baker", "Whisper", "Umbra", "Lani"],
  },
  {
    role: "Economy",
    icon: "⬡",
    job: "Builds the gear lead so the team can win later fights.",
    kits: ["Metal", "Fisher", "Farmer", "Lucia", "Beekeeper"],
  },
  {
    role: "Defender",
    icon: "⬢",
    job: "Protects bed, watches incoming pressure, and prevents free breaks.",
    kits: ["Noelle", "Wren", "Baker", "Hannah", "Fisher", "Zola", "Marina"],
  },
  {
    role: "Bed Breaker",
    icon: "◆",
    job: "Finds openings and turns pressure into bed breaks.",
    kits: ["Davey", "Pirate Davey", "Umbra", "Ragnar", "Triton", "Sigrid", "Dino Tamer"],
  },
  {
    role: "Ranged",
    icon: "⌁",
    job: "Chips teams before fights and controls bridges from distance.",
    kits: ["Archer", "Uma", "Umeko", "Whim", "Zeno"],
  },
];

const COUNTERS = [
  {
    title: "Against Cait Pressure",
    icon: "☠",
    plan:
      "Do not feed Cait free contract value. Keep economy kits protected, force Cait to fight through your frontline, and punish her when she overextends.",
    good: ["Lassy", "Noelle", "Wren", "Silas"],
    avoid: "Long messy fights where Cait keeps getting resets.",
  },
  {
    title: "Against Double Melody",
    icon: "♪",
    plan:
      "Do not take slow fights into stacked healing. Split their formation, burst one target fast, and pressure bed so they cannot sit grouped forever.",
    good: ["Cait", "Archer", "Lassy", "Davey"],
    avoid: "Standing in front of them and trading forever.",
  },
  {
    title: "Against Umbra Bed Pressure",
    icon: "◈",
    plan:
      "Track Umbra engages and keep a defender ready. If Davey is missing, assume bed pressure is coming and stop chasing random fights.",
    good: ["Noelle", "Wren", "Hannah", "Baker"],
    avoid: "Leaving base empty after winning one fight.",
  },
];

const TIMING = [
  {
    time: "0:00 - 1:30",
    title: "Open clean",
    text: "Get blocks, basic weapon pressure, and early map info. Do not throw your first life for nothing.",
  },
  {
    time: "1:30 - 3:00",
    title: "Protect value",
    text: "Economy kits need time. Defender watches bed. Frontline should pressure without taking stupid 1v3s.",
  },
  {
    time: "3:00 - 6:00",
    title: "First real push",
    text: "Look for armor, upgrades, and a grouped timing. One good pick should become bed pressure.",
  },
  {
    time: "6:00 - 10:00",
    title: "Convert advantage",
    text: "If you have gear lead, stop farming and start forcing fights. If behind, defend and look for a punish.",
  },
  {
    time: "Late game",
    title: "Stay disciplined",
    text: "Beds gone means every death matters. Stack blocks, telepearls, fireballs, and move as a team.",
  },
];

const PRACTICE = [
  {
    title: "Bridge Pressure",
    level: "Beginner",
    text: "Practice crossing, backing off, and baiting hits without falling or wasting blocks.",
  },
  {
    title: "Bed Defense Reactions",
    level: "Core Skill",
    text: "Have one person break in while you practice blocking, countering TNT, and calling the angle.",
  },
  {
    title: "5v5 Fight Calls",
    level: "Advanced",
    text: "Practice calling one target and collapsing together instead of everyone fighting different players.",
  },
];

function getAllKits() {
  const map = new Map();

  [...META_KITS, ...EXTRA_KITS].forEach((kit) => {
    if (!map.has(kit.name)) {
      map.set(kit.name, kit);
    }
  });

  return [...map.values()];
}

function getKit(name) {
  return getAllKits().find((kit) => kit.name === name);
}

function getKitsByCategory() {
  const categories = {
    Frontline: [],
    Support: [],
    Economy: [],
    Defender: [],
    "Bed Breaker": [],
    Ranged: [],
    Pressure: [],
  };

  getAllKits().forEach((kit) => {
    const mainRole = kit.roles.find((role) => categories[role]) || "Pressure";
    categories[mainRole].push(kit);
  });

  Object.keys(categories).forEach((key) => {
    categories[key].sort((a, b) => a.name.localeCompare(b.name));
  });

  return categories;
}

function evaluateDraft(picks) {
  const chosen = picks.map(getKit).filter(Boolean);
  const has = (role) => chosen.some((kit) => kit.roles.includes(role));

  const hasFrontline = has("Frontline");
  const hasSupport = has("Support");
  const hasEconomy = has("Economy");
  const hasDefender = has("Defender");
  const hasPressure = has("Bed Breaker") || has("Pressure") || has("Ranged");

  let score = 0;
  [hasFrontline, hasSupport, hasEconomy, hasDefender, hasPressure].forEach((ok) => {
    if (ok) score += 20;
  });

  const missing = [];
  if (!hasFrontline) missing.push("frontline");
  if (!hasSupport) missing.push("support");
  if (!hasEconomy) missing.push("economy");
  if (!hasDefender) missing.push("defender");
  if (!hasPressure) missing.push("bed pressure");

  const positives = [];
  if (picks.includes("Cait") && picks.includes("Lassy")) {
    positives.push("Cait + Lassy gives clean pick pressure.");
  }
  if (picks.includes("Silas") && picks.includes("Cait")) {
    positives.push("Silas makes Cait fights easier to win.");
  }
  if (picks.includes("Davey") && picks.includes("Umbra")) {
    positives.push("Davey + Umbra creates strong bed break openings.");
  }
  if (picks.includes("Melody") && picks.includes("Warden")) {
    positives.push("Warden + Melody is strong for long fights.");
  }
  if (picks.includes("Metal") || picks.includes("Fisher")) {
    positives.push("Your build has scaling, so do not waste early lives.");
  }
  if (picks.includes("Amy") || picks.includes("Freya")) {
    positives.push("Amy/Freya style juggs can get value without relying only on kills.");
  }

  let verdict = "Risky";
  let verdictText = "This build can work, but it is missing important 5v5 structure.";
  if (score >= 100) {
    verdict = "Elite";
    verdictText = "This is a balanced 5v5 build with pressure, scaling, and defense.";
  } else if (score >= 80) {
    verdict = "Strong";
    verdictText = "This build is good, but one role could still be cleaner.";
  } else if (score >= 60) {
    verdict = "Playable";
    verdictText = "This can win, but you need to play carefully around the missing role.";
  }

  return {
    score,
    verdict,
    verdictText,
    missing,
    positives,
    roles: {
      Frontline: hasFrontline,
      Support: hasSupport,
      Economy: hasEconomy,
      Defender: hasDefender,
      Pressure: hasPressure,
    },
  };
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="sectionHeader">
      <div className="eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="statCard glassCard">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Hero({ setTab }) {
  return (
    <section className="hero">
      <div className="heroBadgeStack">
        <div className="heroBadge">
          <span className="liveDot" />
          Live Season 16 5v5 Meta
        </div>

        <div className="madeBy">
          made by <span>justcyril</span>
        </div>
      </div>

      <h1>
        Build better teams.
        <br />
        Win cleaner fights.
      </h1>

      <p>
        A premium BedWars 5v5 meta hub for builds, drafting, roles, counters,
        timing plans, and practice routines.
      </p>

      <div className="heroActions">
        <button onClick={() => setTab("meta")} className="primaryBtn">
          View 5v5 Meta
        </button>
        <button onClick={() => setTab("draft")} className="ghostBtn">
          Test Your Draft
        </button>
      </div>

      <div className="statsGrid">
        <StatCard label="Format" value="5v5" />
        <StatCard label="Season" value="S16" />
        <StatCard label="Focus" value="Teamplay" />
      </div>
    </section>
  );
}

function BuildCard({ build }) {
  const [open, setOpen] = useState(false);

  return (
    <article className={`buildCard glassCard ${open ? "open" : ""}`}>
      <button className="buildTop" onClick={() => setOpen((v) => !v)}>
        <div className="buildIcon" style={{ background: build.gradient }}>
          {build.icon}
        </div>

        <div className="buildTitle">
          <span style={{ color: build.accent }}>{build.tag}</span>
          <h3>{build.name}</h3>
        </div>

        <div className="buildTier">Tier {build.tier}</div>
        <div className="expand">{open ? "−" : "+"}</div>
      </button>

      <p className="buildWhy">{build.why}</p>

      {open && (
        <div className="buildDetails">
          <InfoBlock label="Early Plan" text={build.early} />
          <InfoBlock label="Mid Game Plan" text={build.mid} />
          <InfoBlock label="Win Condition" text={build.win} />
          <InfoBlock label="Best Into" text={build.bestInto} />
          <InfoBlock label="Weakness" text={build.weakness} danger />
        </div>
      )}
    </article>
  );
}

function InfoBlock({ label, text, danger }) {
  return (
    <div className={danger ? "infoBlock danger" : "infoBlock"}>
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}

function MetaSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Top Builds"
        title="Season 16 5v5 Meta"
        text="Clean team builds with a real plan instead of random kit stacking."
      />

      <div className="buildGrid">
        {META_BUILDS.map((build) => (
          <BuildCard key={build.name} build={build} />
        ))}
      </div>
    </section>
  );
}

function DraftBuilder() {
  const [picks, setPicks] = useState(["Cait", "Lassy", "Star", "Metal", "Noelle"]);

  const kitCategories = useMemo(() => getKitsByCategory(), []);
  const result = useMemo(() => evaluateDraft(picks), [picks]);

  const updatePick = (index, value) => {
    setPicks((old) => old.map((pick, i) => (i === index ? value : pick)));
  };

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Draft Builder"
        title="Check if your 5v5 team makes sense"
        text="All kits are grouped inside the dropdown by role, so your draft will not reset when browsing."
      />

      <div className="draftShell">
        <div className="draftPanel glassCard">
          <div className="draftTop">
            <div>
              <span className="miniLabel">Your Team</span>
              <h3>{picks.join(" / ")}</h3>
            </div>
          </div>

          <div className="pickGrid">
            {picks.map((pick, index) => (
              <label key={index} className="pickBox">
                <span>Slot {index + 1}</span>
                <select value={pick} onChange={(e) => updatePick(index, e.target.value)}>
                  {Object.entries(kitCategories).map(([category, kits]) => {
                    if (kits.length === 0) return null;

                    return (
                      <optgroup key={category} label={category}>
                        {kits.map((kit) => (
                          <option key={`${category}-${kit.name}`} value={kit.name}>
                            {kit.name}
                          </option>
                        ))}
                      </optgroup>
                    );
                  })}
                </select>
              </label>
            ))}
          </div>

          <div className="draftHint">
            Pro tip: build around one frontline, one support, one economy, one defender,
            and one real pressure slot.
          </div>
        </div>

        <div className="draftResult glassCard">
          <div className="scoreCircle">
            <strong>{result.score}</strong>
            <span>/100</span>
          </div>

          <div>
            <span className="miniLabel">Verdict</span>
            <h3>{result.verdict}</h3>
            <p>{result.verdictText}</p>
          </div>

          <div className="roleCheckGrid">
            {Object.entries(result.roles).map(([role, ok]) => (
              <div key={role} className={ok ? "roleCheck ok" : "roleCheck bad"}>
                <span>{ok ? "✓" : "!"}</span>
                {role}
              </div>
            ))}
          </div>

          {result.missing.length > 0 && (
            <div className="warningBox">
              <strong>Fix this:</strong> Add {result.missing.join(", ")}.
            </div>
          )}

          {result.positives.length > 0 && (
            <div className="positiveList">
              {result.positives.map((item) => (
                <p key={item}>✓ {item}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Role Guide"
        title="Know what every slot is supposed to do"
        text="The best 5v5 teams usually cover pressure, scaling, sustain, and bed safety."
      />

      <div className="roleGrid">
        {ROLE_GUIDE.map((role) => (
          <div className="roleCard glassCard" key={role.role}>
            <div className="roleIcon">{role.icon}</div>
            <h3>{role.role}</h3>
            <p>{role.job}</p>
            <div className="kitTags">
              {role.kits.map((kit) => (
                <span key={kit}>{kit}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CountersSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Counters"
        title="How to play into annoying builds"
        text="Simple answers for the most common 5v5 problems."
      />

      <div className="counterGrid">
        {COUNTERS.map((counter) => (
          <div className="counterCard glassCard" key={counter.title}>
            <div className="counterIcon">{counter.icon}</div>
            <h3>{counter.title}</h3>
            <p>{counter.plan}</p>

            <div className="miniLabel">Good Answers</div>
            <div className="kitTags">
              {counter.good.map((kit) => (
                <span key={kit}>{kit}</span>
              ))}
            </div>

            <div className="avoidBox">
              <strong>Avoid:</strong> {counter.avoid}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimingSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Timing Plan"
        title="What you should be doing during the match"
        text="Use this as a quick mental checklist so your team does not waste the best windows."
      />

      <div className="timeline">
        {TIMING.map((item) => (
          <div className="timeCard glassCard" key={item.time}>
            <div className="timeStamp">{item.time}</div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PracticeSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Practice"
        title="Drills that actually improve your gamesense"
        text="Short routines for cleaner movement, better calls, and faster reactions."
      />

      <div className="practiceGrid">
        {PRACTICE.map((drill) => (
          <div className="practiceCard glassCard" key={drill.title}>
            <span>{drill.level}</span>
            <h3>{drill.title}</h3>
            <p>{drill.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomNav({ tab, setTab }) {
  const tabs = [
    { key: "home", label: "Home", icon: "⌂" },
    { key: "meta", label: "5v5 Meta", icon: "◆" },
    { key: "draft", label: "Draft", icon: "◎" },
    { key: "roles", label: "Roles", icon: "⬡" },
    { key: "more", label: "More", icon: "•••" },
  ];

  return (
    <nav className="bottomNavShell">
      <div className="bottomNav">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={tab === item.key ? "navItem active" : "navItem"}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function App() {
  useFonts();
  useCardGloss();
  const [tab, setTab] = useState("home");

  const renderTab = () => {
    if (tab === "home") {
      return (
        <>
          <Hero setTab={setTab} />
          <MetaSection />
          <DraftBuilder />
          <RolesSection />
        </>
      );
    }

    if (tab === "meta") return <MetaSection />;
    if (tab === "draft") return <DraftBuilder />;
    if (tab === "roles") return <RolesSection />;

    return (
      <>
        <CountersSection />
        <TimingSection />
        <PracticeSection />
      </>
    );
  };

  return (
    <div className="app">
      <GlossMouseLayer />

      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #030712;
          color: #f8fafc;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        button,
        select {
          font-family: inherit;
        }

        button {
          -webkit-tap-highlight-color: transparent;
        }

        .app {
          min-height: 100vh;
          padding-bottom: 132px;
          background:
            radial-gradient(circle at top left, rgba(56, 189, 248, 0.2), transparent 36%),
            radial-gradient(circle at top right, rgba(37, 99, 235, 0.18), transparent 34%),
            radial-gradient(circle at 50% 110%, rgba(14, 165, 233, 0.12), transparent 35%),
            linear-gradient(180deg, #020617 0%, #030712 48%, #050816 100%);
          color: #f8fafc;
          overflow-x: hidden;
          position: relative;
        }

        .glossMouse {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(
              760px circle at var(--mx) var(--my),
              rgba(186, 230, 253, 0.22),
              rgba(56, 189, 248, 0.14) 22%,
              rgba(37, 99, 235, 0.08) 38%,
              transparent 62%
            );
          mix-blend-mode: screen;
          opacity: 1;
          transition: background 0.05s linear;
        }

        .app::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          mask-image: linear-gradient(to bottom, black, transparent 75%);
          z-index: 0;
        }

        .app::after {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.045), transparent 18%, transparent 82%, rgba(0,0,0,0.24));
        }

        .app > * {
          position: relative;
          z-index: 1;
        }

        .hero {
          max-width: 1040px;
          margin: 0 auto;
          padding: 76px 18px 44px;
          text-align: center;
        }

        .heroBadgeStack {
          width: fit-content;
          margin: 0 auto 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .heroBadge {
          width: fit-content;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 14px;
          border: 1px solid rgba(125, 211, 252, 0.28);
          border-radius: 999px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.035)),
            rgba(15, 23, 42, 0.58);
          backdrop-filter: blur(24px) saturate(1.4);
          -webkit-backdrop-filter: blur(24px) saturate(1.4);
          color: #7dd3fc;
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 -1px 0 rgba(255,255,255,0.055),
            0 16px 42px rgba(0,0,0,0.2);
        }

        .madeBy {
          width: fit-content;
          padding: 7px 12px;
          border-radius: 999px;
          color: rgba(226, 232, 240, 0.66);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.085), rgba(255,255,255,0.025));
          border: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.02em;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .madeBy span {
          color: #7dd3fc;
          font-family: "JetBrains Mono", monospace;
          letter-spacing: 0.06em;
        }

        .liveDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #22d3ee;
          box-shadow: 0 0 18px #22d3ee;
          animation: pulse 1.8s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(1.45);
          }
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(48px, 9vw, 94px);
          line-height: 0.9;
          letter-spacing: -0.08em;
          font-weight: 900;
          background: linear-gradient(180deg, #ffffff, #dff8ff 36%, #a5f3fc 58%, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 18px 60px rgba(56, 189, 248, 0.16);
        }

        .hero p {
          max-width: 680px;
          margin: 22px auto 0;
          color: rgba(226, 232, 240, 0.72);
          font-size: 17px;
          line-height: 1.7;
        }

        .heroActions {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 30px;
        }

        .primaryBtn,
        .ghostBtn {
          border: none;
          cursor: pointer;
          border-radius: 999px;
          font-weight: 800;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .primaryBtn {
          padding: 14px 22px;
          color: #020617;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.98), rgba(186,230,253,0.92));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.95),
            0 18px 44px rgba(56,189,248,0.32);
        }

        .ghostBtn {
          padding: 14px 22px;
          color: #e0f2fe;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.095), rgba(255,255,255,0.035));
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.09);
        }

        .primaryBtn:hover,
        .ghostBtn:hover {
          transform: translateY(-2px);
        }

        .statsGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          max-width: 760px;
          margin: 34px auto 0;
        }

        .glassCard,
        .statCard,
        .buildCard,
        .draftPanel,
        .draftResult,
        .roleCard,
        .counterCard,
        .timeCard,
        .practiceCard {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.13);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.028)),
            linear-gradient(180deg, rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.5));
          backdrop-filter: blur(18px) saturate(1.35);
          -webkit-backdrop-filter: blur(18px) saturate(1.35);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.12),
            inset 0 -1px 0 rgba(255,255,255,0.04),
            0 18px 48px rgba(0, 0, 0, 0.24);
        }

        .glassCard::before,
        .statCard::before,
        .buildCard::before,
        .draftPanel::before,
        .draftResult::before,
        .roleCard::before,
        .counterCard::before,
        .timeCard::before,
        .practiceCard::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(
              125deg,
              rgba(255,255,255,0.2) 0%,
              rgba(255,255,255,0.07) 18%,
              transparent 42%
            );
          opacity: 0.5;
        }

        .glassCard::after,
        .statCard::after,
        .buildCard::after,
        .draftPanel::after,
        .draftResult::after,
        .roleCard::after,
        .counterCard::after,
        .timeCard::after,
        .practiceCard::after {
          content: "";
          position: absolute;
          inset: -2px;
          pointer-events: none;
          background:
            radial-gradient(
              500px circle at var(--card-x, 50%) var(--card-y, 0%),
              rgba(255,255,255,0.22),
              rgba(125,211,252,0.11) 30%,
              transparent 58%
            );
          opacity: 0;
          transition: opacity 0.18s ease;
        }

        .glassCard:hover::after,
        .statCard:hover::after,
        .buildCard:hover::after,
        .draftPanel:hover::after,
        .draftResult:hover::after,
        .roleCard:hover::after,
        .counterCard:hover::after,
        .timeCard:hover::after,
        .practiceCard:hover::after {
          opacity: 1;
        }

        .glassCard > *,
        .statCard > *,
        .buildCard > *,
        .draftPanel > *,
        .draftResult > *,
        .roleCard > *,
        .counterCard > *,
        .timeCard > *,
        .practiceCard > * {
          position: relative;
          z-index: 1;
        }

        .statCard {
          border-radius: 24px;
          padding: 18px;
          text-align: left;
        }

        .statCard span,
        .miniLabel,
        .eyebrow {
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #67e8f9;
        }

        .statCard strong {
          display: block;
          margin-top: 7px;
          font-size: 24px;
          letter-spacing: -0.04em;
        }

        .section {
          max-width: 1040px;
          margin: 0 auto;
          padding: 38px 18px;
        }

        .sectionHeader {
          margin-bottom: 20px;
        }

        .sectionHeader h2 {
          margin: 8px 0 0;
          font-size: clamp(30px, 5vw, 54px);
          letter-spacing: -0.06em;
          line-height: 1;
        }

        .sectionHeader p {
          max-width: 680px;
          margin: 12px 0 0;
          color: rgba(226, 232, 240, 0.66);
          line-height: 1.65;
        }

        .buildGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          align-items: start;
        }

        .buildCard {
          border-radius: 30px;
          transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .buildCard:hover {
          transform: translateY(-2px);
          border-color: rgba(125, 211, 252, 0.24);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            0 28px 70px rgba(14,165,233,0.13),
            0 18px 48px rgba(0,0,0,0.3);
        }

        .buildTop {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
          background: transparent;
          border: none;
          color: inherit;
          padding: 22px 22px 0;
          cursor: pointer;
        }

        .buildIcon {
          width: 54px;
          height: 54px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          color: white;
          font-size: 24px;
          font-weight: 900;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.26), 0 14px 30px rgba(14,165,233,0.18);
          flex: 0 0 auto;
        }

        .buildTitle {
          flex: 1;
          min-width: 0;
        }

        .buildTitle span {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 5px;
        }

        .buildTitle h3 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.04em;
          line-height: 1.2;
        }

        .buildTier {
          flex: 0 0 auto;
          padding: 6px 9px;
          border-radius: 999px;
          color: #bae6fd;
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(125,211,252,0.14);
          font-size: 11px;
          font-weight: 900;
          font-family: "JetBrains Mono", monospace;
        }

        .expand {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: #bae6fd;
          font-size: 22px;
          font-weight: 600;
          flex: 0 0 auto;
        }

        .buildWhy {
          margin: 0;
          padding: 15px 22px 22px;
          color: rgba(226, 232, 240, 0.68);
          font-size: 14px;
          line-height: 1.7;
        }

        .buildDetails {
          display: grid;
          gap: 10px;
          padding: 0 22px 22px;
          animation: detailsIn 0.18s ease-out both;
        }

        @keyframes detailsIn {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .infoBlock {
          border-radius: 18px;
          padding: 13px 14px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .infoBlock span {
          display: block;
          margin-bottom: 5px;
          color: #7dd3fc;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 900;
          font-family: "JetBrains Mono", monospace;
        }

        .infoBlock p {
          margin: 0;
          color: rgba(226, 232, 240, 0.68);
          line-height: 1.62;
          font-size: 13.5px;
        }

        .infoBlock.danger span {
          color: #93c5fd;
        }

        .draftShell {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
          gap: 16px;
          align-items: start;
        }

        .draftPanel,
        .draftResult {
          border-radius: 30px;
          padding: 22px;
        }

        .draftTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 16px;
        }

        .draftTop h3,
        .draftResult h3,
        .roleCard h3,
        .counterCard h3,
        .timeCard h3,
        .practiceCard h3 {
          margin: 5px 0 0;
          letter-spacing: -0.04em;
        }

        .pickGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .pickBox {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-radius: 18px;
          padding: 13px;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .pickBox span {
          color: rgba(226,232,240,0.5);
          font-size: 12px;
          font-weight: 800;
        }

        select {
          width: 100%;
          outline: none;
          border-radius: 13px;
          padding: 12px;
          color: #f8fafc;
          background:
            linear-gradient(180deg, rgba(15,23,42,0.95), rgba(15,23,42,0.78));
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
          font-size: 14px;
          font-weight: 750;
        }

        optgroup {
          background: #0f172a;
          color: #7dd3fc;
          font-weight: 900;
        }

        option {
          background: #0f172a;
          color: #f8fafc;
        }

        .draftHint {
          margin-top: 14px;
          border-radius: 16px;
          padding: 12px 13px;
          color: rgba(226, 232, 240, 0.62);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 13px;
          line-height: 1.55;
        }

        .draftResult {
          position: sticky;
          top: 18px;
        }

        .scoreCircle {
          width: 112px;
          height: 112px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 50%, rgba(56,189,248,0.14), transparent 58%),
            linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04));
          border: 1px solid rgba(125, 211, 252, 0.2);
        }

        .scoreCircle strong {
          font-size: 34px;
          letter-spacing: -0.06em;
        }

        .scoreCircle span {
          color: rgba(226,232,240,0.5);
          font-size: 12px;
          margin-top: -30px;
        }

        .draftResult p {
          color: rgba(226,232,240,0.68);
          line-height: 1.62;
        }

        .roleCheckGrid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 8px;
          margin-top: 14px;
        }

        .roleCheck {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px;
          border-radius: 14px;
          font-size: 12px;
          font-weight: 850;
        }

        .roleCheck span {
          width: 20px;
          height: 20px;
          display: grid;
          place-items: center;
          border-radius: 999px;
        }

        .roleCheck.ok {
          color: #67e8f9;
          background: rgba(34,211,238,0.08);
          border: 1px solid rgba(103,232,249,0.14);
        }

        .roleCheck.bad {
          color: #93c5fd;
          background: rgba(59,130,246,0.08);
          border: 1px solid rgba(147,197,253,0.14);
        }

        .warningBox,
        .avoidBox {
          margin-top: 14px;
          border-radius: 16px;
          padding: 12px 13px;
          color: #bfdbfe;
          background: rgba(37, 99, 235, 0.1);
          border: 1px solid rgba(147, 197, 253, 0.16);
          line-height: 1.55;
          font-size: 13px;
        }

        .positiveList {
          margin-top: 14px;
          display: grid;
          gap: 8px;
        }

        .positiveList p {
          margin: 0;
          padding: 10px 12px;
          border-radius: 14px;
          color: #a5f3fc;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(103, 232, 249, 0.14);
          font-size: 13px;
        }

        .roleGrid,
        .counterGrid,
        .practiceGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .roleCard,
        .counterCard,
        .practiceCard {
          border-radius: 28px;
          padding: 22px;
          transition: transform 0.18s ease, border-color 0.18s ease;
        }

        .roleCard:hover,
        .counterCard:hover,
        .practiceCard:hover,
        .timeCard:hover,
        .statCard:hover {
          transform: translateY(-2px);
          border-color: rgba(125,211,252,0.22);
        }

        .roleIcon,
        .counterIcon {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(56,189,248,0.2), rgba(37,99,235,0.12));
          color: #7dd3fc;
          font-weight: 900;
          font-size: 22px;
          margin-bottom: 14px;
        }

        .roleCard p,
        .counterCard p,
        .practiceCard p,
        .timeCard p {
          color: rgba(226,232,240,0.66);
          line-height: 1.62;
          font-size: 14px;
        }

        .kitTags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 14px;
        }

        .kitTags span {
          padding: 6px 9px;
          border-radius: 999px;
          color: #bae6fd;
          background: rgba(56,189,248,0.09);
          border: 1px solid rgba(125,211,252,0.14);
          font-size: 12px;
          font-weight: 800;
        }

        .timeline {
          display: grid;
          gap: 12px;
        }

        .timeCard {
          display: grid;
          grid-template-columns: 145px minmax(0, 1fr);
          gap: 18px;
          border-radius: 26px;
          padding: 18px;
          transition: transform 0.18s ease, border-color 0.18s ease;
        }

        .timeStamp {
          width: fit-content;
          height: fit-content;
          padding: 8px 11px;
          border-radius: 999px;
          background: rgba(56,189,248,0.1);
          border: 1px solid rgba(125,211,252,0.16);
          color: #7dd3fc;
          font-family: "JetBrains Mono", monospace;
          font-size: 12px;
          font-weight: 900;
        }

        .practiceCard span {
          color: #7dd3fc;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-family: "JetBrains Mono", monospace;
        }

        .bottomNavShell {
          position: fixed;
          left: 50%;
          bottom: 16px;
          transform: translateX(-50%);
          width: min(690px, calc(100% - 24px));
          z-index: 20;
          padding: 1px;
          border-radius: 31px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.28), rgba(125,211,252,0.1), rgba(255,255,255,0.08));
          box-shadow: 0 26px 90px rgba(0,0,0,0.52);
        }

        .bottomNav {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 6px;
          padding: 8px;
          border-radius: 30px;
          background:
            radial-gradient(circle at 50% -20%, rgba(255,255,255,0.18), transparent 42%),
            linear-gradient(180deg, rgba(15,23,42,0.72), rgba(2,6,23,0.78));
          border: 1px solid rgba(255,255,255,0.12);
          backdrop-filter: blur(28px) saturate(1.55);
          -webkit-backdrop-filter: blur(28px) saturate(1.55);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.14),
            inset 0 -1px 0 rgba(255,255,255,0.045);
        }

        .navItem {
          border: none;
          background: transparent;
          color: rgba(226,232,240,0.48);
          border-radius: 22px;
          padding: 10px 6px;
          font-size: 11px;
          font-weight: 850;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          transition: transform 0.16s ease, background 0.16s ease, color 0.16s ease;
        }

        .navItem span {
          font-size: 18px;
          line-height: 1;
        }

        .navItem:hover {
          color: rgba(226,232,240,0.75);
          transform: translateY(-1px);
        }

        .navItem.active {
          color: #e0f2fe;
          background:
            linear-gradient(180deg, rgba(56,189,248,0.24), rgba(37,99,235,0.2));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            0 12px 28px rgba(37,99,235,0.22);
        }

        @media (max-width: 860px) {
          .buildGrid,
          .draftShell,
          .roleGrid,
          .counterGrid,
          .practiceGrid {
            grid-template-columns: 1fr;
          }

          .draftResult {
            position: static;
          }

          .hero {
            padding-top: 54px;
          }
        }

        @media (max-width: 560px) {
          .statsGrid {
            grid-template-columns: 1fr;
          }

          .pickGrid {
            grid-template-columns: 1fr;
          }

          .timeCard {
            grid-template-columns: 1fr;
          }

          .hero h1 {
            font-size: 48px;
          }

          .hero p {
            font-size: 15px;
          }

          .buildTop {
            align-items: flex-start;
          }

          .buildTier {
            display: none;
          }

          .bottomNavShell {
            bottom: 10px;
            border-radius: 26px;
          }

          .bottomNav {
            border-radius: 25px;
          }

          .navItem {
            font-size: 10px;
            border-radius: 18px;
          }
        }
      `}</style>

      {renderTab()}

      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

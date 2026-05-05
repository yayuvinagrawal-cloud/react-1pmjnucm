import { useEffect, useMemo, useState } from "react";

function useFonts() {
  useEffect(() => {
    const id = "bw-fonts-v4";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id;
      l.rel = "stylesheet";
      l.href =
        "https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;600;700&family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&family=Fira+Code:wght@500;600&display=swap";
      document.head.appendChild(l);
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

  return <div className="glossMouse" style={{ "--mx": `${pos.x}%`, "--my": `${pos.y}%` }} />;
}

function useCardGloss() {
  useEffect(() => {
    const move = (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--cx", `${e.clientX - r.left}px`);
      card.style.setProperty("--cy", `${e.clientY - r.top}px`);
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
}

const RC = {
  Frontline: { c: "#ff7043", bg: "rgba(255,112,67,.13)", b: "rgba(255,112,67,.25)" },
  Support: { c: "#26d0ce", bg: "rgba(38,208,206,.13)", b: "rgba(38,208,206,.25)" },
  Economy: { c: "#ffca28", bg: "rgba(255,202,40,.13)", b: "rgba(255,202,40,.25)" },
  Defender: { c: "#42a5f5", bg: "rgba(66,165,245,.13)", b: "rgba(66,165,245,.25)" },
  "Bed Breaker": { c: "#ce93d8", bg: "rgba(206,147,216,.13)", b: "rgba(206,147,216,.25)" },
  Ranged: { c: "#f48fb1", bg: "rgba(244,143,177,.13)", b: "rgba(244,143,177,.25)" },
};

function RoleTag({ role }) {
  const r = RC[role] || { c: "#94a3b8", bg: "rgba(148,163,184,.1)", b: "rgba(148,163,184,.2)" };
  return (
    <span className="roleTag" style={{ color: r.c, background: r.bg, borderColor: r.b }}>
      {role}
    </span>
  );
}

const ALL_KITS = [
  { name: "Cait", roles: ["Frontline"] },
  { name: "Lassy", roles: ["Support", "Frontline"] },
  { name: "Star", roles: ["Support"] },
  { name: "Metal", roles: ["Economy"] },
  { name: "Noelle", roles: ["Defender"] },
  { name: "Silas", roles: ["Frontline", "Support"] },
  { name: "Warden", roles: ["Frontline"] },
  { name: "Sheila", roles: ["Frontline"] },
  { name: "Nyx", roles: ["Frontline", "Bed Breaker"] },
  { name: "Freya", roles: ["Frontline"] },
  { name: "Lucia", roles: ["Economy", "Frontline"] },
  { name: "Aery", roles: ["Frontline"] },
  { name: "Amy", roles: ["Frontline", "Support"] },
  { name: "Melody", roles: ["Support"] },
  { name: "Hannah", roles: ["Support", "Defender"] },
  { name: "Fisher", roles: ["Economy", "Defender"] },
  { name: "Davey", roles: ["Bed Breaker"] },
  { name: "Pirate Davey", roles: ["Bed Breaker"] },
  { name: "Umbra", roles: ["Support", "Bed Breaker"] },
  { name: "Archer", roles: ["Ranged"] },
  { name: "Umeko", roles: ["Ranged"] },
  { name: "Uma", roles: ["Ranged"] },
  { name: "Wren", roles: ["Defender"] },
  { name: "Whim", roles: ["Ranged"] },
  { name: "Farmer", roles: ["Economy"] },
  { name: "Beekeeper", roles: ["Economy"] },
  { name: "Eldertree", roles: ["Frontline"] },
  { name: "Baker", roles: ["Support", "Defender"] },
  { name: "Whisper", roles: ["Support"] },
  { name: "Ragnar", roles: ["Bed Breaker"] },
  { name: "Triton", roles: ["Bed Breaker"] },
  { name: "Sigrid", roles: ["Bed Breaker"] },
  { name: "Dino Tamer", roles: ["Bed Breaker"] },
  { name: "Zeno", roles: ["Support", "Ranged"] },
  { name: "Zola", roles: ["Defender"] },
  { name: "Lani", roles: ["Support", "Bed Breaker"] },
  { name: "Smoke", roles: ["Bed Breaker"] },
  { name: "Marina", roles: ["Defender"] },
];

const META_BUILDS = [
  {
    name: "Cait / Lassy / Star / Metal / Noelle",
    tag: "Most Reliable",
    tier: "S",
    icon: "◎",
    accentA: "#38bdf8",
    accentB: "#2563eb",
    roles: ["Frontline", "Support", "Support", "Economy", "Defender"],
    why: "This is the safest all-around 5v5 core. Cait creates kill pressure, Lassy sets picks, Star stabilizes fights, Metal scales, and Noelle keeps bed safe.",
    early: "Do not ego fight. Cait and Lassy pressure together while Metal gets value and Noelle watches bed.",
    mid: "Use Lassy pull to isolate one player, then Cait finishes for contract value. Turn Metal economy into armor and upgrades.",
    win: "Force one clean pick, group fast, then convert into bed pressure.",
    bestInto: "Balanced teams, greedy economy teams, and players who overextend.",
    weakness: "If Cait wastes contract windows or Lassy pulls bad targets, pressure drops.",
  },
  {
    name: "Silas / Cait / Lassy / Metal / Noelle",
    tag: "Aura Core",
    tier: "S",
    icon: "✦",
    accentA: "#22d3ee",
    accentB: "#0891b2",
    roles: ["Frontline", "Frontline", "Support", "Economy", "Defender"],
    why: "Silas makes grouped fights stronger while Cait and Lassy create pick pressure. Metal scales and Noelle stops free bed breaks.",
    early: "Silas should stay close to the team. Cait and Lassy look for safe pressure while Metal farms.",
    mid: "Group with Silas aura before full fighting. Lassy sets the pick and Cait punishes it.",
    win: "Win repeated aura fights, then push bed when the enemy is low or split.",
    bestInto: "Teams that stack and take long fights.",
    weakness: "Bad spacing ruins the build because Silas needs the team near him.",
  },
  {
    name: "Warden / Melody / Zeno / Hannah / Fisher",
    tag: "Static Sustain",
    tier: "S",
    icon: "◌",
    accentA: "#67e8f9",
    accentB: "#0ea5e9",
    roles: ["Frontline", "Support", "Support", "Defender", "Economy"],
    why: "Warden plays main jugg while Melody pockets and Zeno chips/static pressures targets so they barely heal. Hannah adds safety and Fisher scales.",
    early: "Do not split. Warden takes space while Melody and Zeno play behind him.",
    mid: "Zeno should static/chip the target Warden is fighting. Melody keeps Warden alive instead of walking in first.",
    win: "Outlast fights, make enemy healing useless, then use gear advantage to close.",
    bestInto: "Teams that rely on healing, resets, or slow grouped fights.",
    weakness: "Fast bed pressure can punish it if Hannah/Fisher are not careful.",
  },
  {
    name: "Davey / Umbra / Smoke / Fisher / Noelle",
    tag: "Bed Pressure",
    tier: "A+",
    icon: "◆",
    accentA: "#93c5fd",
    accentB: "#3b82f6",
    roles: ["Bed Breaker", "Support", "Bed Breaker", "Economy", "Defender"],
    why: "Davey and Smoke give real bed-break threat. Umbra creates space, Fisher scales, and Noelle keeps your own bed alive.",
    early: "Smoke and Davey should not both full send instantly. Scout bed angles while Fisher scales.",
    mid: "Use Umbra to split defenders, then Smoke or Davey hits the bed angle.",
    win: "Break bed off one bad enemy rotation, then finish with the economy lead.",
    bestInto: "Slow teams and defenders who overrotate.",
    weakness: "Needs timing. If bed breakers go in before the fight starts, they feed.",
  },
  {
    name: "Lucia / Umbra / Baker / Whisper / Smoke",
    tag: "Macro Break",
    tier: "A+",
    icon: "✧",
    accentA: "#a78bfa",
    accentB: "#2563eb",
    roles: ["Economy", "Support", "Support", "Support", "Bed Breaker"],
    why: "Lucia gives economy and fight value, Umbra and Whisper give control, Baker gives sustain, and Smoke handles bed pressure.",
    early: "Lucia should get value without dying. Baker and Whisper keep the team stable.",
    mid: "Use Umbra/Whisper utility to force bad enemy positioning. Smoke waits for the bed angle.",
    win: "Use macro and utility to make enemies rotate wrong, then Smoke breaks bed.",
    bestInto: "Messy teams that chase too hard.",
    weakness: "Needs clean calls because it has less raw main-jugg power.",
  },
];

const ROLE_GUIDE = [
  {
    role: "Frontline",
    icon: "⚔",
    job: "Main jugg. Starts fights, takes space, protects support, and creates pressure by winning trades.",
    kits: ["Cait", "Silas", "Warden", "Sheila", "Nyx", "Freya", "Lucia", "Aery", "Eldertree", "Lassy"],
  },
  {
    role: "Support",
    icon: "✚",
    job: "Keeps fights clean with healing, setup, static/chip pressure, peel, or utility.",
    kits: ["Star", "Lassy", "Melody", "Hannah", "Baker", "Whisper", "Umbra", "Lani", "Zeno"],
  },
  {
    role: "Economy",
    icon: "⬡",
    job: "Builds the gear lead so the team does not need to force bad early fights.",
    kits: ["Metal", "Fisher", "Farmer", "Lucia", "Beekeeper"],
  },
  {
    role: "Defender",
    icon: "⬢",
    job: "Protects bed, watches incoming pressure, and stops free breaks.",
    kits: ["Noelle", "Wren", "Baker", "Hannah", "Fisher", "Zola", "Marina"],
  },
  {
    role: "Bed Breaker",
    icon: "◆",
    job: "Finds openings and converts won fights into bed breaks.",
    kits: ["Davey", "Pirate Davey", "Umbra", "Ragnar", "Triton", "Sigrid", "Dino Tamer", "Smoke", "Lani", "Nyx"],
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
    plan: "Do not feed Cait free contract value. Keep economy kits protected and force Cait to fight through your frontline.",
    good: ["Lassy", "Noelle", "Wren", "Silas"],
    avoid: "Long messy fights where Cait keeps getting resets.",
  },
  {
    title: "Against Melody Pocket",
    icon: "♪",
    plan: "Do not trade forever into healing. Burst one target fast, split Melody from the main jugg, or force bed pressure.",
    good: ["Cait", "Lassy", "Zeno", "Davey"],
    avoid: "Standing in front of them and trading forever.",
  },
  {
    title: "Against Smoke / Davey",
    icon: "◆",
    plan: "Track bed breakers at all times. If Smoke or Davey disappears, stop chasing and check bed.",
    good: ["Noelle", "Wren", "Hannah", "Baker"],
    avoid: "Leaving base empty after one won fight.",
  },
];

const TIMING = [
  { time: "0:00–1:30", title: "Open Clean", text: "Get blocks, basic weapon pressure, and early map info. Do not throw your first life." },
  { time: "1:30–3:00", title: "Protect Value", text: "Economy kits need time. Defender watches bed. Main jugg pressures without taking 1v3s." },
  { time: "3:00–6:00", title: "First Real Push", text: "Look for armor, upgrades, and a grouped timing. One good pick should become bed pressure." },
  { time: "6:00–10:00", title: "Convert Advantage", text: "If you have gear lead, stop farming forever. Force a fight and send the bed breaker." },
  { time: "Late Game", title: "Stay Disciplined", text: "Beds gone means every death matters. Stack blocks, pearls, fireballs, and move as a team." },
];

const PRACTICE = [
  { title: "Bridge Pressure", level: "Beginner", text: "Practice crossing, backing off, and baiting hits without falling or wasting blocks." },
  { title: "Bed Defense Reactions", level: "Core Skill", text: "Have one person break in while you practice blocking, countering TNT, and calling the angle." },
  { title: "5v5 Fight Calls", level: "Advanced", text: "Practice calling one target and collapsing together instead of everyone fighting different players." },
];

function getKit(name) {
  return ALL_KITS.find((k) => k.name === name);
}

function getKitsByCategory() {
  const cats = {
    Frontline: [],
    Support: [],
    Economy: [],
    Defender: [],
    "Bed Breaker": [],
    Ranged: [],
  };

  ALL_KITS.forEach((kit) => {
    const mainRole = kit.roles.find((r) => cats[r]) || "Support";
    cats[mainRole].push(kit);
  });

  Object.keys(cats).forEach((k) => cats[k].sort((a, b) => a.name.localeCompare(b.name)));
  return cats;
}

function evaluateDraft(picks) {
  const chosen = picks.map(getKit).filter(Boolean);
  const has = (role) => chosen.some((k) => k.roles.includes(role));
  const hasKit = (name) => picks.includes(name);

  const hasFrontline = has("Frontline");
  const hasSupport = has("Support");
  const hasEconomy = has("Economy");
  const hasDefender = has("Defender");
  const hasBedBreaker = has("Bed Breaker");
  const hasRanged = has("Ranged");

  let score = [hasFrontline, hasSupport, hasEconomy, hasDefender, hasBedBreaker].filter(Boolean).length * 20;
  if (hasRanged && score < 100) score += 5;
  score = Math.min(score, 100);

  const missing = [];
  if (!hasFrontline) missing.push("main jugg/frontline");
  if (!hasSupport) missing.push("support");
  if (!hasEconomy) missing.push("economy");
  if (!hasDefender) missing.push("defender");
  if (!hasBedBreaker) missing.push("bed breaker");

  const syns = [];
  if (hasKit("Cait") && hasKit("Lassy")) syns.push("Cait + Lassy — pull one target, then Cait farms contract value");
  if (hasKit("Silas") && hasKit("Cait")) syns.push("Silas aura amplifies Cait fights");
  if (hasKit("Davey") && hasKit("Umbra")) syns.push("Davey + Umbra — strong bed break openings");
  if (hasKit("Melody") && (hasKit("Warden") || hasKit("Cait") || hasKit("Sheila") || hasKit("Freya"))) syns.push("Melody + main jugg — pocket the carry and make trades impossible");
  if (hasKit("Zeno")) syns.push("Zeno second jugg — ranged/static chip makes enemies barely heal");
  if (hasKit("Lassy")) syns.push("Lassy second jugg — counters bypass and creates pick windows");
  if (hasKit("Smoke")) syns.push("Smoke bed breaker — punishes loose defenders and bypass angles");
  if (hasKit("Metal") || hasKit("Fisher") || hasKit("Farmer") || hasKit("Beekeeper")) syns.push("Economy present — protect it early instead of ego fighting");

  let verdict = "Risky";
  let vt = "Missing important 5v5 structure.";

  if (score >= 100) {
    verdict = "Elite";
    vt = "Balanced build with main jugg, support, economy, bed safety, and a bed break plan.";
  } else if (score >= 80) {
    verdict = "Strong";
    vt = "Good build. One role could still be cleaner.";
  } else if (score >= 60) {
    verdict = "Playable";
    vt = "Can win with careful play around the missing role.";
  }

  return {
    score,
    verdict,
    vt,
    missing,
    syns,
    roles: {
      Frontline: hasFrontline,
      Support: hasSupport,
      Economy: hasEconomy,
      Defender: hasDefender,
      "Bed Breaker": hasBedBreaker,
      Ranged: hasRanged,
    },
  };
}

function analyzeDraftLocal(picks) {
  const chosen = picks.map(getKit).filter(Boolean);
  const hasKit = (name) => picks.includes(name);
  const hasRole = (role) => chosen.some((k) => k.roles.includes(role));

  const hasFrontline = hasRole("Frontline");
  const hasSupport = hasRole("Support");
  const hasEconomy = hasRole("Economy");
  const hasDefender = hasRole("Defender");
  const hasBedBreaker = hasRole("Bed Breaker");
  const hasRanged = hasRole("Ranged");

  let playstyle = "Balanced Core";
  let timing = "Mid";
  let summary =
    "This draft is playable if the team fights grouped and converts wins into bed pressure. The main jugg should create space while support, economy, and defender keep the game stable.";

  const strengths = [];
  const weaknesses = [];
  const tips = [];

  if (hasFrontline) strengths.push("Main jugg/frontline can take space and start real fights.");
  if (hasSupport) strengths.push("Support utility keeps fights cleaner and helps the carry stay alive.");
  if (hasEconomy) strengths.push("Economy gives scaling so you do not need to force bad early fights.");
  if (hasDefender) strengths.push("Defender keeps bed safer while the team rotates and scales.");
  if (hasBedBreaker) strengths.push("Bed breaker gives the team a way to turn a won fight into a bed break.");
  if (hasRanged) strengths.push("Ranged chip helps soften targets before the main jugg commits.");

  if (!hasFrontline) weaknesses.push("Missing a main jugg/frontline, so taking space will be hard.");
  if (!hasSupport) weaknesses.push("Missing support, so the frontline has less sustain or setup.");
  if (!hasEconomy) weaknesses.push("No economy kit means you must win early fights or fall behind.");
  if (!hasDefender) weaknesses.push("No true defender means bypass and bed pressure can punish you.");
  if (!hasBedBreaker) weaknesses.push("No bed breaker means you may win fights but struggle to finish bed.");

  if (hasKit("Cait") && hasKit("Lassy")) {
    playstyle = "Pick Core";
    tips.push("Use Lassy pull to isolate one player, then Cait should finish for contract value.");
  }

  if (hasKit("Davey") && hasKit("Umbra")) {
    playstyle = "Bed Break";
    timing = "Mid";
    tips.push("Umbra should force defenders to split before Davey commits to the bed break.");
  }

  if (hasKit("Warden") && hasKit("Melody")) {
    playstyle = "Sustain Core";
    timing = "Late";
    tips.push("Do not split too far from Melody. Take long grouped fights where healing matters.");
  }

  if (hasKit("Zeno")) {
    playstyle = "Static Control";
    strengths.push("Zeno is a good second-jugg support because ranged static chip makes enemies barely heal or reset.");
    tips.push("Let the main jugg start the fight, then Zeno should static/chip the target so healing gets almost no value.");
  }

  if (hasKit("Lassy")) {
    strengths.push("Lassy is a good second jugg because pull pressure counters bypass and creates free pick windows.");
    tips.push("Save Lassy pull for bypass players, supports, or anyone trying to run from the main jugg.");
  }

  if (hasKit("Melody")) {
    strengths.push("Melody is strong with a main jugg because she can pocket the carry and make enemy trades feel useless.");
    tips.push("Melody should pocket the main jugg from safe spacing instead of walking in first.");
  }

  if (hasKit("Smoke")) {
    playstyle = "Bypass Break";
    strengths.push("Smoke is a bed breaker, not support. Use it to punish loose defenders and bad rotations.");
    tips.push("Smoke should look for bed angles after your frontline pulls attention, not before the fight starts.");
  }

  if (weaknesses.length === 0) {
    weaknesses.push("Main weakness is discipline. Splitting, chasing, or leaving bed open can throw the comp.");
  }

  return {
    playstyle,
    timing,
    summary,
    strengths: [...new Set(strengths)].slice(0, 4),
    weaknesses: [...new Set(weaknesses)].slice(0, 3),
    winCondition:
      "Protect economy/support early, let the main jugg create space, then send the bed breaker the moment one defender is picked or forced away.",
    tip:
      tips[0] ||
      "Fight 2–3 grouped, call one target, and do not chase so far that your defender or economy kit gets picked.",
  };
}

function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="sectionHead">
      <div className="mono eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {sub && <p className="subText">{sub}</p>}
    </div>
  );
}

function ScoreRing({ score }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = circ - (score / 100) * circ;
  const color = score >= 80 ? "#00e5a0" : score >= 60 ? "#ffd93d" : "#ff5566";

  return (
    <div className="scoreRingWrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="8" />
        <circle
          cx="65"
          cy="65"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          transform="rotate(-90 65 65)"
        />
      </svg>
      <div className="scoreRingInner">
        <strong style={{ color }}>{score}</strong>
        <span>/100</span>
      </div>
    </div>
  );
}

function Hero({ setTab }) {
  return (
    <section className="hero">
      <div className="heroBadgeRow">
        <div className="livePill"><span className="liveDot" /> Live Season 16 · 5v5 Meta</div>
        <div className="madeByPill">made by <span className="mono">justcyril</span></div>
      </div>

      <h1 className="heroTitle">
        <span>Build better</span>
        <em>teams.</em>
      </h1>

      <p className="heroSub">
        A glossy BedWars 5v5 hub for builds, drafting, roles, counters, timing, and gamesense.
      </p>

      <div className="heroBtns">
        <button className="btnPrimary" onClick={() => setTab("meta")}>View 5v5 Meta ↗</button>
        <button className="btnGhost" onClick={() => setTab("draft")}>Test Your Draft</button>
      </div>

      <div className="heroStats">
        {[
          ["Format", "5v5"],
          ["Season", "S16"],
          ["Builds", META_BUILDS.length.toString()],
          ["Kits", ALL_KITS.length.toString()],
        ].map(([k, v]) => (
          <div key={k} className="card heroStat">
            <div className="mono label">{k}</div>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuildCard({ build, index }) {
  const [open, setOpen] = useState(false);
  const tierColor = build.tier === "S" ? "#ffd93d" : "#a5f3fc";

  return (
    <article className="card buildCard" style={{ "--delay": `${index * 70}ms` }}>
      <button className="buildTop" onClick={() => setOpen((v) => !v)}>
        <div className="buildIcon" style={{ background: `linear-gradient(135deg, ${build.accentA}, ${build.accentB})` }}>
          {build.icon}
        </div>

        <div className="buildMeta">
          <div className="buildTagRow">
            <span className="mono buildTag" style={{ color: build.accentA }}>{build.tag}</span>
            <span className="tierBadge" style={{ color: tierColor, borderColor: `${tierColor}44`, background: `${tierColor}11` }}>
              {build.tier}
            </span>
          </div>
          <h3 className="buildName">{build.name}</h3>
        </div>

        <div className="expandBtn">{open ? "−" : "+"}</div>
      </button>

      <div className="roleBar">
        {build.roles.map((role, i) => {
          const rc = RC[role];
          return (
            <div key={i} className="roleBarSeg" style={{ background: rc.bg, borderColor: rc.b, color: rc.c }}>
              {role[0]}
            </div>
          );
        })}
      </div>

      <p className="buildWhy">{build.why}</p>

      {open && (
        <div className="buildDetails">
          {[
            ["Early Plan", build.early],
            ["Mid Game", build.mid],
            ["Win Condition", build.win],
            ["Best Into", build.bestInto],
            ["Weakness", build.weakness],
          ].map(([label, text]) => (
            <div key={label} className={`infoBlock${label === "Weakness" ? " danger" : ""}`}>
              <div className="mono label">{label}</div>
              <p>{text}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function MetaSection() {
  const tiers = {
    S: META_BUILDS.filter((b) => b.tier === "S"),
    "A+": META_BUILDS.filter((b) => b.tier === "A+"),
  };

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Top Builds"
        title="Season 16 5v5 Meta"
        sub="Clean team builds with real roles. Expand any card for phase-by-phase breakdowns."
      />

      {Object.entries(tiers).map(([tier, builds]) => (
        <div key={tier} className="tierGroup">
          <div className="tierLabel mono">
            <span className="tierPill">{tier} Tier</span>
          </div>
          <div className="buildGrid">
            {builds.map((b, i) => <BuildCard key={b.name} build={b} index={i} />)}
          </div>
        </div>
      ))}
    </section>
  );
}

function AIAnalysis({ picks }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = () => {
    setLoading(true);
    setResult(null);

    window.setTimeout(() => {
      setResult(analyzeDraftLocal(picks));
      setLoading(false);
    }, 450);
  };

  useEffect(() => {
    setResult(null);
  }, [picks.join("|")]);

  return (
    <div className="card aiPanel">
      <div className="aiHeader">
        <div className="aiGlyph">✦</div>
        <div>
          <div className="mono label">Draft Analysis</div>
          <h3>Strategic Breakdown</h3>
        </div>
      </div>

      {!result && !loading && (
        <button className="analyzeBtn" onClick={analyze}>
          <span>✦</span> Analyze This Draft
        </button>
      )}

      {loading && (
        <div className="aiLoading">
          <div className="loadDots"><span /><span /><span /></div>
          <p>Reading your comp structure…</p>
        </div>
      )}

      {result && !loading && (
        <div className="aiResult">
          <div className="aiMeta">
            <div className="aiBadge playstyleBadge">{result.playstyle}</div>
            <div className="aiBadge timingBadge">Peaks {result.timing}</div>
          </div>

          <p className="aiSummary">{result.summary}</p>

          <div className="aiCols">
            <div>
              <div className="mono label goodLabel">Strengths</div>
              {result.strengths.map((s, i) => <div key={i} className="aiItem good">✓ {s}</div>)}
            </div>

            <div>
              <div className="mono label badLabel">Weaknesses</div>
              {result.weaknesses.map((w, i) => <div key={i} className="aiItem bad">✗ {w}</div>)}
            </div>
          </div>

          <div className="aiWin">
            <div className="mono label">Win Condition</div>
            <p>{result.winCondition}</p>
          </div>

          <div className="aiTip">
            <span className="mono">PRO TIP</span>
            {result.tip}
          </div>

          <button className="reanalyzeBtn" onClick={analyze}>Re-analyze</button>
        </div>
      )}
    </div>
  );
}

function DraftBuilder() {
  const [picks, setPicks] = useState(["Cait", "Lassy", "Star", "Metal", "Noelle"]);
  const [search, setSearch] = useState("");
  const kitCats = useMemo(() => getKitsByCategory(), []);
  const eval_ = useMemo(() => evaluateDraft(picks), [picks]);

  const filteredKits = useMemo(() => {
    if (!search.trim()) return [];
    return ALL_KITS.filter((k) => k.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const updatePick = (i, v) => setPicks((old) => old.map((p, idx) => (idx === i ? v : p)));
  const verdictColor = eval_.score >= 80 ? "#00e5a0" : eval_.score >= 60 ? "#ffd93d" : "#ff5566";

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Draft Builder"
        title="Check your 5v5 team"
        sub="Pick five kits and get instant role coverage plus a draft breakdown that never fails."
      />

      <div className="draftShell">
        <div className="draftLeft">
          <div className="card draftPanel">
            <div className="mono label">Your Team</div>
            <h3 className="draftTeamName">{picks.join(" / ")}</h3>

            <div className="searchWrap">
              <input
                className="kitSearch"
                placeholder="Search kits…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search && (
                <div className="searchResults">
                  {filteredKits.map((kit) => (
                    <button
                      key={kit.name}
                      className="searchResultItem"
                      onClick={() => {
                        const slot = picks.findIndex((p) => !picks.includes(kit.name) && p !== kit.name);
                        updatePick(slot >= 0 ? slot : 0, kit.name);
                        setSearch("");
                      }}
                    >
                      <strong>{kit.name}</strong>
                      <div className="searchRoles">
                        {kit.roles.map((r) => <RoleTag key={r} role={r} />)}
                      </div>
                    </button>
                  ))}

                  {filteredKits.length === 0 && <div className="noResults">No kits found</div>}
                </div>
              )}
            </div>

            <div className="pickGrid">
              {picks.map((pick, i) => {
                const kit = getKit(pick);
                return (
                  <label key={i} className="pickBox">
                    <div className="pickBoxTop">
                      <span className="mono">Slot {i + 1}</span>
                      {kit && <RoleTag role={kit.roles[0]} />}
                    </div>

                    <select value={pick} onChange={(e) => updatePick(i, e.target.value)}>
                      {Object.entries(kitCats).map(([cat, kits]) => (
                        <optgroup key={cat} label={cat}>
                          {kits.map((k) => <option key={k.name} value={k.name}>{k.name}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>

            <div className="draftHint">
              Pro tip: one main jugg, one support, one economy, one defender, and one bed breaker.
            </div>
          </div>

          <AIAnalysis picks={picks} />
        </div>

        <div className="draftRight">
          <div className="card draftResult">
            <ScoreRing score={eval_.score} />

            <div className="verdictLabel mono" style={{ color: verdictColor }}>
              {eval_.verdict}
            </div>

            <p className="verdictText">{eval_.vt}</p>

            <div className="roleCheckGrid">
              {Object.entries(eval_.roles).map(([role, ok]) => (
                <div key={role} className={`roleCheck ${ok ? "ok" : "bad"}`}>
                  <span>{ok ? "✓" : "!"}</span>{role}
                </div>
              ))}
            </div>

            {eval_.missing.length > 0 && (
              <div className="warnBox">
                <strong>Fix:</strong> Add {eval_.missing.join(", ")}.
              </div>
            )}

            {eval_.syns.length > 0 && (
              <div className="synList">
                <div className="mono label">Synergies</div>
                {eval_.syns.map((s) => <div key={s} className="synItem">✦ {s}</div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function KitBrowser() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const roles = ["All", "Frontline", "Support", "Economy", "Defender", "Bed Breaker", "Ranged"];

  const filtered = ALL_KITS.filter((k) => {
    const roleMatch = filter === "All" || k.roles.includes(filter);
    const searchMatch = k.name.toLowerCase().includes(search.toLowerCase());
    return roleMatch && searchMatch;
  });

  return (
    <section className="section">
      <SectionHeader
        eyebrow="Kit Browser"
        title="Every kit in one place"
        sub="Search and filter all kits by real 5v5 role. Pressure role is removed because main jugg creates pressure."
      />

      <div className="browserControls">
        <input
          className="kitSearch wide"
          placeholder="Search kits…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filterRow">
          {roles.map((r) => (
            <button key={r} className={`filterBtn ${filter === r ? "active" : ""}`} onClick={() => setFilter(r)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="kitGrid">
        {filtered.map((kit) => (
          <div key={kit.name} className="card kitCard">
            <div className="kitName">{kit.name}</div>
            <div className="kitRoles">
              {kit.roles.map((r) => <RoleTag key={r} role={r} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RolesSection() {
  return (
    <section className="section">
      <SectionHeader
        eyebrow="Role Guide"
        title="What every slot does"
        sub="Good 5v5 teams need main jugg, support, economy, defender, and bed break threat."
      />

      <div className="roleGrid">
        {ROLE_GUIDE.map((r) => {
          const rc = RC[r.role];
          return (
            <div key={r.role} className="card roleCard" style={{ "--rc": rc.c, "--rb": rc.b }}>
              <div className="roleIconWrap" style={{ background: rc.bg, borderColor: rc.b }}>
                <span style={{ color: rc.c }}>{r.icon}</span>
              </div>
              <h3 style={{ color: rc.c }}>{r.role}</h3>
              <p>{r.job}</p>
              <div className="kitTagList">
                {r.kits.map((k) => <span key={k} className="kitChip">{k}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CountersSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Counters" title="Beat the meta threats" sub="Simple answers for common 5v5 problems." />

      <div className="counterGrid">
        {COUNTERS.map((c) => (
          <div key={c.title} className="card counterCard">
            <div className="counterIconWrap">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.plan}</p>

            <div className="mono label miniLabel">Good Answers</div>
            <div className="kitTagList">
              {c.good.map((k) => <span key={k} className="kitChip">{k}</span>)}
            </div>

            <div className="avoidBox"><strong>Avoid:</strong> {c.avoid}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TimingSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Timing Plan" title="What to do each phase" sub="A mental checklist so your team does not waste windows." />

      <div className="timeline">
        {TIMING.map((item, i) => (
          <div key={item.time} className="timeCard">
            <div className="timeLeft">
              <div className="timeDot" />
              {i < TIMING.length - 1 && <div className="timeLine" />}
            </div>
            <div className="timeBody card">
              <div className="mono timeStamp">{item.time}</div>
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
      <SectionHeader eyebrow="Practice" title="Drills that actually help" sub="Short routines for cleaner movement, better calls, and faster reactions." />

      <div className="practiceGrid">
        {PRACTICE.map((d) => (
          <div key={d.title} className="card practiceCard">
            <div className="mono practiceLevel">{d.level}</div>
            <h3>{d.title}</h3>
            <p>{d.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BottomNav({ tab, setTab }) {
  const tabs = [
    { key: "home", label: "Home", icon: "⌂" },
    { key: "meta", label: "Meta", icon: "◆" },
    { key: "draft", label: "Draft", icon: "◎" },
    { key: "kits", label: "Kits", icon: "⬡" },
    { key: "more", label: "Guide", icon: "⌁" },
  ];

  return (
    <nav className="navShell">
      <div className="bottomNav">
        {tabs.map((t) => (
          <button key={t.key} className={`navItem${tab === t.key ? " active" : ""}`} onClick={() => setTab(t.key)}>
            <span className="navIcon">{t.icon}</span>
            <span className="navLabel">{t.label}</span>
            {tab === t.key && <span className="navDot" />}
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

  const render = () => {
    if (tab === "home") return <><Hero setTab={setTab} /><MetaSection /><DraftBuilder /></>;
    if (tab === "meta") return <MetaSection />;
    if (tab === "draft") return <DraftBuilder />;
    if (tab === "kits") return <><KitBrowser /><RolesSection /></>;
    return <><CountersSection /><TimingSection /><PracticeSection /></>;
  };

  return (
    <div className="app">
      <GlossMouseLayer />
      <style>{CSS}</style>
      {render()}
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --bg: #03060f;
  --s1: #080d1c;
  --s2: #0d1525;
  --border: rgba(255,255,255,.07);
  --border2: rgba(255,255,255,.13);
  --t1: #eef2ff;
  --t2: rgba(200,215,245,.72);
  --t3: rgba(150,170,220,.48);
  --primary: #00c6ff;
  --font-head: 'Barlow Condensed', sans-serif;
  --font-badge: 'Chakra Petch', sans-serif;
  --font-body: 'Barlow', sans-serif;
}

body {
  background: var(--bg);
  color: var(--t1);
  font-family: var(--font-body);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

button, select, input { font-family: var(--font-body); }
button { cursor: pointer; -webkit-tap-highlight-color: transparent; }
.mono { font-family: var(--font-badge); }
.label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: var(--primary);
}

.app {
  min-height: 100vh;
  padding-bottom: 130px;
  background:
    radial-gradient(ellipse 80% 50% at 10% -10%, rgba(0,160,230,.18), transparent),
    radial-gradient(ellipse 60% 40% at 90% 5%, rgba(0,80,200,.14), transparent),
    radial-gradient(ellipse 50% 60% at 50% 110%, rgba(0,100,180,.1), transparent),
    var(--bg);
  position: relative;
}

.app::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: linear-gradient(to bottom, black 0%, transparent 70%);
}

.app > * { position: relative; z-index: 1; }

.glossMouse {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(700px circle at var(--mx) var(--my), rgba(0,198,255,.18), rgba(0,120,220,.09) 30%, transparent 60%);
  mix-blend-mode: screen;
}

.card {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border2);
  background:
    linear-gradient(160deg, rgba(255,255,255,.085), rgba(255,255,255,.02)),
    linear-gradient(180deg, rgba(8,13,28,.9), rgba(8,13,28,.72));
  backdrop-filter: blur(20px) saturate(1.4);
  -webkit-backdrop-filter: blur(20px) saturate(1.4);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.1),
    inset 0 -1px 0 rgba(255,255,255,.03),
    0 20px 60px rgba(0,0,0,.3);
}

.card::after {
  content: "";
  position: absolute;
  inset: -2px;
  pointer-events: none;
  background: radial-gradient(450px circle at var(--cx, 50%) var(--cy, 0%), rgba(255,255,255,.18), rgba(0,198,255,.08) 32%, transparent 55%);
  opacity: 0;
  transition: opacity .18s;
}
.card:hover::after { opacity: 1; }
.card > * { position: relative; z-index: 1; }

.section {
  max-width: 1060px;
  margin: 0 auto;
  padding: 44px 18px;
}

.sectionHead { margin-bottom: 28px; }
.eyebrow { margin-bottom: 6px; color: var(--primary); }
.sectionHead h2 {
  font-family: var(--font-head);
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 900;
  line-height: .95;
  letter-spacing: -.03em;
  background: linear-gradient(160deg, #fff 30%, #a5d8ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subText {
  margin-top: 12px;
  color: var(--t2);
  font-size: 16px;
  line-height: 1.65;
  max-width: 650px;
}

.hero {
  max-width: 1060px;
  margin: 0 auto;
  padding: 80px 18px 48px;
  text-align: center;
}

.heroBadgeRow {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.livePill, .madeByPill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
  border: 1px solid var(--border2);
  background: linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.03));
  backdrop-filter: blur(20px);
}
.livePill { color: var(--primary); font-family: var(--font-badge); text-transform: uppercase; letter-spacing: .06em; font-size: 11px; }
.madeByPill { color: var(--t2); }
.madeByPill span { color: var(--primary); }

.liveDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22d3ee;
  box-shadow: 0 0 12px #22d3ee;
  animation: pulse 1.8s ease-in-out infinite;
}

@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50% { opacity: .45; transform: scale(1.5); }
}

.heroTitle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 1.4vw, 18px);
  font-family: var(--font-head);
  font-size: clamp(56px, 10vw, 118px);
  font-weight: 900;
  letter-spacing: -.045em;
  line-height: .82;
  background: linear-gradient(170deg, #ffffff 0%, #c8e8ff 40%, #7dd3fc 65%, #3b82f6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.heroTitle span,
.heroTitle em {
  display: block;
  line-height: .82;
}

.heroTitle em {
  font-style: italic;
  transform: translateX(8px);
}

.heroSub {
  max-width: 610px;
  margin: 28px auto 0;
  color: var(--t2);
  font-size: 17px;
  line-height: 1.7;
}

.heroBtns {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.btnPrimary, .btnGhost {
  padding: 14px 24px;
  border-radius: 999px;
  font-weight: 900;
  font-size: 15px;
  transition: transform .18s, box-shadow .18s, border-color .18s;
}

.btnPrimary {
  border: none;
  color: #020617;
  background: linear-gradient(180deg, rgba(255,255,255,.97), #bae6fd);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 16px 40px rgba(0,180,255,.28);
}
.btnGhost {
  color: #e0f2fe;
  border: 1px solid var(--border2);
  background: linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.03));
}
.btnPrimary:hover, .btnGhost:hover { transform: translateY(-2px); }

.heroStats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 600px;
  margin: 34px auto 0;
}

.heroStat {
  border-radius: 20px;
  padding: 16px;
  text-align: left;
}
.heroStat strong {
  font-family: var(--font-head);
  font-size: 28px;
  font-weight: 900;
}

.tierGroup { margin-bottom: 30px; }
.tierLabel { margin-bottom: 12px; }
.tierPill {
  display: inline-flex;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(125,211,252,.22);
  background: rgba(125,211,252,.08);
  color: #a5f3fc;
  font-size: 13px;
}

.buildGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.buildCard {
  border-radius: 28px;
  animation: cardIn .4s ease-out var(--delay, 0ms) both;
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.buildTop {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 20px 0;
  text-align: left;
  background: none;
  border: none;
  color: inherit;
}

.buildIcon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 900;
  color: white;
  flex: 0 0 auto;
}

.buildMeta { flex: 1; min-width: 0; }
.buildTagRow { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.buildTag { font-size: 10px; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.tierBadge { padding: 3px 8px; border-radius: 999px; border: 1px solid; font-size: 11px; font-weight: 800; }
.buildName { font-family: var(--font-head); font-size: 18px; font-weight: 900; letter-spacing: -.02em; }

.expandBtn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,.08);
  color: var(--t2);
  font-size: 20px;
}

.roleBar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px 20px 0;
}

.roleBarSeg {
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid;
  font-family: var(--font-badge);
  font-size: 10px;
  font-weight: 800;
}

.buildWhy {
  padding: 12px 20px 18px;
  color: var(--t2);
  font-size: 14px;
  line-height: 1.7;
}

.buildDetails {
  display: grid;
  gap: 8px;
  padding: 0 20px 20px;
}

.infoBlock {
  border-radius: 16px;
  padding: 12px 14px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
}
.infoBlock p {
  color: var(--t2);
  font-size: 13.5px;
  line-height: 1.65;
}
.infoBlock.danger { border-color: rgba(255,85,102,.15); }

.draftShell {
  display: grid;
  grid-template-columns: 1.35fr minmax(280px, .65fr);
  gap: 16px;
  align-items: start;
}
.draftLeft { display: grid; gap: 16px; }
.draftRight { position: sticky; top: 18px; }

.draftPanel, .aiPanel, .draftResult { border-radius: 28px; padding: 22px; }
.draftTeamName {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -.03em;
  margin: 4px 0 14px;
}

.searchWrap { position: relative; margin-bottom: 14px; }
.kitSearch {
  width: 100%;
  padding: 11px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.06);
  border: 1px solid var(--border2);
  color: var(--t1);
  font-size: 14px;
  outline: none;
}
.kitSearch.wide { max-width: 360px; }
.kitSearch::placeholder { color: var(--t3); }
.kitSearch:focus { border-color: rgba(0,198,255,.4); }

.searchResults {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 20;
  max-height: 260px;
  overflow-y: auto;
  background: #0d1525;
  border: 1px solid var(--border2);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0,0,0,.5);
}

.searchResultItem {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  border: none;
  border-bottom: 1px solid var(--border);
  background: #0d1525;
  color: var(--t1);
}
.searchResultItem:hover { background: rgba(0,198,255,.08); }
.searchRoles { display: flex; gap: 5px; flex-wrap: wrap; }
.noResults { padding: 14px; color: var(--t3); }

.pickGrid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.pickBox {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 16px;
  padding: 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
}

.pickBoxTop {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pickBoxTop .mono {
  font-size: 11px;
  color: var(--t3);
}

select {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  background: #08111f;
  border: 1px solid var(--border2);
  color: var(--t1);
  font-size: 14px;
  font-weight: 700;
  outline: none;
}
optgroup, option { background: #0f172a; color: var(--t1); }

.draftHint {
  margin-top: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
  color: var(--t3);
  font-size: 13px;
  line-height: 1.6;
}

.aiHeader {
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 18px;
}
.aiHeader h3 { margin: 4px 0 0; font-size: 18px; }
.aiGlyph {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 20px;
  background: linear-gradient(135deg, rgba(0,198,255,.22), rgba(0,100,200,.15));
  border: 1px solid rgba(0,198,255,.25);
  color: var(--primary);
}

.analyzeBtn {
  width: 100%;
  padding: 14px;
  border-radius: 16px;
  border: 1px solid rgba(0,198,255,.3);
  background: linear-gradient(135deg, rgba(0,198,255,.15), rgba(0,100,200,.1));
  color: var(--primary);
  font-weight: 900;
  font-size: 15px;
}

.aiLoading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px 0;
}
.loadDots { display: flex; gap: 6px; }
.loadDots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary);
  animation: dotBounce 1.2s ease-in-out infinite;
}
.loadDots span:nth-child(2) { animation-delay: .2s; }
.loadDots span:nth-child(3) { animation-delay: .4s; }
@keyframes dotBounce {
  0%,80%,100% { transform: scale(.8); opacity: .5; }
  40% { transform: scale(1.2); opacity: 1; }
}

.aiLoading p { color: var(--t2); }
.aiResult { display: grid; gap: 14px; }
.aiMeta { display: flex; gap: 8px; flex-wrap: wrap; }
.aiBadge {
  padding: 6px 12px;
  border-radius: 999px;
  font-family: var(--font-badge);
  font-size: 12px;
  font-weight: 800;
}
.playstyleBadge { background: rgba(0,198,255,.1); border: 1px solid rgba(0,198,255,.25); color: var(--primary); }
.timingBadge { background: rgba(255,202,40,.1); border: 1px solid rgba(255,202,40,.22); color: #ffd93d; }
.aiSummary { color: var(--t2); font-size: 14px; line-height: 1.7; }

.aiCols {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.goodLabel { color: #00e5a0; }
.badLabel { color: #ff5566; }
.aiItem {
  padding: 8px 10px;
  border-radius: 11px;
  font-size: 13px;
  line-height: 1.5;
  margin-top: 6px;
}
.aiItem.good { background: rgba(0,229,160,.07); border: 1px solid rgba(0,229,160,.15); color: #86efac; }
.aiItem.bad { background: rgba(255,85,102,.07); border: 1px solid rgba(255,85,102,.15); color: #fca5a5; }

.aiWin {
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(255,255,255,.04);
  border: 1px solid var(--border);
}
.aiWin p { color: var(--t2); font-size: 13.5px; line-height: 1.6; }

.aiTip {
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(0,198,255,.07);
  border: 1px solid rgba(0,198,255,.16);
  color: var(--t1);
  font-size: 13.5px;
  line-height: 1.6;
}
.aiTip span {
  display: block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .12em;
  color: var(--primary);
  margin-bottom: 5px;
}

.reanalyzeBtn {
  padding: 10px 16px;
  border-radius: 12px;
  border: 1px solid var(--border2);
  background: rgba(255,255,255,.05);
  color: var(--t2);
  font-size: 13px;
  font-weight: 800;
}

.scoreRingWrap {
  position: relative;
  width: 130px;
  height: 130px;
  margin-bottom: 14px;
}
.scoreRingWrap svg circle:last-child { transition: stroke-dashoffset 1s cubic-bezier(.4,0,.2,1), stroke .4s; }
.scoreRingInner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.scoreRingInner strong {
  font-family: var(--font-head);
  font-size: 36px;
  font-weight: 900;
}
.scoreRingInner span {
  font-size: 12px;
  color: var(--t3);
  margin-top: -8px;
}

.verdictLabel {
  font-family: var(--font-head);
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -.04em;
}
.verdictText {
  color: var(--t2);
  font-size: 14px;
  margin-top: 4px;
}

.roleCheckGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
  margin-top: 16px;
  width: 100%;
}
.roleCheck {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
}
.roleCheck span {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 11px;
}
.roleCheck.ok { color: #67e8f9; background: rgba(34,211,238,.08); border: 1px solid rgba(103,232,249,.15); }
.roleCheck.bad { color: #93c5fd; background: rgba(59,130,246,.08); border: 1px solid rgba(147,197,253,.15); }

.warnBox {
  margin-top: 12px;
  padding: 11px 13px;
  border-radius: 14px;
  background: rgba(37,99,235,.1);
  border: 1px solid rgba(147,197,253,.16);
  color: #bfdbfe;
  font-size: 13px;
  line-height: 1.55;
}

.synList { margin-top: 14px; width: 100%; }
.synItem {
  padding: 9px 11px;
  border-radius: 12px;
  background: rgba(0,229,160,.07);
  border: 1px solid rgba(0,229,160,.14);
  color: #86efac;
  font-size: 12.5px;
  margin-top: 6px;
}

.browserControls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}
.filterRow { display: flex; flex-wrap: wrap; gap: 8px; }
.filterBtn {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--border2);
  background: rgba(255,255,255,.04);
  color: var(--t2);
  font-size: 13px;
  font-weight: 800;
}
.filterBtn:hover, .filterBtn.active {
  border-color: rgba(0,198,255,.3);
  background: rgba(0,198,255,.1);
  color: var(--t1);
}

.kitGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 10px;
}
.kitCard {
  border-radius: 20px;
  padding: 16px;
}
.kitName {
  font-family: var(--font-head);
  font-size: 19px;
  font-weight: 900;
  margin-bottom: 10px;
}
.kitRoles, .kitTagList {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.roleTag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-family: var(--font-badge);
  font-size: 10px;
  font-weight: 800;
  border: 1px solid;
}

.roleGrid, .counterGrid, .practiceGrid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.roleCard, .counterCard, .practiceCard {
  border-radius: 26px;
  padding: 22px;
}
.roleIconWrap, .counterIconWrap {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  font-size: 22px;
  margin-bottom: 14px;
  border: 1px solid;
}
.roleCard h3, .counterCard h3, .practiceCard h3 {
  font-family: var(--font-head);
  font-size: 22px;
  font-weight: 900;
  margin-bottom: 8px;
}
.roleCard p, .counterCard p, .practiceCard p {
  color: var(--t2);
  font-size: 14px;
  line-height: 1.65;
}
.kitChip {
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.07);
  border: 1px solid var(--border2);
  color: #bae6fd;
  font-size: 12px;
  font-weight: 800;
}
.counterIconWrap {
  background: rgba(255,85,102,.1);
  border-color: rgba(255,85,102,.22);
  color: #fca5a5;
}
.miniLabel { margin-top: 14px; margin-bottom: 8px; }
.avoidBox {
  margin-top: 14px;
  padding: 10px 12px;
  border-radius: 13px;
  background: rgba(255,85,102,.07);
  border: 1px solid rgba(255,85,102,.15);
  color: #fca5a5;
  font-size: 13px;
}

.timeline { display: grid; gap: 4px; }
.timeCard {
  display: grid;
  grid-template-columns: 44px 1fr;
}
.timeLeft {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}
.timeDot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 12px var(--primary);
}
.timeLine {
  width: 2px;
  flex: 1;
  min-height: 20px;
  background: linear-gradient(to bottom, rgba(255,255,255,.12), rgba(255,255,255,.04));
  margin-top: 4px;
}
.timeBody {
  margin: 8px 0;
  padding: 16px 18px;
  border-radius: 18px;
}
.timeStamp {
  color: var(--primary);
  font-size: 11px;
  font-weight: 800;
  margin-bottom: 5px;
}
.timeBody h3 {
  font-family: var(--font-head);
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 5px;
}
.timeBody p {
  color: var(--t2);
  font-size: 14px;
  line-height: 1.62;
}

.practiceLevel {
  color: #ffd93d;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-bottom: 10px;
}

.navShell {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  width: min(700px, calc(100% - 24px));
  z-index: 30;
  padding: 1.5px;
  border-radius: 32px;
  background: linear-gradient(135deg, rgba(255,255,255,.28), rgba(0,198,255,.12), rgba(255,255,255,.06));
  box-shadow: 0 24px 80px rgba(0,0,0,.55);
}
.bottomNav {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  padding: 8px;
  border-radius: 31px;
  background:
    radial-gradient(circle at 50% -30%, rgba(255,255,255,.15), transparent 45%),
    linear-gradient(180deg, rgba(8,13,28,.82), rgba(3,6,15,.9));
  border: 1px solid rgba(255,255,255,.1);
  backdrop-filter: blur(32px) saturate(1.6);
}
.navItem {
  border: none;
  background: transparent;
  color: rgba(200,215,245,.45);
  border-radius: 22px;
  padding: 9px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  position: relative;
}
.navIcon { font-size: 18px; }
.navLabel {
  font-size: 10.5px;
  font-weight: 900;
  font-family: var(--font-badge);
}
.navDot {
  position: absolute;
  bottom: 5px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
}
.navItem.active {
  color: #e0f2fe;
  background: linear-gradient(180deg, rgba(0,198,255,.22), rgba(0,80,200,.18));
  box-shadow: inset 0 1px 0 rgba(255,255,255,.15), 0 10px 26px rgba(0,100,220,.22);
}

@media (max-width: 860px) {
  .buildGrid, .draftShell, .roleGrid, .counterGrid, .practiceGrid { grid-template-columns: 1fr; }
  .draftRight { position: static; }
  .heroStats { grid-template-columns: repeat(2, 1fr); }
  .hero { padding-top: 56px; }
  .aiCols { grid-template-columns: 1fr; }
}

@media (max-width: 560px) {
  .heroTitle { font-size: 56px; gap: 14px; }
  .heroSub { font-size: 15px; margin-top: 24px; }
  .pickGrid { grid-template-columns: 1fr; }
  .kitGrid { grid-template-columns: repeat(2, 1fr); }
  .navLabel { font-size: 9px; }
  .tierBadge { display: none; }
}
`;

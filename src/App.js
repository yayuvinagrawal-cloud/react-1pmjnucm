import { useEffect, useMemo, useState, useRef, useCallback } from "react";

// ─── FONTS ────────────────────────────────────────────────────────────────────
function useFonts() {
  useEffect(() => {
    const id = "bw-fonts-v3";
    if (!document.getElementById(id)) {
      const l = document.createElement("link");
      l.id = id; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Chakra+Petch:ital,wght@0,400;0,600;0,700;1,600&family=Barlow:wght@400;500;600;700;800&family=Barlow+Condensed:wght@700;800;900&family=Fira+Code:wght@500;600&display=swap";
      document.head.appendChild(l);
    }
  }, []);
}

// ─── MOUSE GLOSS ─────────────────────────────────────────────────────────────
function GlossMouseLayer() {
  const [pos, setPos] = useState({ x: 50, y: 18 });
  useEffect(() => {
    const fn = (e) => setPos({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("pointermove", fn, { passive: true });
    return () => window.removeEventListener("pointermove", fn);
  }, []);
  return <div className="glossMouse" style={{ "--mx": `${pos.x}%`, "--my": `${pos.y}%` }} />;
}

function useCardGloss() {
  useEffect(() => {
    const fn = (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--cx", `${e.clientX - r.left}px`);
      card.style.setProperty("--cy", `${e.clientY - r.top}px`);
    };
    window.addEventListener("pointermove", fn, { passive: true });
    return () => window.removeEventListener("pointermove", fn);
  }, []);
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let v = 0; const step = target / 60;
    const t = setInterval(() => { v += step; if (v >= target) { setVal(target); clearInterval(t); } else setVal(Math.floor(v)); }, 16);
    return () => clearInterval(t);
  }, [target]);
  return <>{val}{suffix}</>;
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────
function ScoreRing({ score }) {
  const r = 52; const circ = 2 * Math.PI * r;
  const dash = circ - (score / 100) * circ;
  const color = score >= 80 ? "#00e5a0" : score >= 60 ? "#ffd93d" : "#ff5566";
  return (
    <div className="scoreRingWrap">
      <svg width="130" height="130" viewBox="0 0 130 130">
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
        <circle cx="65" cy="65" r={r} fill="none" stroke={color} strokeWidth="8"
          strokeDasharray={circ} strokeDashoffset={dash}
          strokeLinecap="round" transform="rotate(-90 65 65)"
          style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1), stroke 0.4s" }} />
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </svg>
      <div className="scoreRingInner">
        <strong style={{ color }}>{score}</strong>
        <span>/100</span>
      </div>
    </div>
  );
}

// ─── ROLE COLORS ─────────────────────────────────────────────────────────────
const RC = {
  Frontline:    { c: "#ff7043", bg: "rgba(255,112,67,.13)", b: "rgba(255,112,67,.25)" },
  Support:      { c: "#26d0ce", bg: "rgba(38,208,206,.13)", b: "rgba(38,208,206,.25)" },
  Economy:      { c: "#ffca28", bg: "rgba(255,202,40,.13)", b: "rgba(255,202,40,.25)" },
  Defender:     { c: "#42a5f5", bg: "rgba(66,165,245,.13)", b: "rgba(66,165,245,.25)" },
  "Bed Breaker":{ c: "#ce93d8", bg: "rgba(206,147,216,.13)", b: "rgba(206,147,216,.25)" },
  Ranged:       { c: "#f48fb1", bg: "rgba(244,143,177,.13)", b: "rgba(244,143,177,.25)" },
  Pressure:     { c: "#ffb74d", bg: "rgba(255,183,77,.13)", b: "rgba(255,183,77,.25)" },
};

function RoleTag({ role }) {
  const r = RC[role] || { c: "#94a3b8", bg: "rgba(148,163,184,.1)", b: "rgba(148,163,184,.2)" };
  return <span className="roleTag" style={{ color: r.c, background: r.bg, borderColor: r.b }}>{role}</span>;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const META_BUILDS = [
  {
    name: "Cait / Lassy / Star / Metal / Noelle",
    tag: "Most Reliable", tier: "S", icon: "◎", accentA: "#38bdf8", accentB: "#2563eb",
    roles: ["Frontline", "Support", "Support", "Economy", "Defender"],
    why: "This build has pressure, setup, economy, sustain, and base control. Cait gets clean contract value, Lassy creates pick windows, Star keeps fights stable, Metal scales the team, and Noelle protects the bed.",
    early: "Cait and Lassy pressure together without taking random solo deaths. Metal farms value. Noelle stays disciplined and calls incoming pressure early.",
    mid: "Use Lassy to force one target out of position, then let Cait finish or secure contract value. Turn Metal economy into armor, upgrades, and clean grouped pressure.",
    win: "Group when you have gear advantage, force one pick, then convert instantly into bed pressure.",
    bestInto: "Balanced teams, greedy economy teams, and players who overextend.",
    weakness: "If Cait wastes contracts or Lassy misses setup windows, pressure drops fast.",
  },
  {
    name: "Cait / Cait / Metal / Noelle / Star",
    tag: "Contract Pressure", tier: "S", icon: "◇", accentA: "#60a5fa", accentB: "#1d4ed8",
    roles: ["Frontline", "Frontline", "Economy", "Defender", "Support"],
    why: "Double Cait creates constant contract pressure. One Cait can pressure the front while the other punishes weak targets. Metal gives scaling, Star gives sustain, and Noelle keeps bed safe.",
    early: "Both Cait players should avoid random solo fights. Pick smart targets, pressure with teammates, and let Metal quietly stack resources.",
    mid: "Rotate pressure between two contract targets. If one target escapes, the other Cait should still be creating value somewhere else.",
    win: "Once Cait value is built up, force grouped fights and snowball kills into bed pressure.",
    bestInto: "Teams with weak peel, exposed economy kits, or messy positioning.",
    weakness: "Needs smart Cait players. If both Caits chase bad fights, the build feels useless.",
  },
  {
    name: "Silas / Cait / Lassy / Metal / Noelle",
    tag: "Aura Core", tier: "S", icon: "✦", accentA: "#22d3ee", accentB: "#0891b2",
    roles: ["Frontline", "Frontline", "Support", "Economy", "Defender"],
    why: "Silas makes every team fight stronger while Cait and Lassy create pick pressure. Metal handles economy, and Noelle keeps the team from losing bed for free.",
    early: "Silas should stay near the team instead of playing alone. Cait and Lassy look for safe pressure while Metal gets value.",
    mid: "Before a full fight, group with Silas so the aura actually matters. Lassy pulls a target, Cait pressures, and everyone collapses together.",
    win: "Win repeated fights with the aura advantage, then push bed when the enemy team is low or split.",
    bestInto: "Teams that like long fights or stack together.",
    weakness: "Bad spacing ruins the build. Silas has to be near the team to matter.",
  },
  {
    name: "Warden / Melody / Melody / Hannah / Fisher",
    tag: "Sustain Wall", tier: "A+", icon: "◌", accentA: "#67e8f9", accentB: "#0ea5e9",
    roles: ["Frontline", "Support", "Support", "Defender", "Economy"],
    why: "This build is built to survive. Warden holds the front, double Melody keeps the team alive, Hannah adds utility, and Fisher scales the economy.",
    early: "Do not force pointless solo plays. Stay close enough that Melody healing matters and let Fisher build value.",
    mid: "Take grouped fights when the team is ready. The goal is to outlast, not instantly burst everyone.",
    win: "Drag fights out, stack gear, and slowly crush teams that cannot break through the healing.",
    bestInto: "Aggressive teams that keep running into grouped fights.",
    weakness: "Fast bed pressure can punish it before the sustain becomes annoying.",
  },
  {
    name: "Davey / Umbra / Umbra / Fisher / Fisher",
    tag: "Bed Pressure", tier: "A+", icon: "✧", accentA: "#93c5fd", accentB: "#3b82f6",
    roles: ["Bed Breaker", "Bed Breaker", "Support", "Economy", "Economy"],
    why: "This build is made to create openings. Double Umbra controls space, double Fisher scales, and Davey waits for the right bed break timing.",
    early: "Fisher players should scale safely. Umbra players hold pressure without wasting their main engage tools. Davey scouts bed angles.",
    mid: "Use Umbra pressure to split defenders. When the enemy rotates badly, Davey goes in immediately.",
    win: "Get one clean opening, break the bed, then use the economy lead to finish the game.",
    bestInto: "Slow defensive teams that overprotect one lane.",
    weakness: "If Davey gets tracked or the team has no counter-pressure, the build can stall.",
  },
];

const ALL_KITS = [
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
  { role: "Frontline", icon: "⚔", job: "Starts fights, takes space, and protects the support players.", kits: ["Cait", "Silas", "Warden", "Sheila", "Nyx", "Freya", "Lucia", "Eldertree"] },
  { role: "Support", icon: "✚", job: "Keeps fights clean with healing, setup, peel, or utility.", kits: ["Star", "Lassy", "Melody", "Hannah", "Baker", "Whisper", "Umbra", "Lani"] },
  { role: "Economy", icon: "⬡", job: "Builds the gear lead so the team can win later fights.", kits: ["Metal", "Fisher", "Farmer", "Lucia", "Beekeeper"] },
  { role: "Defender", icon: "⬢", job: "Protects bed, watches incoming pressure, and prevents free breaks.", kits: ["Noelle", "Wren", "Baker", "Hannah", "Fisher", "Zola", "Marina"] },
  { role: "Bed Breaker", icon: "◆", job: "Finds openings and turns pressure into bed breaks.", kits: ["Davey", "Pirate Davey", "Umbra", "Ragnar", "Triton", "Sigrid", "Dino Tamer"] },
  { role: "Ranged", icon: "⌁", job: "Chips teams before fights and controls bridges from distance.", kits: ["Archer", "Uma", "Umeko", "Whim", "Zeno"] },
];

const COUNTERS = [
  { title: "Against Cait Pressure", icon: "☠", plan: "Do not feed Cait free contract value. Keep economy kits protected, force Cait to fight through your frontline, and punish her when she overextends.", good: ["Lassy", "Noelle", "Wren", "Silas"], avoid: "Long messy fights where Cait keeps getting resets." },
  { title: "Against Double Melody", icon: "♪", plan: "Do not take slow fights into stacked healing. Split their formation, burst one target fast, and pressure bed so they cannot sit grouped forever.", good: ["Cait", "Archer", "Lassy", "Davey"], avoid: "Standing in front of them and trading forever." },
  { title: "Against Umbra Bed Pressure", icon: "◈", plan: "Track Umbra engages and keep a defender ready. If Davey is missing, assume bed pressure is coming and stop chasing random fights.", good: ["Noelle", "Wren", "Hannah", "Baker"], avoid: "Leaving base empty after winning one fight." },
];

const TIMING = [
  { time: "0:00–1:30", title: "Open Clean", text: "Get blocks, basic weapon pressure, and early map info. Do not throw your first life for nothing." },
  { time: "1:30–3:00", title: "Protect Value", text: "Economy kits need time. Defender watches bed. Frontline should pressure without taking stupid 1v3s." },
  { time: "3:00–6:00", title: "First Real Push", text: "Look for armor, upgrades, and a grouped timing. One good pick should become bed pressure." },
  { time: "6:00–10:00", title: "Convert Advantage", text: "If you have gear lead, stop farming and start forcing fights. If behind, defend and look for a punish." },
  { time: "Late Game", title: "Stay Disciplined", text: "Beds gone means every death matters. Stack blocks, telepearls, fireballs, and move as a team." },
];

const PRACTICE = [
  { title: "Bridge Pressure", level: "Beginner", text: "Practice crossing, backing off, and baiting hits without falling or wasting blocks." },
  { title: "Bed Defense Reactions", level: "Core Skill", text: "Have one person break in while you practice blocking, countering TNT, and calling the angle." },
  { title: "5v5 Fight Calls", level: "Advanced", text: "Practice calling one target and collapsing together instead of everyone fighting different players." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function getKit(name) { return ALL_KITS.find(k => k.name === name); }

function getKitsByCategory() {
  const cats = { Frontline: [], Support: [], Economy: [], Defender: [], "Bed Breaker": [], Ranged: [], Pressure: [] };
  const seen = new Set();
  ALL_KITS.forEach(kit => {
    if (seen.has(kit.name)) return; seen.add(kit.name);
    const r = kit.roles.find(ro => cats[ro]) || "Pressure";
    cats[r].push(kit);
  });
  Object.keys(cats).forEach(k => cats[k].sort((a, b) => a.name.localeCompare(b.name)));
  return cats;
}

function evaluateDraft(picks) {
  const chosen = picks.map(getKit).filter(Boolean);
  const has = (role) => chosen.some(k => k.roles.includes(role));
  const hasFrontline = has("Frontline"); const hasSupport = has("Support");
  const hasEconomy = has("Economy"); const hasDefender = has("Defender");
  const hasPressure = has("Bed Breaker") || has("Pressure") || has("Ranged");
  let score = [hasFrontline, hasSupport, hasEconomy, hasDefender, hasPressure].filter(Boolean).length * 20;
  const missing = [];
  if (!hasFrontline) missing.push("frontline"); if (!hasSupport) missing.push("support");
  if (!hasEconomy) missing.push("economy"); if (!hasDefender) missing.push("defender");
  if (!hasPressure) missing.push("bed pressure");
  const syns = [];
  if (picks.includes("Cait") && picks.includes("Lassy")) syns.push("Cait + Lassy — clean pick pressure window");
  if (picks.includes("Silas") && picks.includes("Cait")) syns.push("Silas aura amplifies Cait fights");
  if (picks.includes("Davey") && picks.includes("Umbra")) syns.push("Davey + Umbra — strong bed break openings");
  if (picks.includes("Melody") && picks.includes("Warden")) syns.push("Warden + Melody — long-fight sustain core");
  if (picks.includes("Metal") || picks.includes("Fisher")) syns.push("Economy present — protect it early");
  let verdict = "Risky"; let vt = "Missing important 5v5 structure.";
  if (score >= 100) { verdict = "Elite"; vt = "Balanced build with pressure, scaling, and defense."; }
  else if (score >= 80) { verdict = "Strong"; vt = "Good build — one role could still be cleaner."; }
  else if (score >= 60) { verdict = "Playable"; vt = "Can win with careful play around the gap."; }
  return { score, verdict, vt, missing, syns, roles: { Frontline: hasFrontline, Support: hasSupport, Economy: hasEconomy, Defender: hasDefender, Pressure: hasPressure } };
}

// ─── AI ANALYSIS ─────────────────────────────────────────────────────────────
function AIAnalysis({ picks }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const analyze = async () => {
    setLoading(true); setErr(null); setResult(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: `You are a BedWars 5v5 competitive analyst. Analyze this team: ${picks.join(", ")}.

Return ONLY valid JSON, no markdown, no extra text:
{"playstyle":"2-3 word label","timing":"Early / Mid / Late","summary":"2 sentences on this team's gameplan","strengths":["s1","s2","s3"],"weaknesses":["w1","w2"],"winCondition":"one sentence","tip":"one specific tactical pro tip"}` }]
        })
      });
      const d = await res.json();
      const raw = d.content[0]?.text || "";
      setResult(JSON.parse(raw.replace(/```json|```/g, "").trim()));
    } catch { setErr("Analysis failed — try again."); }
    setLoading(false);
  };

  return (
    <div className="card aiPanel">
      <div className="aiHeader">
        <div className="aiGlyph">✦</div>
        <div>
          <div className="mono label">Claude AI Analysis</div>
          <h3 style={{ margin: "4px 0 0", fontSize: 18 }}>Strategic Breakdown</h3>
        </div>
      </div>

      {!result && !loading && !err && (
        <button className="analyzeBtn" onClick={analyze}>
          <span>✦</span> Analyze This Draft
        </button>
      )}

      {loading && (
        <div className="aiLoading">
          <div className="loadDots"><span /><span /><span /></div>
          <p>Analyzing your composition…</p>
        </div>
      )}

      {err && (
        <div className="errBox">
          <span>⚠</span> {err}
          <button onClick={analyze} style={{ marginLeft: 10, background: "none", border: "none", color: "#f48fb1", cursor: "pointer", fontWeight: 700 }}>Retry</button>
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
              <div className="mono label" style={{ color: "#00e5a0" }}>Strengths</div>
              {result.strengths?.map((s, i) => <div key={i} className="aiItem good">✓ {s}</div>)}
            </div>
            <div>
              <div className="mono label" style={{ color: "#ff5566" }}>Weaknesses</div>
              {result.weaknesses?.map((w, i) => <div key={i} className="aiItem bad">✗ {w}</div>)}
            </div>
          </div>
          <div className="aiWin">
            <div className="mono label">Win Condition</div>
            <p>{result.winCondition}</p>
          </div>
          <div className="aiTip"><span className="mono">PRO TIP</span>{result.tip}</div>
          <button className="reanalyzeBtn" onClick={analyze}>Re-analyze</button>
        </div>
      )}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title, sub }) {
  return (
    <div className="sectionHead">
      <div className="mono eyebrow">{eyebrow}</div>
      <h2>{title}</h2>
      {sub && <p className="subText">{sub}</p>}
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero({ setTab }) {
  return (
    <section className="hero">
      <div className="heroBadgeRow">
        <div className="livePill"><span className="liveDot" /> Live Season 16 · 5v5 Meta</div>
        <div className="madeByPill">made by <span className="mono">justcyril</span></div>
      </div>
      <h1 className="heroTitle">Build better<br /><em>teams.</em></h1>
      <p className="heroSub">A premium BedWars 5v5 hub for builds, drafting, roles, counters, timing, and strategy. Season 16 meta.</p>
      <div className="heroBtns">
        <button className="btnPrimary" onClick={() => setTab("meta")}>View 5v5 Meta ↗</button>
        <button className="btnGhost" onClick={() => setTab("draft")}>Test Your Draft</button>
      </div>
      <div className="heroStats">
        {[["Format","5v5"],["Season","S16"],["Builds","5"],["Kits",ALL_KITS.length.toString()]].map(([k,v]) => (
          <div key={k} className="card heroStat">
            <div className="mono label">{k}</div>
            <strong>{v}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── BUILD CARD ───────────────────────────────────────────────────────────────
function BuildCard({ build, index }) {
  const [open, setOpen] = useState(false);
  const tierColor = build.tier === "S" ? "#ffd93d" : "#a5f3fc";
  const roleCounts = {};
  build.roles.forEach(r => { roleCounts[r] = (roleCounts[r] || 0) + 1; });

  return (
    <article className="card buildCard" style={{ "--delay": `${index * 80}ms` }}>
      <button className="buildTop" onClick={() => setOpen(v => !v)}>
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
          const rc = RC[role] || { c: "#666", bg: "rgba(100,100,100,.15)", b: "rgba(100,100,100,.2)" };
          return <div key={i} className="roleBarSeg" style={{ background: rc.bg, borderColor: rc.b, color: rc.c }}>{role[0]}</div>;
        })}
      </div>

      <p className="buildWhy">{build.why}</p>

      {open && (
        <div className="buildDetails">
          {[["Early Plan", build.early, false], ["Mid Game", build.mid, false], ["Win Condition", build.win, false], ["Best Into", build.bestInto, false], ["Weakness", build.weakness, true]].map(([l, t, d]) => (
            <div key={l} className={`infoBlock${d ? " danger" : ""}`}>
              <div className="mono label" style={{ color: d ? "#f48fb1" : "#7dd3fc" }}>{l}</div>
              <p>{t}</p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

// ─── META SECTION ─────────────────────────────────────────────────────────────
function MetaSection() {
  const tiers = { S: META_BUILDS.filter(b => b.tier === "S"), "A+": META_BUILDS.filter(b => b.tier === "A+") };
  return (
    <section className="section">
      <SectionHeader eyebrow="Top Builds" title="Season 16 5v5 Meta" sub="Clean team builds with a real plan. Expand any card for phase-by-phase breakdowns." />
      {Object.entries(tiers).map(([tier, builds]) => (
        <div key={tier} className="tierGroup">
          <div className="tierLabel mono" style={{ color: tier === "S" ? "#ffd93d" : "#a5f3fc" }}>
            <span className="tierPill" style={{ background: tier === "S" ? "rgba(255,217,61,.12)" : "rgba(165,243,252,.1)", borderColor: tier === "S" ? "rgba(255,217,61,.25)" : "rgba(165,243,252,.2)" }}>
              {tier} Tier
            </span>
          </div>
          <div className="buildGrid">
            {builds.map((b, i) => <BuildCard key={b.name} build={b} index={i} />)}
          </div>
        </div>
      ))}
    </section>
  );
}

// ─── DRAFT BUILDER ────────────────────────────────────────────────────────────
function DraftBuilder() {
  const [picks, setPicks] = useState(["Cait", "Lassy", "Star", "Metal", "Noelle"]);
  const [search, setSearch] = useState("");
  const kitCats = useMemo(() => getKitsByCategory(), []);
  const eval_ = useMemo(() => evaluateDraft(picks), [picks]);

  const filteredKits = useMemo(() => {
    if (!search) return null;
    return ALL_KITS.filter(k => k.name.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  const updatePick = (i, v) => setPicks(old => old.map((p, idx) => idx === i ? v : p));

  const verdictColor = eval_.score >= 80 ? "#00e5a0" : eval_.score >= 60 ? "#ffd93d" : "#ff5566";

  return (
    <section className="section">
      <SectionHeader eyebrow="Draft Builder" title="Check your 5v5 team" sub="Pick five kits and get instant role coverage + AI-powered strategic analysis." />
      <div className="draftShell">
        <div className="draftLeft">
          <div className="card draftPanel">
            <div className="mono label" style={{ marginBottom: 4 }}>Your Team</div>
            <h3 className="draftTeamName">{picks.join(" / ")}</h3>
            <div className="searchWrap">
              <input className="kitSearch" placeholder="Search kits…" value={search} onChange={e => setSearch(e.target.value)} />
              {search && (
                <div className="searchResults">
                  {(filteredKits || []).map(kit => (
                    <button key={kit.name} className="searchResultItem" onClick={() => {
                      const empty = picks.findIndex(p => p !== kit.name && picks.indexOf(kit.name) === -1);
                      const slot = empty >= 0 ? empty : 0;
                      updatePick(slot, kit.name); setSearch("");
                    }}>
                      <strong>{kit.name}</strong>
                      <div className="searchRoles">{kit.roles.map(r => <RoleTag key={r} role={r} />)}</div>
                    </button>
                  ))}
                  {filteredKits?.length === 0 && <div className="noResults">No kits found</div>}
                </div>
              )}
            </div>
            <div className="pickGrid">
              {picks.map((pick, i) => {
                const kit = getKit(pick);
                return (
                  <label key={i} className="pickBox">
                    <div className="pickBoxTop">
                      <span className="mono" style={{ fontSize: 11, color: "var(--t3)" }}>Slot {i + 1}</span>
                      {kit && <div className="pickRoles">{kit.roles.slice(0, 1).map(r => <RoleTag key={r} role={r} />)}</div>}
                    </div>
                    <select value={pick} onChange={e => updatePick(i, e.target.value)}>
                      {Object.entries(kitCats).map(([cat, kits]) => kits.length === 0 ? null : (
                        <optgroup key={cat} label={cat}>
                          {kits.map(k => <option key={k.name} value={k.name}>{k.name}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </label>
                );
              })}
            </div>
            <div className="draftHint">Pro tip: one frontline, one support, one economy, one defender, one pressure slot.</div>
          </div>
          <AIAnalysis picks={picks} />
        </div>

        <div className="draftRight">
          <div className="card draftResult">
            <ScoreRing score={eval_.score} />
            <div className="verdictLabel mono" style={{ color: verdictColor }}>{eval_.verdict}</div>
            <p style={{ color: "var(--t2)", fontSize: 14, marginTop: 4 }}>{eval_.vt}</p>

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
                {eval_.syns.map(s => <div key={s} className="synItem">✦ {s}</div>)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── KIT BROWSER ─────────────────────────────────────────────────────────────
function KitBrowser() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const roles = ["All", "Frontline", "Support", "Economy", "Defender", "Bed Breaker", "Ranged", "Pressure"];
  const filtered = ALL_KITS.filter(k => {
    const matchRole = filter === "All" || k.roles.includes(filter);
    const matchSearch = k.name.toLowerCase().includes(search.toLowerCase());
    return matchRole && matchSearch;
  });
  const deduped = [...new Map(filtered.map(k => [k.name, k])).values()];

  return (
    <section className="section">
      <SectionHeader eyebrow="Kit Browser" title="Every kit in one place" sub="Search and filter all kits by role. Click a role badge to filter." />
      <div className="browserControls">
        <input className="kitSearch wide" placeholder="Search kits…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="filterRow">
          {roles.map(r => {
            const rc = RC[r] || null;
            const active = filter === r;
            return (
              <button key={r} className="filterBtn"
                style={active ? { background: rc ? rc.bg : "rgba(255,255,255,.12)", color: rc ? rc.c : "#f0f4ff", borderColor: rc ? rc.b : "rgba(255,255,255,.3)" } : {}}
                onClick={() => setFilter(r)}>{r}</button>
            );
          })}
        </div>
      </div>
      <div className="kitGrid">
        {deduped.map(kit => (
          <div key={kit.name} className="card kitCard">
            <div className="kitName">{kit.name}</div>
            <div className="kitRoles">{kit.roles.map(r => <RoleTag key={r} role={r} />)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── ROLES SECTION ────────────────────────────────────────────────────────────
function RolesSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Role Guide" title="What every slot does" sub="The best 5v5 teams cover pressure, scaling, sustain, and bed safety." />
      <div className="roleGrid">
        {ROLE_GUIDE.map(r => {
          const rc = RC[r.role] || { c: "#94a3b8", bg: "rgba(148,163,184,.1)", b: "rgba(148,163,184,.2)" };
          return (
            <div key={r.role} className="card roleCard" style={{ "--rc": rc.c, "--rb": rc.b }}>
              <div className="roleIconWrap" style={{ background: rc.bg, border: `1px solid ${rc.b}` }}>
                <span style={{ color: rc.c }}>{r.icon}</span>
              </div>
              <h3 style={{ color: rc.c }}>{r.role}</h3>
              <p>{r.job}</p>
              <div className="kitTagList">
                {r.kits.map(k => <span key={k} className="kitChip">{k}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── COUNTERS SECTION ────────────────────────────────────────────────────────
function CountersSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Counters" title="Beat the meta threats" sub="Simple answers for the most common 5v5 problems." />
      <div className="counterGrid">
        {COUNTERS.map(c => (
          <div key={c.title} className="card counterCard">
            <div className="counterIconWrap">{c.icon}</div>
            <h3>{c.title}</h3>
            <p>{c.plan}</p>
            <div className="mono label" style={{ marginTop: 14, marginBottom: 8 }}>Good Answers</div>
            <div className="kitTagList">{c.good.map(k => <span key={k} className="kitChip">{k}</span>)}</div>
            <div className="avoidBox"><strong>Avoid:</strong> {c.avoid}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── TIMING SECTION ───────────────────────────────────────────────────────────
function TimingSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Timing Plan" title="What to do each phase" sub="A mental checklist so your team never wastes a window." />
      <div className="timeline">
        {TIMING.map((item, i) => (
          <div key={item.time} className="card timeCard">
            <div className="timeLeft">
              <div className="timeDot" style={{ background: `hsl(${210 + i * 20}, 90%, 65%)` }} />
              {i < TIMING.length - 1 && <div className="timeLine" />}
            </div>
            <div className="timeBody">
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

// ─── PRACTICE SECTION ────────────────────────────────────────────────────────
const levelColors = { Beginner: "#00e5a0", "Core Skill": "#ffd93d", Advanced: "#ce93d8" };
function PracticeSection() {
  return (
    <section className="section">
      <SectionHeader eyebrow="Practice" title="Drills that actually help" sub="Short routines for cleaner movement, better calls, and faster reactions." />
      <div className="practiceGrid">
        {PRACTICE.map(d => (
          <div key={d.title} className="card practiceCard">
            <div className="mono practiceLevel" style={{ color: levelColors[d.level] || "#94a3b8" }}>{d.level}</div>
            <h3>{d.title}</h3>
            <p>{d.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
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
        {tabs.map(t => (
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

// ─── APP ──────────────────────────────────────────────────────────────────────
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

// ─── STYLES ───────────────────────────────────────────────────────────────────
const CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

  :root {
    --bg: #03060f;
    --s1: #080d1c;
    --s2: #0d1525;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.13);
    --t1: #eef2ff;
    --t2: rgba(200,215,245,0.7);
    --t3: rgba(150,170,220,0.45);
    --primary: #00c6ff;
    --primary-dim: rgba(0,198,255,0.1);
    --font-head: 'Barlow Condensed', sans-serif;
    --font-badge: 'Chakra Petch', sans-serif;
    --font-body: 'Barlow', sans-serif;
    --font-mono: 'Fira Code', monospace;
  }

  body {
    background: var(--bg);
    color: var(--t1);
    font-family: var(--font-body);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  button, select, input { font-family: var(--font-body); }
  button { -webkit-tap-highlight-color: transparent; cursor: pointer; }

  .mono { font-family: var(--font-badge); }
  .label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: var(--primary); }

  /* ── APP ─────────────────────────────────────────────────────────────────── */
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
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,255,255,.028) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.028) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(to bottom, black 0%, transparent 65%);
  }

  .app > * { position: relative; z-index: 1; }

  .glossMouse {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: radial-gradient(700px circle at var(--mx) var(--my),
      rgba(0,198,255,.18), rgba(0,120,220,.09) 30%, transparent 60%);
    mix-blend-mode: screen;
  }

  /* ── CARDS ───────────────────────────────────────────────────────────────── */
  .card {
    position: relative; overflow: hidden;
    border: 1px solid var(--border2);
    background: linear-gradient(160deg, rgba(255,255,255,.085) 0%, rgba(255,255,255,.02) 100%),
                linear-gradient(180deg, rgba(8,13,28,.9), rgba(8,13,28,.7));
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,.1),
      inset 0 -1px 0 rgba(255,255,255,.03),
      0 20px 60px rgba(0,0,0,.3);
  }

  .card::after {
    content: ""; position: absolute; inset: -2px; pointer-events: none;
    background: radial-gradient(450px circle at var(--cx, 50%) var(--cy, 0%),
      rgba(255,255,255,.18), rgba(0,198,255,.08) 32%, transparent 55%);
    opacity: 0; transition: opacity .2s;
  }
  .card:hover::after { opacity: 1; }
  .card > * { position: relative; z-index: 1; }

  /* ── SECTION ─────────────────────────────────────────────────────────────── */
  .section { max-width: 1060px; margin: 0 auto; padding: 44px 18px; }

  .sectionHead { margin-bottom: 28px; }
  .sectionHead .eyebrow { margin-bottom: 6px; }
  .sectionHead h2 {
    font-family: var(--font-head);
    font-size: clamp(36px, 6vw, 64px);
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: .95;
    background: linear-gradient(160deg, #fff 30%, #a5d8ff);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .subText { margin-top: 12px; color: var(--t2); font-size: 16px; line-height: 1.65; max-width: 640px; }

  /* ── HERO ────────────────────────────────────────────────────────────────── */
  .hero { max-width: 1060px; margin: 0 auto; padding: 80px 18px 48px; text-align: center; }

  .heroBadgeRow {
    display: flex; align-items: center; justify-content: center; gap: 10px;
    flex-wrap: wrap; margin-bottom: 24px;
  }

  .livePill, .madeByPill {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 14px; border-radius: 999px;
    font-size: 12px; font-weight: 700;
    border: 1px solid var(--border2);
    background: linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.03));
    backdrop-filter: blur(20px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.12);
  }

  .livePill { color: var(--primary); font-family: var(--font-badge); font-size: 11px; letter-spacing: .06em; text-transform: uppercase; }
  .madeByPill { color: var(--t2); }
  .madeByPill span { color: var(--primary); }

  .liveDot {
    width: 8px; height: 8px; border-radius: 50%;
    background: #22d3ee; box-shadow: 0 0 12px #22d3ee;
    animation: pulse 1.8s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }

  .heroTitle {
    font-family: var(--font-head);
    font-size: clamp(60px, 11vw, 120px);
    font-weight: 900;
    letter-spacing: -0.05em;
    line-height: .88;
    background: linear-gradient(170deg, #ffffff 0%, #c8e8ff 40%, #7dd3fc 65%, #3b82f6 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .heroTitle em { font-style: italic; }

  .heroSub { max-width: 600px; margin: 20px auto 0; color: var(--t2); font-size: 17px; line-height: 1.7; }

  .heroBtns { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; margin-top: 30px; }

  .btnPrimary {
    padding: 14px 24px; border: none; border-radius: 999px;
    font-weight: 800; font-size: 15px; color: #020617;
    background: linear-gradient(180deg, rgba(255,255,255,.97), #bae6fd);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 16px 40px rgba(0,180,255,.28);
    transition: transform .18s, box-shadow .18s;
  }
  .btnPrimary:hover { transform: translateY(-2px); box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 22px 50px rgba(0,180,255,.38); }

  .btnGhost {
    padding: 14px 24px; border-radius: 999px;
    font-weight: 800; font-size: 15px; color: #e0f2fe;
    background: linear-gradient(180deg, rgba(255,255,255,.1), rgba(255,255,255,.03));
    border: 1px solid var(--border2);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.08);
    transition: transform .18s, border-color .18s;
  }
  .btnGhost:hover { transform: translateY(-2px); border-color: rgba(125,211,252,.3); }

  .heroStats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; max-width: 600px; margin: 34px auto 0; }

  .heroStat { border-radius: 20px; padding: 16px; text-align: left; }
  .heroStat .label { margin-bottom: 6px; }
  .heroStat strong { font-family: var(--font-head); font-size: 28px; font-weight: 900; letter-spacing: -0.04em; }

  /* ── BUILD CARDS ─────────────────────────────────────────────────────────── */
  .tierGroup { margin-bottom: 28px; }
  .tierLabel { margin-bottom: 12px; }
  .tierPill { padding: 6px 14px; border-radius: 999px; border: 1px solid; font-family: var(--font-badge); font-size: 13px; font-weight: 700; }

  .buildGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }

  .buildCard {
    border-radius: 28px;
    animation: cardIn .4s ease-out var(--delay, 0ms) both;
    transition: transform .18s, border-color .18s, box-shadow .18s;
  }
  .buildCard:hover { transform: translateY(-3px); border-color: rgba(0,198,255,.22); box-shadow: inset 0 1px 0 rgba(255,255,255,.14), 0 28px 70px rgba(0,150,220,.14), 0 20px 48px rgba(0,0,0,.3); }

  @keyframes cardIn { from { opacity:0; transform: translateY(16px) } to { opacity:1; transform: translateY(0) } }

  .buildTop {
    width: 100%; display: flex; align-items: center; gap: 14px;
    padding: 20px 20px 0; text-align: left;
    background: none; border: none; color: inherit;
  }

  .buildIcon {
    width: 52px; height: 52px; border-radius: 16px; flex: 0 0 auto;
    display: grid; place-items: center; font-size: 22px; font-weight: 900; color: #fff;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 10px 28px rgba(0,0,0,.3);
  }

  .buildMeta { flex: 1; min-width: 0; }

  .buildTagRow { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
  .buildTag { font-size: 10px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
  .tierBadge { padding: 3px 8px; border-radius: 999px; font-family: var(--font-badge); font-size: 11px; font-weight: 700; border: 1px solid; }

  .buildName { font-family: var(--font-head); font-size: 17px; font-weight: 800; letter-spacing: -0.02em; }

  .expandBtn {
    width: 32px; height: 32px; border-radius: 50%; flex: 0 0 auto;
    display: grid; place-items: center;
    background: rgba(255,255,255,.08); color: var(--t2);
    font-size: 20px; font-weight: 500;
  }

  .roleBar { display: flex; gap: 6px; padding: 12px 20px 0; flex-wrap: wrap; }
  .roleBarSeg {
    padding: 4px 9px; border-radius: 999px; border: 1px solid;
    font-family: var(--font-badge); font-size: 10px; font-weight: 700;
  }

  .buildWhy { padding: 12px 20px 18px; color: var(--t2); font-size: 14px; line-height: 1.7; }

  .buildDetails { display: grid; gap: 8px; padding: 0 20px 20px; animation: fadeSlide .2s ease-out; }
  @keyframes fadeSlide { from { opacity:0; transform: translateY(-6px) } to { opacity:1; transform: translateY(0) } }

  .infoBlock { border-radius: 16px; padding: 12px 14px; background: rgba(255,255,255,.04); border: 1px solid var(--border); }
  .infoBlock .label { margin-bottom: 5px; }
  .infoBlock p { color: var(--t2); font-size: 13.5px; line-height: 1.65; }

  /* ── DRAFT ───────────────────────────────────────────────────────────────── */
  .draftShell { display: grid; grid-template-columns: 1.35fr minmax(280px, .65fr); gap: 16px; align-items: start; }
  .draftLeft { display: grid; gap: 16px; }
  .draftRight { position: sticky; top: 18px; }

  .draftPanel { border-radius: 28px; padding: 22px; }
  .draftTeamName { font-family: var(--font-head); font-size: 20px; font-weight: 900; letter-spacing: -0.03em; margin: 4px 0 14px; }

  .searchWrap { position: relative; margin-bottom: 14px; }
  .kitSearch {
    width: 100%; padding: 11px 14px; border-radius: 14px;
    background: rgba(255,255,255,.06); border: 1px solid var(--border2);
    color: var(--t1); font-size: 14px; outline: none;
    transition: border-color .18s;
  }
  .kitSearch.wide { max-width: 360px; }
  .kitSearch:focus { border-color: rgba(0,198,255,.4); }
  .kitSearch::placeholder { color: var(--t3); }

  .searchResults {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0; z-index: 20;
    background: var(--s2); border: 1px solid var(--border2); border-radius: 16px;
    overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,.5); max-height: 260px; overflow-y: auto;
  }
  .searchResultItem {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 10px 14px; text-align: left; background: none; border: none; color: var(--t1);
    border-bottom: 1px solid var(--border);
    transition: background .14s;
  }
  .searchResultItem:hover { background: rgba(0,198,255,.08); }
  .searchResultItem strong { font-size: 14px; font-weight: 700; }
  .searchRoles { display: flex; gap: 5px; }
  .noResults { padding: 14px; color: var(--t3); font-size: 13px; }

  .pickGrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }

  .pickBox {
    display: flex; flex-direction: column; gap: 8px;
    border-radius: 16px; padding: 12px;
    background: rgba(255,255,255,.04); border: 1px solid var(--border);
  }
  .pickBoxTop { display: flex; align-items: center; justify-content: space-between; }
  .pickRoles { display: flex; gap: 4px; }

  select {
    width: 100%; padding: 10px 12px; border-radius: 12px;
    background: rgba(5,10,25,.9); border: 1px solid var(--border2);
    color: var(--t1); font-size: 14px; font-weight: 600; outline: none;
    box-shadow: inset 0 1px 0 rgba(255,255,255,.05);
  }
  optgroup { background: #0f172a; color: var(--primary); font-weight: 700; font-family: var(--font-badge); }
  option { background: #0f172a; color: var(--t1); }

  .draftHint { margin-top: 14px; padding: 12px 14px; border-radius: 14px; background: rgba(255,255,255,.04); border: 1px solid var(--border); color: var(--t3); font-size: 13px; line-height: 1.6; }

  /* Draft Result */
  .draftResult { border-radius: 28px; padding: 24px; display: flex; flex-direction: column; align-items: flex-start; gap: 0; }

  .scoreRingWrap { position: relative; width: 130px; height: 130px; margin-bottom: 14px; }
  .scoreRingInner {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
  }
  .scoreRingInner strong { font-family: var(--font-head); font-size: 36px; font-weight: 900; letter-spacing: -0.04em; }
  .scoreRingInner span { font-size: 12px; color: var(--t3); margin-top: -28px; }

  .verdictLabel { font-family: var(--font-head); font-size: 32px; font-weight: 900; letter-spacing: -0.04em; margin-bottom: 4px; }

  .roleCheckGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px; margin-top: 16px; width: 100%; }
  .roleCheck {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 10px; border-radius: 12px; font-size: 12px; font-weight: 700;
  }
  .roleCheck span { width: 18px; height: 18px; display: grid; place-items: center; border-radius: 50%; font-size: 11px; }
  .roleCheck.ok { color: #67e8f9; background: rgba(34,211,238,.08); border: 1px solid rgba(103,232,249,.15); }
  .roleCheck.bad { color: #93c5fd; background: rgba(59,130,246,.08); border: 1px solid rgba(147,197,253,.15); }

  .warnBox { margin-top: 12px; padding: 11px 13px; border-radius: 14px; background: rgba(37,99,235,.1); border: 1px solid rgba(147,197,253,.16); color: #bfdbfe; font-size: 13px; line-height: 1.55; }

  .synList { margin-top: 14px; width: 100%; }
  .synList .label { margin-bottom: 8px; }
  .synItem { padding: 9px 11px; border-radius: 12px; background: rgba(0,229,160,.07); border: 1px solid rgba(0,229,160,.14); color: #86efac; font-size: 12.5px; margin-bottom: 6px; }

  /* ── AI PANEL ────────────────────────────────────────────────────────────── */
  .aiPanel { border-radius: 28px; padding: 22px; }

  .aiHeader { display: flex; gap: 14px; align-items: center; margin-bottom: 18px; }
  .aiGlyph {
    width: 48px; height: 48px; border-radius: 14px; flex: 0 0 auto;
    display: grid; place-items: center; font-size: 20px;
    background: linear-gradient(135deg, rgba(0,198,255,.22), rgba(0,100,200,.15));
    border: 1px solid rgba(0,198,255,.25); color: var(--primary);
  }

  .analyzeBtn {
    width: 100%; padding: 14px; border-radius: 16px; border: 1px solid rgba(0,198,255,.3);
    background: linear-gradient(135deg, rgba(0,198,255,.15), rgba(0,100,200,.1));
    color: var(--primary); font-weight: 800; font-size: 15px;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .18s, border-color .18s, transform .18s;
  }
  .analyzeBtn span { font-size: 14px; }
  .analyzeBtn:hover { background: linear-gradient(135deg, rgba(0,198,255,.22), rgba(0,100,200,.15)); border-color: rgba(0,198,255,.5); transform: translateY(-1px); }

  .aiLoading { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 24px 0; }
  .loadDots { display: flex; gap: 6px; }
  .loadDots span { width: 8px; height: 8px; border-radius: 50%; background: var(--primary); animation: dotBounce 1.2s ease-in-out infinite; }
  .loadDots span:nth-child(2) { animation-delay: .2s; }
  .loadDots span:nth-child(3) { animation-delay: .4s; }
  @keyframes dotBounce { 0%,80%,100%{transform:scale(.8);opacity:.5} 40%{transform:scale(1.2);opacity:1} }
  .aiLoading p { color: var(--t2); font-size: 14px; }

  .errBox { padding: 12px 14px; border-radius: 14px; background: rgba(255,85,102,.1); border: 1px solid rgba(255,85,102,.2); color: #fca5a5; font-size: 13px; }

  .aiResult { display: grid; gap: 14px; animation: fadeSlide .3s ease-out; }
  .aiMeta { display: flex; gap: 8px; flex-wrap: wrap; }
  .aiBadge { padding: 6px 12px; border-radius: 999px; font-family: var(--font-badge); font-size: 12px; font-weight: 700; }
  .playstyleBadge { background: rgba(0,198,255,.1); border: 1px solid rgba(0,198,255,.25); color: var(--primary); }
  .timingBadge { background: rgba(255,202,40,.1); border: 1px solid rgba(255,202,40,.22); color: #ffd93d; }
  .aiSummary { color: var(--t2); font-size: 14px; line-height: 1.7; }

  .aiCols { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .aiCols .label { margin-bottom: 8px; }
  .aiItem { padding: 8px 10px; border-radius: 11px; font-size: 13px; line-height: 1.5; margin-bottom: 6px; }
  .aiItem.good { background: rgba(0,229,160,.07); border: 1px solid rgba(0,229,160,.15); color: #86efac; }
  .aiItem.bad { background: rgba(255,85,102,.07); border: 1px solid rgba(255,85,102,.15); color: #fca5a5; }

  .aiWin { padding: 12px 14px; border-radius: 14px; background: rgba(255,255,255,.04); border: 1px solid var(--border); }
  .aiWin .label { margin-bottom: 6px; }
  .aiWin p { color: var(--t2); font-size: 13.5px; line-height: 1.6; }

  .aiTip { padding: 12px 14px; border-radius: 14px; background: rgba(0,198,255,.07); border: 1px solid rgba(0,198,255,.16); color: var(--t1); font-size: 13.5px; line-height: 1.6; }
  .aiTip span { display: block; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--primary); margin-bottom: 5px; }

  .reanalyzeBtn { padding: 10px 16px; border-radius: 12px; border: 1px solid var(--border2); background: rgba(255,255,255,.05); color: var(--t2); font-size: 13px; font-weight: 700; transition: background .16s; }
  .reanalyzeBtn:hover { background: rgba(255,255,255,.09); }

  /* ── KIT BROWSER ─────────────────────────────────────────────────────────── */
  .browserControls { margin-bottom: 20px; display: flex; flex-direction: column; gap: 12px; }
  .filterRow { display: flex; flex-wrap: wrap; gap: 8px; }

  .filterBtn {
    padding: 7px 14px; border-radius: 999px; border: 1px solid var(--border2);
    background: rgba(255,255,255,.04); color: var(--t2); font-size: 13px; font-weight: 700;
    transition: all .16s;
  }
  .filterBtn:hover { border-color: rgba(0,198,255,.3); color: var(--t1); }

  .kitGrid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 10px; }

  .kitCard { border-radius: 20px; padding: 16px; transition: transform .18s, border-color .18s; }
  .kitCard:hover { transform: translateY(-2px); border-color: rgba(0,198,255,.22); }
  .kitName { font-family: var(--font-head); font-size: 18px; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; }
  .kitRoles { display: flex; flex-wrap: wrap; gap: 5px; }

  .roleTag {
    display: inline-block; padding: 4px 8px; border-radius: 999px;
    font-family: var(--font-badge); font-size: 10px; font-weight: 700; letter-spacing: .04em;
    border: 1px solid;
  }

  /* ── ROLES SECTION ───────────────────────────────────────────────────────── */
  .roleGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  .roleCard { border-radius: 26px; padding: 22px; transition: transform .18s, border-color .18s; }
  .roleCard:hover { transform: translateY(-2px); border-color: var(--rb, rgba(0,198,255,.22)); }

  .roleIconWrap {
    width: 48px; height: 48px; border-radius: 14px;
    display: grid; place-items: center; font-size: 22px; margin-bottom: 14px;
  }

  .roleCard h3 { font-family: var(--font-head); font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
  .roleCard p { color: var(--t2); font-size: 14px; line-height: 1.62; }

  .kitTagList { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 14px; }
  .kitChip { padding: 5px 10px; border-radius: 999px; background: rgba(255,255,255,.07); border: 1px solid var(--border2); color: #bae6fd; font-size: 12px; font-weight: 700; }

  /* ── COUNTERS ────────────────────────────────────────────────────────────── */
  .counterGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  .counterCard { border-radius: 26px; padding: 22px; transition: transform .18s; }
  .counterCard:hover { transform: translateY(-2px); }
  .counterIconWrap {
    width: 48px; height: 48px; border-radius: 14px; font-size: 22px;
    display: grid; place-items: center; margin-bottom: 14px;
    background: linear-gradient(135deg, rgba(255,85,102,.15), rgba(200,40,80,.08));
    border: 1px solid rgba(255,85,102,.22); color: #fca5a5;
  }
  .counterCard h3 { font-family: var(--font-head); font-size: 20px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
  .counterCard p { color: var(--t2); font-size: 13.5px; line-height: 1.65; }
  .avoidBox { margin-top: 14px; padding: 10px 12px; border-radius: 13px; background: rgba(255,85,102,.07); border: 1px solid rgba(255,85,102,.15); color: #fca5a5; font-size: 13px; }

  /* ── TIMING ──────────────────────────────────────────────────────────────── */
  .timeline { display: grid; gap: 4px; }
  .timeCard { display: grid; grid-template-columns: 44px 1fr; gap: 0; border-radius: 20px; padding: 0; background: none; border: none; box-shadow: none; backdrop-filter: none; }
  .timeCard::after { display: none; }
  .timeCard > * { position: relative; z-index: 1; }

  .timeLeft { display: flex; flex-direction: column; align-items: center; padding-top: 20px; }
  .timeDot { width: 14px; height: 14px; border-radius: 50%; flex: 0 0 auto; box-shadow: 0 0 12px currentColor; }
  .timeLine { width: 2px; flex: 1; min-height: 20px; background: linear-gradient(to bottom, rgba(255,255,255,.12), rgba(255,255,255,.04)); margin-top: 4px; }

  .timeBody {
    margin: 8px 0 8px 0;
    padding: 16px 18px; border-radius: 18px;
    background: linear-gradient(160deg, rgba(255,255,255,.075), rgba(255,255,255,.018));
    border: 1px solid var(--border2);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    transition: border-color .18s, transform .18s;
  }
  .timeBody:hover { transform: translateX(4px); border-color: rgba(0,198,255,.22); }

  .timeStamp { font-size: 11px; font-weight: 600; letter-spacing: .08em; color: var(--primary); margin-bottom: 5px; }
  .timeBody h3 { font-family: var(--font-head); font-size: 20px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 5px; }
  .timeBody p { color: var(--t2); font-size: 14px; line-height: 1.62; }

  /* ── PRACTICE ────────────────────────────────────────────────────────────── */
  .practiceGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .practiceCard { border-radius: 26px; padding: 22px; transition: transform .18s; }
  .practiceCard:hover { transform: translateY(-2px); }
  .practiceLevel { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 10px; }
  .practiceCard h3 { font-family: var(--font-head); font-size: 22px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; }
  .practiceCard p { color: var(--t2); font-size: 14px; line-height: 1.65; }

  /* ── BOTTOM NAV ──────────────────────────────────────────────────────────── */
  .navShell {
    position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%);
    width: min(700px, calc(100% - 24px)); z-index: 30;
    padding: 1.5px; border-radius: 32px;
    background: linear-gradient(135deg, rgba(255,255,255,.28), rgba(0,198,255,.12), rgba(255,255,255,.06));
    box-shadow: 0 24px 80px rgba(0,0,0,.55);
  }

  .bottomNav {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px;
    padding: 8px; border-radius: 31px;
    background: radial-gradient(circle at 50% -30%, rgba(255,255,255,.15), transparent 45%),
                linear-gradient(180deg, rgba(8,13,28,.8), rgba(3,6,15,.88));
    border: 1px solid rgba(255,255,255,.1);
    backdrop-filter: blur(32px) saturate(1.6); -webkit-backdrop-filter: blur(32px) saturate(1.6);
    box-shadow: inset 0 1px 0 rgba(255,255,255,.12), inset 0 -1px 0 rgba(255,255,255,.04);
  }

  .navItem {
    border: none; background: transparent; color: rgba(200,215,245,.42); border-radius: 22px;
    padding: 9px 5px; display: flex; flex-direction: column; align-items: center; gap: 3px;
    position: relative; transition: all .16s;
  }
  .navIcon { font-size: 18px; line-height: 1; }
  .navLabel { font-size: 10.5px; font-weight: 800; font-family: var(--font-badge); letter-spacing: .02em; }
  .navDot { position: absolute; bottom: 5px; width: 4px; height: 4px; border-radius: 50%; background: var(--primary); box-shadow: 0 0 8px var(--primary); }

  .navItem:hover { color: rgba(200,215,245,.75); transform: translateY(-1px); }
  .navItem.active {
    color: #e0f2fe;
    background: linear-gradient(180deg, rgba(0,198,255,.22), rgba(0,80,200,.18));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.15), 0 10px 26px rgba(0,100,220,.22);
  }

  /* ── RESPONSIVE ──────────────────────────────────────────────────────────── */
  @media (max-width: 860px) {
    .buildGrid, .draftShell, .roleGrid, .counterGrid, .practiceGrid { grid-template-columns: 1fr; }
    .draftRight { position: static; }
    .heroStats { grid-template-columns: repeat(2, 1fr); }
    .hero { padding-top: 56px; }
    .aiCols { grid-template-columns: 1fr; }
  }

  @media (max-width: 560px) {
    .heroTitle { font-size: 56px; }
    .heroSub { font-size: 15px; }
    .heroStats { grid-template-columns: repeat(2, 1fr); }
    .pickGrid { grid-template-columns: 1fr; }
    .navItem .navLabel { font-size: 9px; }
    .tierBadge { display: none; }
    .kitGrid { grid-template-columns: repeat(2, 1fr); }
  }
`;

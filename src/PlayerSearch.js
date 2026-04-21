import { useState, useCallback } from "react";

/* ─── ICONS ─── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const SwordIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5" />
    <line x1="13" y1="19" x2="19" y2="13" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="19" y1="21" x2="21" y2="19" />
  </svg>
);

const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

/* ─── RANK CONFIG ─── */
// Map badge IDs to rank data. Replace these with real Roblox BedWars badge IDs.
// Find them at: https://www.roblox.com/games/6872265039 → Badges tab
const RANK_BADGES = {
  // 000000001: { name: "Bronze",    color: "#cd7f32", rgb: "205,127,50",   tier: 1 },
  // 000000002: { name: "Silver",    color: "#a8a9ad", rgb: "168,169,173",  tier: 2 },
  // 000000003: { name: "Gold",      color: "#f59e0b", rgb: "245,158,11",   tier: 3 },
  // 000000004: { name: "Platinum",  color: "#67e8f9", rgb: "103,232,249",  tier: 4 },
  // 000000005: { name: "Diamond",   color: "#38bdf8", rgb: "56,189,248",   tier: 5 },
  // 000000006: { name: "Master",    color: "#a78bfa", rgb: "167,139,250",  tier: 6 },
  // 000000007: { name: "Nightmare", color: "#ef4444", rgb: "239,68,68",    tier: 7 },
};

// Fallback rank displayed when no badge matches
const DEFAULT_RANK = { name: "Unranked", color: "#6b7280", rgb: "107,114,128", tier: 0 };

/* ─── SKELETON ─── */
function Skeleton({ width = "100%", height = 16, radius = 8, style = {} }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.6s ease-in-out infinite",
        flexShrink: 0,
        ...style,
      }}
    />
  );
}

function SkeletonCard({ dark }) {
  return (
    <div style={cardBase(dark)}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <Skeleton width={52} height={52} radius={16} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton width="55%" height={18} radius={6} />
          <Skeleton width="35%" height={12} radius={5} />
        </div>
        <Skeleton width={80} height={30} radius={10} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Skeleton width={36} height={36} radius={10} />
            <Skeleton width={`${40 + i * 12}%`} height={13} radius={5} />
            <Skeleton width={48} height={22} radius={6} style={{ marginLeft: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── STYLE HELPERS ─── */
function cardBase(dark) {
  return {
    borderRadius: 24,
    background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
    border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.24)" : "0 10px 26px rgba(0,0,0,0.05)",
    overflow: "hidden",
    padding: "22px 20px",
  };
}

function sectionLabel(color) {
  return {
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    fontFamily: "'JetBrains Mono', monospace",
    color,
    marginBottom: 12,
  };
}

/* ─── WIN RATE BAR ─── */
function WinRateBar({ rate, color, rgb }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ height: 6, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${rate}%`,
            borderRadius: 99,
            background: `linear-gradient(90deg, rgba(${rgb},0.9), rgba(${rgb},0.5))`,
            boxShadow: `0 0 8px rgba(${rgb},0.4)`,
            transition: "width 0.8s cubic-bezier(0.22,0.8,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── MATCH ROW ─── */
function MatchRow({ match, dark }) {
  const won = match.result === "WIN";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 14,
        background: dark ? "rgba(255,255,255,0.028)" : "rgba(0,0,0,0.022)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      }}
    >
      {/* result badge */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: won ? "rgba(16,185,129,0.14)" : "rgba(239,68,68,0.12)",
          border: `1px solid ${won ? "rgba(16,185,129,0.28)" : "rgba(239,68,68,0.22)"}`,
          color: won ? "#10b981" : "#ef4444",
        }}
      >
        {won ? <CheckIcon /> : <XIcon />}
      </div>

      {/* kit */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: dark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {match.kit || "Unknown Kit"}
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 600, color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.38)", fontFamily: "'JetBrains Mono', monospace", marginTop: 1 }}>
          {match.date || "—"}
        </div>
      </div>

      {/* kills / beds */}
      {match.kills != null && (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.4)", fontWeight: 700 }}>
            {match.kills}K · {match.bedsBroken ?? 0}BD
          </span>
        </div>
      )}

      {/* result pill */}
      <div
        style={{
          padding: "4px 10px",
          borderRadius: 8,
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "0.08em",
          fontFamily: "'JetBrains Mono', monospace",
          color: won ? "#10b981" : "#ef4444",
          background: won ? "rgba(16,185,129,0.10)" : "rgba(239,68,68,0.08)",
          flexShrink: 0,
        }}
      >
        {match.result}
      </div>
    </div>
  );
}

/* ─── KIT STAT ROW ─── */
function KitStatRow({ kit, dark }) {
  const winRate = kit.matches > 0 ? Math.round((kit.wins / kit.matches) * 100) : 0;
  const color = winRate >= 55 ? "#10b981" : winRate >= 45 ? "#f59e0b" : "#ef4444";
  const rgb = winRate >= 55 ? "16,185,129" : winRate >= 45 ? "245,158,11" : "239,68,68";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        borderRadius: 14,
        background: dark ? "rgba(255,255,255,0.028)" : "rgba(0,0,0,0.022)",
        border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
      }}
    >
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: `rgba(${rgb},0.12)`,
          border: `1px solid rgba(${rgb},0.22)`,
          color,
        }}
      >
        <SwordIcon />
      </div>

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: dark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {kit.name}
          </span>
          <span style={{ fontSize: 11, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace", color, flexShrink: 0, marginLeft: 8 }}>
            {winRate}%
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <WinRateBar rate={winRate} color={color} rgb={rgb} />
          <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.36)", flexShrink: 0 }}>
            {kit.matches}G
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function PlayerSearch({ dark = true }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("matches");

  const handleSearch = useCallback(async () => {
    const username = query.trim();
    if (!username) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`/api/lookup?username=${encodeURIComponent(username)}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Lookup failed");
      setData(json);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const rank = data?.rank ?? DEFAULT_RANK;
  const matches = data?.matches ?? [];
  const kitStats = data?.kitStats ?? [];

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes fade-up-search {
          from { opacity:0; transform:translateY(14px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .ps-in { animation: fade-up-search 0.42s cubic-bezier(0.22,0.8,0.2,1) both; }
        .ps-in1 { animation-delay: 0.07s; }
        .ps-in2 { animation-delay: 0.14s; }
        .ps-in3 { animation-delay: 0.20s; }
        .ps-search-btn:hover { opacity: 0.88; transform: scale(0.97); }
        .ps-search-btn:active { transform: scale(0.94); }
        .ps-tab-btn:hover { opacity: 0.85; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

        {/* ── Search bar ── */}
        <div className="ps-in" style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "0 16px",
              borderRadius: 18,
              background: dark ? "rgba(16,16,20,0.78)" : "rgba(255,255,255,0.84)",
              border: `1px solid ${dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.09)"}`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: dark ? "0 10px 30px rgba(0,0,0,0.24)" : "0 10px 26px rgba(0,0,0,0.05)",
            }}
          >
            <span style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)", flexShrink: 0 }}>
              <UserIcon />
            </span>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Roblox username…"
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                fontSize: 14,
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif",
                color: dark ? "#f0f0f5" : "#111111",
                padding: "16px 0",
              }}
            />
          </div>
          <button
            className="ps-search-btn"
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            style={{
              padding: "0 22px",
              borderRadius: 18,
              border: "none",
              cursor: loading || !query.trim() ? "not-allowed" : "pointer",
              background: dark ? "#ffffff" : "#111111",
              color: dark ? "#111111" : "#ffffff",
              fontWeight: 800,
              fontSize: 13,
              fontFamily: "'Inter', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: loading || !query.trim() ? 0.45 : 1,
              transition: "opacity 0.2s, transform 0.15s",
              flexShrink: 0,
              boxShadow: dark ? "0 8px 24px rgba(0,0,0,0.3)" : "0 8px 22px rgba(0,0,0,0.12)",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            <SearchIcon />
            {loading ? "Searching…" : "Search"}
          </button>
        </div>

        {/* ── Error ── */}
        {error && (
          <div
            className="ps-in"
            style={{
              ...cardBase(dark),
              padding: "16px 18px",
              border: "1px solid rgba(239,68,68,0.26)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444", flexShrink: 0, boxShadow: "0 0 10px rgba(239,68,68,0.5)" }} />
            <span style={{ fontSize: 13.4, color: "#ef4444", fontWeight: 600 }}>{error}</span>
          </div>
        )}

        {/* ── Skeleton ── */}
        {loading && <SkeletonCard dark={dark} />}

        {/* ── Results ── */}
        {data && !loading && (
          <>
            {/* Profile header */}
            <div className="ps-in" style={{ ...cardBase(dark), position: "relative", overflow: "hidden" }}>
              {/* accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent 0%, ${rank.color} 50%, transparent 100%)` }} />

              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {/* avatar */}
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 17,
                    background: `linear-gradient(135deg, rgba(${rank.rgb},0.22), rgba(${rank.rgb},0.07))`,
                    border: `1px solid rgba(${rank.rgb},0.25)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    flexShrink: 0,
                  }}
                >
                  {data.avatarUrl
                    ? <img src={data.avatarUrl} alt={data.username} style={{ width: "100%", height: "100%", borderRadius: 16, objectFit: "cover" }} />
                    : "👤"}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 17, fontWeight: 900, letterSpacing: "-0.02em", color: dark ? "#f8f8fb" : "#0f0f10", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {data.username}
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.36)" : "rgba(0,0,0,0.38)", marginTop: 3 }}>
                    UID: {data.userId}
                  </div>
                </div>

                {/* rank badge */}
                <div
                  style={{
                    flexShrink: 0,
                    padding: "8px 14px",
                    borderRadius: 14,
                    background: `linear-gradient(135deg, rgba(${rank.rgb},0.18), rgba(${rank.rgb},0.07))`,
                    border: `1px solid rgba(${rank.rgb},0.28)`,
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    boxShadow: `0 4px 16px rgba(${rank.rgb},0.15)`,
                  }}
                >
                  <TrophyIcon />
                  <span style={{ fontSize: 13, fontWeight: 800, color: rank.color, letterSpacing: "-0.01em", fontFamily: "'JetBrains Mono', monospace" }}>
                    {rank.name}
                  </span>
                </div>
              </div>

              {/* quick stats row */}
              {(data.totalWins != null || data.totalMatches != null || data.overallWinRate != null) && (
                <div
                  style={{
                    marginTop: 18,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 8,
                  }}
                >
                  {[
                    { label: "Matches",  value: data.totalMatches ?? "—" },
                    { label: "Wins",     value: data.totalWins ?? "—" },
                    { label: "Win Rate", value: data.overallWinRate != null ? `${data.overallWinRate}%` : "—" },
                  ].map(s => (
                    <div
                      key={s.label}
                      style={{
                        borderRadius: 14,
                        padding: "11px 12px",
                        background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.022)",
                        border: `1px solid ${dark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.055)"}`,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "1.2rem", fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", color: dark ? "#ffffff" : "#111111", letterSpacing: "-0.03em" }}>
                        {s.value}
                      </div>
                      <div style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace", color: dark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.36)", marginTop: 3 }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="ps-in ps-in1" style={{ display: "flex", gap: 8 }}>
              {[
                { key: "matches", label: "Match History", icon: "📋" },
                { key: "kits",    label: "Kit Stats",     icon: "⚔️" },
              ].map(t => {
                const isA = t.key === activeTab;
                return (
                  <button
                    key={t.key}
                    className="ps-tab-btn"
                    onClick={() => setActiveTab(t.key)}
                    style={{
                      padding: "9px 18px",
                      borderRadius: 999,
                      border: isA
                        ? `1.5px solid rgba(255,255,255,0.2)`
                        : `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                      background: isA
                        ? dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"
                        : dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.72)",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: "'Inter', sans-serif",
                      color: isA
                        ? dark ? "#ffffff" : "#111111"
                        : dark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.5)",
                      transition: "all 0.2s",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    {t.icon} {t.label}
                  </button>
                );
              })}
            </div>

            {/* Match History */}
            {activeTab === "matches" && (
              <div className="ps-in ps-in2" style={cardBase(dark)}>
                <div style={sectionLabel(dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)")}>
                  Recent Matches
                </div>
                {matches.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "28px 0", color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.3)", fontSize: 13 }}>
                    No match data found. Connect your database to populate this.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {matches.map((m, i) => <MatchRow key={i} match={m} dark={dark} />)}
                  </div>
                )}
              </div>
            )}

            {/* Kit Stats */}
            {activeTab === "kits" && (
              <div className="ps-in ps-in2" style={cardBase(dark)}>
                <div style={sectionLabel(dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.38)")}>
                  Kit Breakdown
                </div>
                {kitStats.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "28px 0", color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.3)", fontSize: 13 }}>
                    No kit data found. Connect your database to populate this.
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {kitStats.sort((a, b) => b.matches - a.matches).map((k, i) => <KitStatRow key={i} kit={k} dark={dark} />)}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

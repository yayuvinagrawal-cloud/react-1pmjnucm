/**
 * /api/lookup.js  —  Vercel Serverless Function
 *
 * ─── HOW TO CONNECT YOUR DATABASE ───────────────────────────────────────────
 *
 * 1. SUPABASE:
 *    npm install @supabase/supabase-js
 *    Add to your .env.local (Vercel → Settings → Environment Variables):
 *      SUPABASE_URL=https://xxxx.supabase.co
 *      SUPABASE_ANON_KEY=your_anon_key
 *    Then uncomment the Supabase block in `fetchPlayerStats()` below.
 *
 * 2. MONGODB:
 *    npm install mongodb
 *    Add: MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/bedwars
 *    Then uncomment the MongoDB block in `fetchPlayerStats()` below.
 *
 * ─── RANK BADGE IDs ─────────────────────────────────────────────────────────
 *
 *    Find badge IDs by going to:
 *    https://www.roblox.com/games/6872265039  (BedWars game page)
 *    → Badges tab → hover each rank badge → copy the numeric ID from the URL.
 *
 *    Then fill in RANK_BADGE_MAP below.
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

// ── STEP 1: Fill in real Roblox BedWars badge IDs ──────────────────────────
const RANK_BADGE_MAP = {
  // badgeId (string): rank object
  // "1234567890": { name: "Bronze",    color: "#cd7f32", rgb: "205,127,50",  tier: 1 },
  // "1234567891": { name: "Silver",    color: "#a8a9ad", rgb: "168,169,173", tier: 2 },
  // "1234567892": { name: "Gold",      color: "#f59e0b", rgb: "245,158,11",  tier: 3 },
  // "1234567893": { name: "Platinum",  color: "#67e8f9", rgb: "103,232,249", tier: 4 },
  // "1234567894": { name: "Diamond",   color: "#38bdf8", rgb: "56,189,248",  tier: 5 },
  // "1234567895": { name: "Master",    color: "#a78bfa", rgb: "167,139,250", tier: 6 },
  // "1234567896": { name: "Nightmare", color: "#ef4444", rgb: "239,68,68",   tier: 7 },
};

// ── STEP 2: Connect your database here ─────────────────────────────────────
async function fetchPlayerStats(userId) {
  /**
   * Replace this entire function body with real DB queries.
   * It must return an object shaped like:
   * {
   *   totalMatches: number,
   *   totalWins:    number,
   *   overallWinRate: number (0-100),
   *   matches: [
   *     { result: "WIN"|"LOSS", kit: string, date: string,
   *       kills: number, bedsBroken: number }
   *   ],
   *   kitStats: [
   *     { name: string, matches: number, wins: number }
   *   ]
   * }
   */

  // ── SUPABASE EXAMPLE ────────────────────────────────────────────────────
  // const { createClient } = await import("@supabase/supabase-js");
  // const supabase = createClient(
  //   process.env.SUPABASE_URL,
  //   process.env.SUPABASE_ANON_KEY
  // );
  //
  // const { data: rows, error } = await supabase
  //   .from("matches")
  //   .select("*")
  //   .eq("roblox_user_id", userId)
  //   .order("played_at", { ascending: false })
  //   .limit(20);
  //
  // if (error) throw new Error(error.message);
  //
  // const totalMatches = rows.length;
  // const totalWins    = rows.filter(r => r.result === "WIN").length;
  // const overallWinRate = totalMatches > 0
  //   ? Math.round((totalWins / totalMatches) * 100) : 0;
  //
  // const kitMap = {};
  // for (const r of rows) {
  //   if (!kitMap[r.kit]) kitMap[r.kit] = { name: r.kit, matches: 0, wins: 0 };
  //   kitMap[r.kit].matches++;
  //   if (r.result === "WIN") kitMap[r.kit].wins++;
  // }
  //
  // return {
  //   totalMatches, totalWins, overallWinRate,
  //   matches: rows.map(r => ({
  //     result: r.result,
  //     kit: r.kit,
  //     date: new Date(r.played_at).toLocaleDateString(),
  //     kills: r.kills,
  //     bedsBroken: r.beds_broken,
  //   })),
  //   kitStats: Object.values(kitMap),
  // };

  // ── MONGODB EXAMPLE ─────────────────────────────────────────────────────
  // const { MongoClient } = await import("mongodb");
  // const client = new MongoClient(process.env.MONGODB_URI);
  // await client.connect();
  // const db = client.db("bedwars");
  // const rows = await db.collection("matches")
  //   .find({ robloxUserId: userId })
  //   .sort({ playedAt: -1 })
  //   .limit(20)
  //   .toArray();
  // await client.close();
  // ... same mapping logic as above ...

  // ── DEFAULT: return empty stats until DB is connected ───────────────────
  return {
    totalMatches: null,
    totalWins: null,
    overallWinRate: null,
    matches: [],
    kitStats: [],
  };
}

// ── MAIN HANDLER ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username } = req.query;
  if (!username || typeof username !== "string" || username.trim().length === 0) {
    return res.status(400).json({ error: "Username is required" });
  }

  const clean = username.trim();

  try {
    // ── 1. Username → UserId ────────────────────────────────────────────
    const userRes = await fetch("https://users.roproxy.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [clean], excludeBannedUsers: true }),
    });

    if (!userRes.ok) throw new Error("Failed to reach Roblox user API");
    const userData = await userRes.json();

    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({ error: `Player "${clean}" not found on Roblox` });
    }

    const { id: userId, name: username: resolvedUsername } = userData.data[0];

    // ── 2. Fetch avatar thumbnail ───────────────────────────────────────
    let avatarUrl = null;
    try {
      const avatarRes = await fetch(
        `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
      );
      if (avatarRes.ok) {
        const avatarData = await avatarRes.json();
        avatarUrl = avatarData?.data?.[0]?.imageUrl ?? null;
      }
    } catch (_) {
      // avatar is non-critical — silently skip
    }

    // ── 3. Determine rank from badges ───────────────────────────────────
    let rank = { name: "Unranked", color: "#6b7280", rgb: "107,114,128", tier: 0 };

    if (Object.keys(RANK_BADGE_MAP).length > 0) {
      try {
        let cursor = "";
        let highestTier = 0;

        // Paginate through all badges (up to 3 pages = 300 badges)
        for (let page = 0; page < 3; page++) {
          const badgeUrl = `https://badges.roproxy.com/v1/users/${userId}/badges?limit=100&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ""}`;
          const badgeRes = await fetch(badgeUrl);
          if (!badgeRes.ok) break;

          const badgeData = await badgeRes.json();
          for (const badge of badgeData.data ?? []) {
            const mapped = RANK_BADGE_MAP[String(badge.id)];
            if (mapped && mapped.tier > highestTier) {
              highestTier = mapped.tier;
              rank = mapped;
            }
          }

          cursor = badgeData.nextPageCursor;
          if (!cursor) break;
        }
      } catch (_) {
        // badge fetch is non-critical — keep default rank
      }
    }

    // ── 4. Fetch match/kit stats from your database ─────────────────────
    const stats = await fetchPlayerStats(userId);

    // ── 5. Return combined payload ───────────────────────────────────────
    return res.status(200).json({
      userId,
      username: resolvedUsername,
      avatarUrl,
      rank,
      totalMatches:   stats.totalMatches,
      totalWins:      stats.totalWins,
      overallWinRate: stats.overallWinRate,
      matches:        stats.matches,
      kitStats:       stats.kitStats,
    });

  } catch (err) {
    console.error("[/api/lookup] error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}

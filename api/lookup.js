module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const username = (req.query.username || "").trim();
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // 1. Username → UserId
    const userRes = await fetch("https://users.roproxy.com/v1/usernames/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usernames: [username], excludeBannedUsers: true }),
    });

    if (!userRes.ok) throw new Error("Failed to reach Roblox user API");
    const userData = await userRes.json();

    if (!userData.data || userData.data.length === 0) {
      return res.status(404).json({ error: `Player "${username}" not found on Roblox` });
    }

    const userId = userData.data[0].id;
    const resolvedUsername = userData.data[0].name;

    // 2. Avatar thumbnail
    let avatarUrl = null;
    try {
      const avatarRes = await fetch(
        `https://thumbnails.roproxy.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
      );
      if (avatarRes.ok) {
        const avatarData = await avatarRes.json();
        avatarUrl = avatarData && avatarData.data && avatarData.data[0]
          ? avatarData.data[0].imageUrl
          : null;
      }
    } catch (_) {}

    // 3. Rank from badges
    // TODO: Fill in real BedWars badge IDs.
    // Find them at roblox.com/games/6872265039 -> Badges tab.
    const RANK_BADGE_MAP = {
      // "1234567890": { name: "Bronze",    color: "#cd7f32", rgb: "205,127,50",  tier: 1 },
      // "1234567891": { name: "Silver",    color: "#a8a9ad", rgb: "168,169,173", tier: 2 },
      // "1234567892": { name: "Gold",      color: "#f59e0b", rgb: "245,158,11",  tier: 3 },
      // "1234567893": { name: "Platinum",  color: "#67e8f9", rgb: "103,232,249", tier: 4 },
      // "1234567894": { name: "Diamond",   color: "#38bdf8", rgb: "56,189,248",  tier: 5 },
      // "1234567895": { name: "Master",    color: "#a78bfa", rgb: "167,139,250", tier: 6 },
      // "1234567896": { name: "Nightmare", color: "#ef4444", rgb: "239,68,68",   tier: 7 },
    };

    let rank = { name: "Unranked", color: "#6b7280", rgb: "107,114,128", tier: 0 };

    if (Object.keys(RANK_BADGE_MAP).length > 0) {
      try {
        let cursor = "";
        let highestTier = 0;
        for (let page = 0; page < 3; page++) {
          const badgeUrl = `https://badges.roproxy.com/v1/users/${userId}/badges?limit=100&sortOrder=Asc${cursor ? `&cursor=${cursor}` : ""}`;
          const badgeRes = await fetch(badgeUrl);
          if (!badgeRes.ok) break;
          const badgeData = await badgeRes.json();
          for (const badge of (badgeData.data || [])) {
            const mapped = RANK_BADGE_MAP[String(badge.id)];
            if (mapped && mapped.tier > highestTier) {
              highestTier = mapped.tier;
              rank = mapped;
            }
          }
          cursor = badgeData.nextPageCursor;
          if (!cursor) break;
        }
      } catch (_) {}
    }

    return res.status(200).json({
      userId,
      username: resolvedUsername,
      avatarUrl,
      rank,
      totalMatches: null,
      totalWins: null,
      overallWinRate: null,
      matches: [],
      kitStats: [],
    });

  } catch (err) {
    console.error("[/api/lookup] error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
};

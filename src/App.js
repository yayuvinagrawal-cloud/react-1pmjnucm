import { useEffect, useMemo, useRef, useState } from "react";

function useFonts() {
  useEffect(() => {
    const id = "bw-fonts-v6";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700;800&display=swap";
    document.head.appendChild(link);
  }, []);
}

function MouseLight() {
  const [pos, setPos] = useState({ x: 50, y: 20 });
  useEffect(() => {
    const onMove = (event) => setPos({ x: (event.clientX / window.innerWidth) * 100, y: (event.clientY / window.innerHeight) * 100 });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return <div className="mouseLight" style={{ "--mx": pos.x + "%", "--my": pos.y + "%" }} />;
}

const ALL_KITS = [
  {
    name: "Cait",
    roles: ["Frontline"],
    tier: "S",
    description: "Caitlyn applies Dark Decay with attacks, dealing damage over time that grows stronger with repeated hits. Her contracts mark enemy targets, reveal their position, and upgrade Dark Decay after successful assassinations.",
    tips: "Pick contracts you can actually reach. Hit the marked target repeatedly so decay ramps before the team commits.",
  },
  {
    name: "Lassy",
    roles: ["Support", "Frontline"],
    tier: "S",
    description: "Lassy buys a lasso from the shop and throws it at enemies from range. The first enemy hit is pulled toward her and receives Grounded, limiting movement abilities for a short window.",
    tips: "Use lasso to pull bridge players, peel divers, or isolate one target for your team. The value comes from positioning control.",
  },
  {
    name: "Star",
    roles: ["Support"],
    tier: "A",
    description: "Star Collector Stella collects floating stars around the map. Consuming stars near teammates grants permanent max health or critical strike chance to Stella and nearby allies.",
    tips: "Path through star spawns while rotating with your team. Consume stars near teammates so the permanent stats are shared.",
  },
  {
    name: "Metal",
    roles: ["Economy"],
    tier: "S",
    description: "Metal Detector spawns with a detector that points toward buried treasure. Digging treasure gives resources such as iron, diamonds, and emeralds, with rewards improving as the match goes longer.",
    tips: "Use the detector between fights instead of idling generator. Call when you are digging so teammates can protect the route.",
  },
  {
    name: "Noelle",
    roles: ["Defender"],
    tier: "A",
    description: "Noelle tames slimes and uses the Slime Flute to assign them to teammates. Slimes provide unique buffs and can be directed or recalled as the fight changes.",
    tips: "Put the right slime on the teammate taking the main fight. Recall and reassign slimes before a teammate dies or rotates away.",
  },
  {
    name: "Silas",
    roles: ["Frontline", "Support"],
    tier: "A",
    description: "Silas provides a team aura that can swap between healing and damage. Press the Attack boosts the aura temporarily, while Triumph stacks give Silas damage reduction from kills or assists.",
    tips: "Stay close enough for allies to benefit from the aura. Use Press the Attack when the team is ready to fight as a group.",
  },
  {
    name: "Warden",
    roles: ["Frontline"],
    tier: "A",
    description: "Warden imprisons souls from recently killed enemies, increasing their respawn time. Active imprisoned souls grant Warden shield regeneration and extra block break speed.",
    tips: "Imprison enemies right before a push so their team respawns slower. Use the break-speed bonus to convert kills into bed pressure.",
  },
  {
    name: "Sheila",
    roles: ["Frontline"],
    tier: "B",
    description: "Sheila starts with an egg that gains progress over time and from kills. When hatched, the seahorse attacks enemies, heals allies, and evolves as more eggs are earned.",
    tips: "Take clean fights early to hatch the seahorse faster. Once evolved, fight near teammates so its damage and healing both matter.",
  },
  {
    name: "Nyx",
    roles: ["Frontline"],
    tier: "A",
    description: "Nyx charges Midnight by dealing damage. Activating Midnight gives ramping damage, armor penetration, and a small speed boost while reducing her armor during the window.",
    tips: "Start Midnight when you can keep hitting targets. Back out if the fight stalls, because the armor reduction makes wasted windows punishable.",
  },
  {
    name: "Freiya",
    roles: ["Frontline"],
    tier: "B",
    description: "Freiya applies Frost stacks with melee hits. Four stacks trigger Frostbite, and her Frost Explosion consumes active stacks for burst damage. Her Ice Sword applies extra Frost per hit.",
    tips: "Keep hitting the same target to finish Frostbite stacks. Use Frost Explosion when enemies are stacked or trying to reset.",
  },
  {
    name: "Lucia",
    roles: ["Economy", "Frontline"],
    tier: "A",
    description: "Lucia gains candy by damaging and killing enemies. Candy can be stored in her pinata, then the pinata can be broken for loot such as iron, diamonds, and emeralds.",
    tips: "Fight enough to feed candy into the pinata, then cash it before a major upgrade timing. Protect the pinata placement.",
  },
  {
    name: "Aery",
    roles: ["Frontline"],
    tier: "S",
    description: "Aery gains spirit butterflies from enemy kills. Spirit butterflies permanently increase her melee damage for the match, while her base health is reduced.",
    tips: "Play for clean kills and protect your stacks. Aery becomes stronger when she survives long enough to keep scaling.",
  },
  {
    name: "Amy",
    roles: ["Frontline", "Support"],
    tier: "B",
    description: "Axolotl Amy buys pet axolotls that empower herself and nearby teammates. Axolotls can provide shields, damage, break speed, and health regeneration.",
    tips: "Buy the axolotl that fits the next fight. Group with teammates so the buffs cover more than just Amy.",
  },
  {
    name: "Melody",
    roles: ["Support"],
    tier: "S",
    description: "Melody buys a guitar that heals the lowest-health nearby ally. Healing allies also heals Melody for most of the amount restored.",
    tips: "Stay close enough to heal the carry without standing in front. Keep line discipline so guitar healing lands during trades.",
  },
  {
    name: "Hannah",
    roles: ["Frontline"],
    tier: "A",
    description: "Hannah uses Execute to leap onto nearby low-health enemies and finish them instantly. Repeated executes temporarily raise the health threshold for the next execute.",
    tips: "Let teammates lower the target first, then execute to finish. Chain executes quickly while the threshold bonus is active.",
  },
  {
    name: "Infernal Shielder",
    roles: ["Support"],
    tier: "A",
    description: "Infernal Shielder spawns with a shield that reflects projectiles and reduces incoming damage while held. Building shield energy unlocks a leap that damages and burns enemies on impact.",
    tips: "Face projectile pressure for your team and save leap for committed fights or bridge control.",
  },
  {
    name: "Nyoka",
    roles: ["Support"],
    tier: "A",
    description: "Nyoka uses Mending Canopy to create a healing area for allies. Upgrading and charging the canopy improves its range and healing, and later tiers can disrupt enemies in the area.",
    tips: "Place canopy where the team will actually fight. Charge it before the engage so the first healing pulse matters.",
  },
  {
    name: "Fisher",
    roles: ["Economy", "Defender"],
    tier: "A",
    description: "Fisherman buys a fishing rod and fishes from the void through a timing minigame. Different catch zones reward different items and resources.",
    tips: "Fish during low-pressure moments and defend while scaling. Stop fishing when the enemy bed breaker disappears.",
  },
  {
    name: "Pirate Davey",
    roles: ["Bed Breaker"],
    tier: "A",
    description: "Pirate Davey uses cannons to fire TNT, siege TNT, and players across the map. He also gets discounted TNT for faster bed pressure.",
    tips: "Use cannons to create bed angles and force defenders to move. Bring enough TNT before committing.",
  },
  {
    name: "Umbra",
    roles: ["Support", "Bed Breaker"],
    tier: "A",
    description: "Umbra throws a teleport hat onto players and can teleport to the marked target from anywhere. Teleporting gives nearby allies movement speed and disrupts enemies at the destination.",
    tips: "Tag a teammate before a push or an enemy before a collapse. Time the teleport so the team arrives with you.",
  },
  {
    name: "Archer",
    roles: ["Ranged"],
    tier: "C",
    description: "Archer deals extra projectile damage and gains access to tactical ranged weapons such as the Tactical Crossbow and Tactical Headhunter.",
    tips: "Take high ground and punish exposed bridges. Archer value drops when enemies force close fights.",
  },
  {
    name: "Umeko",
    roles: ["Ranged"],
    tier: "B",
    description: "Umeko buys chakrams that can be charged and thrown for mid-range damage. Chakrams pierce enemies, return to Umeko, and gain armor penetration at higher tiers.",
    tips: "Throw chakrams through groups or narrow bridges. Keep a melee weapon ready for enemies who close the gap.",
  },
  {
    name: "Uma",
    roles: ["Ranged"],
    tier: "B",
    description: "Uma uses a Spirit Staff to direct spirit beetles. Beetles can damage enemies, heal allies, or collect nearby resources, and spirit upgrades make them stronger.",
    tips: "Choose the beetle type for the moment: damage for fights, healing for saves, resource beetles while rotating.",
  },
  {
    name: "Wren",
    roles: ["Defender", "Support"],
    tier: "B",
    description: "Wren summons a black market shop that offers potions and discounted items. Shadow coins from fallen players upgrade the shop and reroll deals, and Wren earns a cut from purchases.",
    tips: "Place the shop where allies can buy safely. Upgrade it before long mid-game fights so potions are available.",
  },
  {
    name: "Whim",
    roles: ["Ranged"],
    tier: "C",
    description: "Whim spawns with a Mage Spellbook that fires magic orbs. Tomes appear during the match and unlock elemental effects for the spellbook.",
    tips: "Collect tomes as soon as the route is safe. Use orb pressure before melee commits because Whim is weaker in sword trades.",
  },
  {
    name: "Farmer",
    roles: ["Economy"],
    tier: "B",
    description: "Farmer Cletus buys seeds and grows crops. Mature crops can produce resources such as iron, diamonds, emeralds, or pumpkin items depending on the crop.",
    tips: "Plant crops in protected spots and harvest on timing. Farming works best when teammates can cover early pressure.",
  },
  {
    name: "Beekeeper",
    roles: ["Economy"],
    tier: "B",
    description: "Beekeeper Beatrix catches bees with a bee net and places them in beehives. Beehives generate iron and can produce emeralds when enough bees are inserted.",
    tips: "Collect bees while rotating through mid. Keep hives protected so the economy keeps paying out.",
  },
  {
    name: "Eldertree",
    roles: ["Frontline"],
    tier: "B",
    description: "Eldertree collects tree orbs around the map to gain size, max health, and knockback resistance. Eldertree cannot buy or equip armor.",
    tips: "Rotate for orbs early and use the health lead to take space. Watch armor-based damage spikes from geared enemies.",
  },
  {
    name: "Baker",
    roles: ["Support", "Defender"],
    tier: "A",
    description: "Baker buys healing apples, golden apples, and speed pies. Baker also starts with a Knockback Baguette for displacement.",
    tips: "Give food to the teammate taking the main fight. Speed pies are strongest before a planned push or chase.",
  },
  {
    name: "Whisper",
    roles: ["Support"],
    tier: "A",
    description: "Whisper controls a Spirit Owl that supports a chosen ally. The owl can heal, grant speed, lift allies from danger, and fire projectiles.",
    tips: "Attach the owl to the carry before the fight starts. Stay positioned safely while controlling owl support.",
  },
  {
    name: "Ragnar",
    roles: ["Bed Breaker"],
    tier: "B",
    description: "Ragnar gets discounted tools and Berserker Rage. Berserker Rage increases block breaking power, reduces incoming damage, and gives temporary knockback resistance.",
    tips: "Activate Rage right before entering a bed defense. Save blocks or support utility for the exit after the break attempt.",
  },
  {
    name: "Triton",
    roles: ["Bed Breaker"],
    tier: "B",
    description: "Triton buys a trident that can be thrown at walls or enemies. Hitting a valid target lets Triton leap to it, latch to walls, or damage and stun enemies.",
    tips: "Use trident throws for fast entry angles and bridge picks. Track the cooldown before diving deep.",
  },
  {
    name: "Sigrid",
    roles: ["Bed Breaker"],
    tier: "B",
    description: "Sigrid rides an elk mount for speed and jump boosts. The elk can ram enemies, dealing damage and knocking them upward while consuming stamina.",
    tips: "Use the elk to start fights or displace defenders. Dismount before you need normal weapons and tools.",
  },
  {
    name: "Dino Tamer",
    roles: ["Bed Breaker"],
    tier: "C",
    description: "Dino Tamer Dom buys a dino mount. Dino Charge rushes forward, breaks nearby blocks on impact, and damages or knocks back nearby players.",
    tips: "Aim charge into bed defenses after teammates create space. The mount disappears after dismounting, so commit with purpose.",
  },
  {
    name: "Zeno",
    roles: ["Support", "Ranged"],
    tier: "A",
    description: "Zeno spawns with a Wizard Staff that calls lightning strikes and applies Zapped. Staff upgrades increase its range, charges, and available abilities.",
    tips: "Use lightning to chip grouped enemies before melee fights. Preserve charges for bridge fights and resets.",
  },
  {
    name: "Zola",
    roles: ["Defender"],
    tier: "B",
    description: "Zola links enemies so damage to one linked target spreads bonus damage to the others. Zola can also link allies and take part of their incoming damage.",
    tips: "Link grouped enemies before burst damage lands. Use ally links to protect the teammate carrying the fight.",
  },
  {
    name: "Lani",
    roles: ["Support", "Bed Breaker"],
    tier: "B",
    description: "Lani buys a Scepter of Light that lets her fly to an ally, heal them, and grant nearby teammates damage reduction. The scepter is consumed on use.",
    tips: "Hold the scepter for the teammate who is about to die or dive bed. Cast before the fight fully collapses.",
  },
  {
    name: "Smoke",
    roles: ["Bed Breaker"],
    tier: "A",
    description: "Smoke buys smoke bombs for invisibility and smoke blocks for cover. Attacking, building, or breaking while invisible ends the smoke bomb effect.",
    tips: "Use smoke to enter bed angles unseen, then act once you are already in position. Smoke blocks can hide rotations and name tags.",
  },
  {
    name: "Marina",
    roles: ["Defender"],
    tier: "B",
    description: "Marina places jellyfish that connect to each other. Electric Pulse makes placed jellyfish zap nearby enemies, with connected jellyfish increasing range and power.",
    tips: "Place jellyfish around the bed or choke points. Connect them before activating pulse for stronger area control.",
  },
  {
    name: "Barbarian",
    roles: ["Frontline"],
    tier: "B",
    description: "Barbarian builds rage by damaging enemies instead of buying sword upgrades. Filling the rage bar upgrades his sword, and the final upgrade replaces Emerald Sword with Rageblade.",
    tips: "Trade damage early to build rage, then protect the upgraded sword timing. Pair with support so rage progress turns into fight wins.",
  },
  {
    name: "Grim Reaper",
    roles: ["Frontline", "Bed Breaker"],
    tier: "B",
    description: "Grim Reaper collects soul orbs from kills or assists. Consuming a soul rapidly heals him, boosts movement speed, and grants brief invulnerability, but he cannot attack or break blocks while consuming.",
    tips: "Chain a soul after a pick to reset, escape, or re-enter. Plan fights around confirmed kills and assists.",
  },
  {
    name: "Ares",
    roles: ["Ranged"],
    tier: "A",
    kitClass: "Ranged",
    kitRoles: ["SJ", "MJ"],
    description: "Ares buys throwing spears that deal burst damage with armor penetration, knock back enemies in a small impact radius, and apply Zapped. Spear final hits return the spear.",
    tips: "Use spear AOE and knockback to control bridges or sky fights before your melee commit. Keep enough iron for the next spear cycle.",
  },
  {
    name: "Styx",
    roles: ["Bed Breaker", "Support"],
    tier: "S",
    kitClass: "Movement",
    kitRoles: ["Bypass"],
    description: "Styx places a Confluence Portal and links it to a second portal created when she kills an enemy. Styx and teammates can travel between the linked portals while the enemy-side portal is active.",
    tips: "Place the first portal where teammates can safely enter. Create the link from a kill near the target base, then flood through together.",
  },
  {
    name: "Kaida",
    roles: ["Frontline", "Bed Breaker"],
    tier: "S",
    kitClass: "Fighter",
    kitRoles: ["Bypass", "Early Game", "MJ", "SJ"],
    description: "Kaida uses Summoner Claws instead of swords. Her summon grows a rune under her feet and calls a dragon head for area damage, with successful summons upgrading the dragon.",
    tips: "Start summons when defenders are grouped or stuck fighting. Use claw range to keep pressure while the team enters.",
  },
  {
    name: "Lian",
    roles: ["Frontline", "Bed Breaker"],
    tier: "A",
    kitClass: "Fighter",
    kitRoles: ["Bypass", "SJ damage"],
    description: "Lian fights with three Dragon Swords. R throws one sword at a nearby target for 70% of her strongest melee weapon damage, each sword regenerates after 12 seconds, and Q slams current swords in an AOE for 135% weapon damage plus burn with a 15 second cooldown.",
    tips: "Track how many swords are ready before committing. R can finish or soften targets, while Q is best when enemies are grouped or stuck defending bed.",
  },
  {
    name: "Crypt",
    roles: ["Support", "Bed Breaker"],
    tier: "A",
    kitClass: "Fighter (Necromancer)",
    kitRoles: ["Bypass"],
    description: "Crypt claims souls from gravestones created by enemy deaths. His Necromancer Staff summons skeletons that chase enemies and inherit the defeated enemy's strongest melee weapon and helmet.",
    tips: "Collect early gravestones, then direct or recall skeletons so they pressure the right fight. Skeletons add the most value beside a clean team entry.",
  },
  {
    name: "Sophia",
    roles: ["Ranged", "Support"],
    tier: "A",
    kitClass: "Ranged",
    kitRoles: ["Control"],
    description: "Sophia uses a Frost Staff to slow and freeze enemies. The staff has projectile and frost mist modes, and its attacks deal armor-piercing frost damage.",
    tips: "Use Sophia to slow pushes and make targets easier to collapse on. Remember she spawns with a magic wand instead of a normal wooden sword, so avoid taking raw melee trades early.",
  },
];

const META_BUILDS = [
  {
    name: "Kaida / Kaida / Warden / Styx / Styx",
    tag: "Bypass Rush",
    tier: "S",
    icon: "◆",
    accentA: "#d6a7ff",
    accentB: "#27c8ff",
    roles: ["Frontline", "Frontline", "Frontline", "Bed Breaker", "Bed Breaker"],
    why: "This is S tier for fast bypass because double Styx gives repeat portal pressure, double Kaida brings AOE entry burst, and Warden anchors the fight so the rush does not crumble on entry.",
    early: "Both Styx players set portal angles while Warden leads the first fight. The Kaidas should punish grouped defenders with claw and summon AOE to force the bed area open.",
    mid: "Chain the portals so the team keeps re-entering together. Warden holds space while both Kaidas punish grouped defenders with dragon claw AOE.",
    win: "Break bed in the first 2-3 minutes by overwhelming the enemy base through two Styx portal lanes and nonstop Kaida burst.",
    bestInto: "Slow scaling comps, weak defenders, and teams that overcommit to mid.",
    weakness: "Needs coordinated portal timing. If both Styx players lose their portal angle or the Kaidas split, the rush loses its pressure.",
  },
   {
  name: "Infernal Shielder / Zeno / Zeno / Metal / Noelle",
  tag: "Shield Static Core",
  tier: "S",
  icon: "▣",
  accentA: "#38bdf8",
  accentB: "#7c3aed",
  roles: ["Support", "Support", "Ranged", "Economy", "Defender"],
  why: "This is S tier because Shielder stalls pushes, double Zeno gives nonstop static/chip pressure, Metal scales, and Noelle keeps bed safe.",
  early: "Play safe and protect Metal. Shielder blocks projectile pressure while Zenos chip from behind.",
  mid: "Group around Shielder and let double Zeno make enemies unable to heal or reset cleanly.",
  win: "Outscale with Metal, stall fights with Shielder, then win through static pressure and grouped pushes.",
  bestInto: "Projectile teams, slow sustain comps, and teams that rely on healing.",
  weakness: "Needs discipline because there is no hard bed breaker kit.",
},
{
  name: "Infernal Shielder / Nyoka / Silas / Metal / Noelle",
  tag: "Shield Aura Sustain",
  tier: "A",
  icon: "◇",
  accentA: "#22d3ee",
  accentB: "#0f766e",
  roles: ["Support", "Support", "Frontline", "Economy", "Defender"],
  why: "This is A tier because Shielder stalls and protects, Nyoka gets value safely, Silas buffs grouped fights, Metal scales, and Noelle defends.",
  early: "Stay grouped around Silas while Metal gets value and Noelle watches bed.",
  mid: "Fight grouped around Silas aura. Shielder blocks ranged pressure so Nyoka can play safely.",
  win: "Win long grouped fights through aura, stall, and Metal scaling, then convert with TNT and pressure.",
  bestInto: "Teams that spam projectiles or take long grouped fights.",
  weakness: "Less direct bed break pressure, so you need TNT and clean fight wins.",
},
  {
    name: "Cait / Lassy / Star / Metal / Noelle",
    tag: "Most Reliable",
    tier: "S",
    icon: "◎",
    accentA: "#38bdf8",
    accentB: "#2563eb",
    roles: ["Frontline", "Support", "Support", "Economy", "Defender"],
    why: "This is the safest all-around 5v5 core. Cait creates kill pressure, Lassy sets picks, Star stabilizes fights, Metal scales, and Noelle keeps bed safe.",
    early: "Take controlled fights. Cait and Lassy pressure together while Metal gets value and Noelle watches bed.",
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
    name: "Pirate Davey / Umbra / Umbra / Fisher / Fisher",
    tag: "Bed Pressure",
    tier: "A+",
    icon: "◆",
    accentA: "#93c5fd",
    accentB: "#3b82f6",
    roles: ["Bed Breaker", "Support", "Bed Breaker", "Economy", "Defender"],
    why: "Pirate Davey and Umbra give real bed-break threat. Umbra creates space, Fisher scales.",
    early: "Scout bed angles while Fisher scales, then send Umbra and Pirate Davey on a timed bed break.",
    mid: "Use Umbra to split defenders, then Pirate Davey hits the bed angle.",
    win: "Break bed off one bad enemy rotation, then finish with the economy lead.",
    bestInto: "Slow teams and defenders who overrotate.",
    weakness: "Needs timing. If bed breakers go in before the fight starts, they feed.",
  },
  {
    name: "Lucia / Umbra / Baker / Whisper / Lassy",
    tag: "Macro Break",
    tier: "A+",
    icon: "✧",
    accentA: "#a78bfa",
    accentB: "#2563eb",
    roles: ["Economy", "Support", "Support", "Support", "Bed Breaker"],
    why: "Lucia gives economy and fight value, Umbra and Whisper give control, Baker gives heals and pies, and Lassy sets up pick pressure.",
    early: "Lucia should get value without dying. Baker and Whisper keep the team stable.",
    mid: "Use Umbra/Whisper utility to force bad enemy positioning. Lassy waits for the bed angle.",
    win: "Use macro and utility to make enemies rotate wrong, then turn the numbers advantage into bed pressure.",
    bestInto: "Messy teams that chase too hard.",
    weakness: "Needs clean calls because it has less raw main-jugg power.",
  },
];

const ROLE_GUIDE = [
  {
    role: "Frontline",
    icon: "⚔",
    job: "Main jugg. Starts fights, takes space, protects support, and creates pressure by winning trades.",
    kits: ["Cait", "Silas", "Warden", "Sheila", "Nyx", "Freiya", "Lucia", "Aery", "Hannah", "Eldertree", "Lassy", "Kaida", "Lian", "Barbarian", "Grim Reaper"],
  },
  {
    role: "Support",
    icon: "✚",
    job: "Keeps fights clean with healing, setup, static/chip pressure, peel, or utility.",
    kits: ["Star", "Lassy", "Melody", "Infernal Shielder", "Nyoka", "Baker", "Whisper", "Umbra", "Lani", "Zeno", "Styx", "Crypt", "Sophia"],
  },
  {
    role: "Economy",
    icon: "⬡",
    job: "Builds the gear lead so the team can avoid bad early fights.",
    kits: ["Metal", "Fisher", "Farmer", "Lucia", "Beekeeper"],
  },
  {
    role: "Defender",
    icon: "⬢",
    job: "Protects bed, watches incoming pressure, and stops free breaks.",
    kits: ["Noelle", "Wren", "Baker", "Fisher", "Zola", "Marina", "Infernal Shielder"],
  },
  {
    role: "Bed Breaker",
    icon: "◆",
    job: "Finds openings and converts won fights into bed breaks.",
    kits: ["Pirate Davey", "Umbra", "Ragnar", "Triton", "Sigrid", "Dino Tamer", "Smoke", "Lani", "Styx", "Kaida", "Lian", "Crypt", "Grim Reaper"],
  },
  {
    role: "Ranged",
    icon: "⌁",
    job: "Chips teams before fights and controls bridges from distance.",
    kits: ["Archer", "Uma", "Umeko", "Whim", "Zeno", "Ares", "Sophia"],
  },
];

const COUNTERS = [
  {
    title: "Against Cait Pressure",
    icon: "☠",
    plan: "Deny Cait free contract value. Keep economy kits protected and force Cait to fight through your frontline.",
    good: ["Lassy", "Noelle", "Wren", "Silas"],
    avoid: "Long messy fights where Cait keeps getting resets.",
  },
  {
    title: "Against Melody Pocket",
    icon: "♪",
    plan: "Avoid endless trades into healing. Burst one target fast, split Melody from the main jugg, or force bed pressure.",
    good: ["Cait", "Lassy", "Zeno", "Pirate Davey"],
    avoid: "Standing in front of them and trading forever.",
  },
  {
    title: "Against Smoke / Pirate Davey",
    icon: "◆",
    plan: "Track bed breakers at all times. If Smoke or Pirate Davey disappears, stop chasing and check bed.",
    good: ["Noelle", "Wren", "Lassy", "Baker", "Infernal Shielder"],
    avoid: "Leaving base empty after one won fight.",
  },
  {
    title: "Against Bow Spam / Projectile Pressure",
    icon: "⌁",
    plan: "Use Infernal Shielder to stall bridge pressure and let your team walk up without getting chipped for free.",
    good: ["Infernal Shielder", "Nyoka", "Baker", "Whisper"],
    avoid: "Running one by one through ranged spam with no shield or sustain.",
  },
];

const TIMING = [
  { time: "0:00–1:30", title: "Open Clean", text: "Get blocks, basic weapon pressure, and early map info. Protect your first life." },
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


const ROLE_STYLES = {
  Frontline: { c: "#fb7185", bg: "rgba(251,113,133,.12)", b: "rgba(251,113,133,.32)" },
  Support: { c: "#22d3ee", bg: "rgba(34,211,238,.12)", b: "rgba(34,211,238,.32)" },
  Economy: { c: "#fbbf24", bg: "rgba(251,191,36,.12)", b: "rgba(251,191,36,.32)" },
  Defender: { c: "#60a5fa", bg: "rgba(96,165,250,.12)", b: "rgba(96,165,250,.32)" },
  "Bed Breaker": { c: "#c084fc", bg: "rgba(192,132,252,.12)", b: "rgba(192,132,252,.32)" },
  Ranged: { c: "#f472b6", bg: "rgba(244,114,182,.12)", b: "rgba(244,114,182,.32)" },
};
const TIER_STYLES = {
  S: { c: "#fbbf24", bg: "rgba(251,191,36,.16)", b: "rgba(251,191,36,.45)", glow: "rgba(251,191,36,.32)" },
  "A+": { c: "#38bdf8", bg: "rgba(56,189,248,.14)", b: "rgba(56,189,248,.38)", glow: "rgba(56,189,248,.25)" },
  A: { c: "#60a5fa", bg: "rgba(96,165,250,.13)", b: "rgba(96,165,250,.34)", glow: "rgba(96,165,250,.2)" },
  B: { c: "#cbd5e1", bg: "rgba(148,163,184,.12)", b: "rgba(203,213,225,.24)", glow: "rgba(148,163,184,.16)" },
  C: { c: "#f87171", bg: "rgba(248,113,113,.13)", b: "rgba(248,113,113,.34)", glow: "rgba(248,113,113,.2)" },
};
const NAV_ITEMS = [{ key: "home", label: "Home" }, { key: "meta", label: "Meta" }, { key: "draft", label: "Draft" }, { key: "kits", label: "Kits" }, { key: "guide", label: "Guide" }];
function getKit(name) { return ALL_KITS.find((kit) => kit.name === name); }
function unique(items) { return [...new Set(items.filter(Boolean))]; }
function roleStyle(role) { return ROLE_STYLES[role] || { c: "#94a3b8", bg: "rgba(148,163,184,.1)", b: "rgba(148,163,184,.22)" }; }
function tierStyle(tier) { return TIER_STYLES[tier] || TIER_STYLES.B; }
function RoleTag({ role, compact = false }) { const s = roleStyle(role); return <span className={"roleTag" + (compact ? " compact" : "")} style={{ color: s.c, background: s.bg, borderColor: s.b }}>{role}</span>; }
function TierBadge({ tier, large = false }) { const s = tierStyle(tier); return <span className={"tierBadge" + (large ? " large" : "")} style={{ color: s.c, background: s.bg, borderColor: s.b, boxShadow: "0 0 18px " + s.glow }}>{tier || "B"}</span>; }
function useReveal() { const ref = useRef(null); const [visible, setVisible] = useState(false); useEffect(() => { const node = ref.current; if (!node) return undefined; const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(entry.target); } }, { threshold: .12, rootMargin: "0px 0px -50px 0px" }); observer.observe(node); return () => observer.disconnect(); }, []); return [ref, visible]; }
function Reveal({ children, className = "" }) { const [ref, visible] = useReveal(); return <div ref={ref} className={"reveal " + (visible ? "in " : "") + className}>{children}</div>; }
function RippleButton({ children, className = "", onClick, ...props }) { const down = (event) => { const target = event.currentTarget; const rect = target.getBoundingClientRect(); const ripple = document.createElement("span"); ripple.className = "ripple"; ripple.style.left = (event.clientX - rect.left) + "px"; ripple.style.top = (event.clientY - rect.top) + "px"; target.appendChild(ripple); window.setTimeout(() => ripple.remove(), 620); }; return <button className={"rippleBtn " + className} onPointerDown={down} onClick={onClick} {...props}>{children}</button>; }
function CountUp({ value, suffix = "" }) { return <>{value}{suffix}</>; }
function TopNav({ tab, setTab }) { const [open, setOpen] = useState(false); const go = (next) => { setTab(next); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }; return <header className="topNav"><button className="brand" onClick={() => go("home")}><span className="brandDot" /><span>BW META</span></button><nav className="desktopLinks">{NAV_ITEMS.map((item) => <button key={item.key} className={"navLink " + (tab === item.key ? "active" : "")} onClick={() => go(item.key)}>{item.label}</button>)}</nav><div className="navRight"><span className="creatorBadge">by justcyril</span><span className="seasonBadge">Wiki checked</span><button className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu"><span /><span /><span /></button></div><div className={"mobilePanel " + (open ? "open" : "")}><div className="mobilePanelTop"><span className="seasonBadge mobile">Wiki checked</span><button onClick={() => setOpen(false)}>×</button></div><span className="creatorBadge mobileCreator">made by justcyril</span>{NAV_ITEMS.map((item) => <button key={item.key} className={"mobileNavLink " + (tab === item.key ? "active" : "")} onClick={() => go(item.key)}>{item.label}</button>)}</div></header>; }
function SectionHeader({ eyebrow, title, subtitle, align = "left" }) { return <div className={"sectionHeader " + (align === "center" ? "center" : "")}><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>; }
function Hero({ setTab }) { const particles = Array.from({ length: 22 }, (_, i) => i); const watchlist = ["Kaida", "Styx", "Metal", "Cait", "Aery", "Lassy", "Ares", "Sophia"]; return <section className="hero"><div className="heroGridOverlay" /><div className="heroGlow" /><div className="particles">{particles.map((item) => <span key={item} style={{ "--i": item, "--x": ((item * 47) % 100) + "%", "--y": (10 + ((item * 29) % 76)) + "%" }} />)}</div><div className="heroInner"><div className="heroKicker">Ranked Competitive Index</div><div className="heroCredit">Made by justcyril</div><h1><span>DOMINATE 5v5.</span><span>BUILD <em>SMARTER.</em></span></h1><p>A BedWars meta guide with source-checked kit mechanics, draft tools, and strategy for serious players.</p><div className="heroActions"><RippleButton className="btn primary" onClick={() => setTab("meta")}>View Meta Builds</RippleButton><RippleButton className="btn outline" onClick={() => setTab("draft")}>Build Your Draft</RippleButton></div><div className="heroFeatured"><span className="heroFeaturedLabel">Kit watchlist</span><div>{watchlist.map((name) => <button key={name} onClick={() => setTab("kits")}>{name}</button>)}</div></div><div className="heroStats"><div><strong><CountUp value={ALL_KITS.length} /></strong><span>Kits tracked</span></div><div><strong><CountUp value={META_BUILDS.length} /></strong><span>Meta builds</span></div><div><strong><CountUp value={ROLE_GUIDE.length} /></strong><span>Roles covered</span></div><div><strong>May 18</strong><span>Wiki checked</span></div></div></div></section>; }

function HomeCommandCenter({ setTab }) { const cards = [{ label: "Best Meta Core", title: "Kaida / Kaida / Warden / Styx / Styx", text: "Fast bypass pressure with double portal lanes and massive AOE entry damage.", action: "Open Meta", tab: "meta" }, { label: "Draft Lab", title: "Score Your 5v5", text: "Build a team, check missing roles, and get an instant win condition.", action: "Build Draft", tab: "draft" }, { label: "Kit Database", title: "Find S-tier Picks", text: "Filter by Bypass, SJ/MJ, tier, or role and read practical kit notes.", action: "Browse Kits", tab: "kits" }]; return <Reveal><section className="section commandSection"><div className="commandGrid">{cards.map((card) => <button key={card.label} className="commandCard interactiveCard" onClick={() => setTab(card.tab)}><span>{card.label}</span><h3>{card.title}</h3><p>{card.text}</p><em>{card.action}</em></button>)}</div></section></Reveal>; }
function BuildCard({ build, index }) { const [open, setOpen] = useState(index === 0); const s = tierStyle(build.tier); const rows = [["Early", build.early], ["Mid", build.mid], ["Win", build.win], ["Best Into", build.bestInto], ["Weakness", build.weakness]]; return <article className={"buildCard interactiveCard " + (build.tier === "S" ? "sTier" : "")} style={{ "--accent": s.c, "--delay": (index * 55) + "ms" }}><button className="buildHeader" onClick={() => setOpen((v) => !v)}><span className="accentBar" /><div className="buildMain"><div className="buildMetaLine"><span className="buildTag">{build.tag}</span><TierBadge tier={build.tier} large /></div><h3>{build.name}</h3><div className="roleTags">{build.roles.map((role, i) => <RoleTag key={role + "-" + i} role={role} compact />)}</div><p>{build.why}</p></div><span className="breakdownBtn">{open ? "Hide breakdown" : "See full breakdown"}</span></button>{open && <div className="buildBreakdown">{rows.map(([label, text]) => <div key={label} className={"infoTile " + (label === "Weakness" ? "danger" : "")}><span>{label}</span><p>{text}</p></div>)}</div>}</article>; }
function MetaBuilds() { const builds = useMemo(() => [...META_BUILDS], []); return <Reveal><section className="section"><SectionHeader eyebrow="RANKED META" title="Top 5v5 Builds" subtitle="Team cores with phase plans, role shape, and win conditions." /><div className="buildList">{builds.map((build, index) => <BuildCard key={build.name} build={build} index={index} />)}</div></section></Reveal>; }
function evaluateDraft(picks) { const chosen = picks.map(getKit).filter(Boolean); const has = (role) => chosen.some((kit) => kit.roles.includes(role)); const hasKit = (name) => picks.includes(name); const roles = { Frontline: has("Frontline"), Support: has("Support"), Economy: has("Economy"), Defender: has("Defender"), "Bed Breaker": has("Bed Breaker"), Ranged: has("Ranged") }; const late = roles.Economy || ["Melody", "Fisher", "Metal", "Beekeeper", "Farmer", "Zeno", "Warden", "Noelle", "Infernal Shielder", "Nyoka"].some(hasKit); let score = 0; if (roles.Frontline) score += 25; if (roles.Support) score += 25; if (roles.Economy) score += 25; if (roles.Defender) score += 15; if (roles["Bed Breaker"]) score += 10; if (roles.Ranged && score < 100) score += 5; if (!roles["Bed Breaker"] && late && roles.Frontline && roles.Support && roles.Economy) score += 10; score = Math.min(score, 100); const synergies = []; if (hasKit("Styx") && hasKit("Kaida") && hasKit("Lian") && hasKit("Crypt")) synergies.push("Bypass core: Styx opens the portal while Kaida, Lian, and Crypt flood the enemy base."); if (hasKit("Cait") && hasKit("Lassy")) synergies.push("Cait + Lassy turns one pull into contract value."); if (hasKit("Pirate Davey") && hasKit("Umbra")) synergies.push("Pirate Davey + Umbra creates real bed-break windows."); if (hasKit("Melody") && chosen.some((kit) => kit.roles.includes("Frontline"))) synergies.push("Melody pocket makes the frontline much harder to trade into."); if (hasKit("Zeno")) synergies.push("Zeno chip makes resets and healing much weaker."); if (hasKit("Infernal Shielder")) synergies.push("Infernal Shielder stabilizes bridge fights and blocks projectile pressure."); if (hasKit("Ares")) synergies.push("Ares spear knockback controls SJ and MJ fights."); const verdict = score >= 95 ? "ELITE" : score >= 80 ? "STRONG" : score >= 60 ? "PLAYABLE" : "RISKY"; return { score, verdict, roles, synergies }; }
function analyzeDraft(picks) { const chosen = picks.map(getKit).filter(Boolean); const names = picks; const hasKit = (name) => names.includes(name); const hasRole = (role) => chosen.some((kit) => kit.roles.includes(role)); const evaluation = evaluateDraft(picks); const strengths = []; const weaknesses = []; const tips = []; let playstyle = "Balanced Core"; let timing = "Mid"; if (hasRole("Frontline")) strengths.push("Frontline presence can take space and start real fights."); if (hasRole("Support")) strengths.push("Support utility keeps the carry alive and helps fights stay clean."); if (hasRole("Economy")) strengths.push("Economy lets the team scale without forcing bad early fights."); if (hasRole("Defender")) strengths.push("Defender coverage protects bed while the team rotates."); if (hasRole("Bed Breaker")) strengths.push("Bed break threat converts won fights into objective pressure."); if (hasRole("Ranged")) strengths.push("Ranged chip softens targets before melee commits."); if (!hasRole("Frontline")) weaknesses.push("Missing a main jugg/frontline makes space hard to take."); if (!hasRole("Support")) weaknesses.push("Missing support means fewer saves, peels, and clean engages."); if (!hasRole("Economy")) weaknesses.push("No economy kit means the team must win early or fall behind."); if (!hasRole("Defender")) weaknesses.push("No true defender leaves bed open to bypass and split pressure."); if (!hasRole("Bed Breaker")) weaknesses.push("No bed breaker can make clean fight wins harder to convert."); if (hasKit("Cait") && hasKit("Lassy")) { playstyle = "Pick Core"; tips.push("Use Lassy pull to isolate one player, then Cait should finish for contract value."); } if (hasKit("Pirate Davey") && hasKit("Umbra")) { playstyle = "Bed Break"; tips.push("Umbra should split defenders before Pirate Davey commits to the bed break."); } if (hasKit("Warden") && hasKit("Melody")) { playstyle = "Sustain Core"; timing = "Late"; tips.push("Stay close to Melody and force long fights where healing matters."); } if (hasKit("Zeno")) { playstyle = "Static Control"; tips.push("Let the main jugg start, then Zeno follows with chip so enemies cannot reset."); } if (hasKit("Infernal Shielder")) { playstyle = "Stall Support"; timing = "Mid/Late"; tips.push("Fight grouped so the shield protects the push instead of only one player."); } if (hasKit("Styx") && hasKit("Kaida") && hasKit("Lian") && hasKit("Crypt")) { playstyle = "Bypass Rush"; timing = "Early"; tips.push("Styx creates the portal angle, then Kaida and Lian burst while Crypt stacks skeleton pressure."); } const summaries = { "Bypass Rush": "This is a fast bypass comp. Rush early, skip scaling, and aim to break bed before 3 minutes.", "Pick Core": "This is a pick-based comp. Isolate one target, convert kills into value, then push before the reset.", "Sustain Core": "This is a sustain comp that wins long fights. Stay near Melody, avoid splits, and make enemy trades feel useless.", "Bed Break": "This comp has real bed break threat. Win a fight first, then immediately send the bed breaker before defenders reset.", "Static Control": "Zeno ranged chip makes enemies barely heal between fights. Let the main jugg start, then Zeno follows up.", "Stall Support": "Infernal Shielder stalls pushes and blocks bridge spam. Fight grouped so the shield protects everyone.", "Balanced Core": "Balanced comp. Fight grouped, call one target at a time, and convert wins into bed pressure." }; if (weaknesses.length === 0) weaknesses.push("Main risk is discipline: splitting, chasing, or leaving bed open can throw the comp."); return { playstyle, timing, summary: summaries[playstyle], strengths: unique(strengths).slice(0, 5), weaknesses: unique(weaknesses).slice(0, 4), synergies: evaluation.synergies, winCondition: hasRole("Bed Breaker") ? "Win one fight cleanly, force defenders away, then send the bed breaker before they reset." : "Protect economy and support early, win grouped fights, then convert with TNT and gear lead.", tip: tips[0] || "Fight 2-3 grouped, call one target, and never chase so far that bed or support gets picked." }; }
function ScoreRing({ score }) { const [shown, setShown] = useState(0); const radius = 78; const circumference = 2 * Math.PI * radius; const color = score >= 80 ? "var(--green)" : score >= 60 ? "var(--gold)" : "var(--red)"; useEffect(() => { let frame; let current = 0; const start = performance.now(); const tick = (now) => { const p = Math.min(1, (now - start) / 1000); const eased = 1 - Math.pow(1 - p, 3); current = Math.round(score * eased); setShown(current); if (p < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [score]); return <div className="scoreRing" style={{ "--scoreColor": color }}><svg viewBox="0 0 190 190"><circle cx="95" cy="95" r={radius} className="ringTrack" /><circle cx="95" cy="95" r={radius} className="ringProgress" strokeDasharray={circumference} strokeDashoffset={circumference - (shown / 100) * circumference} /></svg><div className="scoreText"><strong>{shown}</strong><span>/100</span></div></div>; }
function KitPicker({ activeSlot, picks, onPick, onClose }) { const [query, setQuery] = useState(""); const rank = { S: 0, A: 1, B: 2, C: 3 }; const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return [...ALL_KITS].filter((kit) => !q || [kit.name, ...(kit.roles || []), ...(kit.kitRoles || []), kit.description, kit.tips].filter(Boolean).join(" ").toLowerCase().includes(q)).sort((a, b) => (rank[a.tier] ?? 3) - (rank[b.tier] ?? 3) || a.name.localeCompare(b.name)); }, [query]); if (activeSlot === null) return null; return <div className="pickerBackdrop" onMouseDown={onClose}><div className="kitPicker" onMouseDown={(e) => e.stopPropagation()}><div className="pickerTop"><div><span className="eyebrow">Slot {activeSlot + 1}</span><h3>Select a kit</h3></div><button onClick={onClose}>×</button></div><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kits, roles, tiers..." /><div className="pickerList">{filtered.map((kit) => <button key={kit.name} className={"pickerItem " + (picks.includes(kit.name) ? "picked" : "")} onClick={() => onPick(kit.name)}><span><strong>{kit.name}</strong><small>{kit.roles.join(" / ")}</small></span><TierBadge tier={kit.tier} /></button>)}</div></div></div>; }
function DraftBuilder() { const [picks, setPicks] = useState(["Cait", "Lassy", "Star", "Metal", "Noelle"]); const [activeSlot, setActiveSlot] = useState(null); const [loading, setLoading] = useState(false); const evaluation = useMemo(() => evaluateDraft(picks), [picks]); const analysis = useMemo(() => analyzeDraft(picks), [picks]); const updatePick = (slot, kitName) => { setPicks((current) => current.map((pick, index) => (index === slot ? kitName : pick))); setActiveSlot(null); }; const loadComp = (next) => { setPicks(next); setLoading(true); window.setTimeout(() => setLoading(false), 450); }; const run = () => { setLoading(true); window.setTimeout(() => setLoading(false), 600); }; return <Reveal><section className="section draftSection"><SectionHeader eyebrow="DRAFT CHECKER" title="Draft Checker" subtitle="Build your 5v5 and get an instant comp analysis." align="center" /><div className="draftGrid"><div className="draftColumn"><div className="panelTitle">Kit Selector</div><div className="quickDrafts"><button onClick={() => loadComp(["Kaida", "Kaida", "Warden", "Styx", "Styx"])}>Load Bypass S</button><button onClick={() => loadComp(["Cait", "Lassy", "Star", "Metal", "Noelle"])}>Load Safe Core</button></div><div className="slotStack">{picks.map((pick, index) => { const kit = getKit(pick); return <button key={index} className="slotCard interactiveCard" onClick={() => setActiveSlot(index)}><span className="slotNumber">0{index + 1}</span><div><strong>{kit?.name || "Empty"}</strong><small>{kit?.roles?.[0] || "Select kit"}</small></div>{kit && <TierBadge tier={kit.tier} />}</button>; })}</div></div><div className="draftColumn scoreColumn"><ScoreRing score={evaluation.score} /><div className="verdict">{evaluation.verdict}</div><p>{evaluation.score >= 80 ? "Tournament-ready structure." : "Patch the missing roles before queueing."}</p><div className="coverageGrid">{Object.entries(evaluation.roles).map(([role, covered]) => <span key={role} className={"coveragePill " + (covered ? "ok" : "bad")}>{role}</span>)}</div><RippleButton className="btn primary analyzeButton" onClick={run}>Analyze</RippleButton></div><div className="draftColumn analysisColumn">{loading ? <div className="loadingBox"><span /><span /><span /><p>Analyzing comp structure...</p></div> : <AnalysisPanel analysis={analysis} evaluation={evaluation} />}</div></div><KitPicker activeSlot={activeSlot} picks={picks} onPick={(name) => updatePick(activeSlot, name)} onClose={() => setActiveSlot(null)} /></section></Reveal>; }
function AnalysisPanel({ analysis, evaluation }) { return <div className="analysisPanel"><div className="analysisTop"><span>{analysis.playstyle}</span><em>Peaks {analysis.timing}</em></div><p className="summaryText">{analysis.summary}</p><div className="analysisLists"><div><h4>Strengths</h4>{analysis.strengths.map((item) => <p key={item} className="goodItem">✓ {item}</p>)}</div><div><h4>Weaknesses</h4>{analysis.weaknesses.map((item) => <p key={item} className="badItem">! {item}</p>)}</div></div><div className="miniBlock"><span>Synergies</span>{evaluation.synergies.length ? evaluation.synergies.map((item) => <p key={item}>{item}</p>) : <p>No standout synergy yet. Add a clear pair or objective plan.</p>}</div><div className="miniBlock"><span>Win condition</span><p>{analysis.winCondition}</p></div><div className="proTip"><strong>PRO TIP</strong>{analysis.tip}</div></div>; }
function KitBrowser() { const [query, setQuery] = useState(""); const [filter, setFilter] = useState("All"); const [expanded, setExpanded] = useState({}); const filters = ["All", "S Tier", "A Tier", "B Tier", "Bypass", "SJ & MJ", "Frontline", "Support", "Economy", "Defender", "Bed Breaker", "Ranged"]; const rank = { S: 0, A: 1, B: 2, C: 3 }; const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return [...ALL_KITS].filter((kit) => { const text = [kit.name, kit.tier, kit.kitClass, ...(kit.roles || []), ...(kit.kitRoles || []), kit.description, kit.tips].filter(Boolean).join(" ").toLowerCase(); const roleText = (kit.kitRoles || []).join(" ").toLowerCase(); const filterMatch = filter === "All" || (filter === "S Tier" && kit.tier === "S") || (filter === "A Tier" && kit.tier === "A") || (filter === "B Tier" && kit.tier === "B") || (filter === "Bypass" && roleText.includes("bypass")) || (filter === "SJ & MJ" && (roleText.includes("sj") || roleText.includes("mj"))) || kit.roles.includes(filter); return (!q || text.includes(q)) && filterMatch; }).sort((a, b) => (rank[a.tier] ?? 3) - (rank[b.tier] ?? 3) || a.name.localeCompare(b.name)); }, [query, filter]); return <Reveal><section className="section kitSection"><SectionHeader eyebrow="KIT DATABASE" title="Kit Database" subtitle="Search, filter, and study every tracked competitive kit." /><div className="kitToolbar"><div className="kitSearchRow"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kits, roles, tips..." /><span>{filtered.length} shown</span></div><div className="filterTabs">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>{filtered.length === 0 ? <div className="emptyState"><h3>No kits found</h3><p>Try another search or switch back to All.</p></div> : <div className="kitGrid">{filtered.map((kit, index) => { const isExpanded = expanded[kit.name]; const hasDetails = kit.description || kit.tips; return <article key={kit.name} className={"kitCard interactiveCard " + (hasDetails ? "elevated " : "") + (kit.tier === "S" ? "sTierKit" : "")} style={{ "--delay": (index * 25) + "ms" }}><div className="kitHead"><h3>{kit.name}</h3><TierBadge tier={kit.tier} /></div><div className="roleTags">{kit.roles.map((role) => <RoleTag key={role} role={role} compact />)}</div>{kit.kitRoles && <div className="kitSubRoles">{kit.kitRoles.join(" / ")}</div>}{kit.description && <button className="expandDescription" onClick={() => setExpanded((old) => ({ ...old, [kit.name]: !old[kit.name] }))}>{isExpanded ? "Hide details" : "Read description"}</button>}{kit.description && isExpanded && <p className="kitDescription">{kit.description}</p>}{kit.tips && isExpanded && <div className="tipsBox"><strong>Tips</strong>{kit.tips}</div>}</article>; })}</div>}</section></Reveal>; }
function BypassStrategy() { const steps = [["01", "Pirate Davey cannon", "Pirate Davey rushes with a cannon while teammates feed iron to damage bed structure from range."], ["02", "Kaida entry", "Kaida enters first and uses claw plus summon AOE to punish grouped defenders."], ["03", "Styx link", "Styx keeps her placed portal safe, then creates the linked portal from a kill near the enemy base."], ["04", "Team flood", "Once the portal is linked, the team travels through it together into the enemy base."], ["05", "Crypt pressure", "Crypt converts gravestones into skeleton pressure, then recalls or targets skeletons toward the fight."], ["06", "Lian burst", "Lian throws R to finish targets or uses Q when swords are ready and defenders are grouped."], ["07", "Repeat cycle", "Styx uses the portal window and ghost timing to keep pressure alive after a death."], ["08", "Bed break", "Sustained pressure destroys bed before defenders can reset."]]; const counters = ["Always keep one dedicated defender watching bed; never leave base empty after winning a fight.", "Buy blast protection or defense blocks early.", "Use Lassy or Noelle to peel Styx before she gets the kill and links the portal.", "Infernal Shielder helps stall Kaida entry damage during the rush."]; return <Reveal><section className="section bypassSection"><div className="bypassHero"><div className="eyebrow">BYPASS STRATEGY</div><h2>BYPASS STRATEGY</h2><p>End the game before it starts.</p></div><div className="flowDiagram">{["Pirate Davey", "Kaida", "Styx", "Team teleports", "Crypt + Lian finish"].map((item, index) => <div key={item} className="flowNode"><span>{index + 1}</span>{item}</div>)}</div><div className="bypassGrid"><div className="timelinePanel">{steps.map(([num, title, text]) => <div key={num} className="strategyStep"><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><div className="counterPanel"><h3>How to Counter</h3>{counters.map((counter) => <p key={counter}>! {counter}</p>)}</div></div><div className="bestComps"><h3>Best bypass comps</h3><div className="chipRow">{["Styx", "Kaida", "Lian", "Crypt", "Pirate Davey"].map((kit) => <span key={kit}>{kit}</span>)}</div><div className="chipRow alt">{["Kaida", "Kaida", "Warden", "Styx", "Styx"].map((kit, index) => <span key={kit + index}>{kit}</span>)}</div></div></section></Reveal>; }
function GuidePage() { return <><Reveal><section className="section"><SectionHeader eyebrow="ROLES" title="Role Guide" subtitle="Every slot in a 5v5 has a job. Know yours before you queue." /><div className="roleGuideGrid">{ROLE_GUIDE.map((r) => { const s = roleStyle(r.role); return <article key={r.role} className="roleCard interactiveCard"><div className="roleIcon" style={{ color: s.c, background: s.bg, borderColor: s.b }}>{r.icon}</div><h3 style={{ color: s.c }}>{r.role}</h3><p>{r.job}</p><div className="roleKits">{r.kits.map((kit) => <span key={kit}>{kit}</span>)}</div></article>; })}</div></section></Reveal><Reveal><section className="section"><SectionHeader eyebrow="COUNTERPLAY" title="Beat the Meta Threats" subtitle="Fast answers for common 5v5 problems." /><div className="counterGrid">{COUNTERS.map((counter) => <article key={counter.title} className="counterCard interactiveCard"><div className="counterIcon">{counter.icon}</div><h3>{counter.title}</h3><p>{counter.plan}</p><div className="goodAnswers">{counter.good.map((kit) => <span key={kit}>{kit}</span>)}</div><div className="avoidBox"><strong>Avoid:</strong> {counter.avoid}</div></article>)}</div></section></Reveal><Reveal><section className="section"><SectionHeader eyebrow="MACRO" title="Game Timing" subtitle="Know what your team should be doing before the window is gone." /><div className="timingLine">{TIMING.map((item) => <div key={item.time} className="timeNode"><span>{item.time}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section></Reveal><Reveal><section className="section"><SectionHeader eyebrow="TRAINING" title="Practice Drills" subtitle="Short routines that build cleaner fights and faster calls." /><div className="practiceGrid">{PRACTICE.map((drill) => <article key={drill.title} className="practiceCard interactiveCard"><span className={"difficulty " + drill.level.replace(/\s+/g, "").toLowerCase()}>{drill.level}</span><h3>{drill.title}</h3><p>{drill.text}</p></article>)}</div></section></Reveal></>; }
function AppContent({ tab, setTab }) { if (tab === "meta") return <MetaBuilds />; if (tab === "draft") return <DraftBuilder />; if (tab === "kits") return <KitBrowser />; if (tab === "guide") return <><BypassStrategy /><GuidePage /></>; return <><Hero setTab={setTab} /><HomeCommandCenter setTab={setTab} /><MetaBuilds /><DraftBuilder /><KitBrowser /><BypassStrategy /></>; }
function Footer() { return <footer className="footer"><span className="brand" style={{ pointerEvents: "none" }}><span className="brandDot" /> BW META</span><p className="creatorCredit">Made by justcyril</p><p>Community guide for Roblox BedWars 5v5. Not affiliated with Roblox or the BedWars developers.</p><p>Kit mechanics checked against BedWars Wiki on May 18, 2026.</p></footer>; }
export default function App() { useFonts(); const [tab, setTab] = useState("home"); return <div className="app"><style>{CSS}</style><MouseLight /><TopNav tab={tab} setTab={setTab} /><main><AppContent tab={tab} setTab={setTab} /></main><Footer /></div>; }

const CSS = "\n*, *::before, *::after { box-sizing: border-box; }\n* { min-width: 0; }\n:root { --bg:#020810; --surface:#080f1e; --surface2:#0d1628; --border:rgba(255,255,255,.07); --border-bright:rgba(255,255,255,.14); --cyan:#22d3ee; --cyan-dim:rgba(34,211,238,.15); --gold:#fbbf24; --gold-dim:rgba(251,191,36,.15); --red:#f87171; --green:#34d399; --text:#f0f9ff; --text2:rgba(186,214,240,.7); --text3:rgba(120,160,200,.45); --font-body:\"Inter\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif; --font-mono:\"JetBrains Mono\",ui-monospace,SFMono-Regular,Menlo,monospace; }\nhtml { scroll-behavior:smooth; background:var(--bg); }\nbody { margin:0; overflow-x:hidden; color:var(--text); background:var(--bg); font-family:var(--font-body); -webkit-font-smoothing:antialiased; }\nbutton,input { font:inherit; } button { cursor:pointer; } ::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-track{background:#030711}::-webkit-scrollbar-thumb{background:rgba(34,211,238,.55);border-radius:999px;border:2px solid #030711}\n.app { min-height:100vh; padding-bottom:max(56px, env(safe-area-inset-bottom)); background:radial-gradient(circle at 50% 0%, rgba(34,211,238,.12), transparent 34%), var(--bg); }\nmain { position:relative; z-index:2; padding-top:72px; }\n.mouseLight { position:fixed; inset:0; pointer-events:none; z-index:1; background:radial-gradient(circle at var(--mx) var(--my), rgba(34,211,238,.16), transparent 28%); mix-blend-mode:screen; }\n.topNav { position:fixed; top:0; left:0; right:0; z-index:50; height:72px; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:18px; padding:0 clamp(16px,4vw,48px); border-bottom:1px solid var(--border); background:rgba(2,8,16,.72); backdrop-filter:blur(22px) saturate(1.4); }\n.brand { border:0; background:transparent; display:inline-flex; align-items:center; gap:10px; color:var(--text); font-family:var(--font-mono); font-size:18px; font-weight:800; letter-spacing:.08em; }.brandDot{width:10px;height:10px;border-radius:50%;background:var(--cyan);box-shadow:0 0 18px var(--cyan)}\n.desktopLinks{display:flex;align-items:center;justify-content:center;gap:24px}.navLink{position:relative;border:0;background:transparent;color:var(--text2);font-weight:800;padding:25px 0}.navLink.active,.navLink:hover{color:var(--text)}.navLink.active::after{content:\"\";position:absolute;left:0;right:0;bottom:16px;height:2px;border-radius:999px;background:var(--cyan);box-shadow:0 0 16px var(--cyan)}.navRight{justify-self:end;display:flex;align-items:center;gap:12px}.creatorBadge{display:inline-flex;align-items:center;border:1px solid rgba(34,211,238,.3);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:999px;padding:8px 11px;font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;box-shadow:0 0 18px rgba(34,211,238,.12)}.mobileCreator{display:none;margin:0 0 14px;justify-content:center}.seasonBadge{display:inline-flex;align-items:center;border:1px solid rgba(251,191,36,.34);background:var(--gold-dim);color:var(--gold);border-radius:999px;padding:8px 12px;font-family:var(--font-mono);font-weight:800;font-size:12px;text-transform:uppercase}.hamburger{display:none;width:42px;height:42px;border:1px solid var(--border-bright);background:rgba(255,255,255,.04);border-radius:12px}.hamburger span{display:block;width:18px;height:2px;margin:3px auto;background:var(--text);border-radius:999px}.mobilePanel{position:fixed;top:0;right:0;width:min(340px,88vw);height:100vh;padding:22px;background:rgba(8,15,30,.96);border-left:1px solid var(--border-bright);transform:translateX(105%);transition:transform .28s ease;box-shadow:-30px 0 80px rgba(0,0,0,.55)}.mobilePanel.open{transform:translateX(0)}.mobilePanelTop{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px}.mobilePanelTop button{border:0;background:transparent;color:var(--text);font-size:34px}.mobileNavLink{width:100%;border:1px solid var(--border);background:rgba(255,255,255,.04);color:var(--text);border-radius:16px;padding:16px;text-align:left;margin-bottom:10px;font-weight:900}.mobileNavLink.active{border-color:rgba(34,211,238,.4);box-shadow:0 0 24px rgba(34,211,238,.16)}\n.hero{position:relative;min-height:100vh;display:grid;place-items:center;overflow:hidden;padding:110px 18px 80px}.heroGridOverlay{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(circle at 50% 45%,black 0%,transparent 72%)}.heroGlow{position:absolute;width:min(920px,100vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.28),rgba(37,99,235,.12) 38%,transparent 67%);filter:blur(8px);animation:glowPulse 5s ease-in-out infinite}.particles span{position:absolute;width:3px;height:3px;border-radius:50%;left:var(--x);top:var(--y);background:var(--cyan);box-shadow:0 0 12px var(--cyan);opacity:.55;animation:drift calc(8s + var(--i)*.4s) linear infinite}.heroInner{position:relative;z-index:2;max-width:1120px;text-align:center}.heroKicker,.eyebrow{color:var(--cyan);font-family:var(--font-mono);font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.heroCredit{display:inline-flex;margin-top:12px;border:1px solid rgba(34,211,238,.34);background:rgba(34,211,238,.1);color:var(--cyan);border-radius:999px;padding:8px 13px;font-family:var(--font-mono);font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 0 24px rgba(34,211,238,.16)}.heroFeatured{margin:24px auto 0;max-width:760px;border:1px solid rgba(34,211,238,.18);background:linear-gradient(135deg,rgba(34,211,238,.10),rgba(255,255,255,.035));border-radius:22px;padding:14px;display:grid;gap:11px;box-shadow:0 18px 60px rgba(0,0,0,.24)}.heroFeaturedLabel{color:var(--text3);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.heroFeatured>div{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.heroFeatured button{border:1px solid rgba(251,191,36,.24);background:rgba(251,191,36,.09);color:var(--gold);border-radius:999px;padding:8px 11px;font-family:var(--font-mono);font-size:11px;font-weight:900}.hero h1{margin:18px 0 0;font-size:clamp(54px,9vw,118px);line-height:.86;letter-spacing:-.06em;font-weight:900}.hero h1 span{display:block}.hero h1 em{font-style:normal;background:linear-gradient(90deg,#60a5fa,var(--cyan),#a7f3d0);-webkit-background-clip:text;background-clip:text;color:transparent}.hero p{margin:28px auto 0;max-width:720px;color:var(--text2);font-size:clamp(16px,2vw,20px);line-height:1.75}.heroActions{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:34px}.btn{border-radius:14px;padding:14px 20px;font-weight:900;border:1px solid transparent;position:relative;overflow:hidden}.btn.primary{color:#021018;background:linear-gradient(180deg,#67e8f9,var(--cyan));box-shadow:0 16px 42px rgba(34,211,238,.26)}.btn.outline{color:var(--text);background:rgba(255,255,255,.04);border-color:rgba(34,211,238,.34)}.rippleBtn{position:relative;overflow:hidden}.ripple{position:absolute;width:10px;height:10px;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);background:rgba(255,255,255,.55);animation:ripple .62s ease-out forwards}.heroStats{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:12px;max-width:760px;margin:38px auto 0}.heroStats div{border:1px solid var(--border);background:rgba(8,15,30,.58);backdrop-filter:blur(18px);border-radius:18px;padding:18px}.heroStats strong{display:block;color:var(--text);font-family:var(--font-mono);font-size:30px}.heroStats span{color:var(--text3);font-size:12px;font-weight:800;text-transform:uppercase}\n.section{width:min(1180px,calc(100% - 32px));margin:0 auto;padding:96px 0}.commandSection{padding-top:36px}.commandGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.commandCard{border-radius:24px;padding:22px;text-align:left;color:var(--text)}.commandCard span{color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.commandCard h3{margin:10px 0 8px;font-size:22px;letter-spacing:-.04em}.commandCard p{margin:0;color:var(--text2);line-height:1.6}.commandCard em{display:inline-flex;margin-top:16px;color:var(--gold);font-family:var(--font-mono);font-size:11px;font-style:normal;font-weight:900;text-transform:uppercase}.sectionHeader{margin-bottom:28px}.sectionHeader.center{text-align:center}.sectionHeader h2{margin:8px 0 0;font-size:clamp(34px,5vw,58px);line-height:.95;letter-spacing:-.05em}.sectionHeader p{max-width:660px;color:var(--text2);line-height:1.65}.sectionHeader.center p{margin-inline:auto}.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}.reveal.in{opacity:1;transform:translateY(0)}.interactiveCard{border:1px solid var(--border);background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.025)),var(--surface);box-shadow:0 20px 70px rgba(0,0,0,.25);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}.interactiveCard:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.28);box-shadow:0 26px 80px rgba(0,0,0,.32),0 0 34px rgba(34,211,238,.1)}.buildList{display:grid;gap:18px}.buildCard{position:relative;border-radius:24px;overflow:hidden;animation:fadeUp .5s ease both;animation-delay:var(--delay)}.buildCard.sTier::before{content:\"\";position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(251,191,36,.3);background:linear-gradient(110deg,transparent 0%,rgba(251,191,36,.1) 42%,transparent 56%);animation:shimmer 4.8s linear infinite;pointer-events:none}.buildHeader{width:100%;border:0;background:transparent;color:inherit;display:grid;grid-template-columns:8px 1fr auto;gap:20px;padding:24px;text-align:left}.accentBar{width:8px;min-height:100%;border-radius:999px;background:var(--accent);box-shadow:0 0 22px var(--accent)}.buildMetaLine{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}.buildTag{color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}.buildMain h3{margin:0;font-size:clamp(22px,3vw,34px);letter-spacing:-.04em}.roleTags{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.roleTag{display:inline-flex;border:1px solid;border-radius:999px;padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:800}.roleTag.compact{font-size:10px;padding:4px 8px}.buildMain p{color:var(--text2);line-height:1.7;margin:14px 0 0}.tierBadge{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;border:1px solid;border-radius:999px;font-family:var(--font-mono);font-weight:900;font-size:12px;animation:tierPop .5s ease both}.tierBadge.large{min-width:42px;height:42px;font-size:15px}.breakdownBtn{align-self:start;border:1px solid rgba(34,211,238,.28);color:var(--cyan);background:rgba(34,211,238,.08);border-radius:999px;padding:10px 13px;font-size:12px;font-weight:900;white-space:nowrap}.buildBreakdown{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:0 24px 24px 52px}.infoTile,.miniBlock{border:1px solid var(--border);border-radius:18px;background:rgba(255,255,255,.035);padding:16px}.infoTile span,.miniBlock span,.panelTitle{color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.quickDrafts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}.quickDrafts button{border:1px solid rgba(34,211,238,.28);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:12px;padding:10px;font-family:var(--font-mono);font-size:11px;font-weight:900;text-transform:uppercase}.infoTile p,.miniBlock p{color:var(--text2);line-height:1.65;margin:8px 0 0}.infoTile.danger{border-color:rgba(248,113,113,.24)}\n.draftGrid{display:grid;grid-template-columns:.9fr 1fr 1.1fr;gap:18px;align-items:stretch}.draftColumn{border:1px solid var(--border);background:rgba(8,15,30,.72);border-radius:26px;padding:22px;backdrop-filter:blur(16px)}.slotStack{display:grid;gap:12px;margin-top:18px}.slotCard{width:100%;border-radius:18px;padding:16px;display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:12px;color:var(--text);text-align:left}.slotNumber{color:var(--text3);font-family:var(--font-mono);font-weight:900}.slotCard strong{display:block;font-size:17px}.slotCard small{color:var(--text3);font-weight:800}.scoreColumn{display:grid;justify-items:center;align-content:center;text-align:center}.scoreRing{position:relative;width:190px;height:190px}.scoreRing svg{width:100%;height:100%;transform:rotate(-90deg)}.ringTrack,.ringProgress{fill:none;stroke-width:12}.ringTrack{stroke:rgba(255,255,255,.07)}.ringProgress{stroke:var(--scoreColor);stroke-linecap:round;transition:stroke-dashoffset .25s linear,stroke .25s;filter:drop-shadow(0 0 13px var(--scoreColor))}.scoreText{position:absolute;inset:0;display:grid;place-items:center}.scoreText strong{font-family:var(--font-mono);font-size:54px}.scoreText span{margin-top:54px;color:var(--text3);position:absolute}.verdict{margin-top:12px;font-family:var(--font-mono);font-size:24px;color:var(--cyan);font-weight:900;letter-spacing:.1em}.scoreColumn p{color:var(--text2)}.coverageGrid{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin:16px 0 20px}.coveragePill{border:1px solid rgba(248,113,113,.24);color:var(--red);background:rgba(248,113,113,.08);border-radius:999px;padding:7px 10px;font-family:var(--font-mono);font-size:10px;font-weight:900}.coveragePill.ok{border-color:rgba(52,211,153,.3);color:var(--green);background:rgba(52,211,153,.1)}.analyzeButton{width:100%}.analysisPanel{display:grid;gap:14px}.analysisTop{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.analysisTop span,.analysisTop em{border:1px solid rgba(34,211,238,.28);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:999px;padding:8px 11px;font-family:var(--font-mono);font-style:normal;font-size:11px;font-weight:900}.summaryText{color:var(--text2);line-height:1.7}.analysisLists{display:grid;grid-template-columns:1fr 1fr;gap:12px}.analysisLists h4{margin:0 0 8px}.goodItem,.badItem{margin:6px 0;border-radius:12px;padding:9px 10px;line-height:1.45;font-size:13px}.goodItem{color:#bbf7d0;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.16)}.badItem{color:#fecaca;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.16)}.proTip{border:1px solid rgba(52,211,153,.2);background:rgba(52,211,153,.08);color:#bbf7d0;border-radius:16px;padding:14px;line-height:1.55}.proTip strong{display:block;font-family:var(--font-mono);color:var(--green);margin-bottom:5px}.loadingBox{min-height:320px;display:grid;place-items:center;align-content:center;gap:10px;color:var(--text2)}.loadingBox span{width:10px;height:10px;border-radius:50%;background:var(--cyan);animation:dotPulse 1s ease-in-out infinite}.loadingBox span:nth-child(2){animation-delay:.15s}.loadingBox span:nth-child(3){animation-delay:.3s}.pickerBackdrop{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.58);backdrop-filter:blur(10px)}.kitPicker{width:min(620px,100%);max-height:min(760px,88vh);border:1px solid var(--border-bright);background:#07101f;border-radius:26px;padding:20px;box-shadow:0 35px 100px rgba(0,0,0,.65)}.pickerTop{display:flex;justify-content:space-between;gap:14px}.pickerTop h3{margin:4px 0 0;font-size:28px}.pickerTop button{border:0;color:var(--text);background:transparent;font-size:32px}.kitPicker input,.kitToolbar input{width:100%;border:1px solid var(--border-bright);background:rgba(255,255,255,.04);color:var(--text);border-radius:16px;padding:14px 16px;outline:none}.pickerList{display:grid;gap:8px;margin-top:14px;max-height:470px;overflow:auto;padding-right:4px}.pickerItem{border:1px solid var(--border);background:rgba(255,255,255,.035);color:var(--text);border-radius:16px;padding:13px;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left}.pickerItem:hover,.pickerItem.picked{border-color:rgba(34,211,238,.35);background:rgba(34,211,238,.08)}.pickerItem strong,.pickerItem small{display:block}.pickerItem small{color:var(--text3);margin-top:3px}\n.kitToolbar{display:grid;gap:14px;margin-bottom:24px}.kitSearchRow{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px}.kitSearchRow span{border:1px solid var(--border);background:rgba(255,255,255,.04);border-radius:999px;padding:10px 12px;color:var(--text2);font-family:var(--font-mono);font-size:11px;font-weight:900;white-space:nowrap}.emptyState{border:1px solid var(--border);background:rgba(255,255,255,.035);border-radius:24px;padding:38px;text-align:center}.emptyState h3{margin:0 0 8px;font-size:24px}.emptyState p{margin:0;color:var(--text2)}.filterTabs{display:flex;flex-wrap:wrap;gap:8px}.filterTabs button{border:1px solid var(--border);background:rgba(255,255,255,.035);color:var(--text2);border-radius:999px;padding:9px 13px;font-weight:900;font-size:12px}.filterTabs button.active,.filterTabs button:hover{color:var(--text);border-color:rgba(34,211,238,.38);background:rgba(34,211,238,.1)}.kitGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));grid-auto-flow:dense;gap:14px}.kitCard{position:relative;border-radius:22px;padding:18px;animation:fadeUp .45s ease both;animation-delay:var(--delay)}.kitCard.elevated{border-color:rgba(255,255,255,.13)}.kitCard.sTierKit{border-top-color:rgba(251,191,36,.72);box-shadow:0 18px 60px rgba(0,0,0,.24),inset 0 1px 0 rgba(251,191,36,.32)}.kitHead{display:flex;align-items:center;justify-content:space-between;gap:12px}.kitHead h3{margin:0;font-size:21px;letter-spacing:-.025em}.kitSubRoles{color:var(--text3);font-family:var(--font-mono);font-size:11px;margin-top:12px;text-transform:uppercase}.expandDescription{margin-top:14px;border:1px solid rgba(34,211,238,.28);color:var(--cyan);background:rgba(34,211,238,.08);border-radius:12px;padding:9px 11px;font-weight:900}.kitDescription{color:var(--text2);line-height:1.65}.tipsBox{margin-top:12px;border:1px solid rgba(52,211,153,.18);background:rgba(52,211,153,.08);color:#bbf7d0;border-radius:14px;padding:12px;line-height:1.55}.tipsBox strong{display:block;color:var(--green);font-family:var(--font-mono);margin-bottom:5px}\n.bypassHero{border:1px solid rgba(192,132,252,.22);border-radius:30px;padding:clamp(28px,5vw,58px);background:radial-gradient(circle at 20% 0%,rgba(192,132,252,.24),transparent 42%),linear-gradient(135deg,rgba(76,29,149,.35),rgba(8,15,30,.86))}.bypassHero h2{margin:8px 0 0;font-size:clamp(44px,7vw,82px);letter-spacing:-.06em}.bypassHero p{color:#ddd6fe;font-size:20px}.flowDiagram{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:22px 0}.flowNode{position:relative;border:1px solid rgba(192,132,252,.28);background:rgba(88,28,135,.22);color:#ede9fe;border-radius:18px;padding:16px;text-align:center;font-weight:900}.flowNode:not(:last-child)::after{content:\"\";position:absolute;top:50%;right:-13px;width:13px;height:2px;background:#a78bfa;box-shadow:0 0 12px #a78bfa}.flowNode span{display:block;color:#c4b5fd;font-family:var(--font-mono);font-size:11px;margin-bottom:5px}.bypassGrid{display:grid;grid-template-columns:1.3fr .7fr;gap:18px}.timelinePanel,.counterPanel,.bestComps{border:1px solid rgba(192,132,252,.2);background:rgba(8,15,30,.76);border-radius:24px;padding:22px}.strategyStep{display:grid;grid-template-columns:54px 1fr;gap:14px;padding:16px 0;border-bottom:1px solid var(--border)}.strategyStep:last-child{border-bottom:0}.strategyStep>span{width:42px;height:42px;display:grid;place-items:center;border-radius:14px;background:rgba(192,132,252,.15);color:#c4b5fd;font-family:var(--font-mono);font-weight:900}.strategyStep h3,.counterPanel h3,.bestComps h3{margin:0}.strategyStep p,.counterPanel p{color:var(--text2);line-height:1.6}.counterPanel{border-color:rgba(248,113,113,.24)}.counterPanel h3{color:var(--red)}.counterPanel p{color:#fecaca;background:rgba(248,113,113,.07);border:1px solid rgba(248,113,113,.14);border-radius:14px;padding:12px}.bestComps{margin-top:18px}.chipRow,.goodAnswers{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.chipRow span,.goodAnswers span{border:1px solid rgba(34,211,238,.28);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:999px;padding:7px 11px;font-weight:900;font-size:12px}.chipRow.alt span{border-color:rgba(192,132,252,.3);background:rgba(192,132,252,.1);color:#d8b4fe}.roleGuideGrid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }.roleCard { border-radius:24px; padding:22px; }.roleIcon { width:48px; height:48px; display:grid; place-items:center; border-radius:16px; font-size:22px; border:1px solid; margin-bottom:14px; }.roleCard h3 { margin:0 0 8px; font-size:22px; letter-spacing:-.03em; }.roleCard p { color:var(--text2); line-height:1.65; margin:0 0 14px; }.roleKits { display:flex; flex-wrap:wrap; gap:7px; }.roleKits span { border:1px solid var(--border-bright); background:rgba(255,255,255,.04); color:var(--text2); border-radius:999px; padding:5px 10px; font-size:12px; font-weight:700; }.counterGrid,.practiceGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.counterCard,.practiceCard{border-radius:24px;padding:22px}.counterIcon{width:48px;height:48px;display:grid;place-items:center;border-radius:16px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.2);color:var(--cyan);font-size:23px}.counterCard h3,.practiceCard h3{margin:14px 0 8px;font-size:24px}.counterCard p,.practiceCard p{color:var(--text2);line-height:1.65}.avoidBox{border:1px solid rgba(248,113,113,.18);background:rgba(248,113,113,.08);color:#fecaca;border-radius:14px;padding:12px}.timingLine{display:grid;gap:16px}.timeNode{position:relative;margin-left:26px;border:1px solid var(--border);background:rgba(8,15,30,.72);border-radius:20px;padding:18px}.timeNode::before{content:\"\";position:absolute;left:-29px;top:23px;width:13px;height:13px;border-radius:50%;background:var(--cyan);box-shadow:0 0 16px var(--cyan)}.timeNode span{color:var(--cyan);font-family:var(--font-mono);font-weight:900;font-size:12px}.timeNode h3{margin:7px 0}.timeNode p{color:var(--text2);line-height:1.65}.difficulty{display:inline-flex;border-radius:999px;padding:7px 10px;font-family:var(--font-mono);font-size:11px;font-weight:900}.difficulty.beginner{color:var(--green);background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.22)}.difficulty.coreskill{color:var(--gold);background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.22)}.difficulty.advanced{color:var(--red);background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.22)}.footer { border-top:1px solid var(--border); background:rgba(8,15,30,.72); padding:32px clamp(16px,4vw,48px); display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center; }.footer p { color:var(--text3); font-size:13px; margin:0; }.footer .creatorCredit { color:var(--cyan); font-family:var(--font-mono); font-size:14px; font-weight:900; letter-spacing:.12em; text-transform:uppercase; }\n@keyframes glowPulse{50%{transform:scale(1.05);opacity:.75}}@keyframes drift{from{transform:translate3d(0,0,0)}to{transform:translate3d(32px,-70px,0);opacity:.1}}@keyframes ripple{to{width:420px;height:420px;opacity:0}}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{from{transform:translateX(-120%)}to{transform:translateX(120%)}}@keyframes tierPop{0%{transform:scale(.78);filter:brightness(1.8)}100%{transform:scale(1);filter:brightness(1)}}@keyframes dotPulse{50%{transform:scale(1.4);opacity:.45}}\n@media (max-width:960px){.topNav{grid-template-columns:1fr auto}.desktopLinks{display:none}.hamburger{display:block}.hero{min-height:80vh}.draftGrid,.bypassGrid,.flowDiagram,.commandGrid{grid-template-columns:1fr}.flowNode:not(:last-child)::after{display:none}.analysisLists,.buildBreakdown,.counterGrid,.practiceGrid{grid-template-columns:1fr}.roleGuideGrid { grid-template-columns:repeat(2,1fr); }.buildHeader{grid-template-columns:7px 1fr}.breakdownBtn{grid-column:2;justify-self:start}.buildBreakdown{padding-left:24px}}\n@media (max-width:640px){main { padding-top:64px; }.creatorBadge{display:none}.mobileCreator{display:flex}.kitSearchRow{grid-template-columns:1fr}.heroFeatured{padding:12px}.heroFeatured>div{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding-bottom:2px}.heroFeatured button{white-space:nowrap}.topNav{height:64px;padding:0 14px}.brand{font-size:15px}.seasonBadge{display:none}.seasonBadge.mobile{display:inline-flex}.heroStats{grid-template-columns:repeat(2,1fr)}.hero h1{font-size:48px}.section{width:min(100% - 24px,1180px);padding:68px 0}.heroActions .btn{width:100%}.kitGrid{grid-template-columns:1fr}.slotCard{grid-template-columns:30px 1fr auto}.roleGuideGrid { grid-template-columns:1fr; }}\n";

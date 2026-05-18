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
    kitClass: "Fighter",
    kitRoles: ["MJ", "Pick"],
    description: "Cait (Caitlyn) is a fighter kit whose attacks are imbued with Dark Decay. Every melee hit applies a damage-over-time decay that ticks for 2 damage per second over 2 seconds. Hitting a decayed enemy stacks the decay strength by 25% per hit, doubling the base decay damage at 4 total hits. This makes her one of the most consistent main-jugg kits because every trade adds free chip damage on top of the sword.",
    tips: "Don't disengage right after one hit. Stay close and stack decay to 4 hits for double damage. Pair with Lassy or Hannah to lock targets in place so the decay stack never resets.",
  },
  {
    name: "Lassy",
    roles: ["Support", "Frontline"],
    tier: "S",
    kitClass: "Support",
    kitRoles: ["Anti-Bypass", "Pick"],
    description: "Lassy can buy a Lasso from the Item Shop for 30 Iron. The lasso can be thrown up to 23 blocks away and pulls the first enemy hit toward her, applying the Grounded effect and disabling enemy movement abilities (dashes, teleports, jumps) for 9 seconds. The lasso has a 10 second cooldown and is the strongest single-target peel and pick tool in the game.",
    tips: "Save the lasso for the highest threat: Styx mid-portal, Kaida entering base, or any movement kit trying to bypass. Pull onto your team so the frontline can finish the kill instantly.",
  },
  {
    name: "Star",
    roles: ["Support"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Buff", "Sustain"],
    description: "Star Collector Stella generates two team buff items: Vitality Stars and Crit Stars. Consuming a Vitality Star permanently grants +2 Max Health to herself and nearby teammates. Consuming a Crit Star grants +3% Critical Chance to the team and increases the min/max crit damage range. Stars stack, so over a long match Star can effectively give her team an extra layer of HP and damage.",
    tips: "Hand stars out before fights, not during. Pop Vitality Stars early so the +2 HP scales the whole game. Save Crit Stars for the team's main jugg right before a planned engage.",
  },
  {
    name: "Metal",
    roles: ["Economy"],
    tier: "S",
    kitClass: "Economy",
    kitRoles: ["Scaling"],
    description: "Metal Detector spawns with a metal detector tool that locates buried treasure across the map. While holding it, a white arrow points toward the nearest buried cache and flashes faster as you get closer. Digging up the treasure always gives Iron, with a chance for Diamonds and Emeralds. This is the strongest passive economy in 5v5 because Metal converts safe map rotation into free upgrades.",
    tips: "Rotate to safer parts of the map while teammates hold mid. Don't fight greedy with the detector out, drop it in a chest if pressure shows up. Convert leads into Diamond/Emerald armor and TNT before the deathmatch.",
  },
  {
    name: "Noelle",
    roles: ["Support", "Defender"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Buff", "Bed Defense"],
    description: "Noelle has special Slime entities that follow her and grant different buffs (damage reduction, attack damage, break speed, regen, and more). She also has a Slime Flute special item that lets her redirect her slime buffs to chosen allies, turning her into a flexible buffer who can either stack on the main jugg or stay near bed.",
    tips: "Use the flute to push buffs onto whoever is fighting, not just yourself. If the team is rushing, send your slimes with the frontline; if defending, keep them near the bed.",
  },
  {
    name: "Silas",
    roles: ["Frontline", "Support"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Aura", "Sustain"],
    description: "Silas has a permanent ground aura that affects everyone standing in it. Default mode is the green Healing Aura, regenerating 1 HP/sec for himself and 2 HP/sec for nearby allies. Pressing R waves his flag and switches the aura to orange Damage Aura, granting attack damage to him and his team. Getting kills also grants Triumphant stacks that further amplify his aura.",
    tips: "Stay between your team and the fight, the aura only helps when teammates are next to you. Switch to damage aura when committing to a kill, and back to healing when retreating.",
  },
  {
    name: "Warden",
    roles: ["Frontline"],
    tier: "A",
    kitClass: "Fighter",
    kitRoles: ["Snowball", "MJ"],
    description: "Warden's special ability is Imprison Souls. When he or his team kills an enemy, the soul is imprisoned, increasing that enemy's respawn time. For each soul actively imprisoned, Warden gains stacks of Break Speed and Shield Regeneration. He scales harder the more kills the team gets, and the longer respawns starve the enemy team of fights.",
    tips: "Push hard right after a soul is imprisoned, the enemy is short a player. Stack Shield Regen so you can keep diving without resetting. Pair with snowball comps that can chain kills.",
  },
  {
    name: "Sheila",
    roles: ["Frontline"],
    tier: "B",
    kitClass: "Fighter",
    description: "Sheila is a fighter kit whose special entity is the Seahorse. She can summon and ride a seahorse mount that grants speed and engagement options around the map, leaning into a hit-and-run frontline playstyle.",
    tips: "Use the seahorse to chase or to disengage when a fight goes bad. Don't fight 1v3 mounted, dismount and use cover.",
  },
  {
    name: "Nyx",
    roles: ["Frontline"],
    tier: "A",
    kitClass: "Fighter",
    kitRoles: ["MJ", "Scaling"],
    description: "Nyx's special ability is Midnight. Her attacks deal Midnight Damage that scales the longer she stays in combat. As she keeps hitting the same target, her bonus damage ramps up to roughly 30% extra damage per hit, and she can detonate her midnight stacks for a burst. She is a strong duelist who wins extended trades against any kit that can't burst her down quickly.",
    tips: "Don't reset the fight; the longer you stay on a target the more bonus damage you do. Pick isolated 1v1s where you can fully ramp before someone peels for them.",
  },
  {
    name: "Freya",
    roles: ["Frontline"],
    tier: "B",
    kitClass: "Fighter",
    kitRoles: ["Anti-Movement"],
    description: "Freiya applies Frostbite stacks with every hit. At 4 stacks the enemy is slowed heavily, making her a great anti-runner kit. Her kit-exclusive Ice Sword doubles the frost stacks per hit (1 to 2) and increases detonation damage from frostbite by 30%. Frostbite can be applied with any weapon, including bows and staves.",
    tips: "Open with a bow shot to apply frost from range, then close in with the Ice Sword to lock the slow on. Strong against Aery, Kaida, Triton, and other movement kits because they can't kite once frozen.",
  },
  {
    name: "Lucia",
    roles: ["Economy", "Frontline"],
    tier: "A",
    kitClass: "Economy",
    kitRoles: ["Scaling", "Hybrid"],
    description: "Lucía's special items are the Piñata and Candy. She can place piñatas that drop candy when broken, and candy can be eaten for a stacking damage and speed buff that turns her into a fight threat in addition to an economy kit. This dual-role makes her one of the most flexible economy picks.",
    tips: "Drop piñatas during downtime so you stack candy for fights. Don't waste candy buffs on safe trades, save them for committed fights or bed-break windows.",
  },
  {
    name: "Aery",
    roles: ["Frontline"],
    tier: "S",
    kitClass: "Fighter",
    kitRoles: ["MJ", "Scaling"],
    description: "Aery's special item is Spirit Butterflies. When she gets a kill, butterflies spawn around the body. Collecting them permanently increases her melee attack damage for the rest of the match. Each kill drops more butterflies and her sword damage scales hard the longer the game goes, making her one of the strongest snowball main-jugg kits.",
    tips: "Always loot the butterflies after a kill, even if you have to push out of base briefly. Aery falls off if she stops getting kills, so commit to engages where the team can support her.",
  },
  {
    name: "Amy",
    roles: ["Frontline", "Support"],
    tier: "B",
    kitClass: "Support",
    kitRoles: ["Buff"],
    description: "Axolotl Amy's special entities are Axolotls. Each axolotl provides a unique buff to her and her teammates: extra Shield HP, bonus damage, faster break speed, or health regeneration. She can deploy and rotate axolotls to fit the situation, making her a flexible team buffer.",
    tips: "Pre-place axolotls near choke points or generators so the buff is ready before the fight. Switch which axolotl you're stacking based on whether you're rushing (damage/break) or defending (regen/shield).",
  },
  {
    name: "Melody",
    roles: ["Support"],
    tier: "S",
    kitClass: "Support",
    kitRoles: ["Heal"],
    description: "Melody buys a Guitar from the Item Shop for 16 Iron. Strumming the guitar heals the lowest-HP ally within a 17 block radius for 13 HP and heals Melody for 90% of that amount. The guitar has a 1 second cooldown and is the most consistent heal in the game, letting the team out-trade any non-burst comp.",
    tips: "Stay 10-15 blocks behind the frontline, not in melee range. Spam the guitar during sustained fights, even small heals add up over a long trade.",
  },
  {
    name: "Hannah",
    roles: ["Frontline", "Support"],
    tier: "A",
    kitClass: "Fighter",
    kitRoles: ["Pick", "Finisher"],
    description: "Hannah's special ability is Execute. When an enemy drops to a low percentage of their max HP, Hannah can instantly fatally execute them from a short range (around 9 blocks after the rework). She is one of the best closer/pick kits because no one can run from her on low HP, including players carrying valuables.",
    tips: "Track enemy HP bars in fights and look for the execute window the moment they get low. Combo well with bow/crossbow teammates who can chip enemies into execute range.",
  },
  {
    name: "Infernal Shielder",
    roles: ["Support"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Stall", "Anti-Ranged"],
    description: "Infernal Shielder spawns with the Infernal Shield. While holding it, he reflects projectiles, gets a 50% damage reduction, and reduces damage taken by nearby allies. While only in his inventory, the shield still grants 10% damage reduction. After blocking enough damage, the shield charges a Dragon Leap ability that lets him jump forward to engage or escape.",
    tips: "Hold the shield up against bow spam or wizard staff teams; the reflect can chunk projectile users. Save Dragon Leap for closing onto a healer or peeling for your bed.",
  },
  {
    name: "Nyoka",
    roles: ["Support"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Heal"],
    description: "Nyoka's special item is the Mending Canopy. While held, the canopy heals nearby allies. Holding it longer charges the canopy, increasing both its healing power and range. Out of combat the charge replenishes faster, so Nyoka rewards positioning and patience.",
    tips: "Charge up before pushing, then drop a fully charged canopy on the team during the engage. Don't burn the canopy in tiny skirmishes, save it for grouped fights.",
  },
  {
    name: "Fisher",
    roles: ["Economy", "Defender"],
    tier: "A",
    kitClass: "Economy",
    kitRoles: ["Sustain", "Scaling"],
    description: "The Fisherman buys a Fishing Rod from the Item Shop for 40 Iron. Casting into the void starts a minigame where the player must keep a bar inside the highlighted zone for 5-9 seconds. Successful catches drop random resources from the void, including iron, emeralds, diamonds, food, and rare items. He scales hard if left alone.",
    tips: "Fish from a safe ledge inside or near base, not exposed mid-map. Stagger fishing during downtime so you keep value flowing without leaving your bed undefended.",
  },
  {
    name: "Pirate Davey",
    roles: ["Bed Breaker", "Economy"],
    tier: "A",
    kitClass: "Destroyer",
    kitRoles: ["Bed Break"],
    description: "Pirate Davey can buy Cannons from the Item Shop for 40 Iron, and TNT at a discount (30 Iron instead of 35). When TNT is loaded into a cannon and fired, the cannon launches 2 TNT for every 1 used, doubling his bed-break value. He can also fire himself out of the cannon to launch over gaps, making him both an economy and destroyer kit.",
    tips: "Set up cannons just outside enemy bed range, then chain TNT loads. Use the player launch to skip bridges and surprise defenders from an unexpected angle.",
  },
  {
    name: "Umbra",
    roles: ["Support", "Bed Breaker"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Bypass", "Engage"],
    description: "Umbra's special item is the Teleport Hat. They throw the hat onto an enemy and can spectate that enemy from anywhere on the map, then teleport directly to them on command. On arrival, allied players nearby get boosted speed and several seconds of invulnerability, while enemies get knocked back and briefly slowed. This makes Umbra a top-tier engage and bypass enabler.",
    tips: "Tag the enemy main jugg or an isolated player, wait until they push deep, then teleport in to chain a fight. The invuln window is your team's free engage, push aggressively the moment you arrive.",
  },
  {
    name: "Archer",
    roles: ["Ranged"],
    tier: "C",
    kitClass: "Ranged",
    description: "The Archer buys the Tactical Crossbow and the Tactical Headhunter from the Item Shop. Both are kit-exclusive cheaper variants that deal more damage than their normal counterparts. He has no special movement or buffs, so his strength is purely cheaper, harder-hitting ranged weapons.",
    tips: "Stack arrows early and post up on a high angle. Switch to the Tactical Headhunter for close-range follow-ups, since it deals more damage point-blank than a crossbow.",
  },
  {
    name: "Umeko",
    roles: ["Frontline", "Ranged"],
    tier: "B",
    kitClass: "Fighter",
    kitRoles: ["Mid-Range"],
    description: "Umeko's special weapon is the Chakram, a boomerang-style mid-range weapon that returns to him after being thrown. His special passive turns him invisible briefly when he takes melee damage, letting him dodge follow-up swings and reposition. He sits between melee and ranged classes.",
    tips: "Use the chakram to poke before committing. When you take a hit, use the invis to either reset the trade or instantly punish from a new angle.",
  },
  {
    name: "Uma",
    roles: ["Ranged", "Support"],
    tier: "B",
    kitClass: "Ranged",
    kitRoles: ["Summoner"],
    description: "Uma's special items are the Spirit Staff and Summon Stones. She uses summon stones to create Spirit Beetles that she can command to attack enemies, heal teammates, or collect resources from generators. She is a ranged-class summoner who can play almost any role depending on what she sends her beetles to do.",
    tips: "Send beetles to collect from emerald gens while you fight. In team fights, set the beetles to attack the lowest-HP enemy or heal your main jugg.",
  },
  {
    name: "Wren",
    roles: ["Economy", "Support"],
    tier: "B",
    kitClass: "Economy",
    kitRoles: ["Shop"],
    description: "Wren can summon a Black Market that anyone (allies and enemies) can access. The Black Market sells forbidden items like the Fury Potion, Serpent's Touch, and discounted standard items. Wren receives a cut of every sale, turning enemy purchases into his own income. His special items are Shadow Coins, used to upgrade the market further.",
    tips: "Place the market in contested mid lanes so enemies actually use it; you profit either way. Save shadow coins for tier-3 upgrades that unlock the strongest discounted items for your team.",
  },
  {
    name: "Whim",
    roles: ["Ranged"],
    tier: "C",
    kitClass: "Ranged",
    description: "Whim's special item is the Mage Spellbook. He shoots magical orbs that can be empowered with elements by finding and reading the 3 Tomes of the Elements scattered around the map. Each element changes the orb's behavior (fire, ice, lightning), but he is fragile and has no built-in defense.",
    tips: "Find at least one element tome before committing to fights, otherwise your orbs are weak. Stay behind a frontline; you have no escape if focused.",
  },
  {
    name: "Farmer",
    roles: ["Economy"],
    tier: "B",
    kitClass: "Economy",
    description: "Farmer Cletus can buy Carrot, Melon, and Pumpkin Seeds. Carrots harvest into Diamonds, melons harvest into Emeralds, and pumpkins harvest into Jack o'Booms (explosive items). He must plant and grow crops to scale, which is slower than other economy kits but pays off late.",
    tips: "Plant melon seeds first for emerald scaling, then pumpkins for free explosive bed pressure. Don't plant in obvious open spots, hide farms inside your base.",
  },
  {
    name: "Beekeeper",
    roles: ["Economy"],
    tier: "B",
    kitClass: "Economy",
    description: "Beekeeper Beatrix uses a Bee Net to catch bees only she can see across the map. She places bees in a Beehive block to upgrade it. Beehives drop Iron, then Diamonds at 2+ bees, then Emeralds at 4+ bees, with faster drop rates as more bees are inserted. The more bees collected, the better her economy scales.",
    tips: "Catch bees during dead time between fights. Aim to hit 4+ bees per hive fast so you start generating emeralds. Hide hives behind base walls; enemies can break them.",
  },
  {
    name: "Eldertree",
    roles: ["Frontline"],
    tier: "B",
    kitClass: "Tank",
    description: "Eldertree consumes Tree Orbs that increase its size and Max HP instead of using armor for defense. The more orbs collected, the larger and tankier Eldertree becomes. Its kit skin physically changes with size, and it cannot equip a normal armor avatar.",
    tips: "Collect tree orbs early so you snowball into a giant tank. You scale with HP, not armor, so prioritize fights you can sustain rather than burst trades.",
  },
  {
    name: "Baker",
    roles: ["Support", "Defender"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Heal", "Mobility"],
    description: "Baker's special items are Health Apples (heal), Speed Pies (movement speed buff), Golden Apples (instant heal + buff), and the Knockback Baguette which is great for knocking enemies into the void. He is a flexible utility support who can heal, speed-boost, and peel.",
    tips: "Hand pies to the main jugg for a clean rotation onto the enemy. Save the baguette for defenders walking toward bed; one knock into the void cancels a break.",
  },
  {
    name: "Whisper",
    roles: ["Support"],
    tier: "A",
    kitClass: "Support",
    kitRoles: ["Anti-Void", "Save"],
    description: "Whisper's special entity is the Spirit Owl. He can remotely command a spirit owl to support a chosen teammate, including flying them back up if they're knocked off the map (R ability negates fall damage on landing). The owl saves teammates from voids, fall damage, and committed knockbacks.",
    tips: "Watch your team's HP and position; use the owl the second a teammate is knocked off. The owl is your get-out-of-void-free card, don't waste it on small drops.",
  },
  {
    name: "Ragnar",
    roles: ["Bed Breaker", "Frontline"],
    tier: "B",
    kitClass: "Destroyer",
    kitRoles: ["Bed Break"],
    description: "Ragnar's special ability is Berserker Rage, which he can activate to gain increased break speed, reduced incoming damage, and full knockback immunity. He also gets a discount on breaking tools (axes/picks). He's purpose-built to walk into bed defenses, tank knockback, and tear down blocks.",
    tips: "Pop Berserker Rage right as you reach the bed; defenders can't knock you off. Stock cheap axes early thanks to the discount.",
  },
  {
    name: "Triton",
    roles: ["Bed Breaker", "Frontline"],
    tier: "B",
    kitClass: "Movement",
    kitRoles: ["Engage"],
    description: "Triton's special item is the Trident, a thrown weapon that lets him leap to wherever it lands. He can throw it at walls to scale terrain, or throw it at enemies to leap directly onto them. He's primarily a movement and engage tool, useful for closing gaps no other kit can.",
    tips: "Use the trident to skip bridges and surprise enemies from above. Throw at the back-line healer to leap past the frontline and burst them.",
  },
  {
    name: "Sigrid",
    roles: ["Bed Breaker", "Frontline"],
    tier: "B",
    kitClass: "Movement",
    description: "Sigrid's special entity is the Elk, a mountable rideable. While riding the elk she gets a 35% Speed Boost and 50% Jump Boost, with a 15-second stamina bar. The Elk has an Uppercut ability that ramps the elk forward and uppercuts the first enemy hit, dealing 20 HP and launching them 8 blocks into the air. Damage scales with charge time and elk speed.",
    tips: "Use the elk to rotate fast or chain bridges. Save uppercut for an enemy on a thin bridge, the launch can void them.",
  },
  {
    name: "Dino Tamer",
    roles: ["Bed Breaker"],
    tier: "C",
    kitClass: "Destroyer",
    description: "Dino Tamer Dom's special items are Dinos. Mounted dinos can charge at block defenses and significantly destroy them, plus they grant a 10% speed bonus. He's a destroyer kit specifically built to ram through walls instead of using TNT.",
    tips: "Save your dino charges for the final layer of defense; one good charge removes more wall than 3 TNT. Don't fight mounted, dismount before melee engages.",
  },
  {
    name: "Zeno",
    roles: ["Support", "Ranged"],
    tier: "A",
    kitClass: "Ranged",
    kitRoles: ["Static", "Chip"],
    description: "Zeno (formerly Wizard) spawns with the Wizard Staff. He aims up to 16 blocks away to strike a small area with a lightning bolt that deals 12 damage in a 5.5 block radius and applies the Zapped effect for 10 seconds. The staff has 4 charges that replenish over time, requiring at least 1 charge to cast. Zapped reduces healing and tags the target for follow-up.",
    tips: "Spam lightning on grouped fights to chip everyone. Zapped enemies heal less, so chain casts on a Melody/Nyoka pocket to break their sustain.",
  },
  {
    name: "Zola",
    roles: ["Defender", "Support"],
    tier: "B",
    kitClass: "Defender",
    description: "Zola is a defender kit added on April 17, 2026. Her ability ties allies to her with a damage-reduction link, sharing protection between them. She pairs especially well with healing kits because the damage reduction lets sustain go much further before allies drop.",
    tips: "Stay close to your main jugg so the link stays active. Pair with Melody, Nyoka, or Baker; the damage reduction stacks with healing for very long fights.",
  },
  {
    name: "Lani",
    roles: ["Support", "Bed Breaker"],
    tier: "B",
    kitClass: "Support",
    kitRoles: ["Heal", "Save"],
    description: "Lani is an ascended healer who can buy the Scepter of Light. She uses the scepter to fly to her lowest-HP ally from anywhere on the map, providing healing and damage reduction on arrival. She's the best emergency-save support kit because she can cross the map in seconds.",
    tips: "Stay back so you can fly to whoever drops low. Don't fly in too early, the heal+DR is most valuable when an ally is about to die.",
  },
  {
    name: "Smoke",
    roles: ["Bed Breaker"],
    tier: "A",
    kitClass: "Movement",
    kitRoles: ["Stealth", "Bed Break"],
    description: "Smoke can buy Smoke Bombs from the Item Shop for 25 Iron. Consuming a smoke bomb turns him invisible and hides his nametag for about 10 seconds. Building, breaking, or attacking immediately cancels invisibility. He can only hold 1 smoke bomb at a time. Smoke also has Smoke Blocks that hide nametags inside them and block projectiles like arrows.",
    tips: "Use invis to slip past defenders, not to win 1v1s. Plan a clear path before popping a bomb because any action breaks the cloak.",
  },
  {
    name: "Marina",
    roles: ["Defender", "Support"],
    tier: "B",
    kitClass: "Defender",
    description: "Marina's special entities are Jellyfish that can be placed and connected together. With her Electric Pulse ability, connected jellyfish zap nearby enemies. Connecting more jellyfish increases the range and damage of the zap, plus stacks armor penetration. She locks down hallways, bed rooms, and choke points.",
    tips: "Place jellyfish in a chain along the only entrance to bed. Activate Electric Pulse the moment a bed breaker steps inside; the AOE zap punishes any rusher.",
  },
  {
    name: "Barbarian",
    roles: ["Frontline"],
    tier: "B",
    kitClass: "Fighter",
    description: "Barbarian's special ability lets him gain Rage by attacking enemies. Once his rage meter is full, he upgrades his sword to the Rageblade, the strongest melee weapon in the game at 70 base attack damage. The Rageblade is lost on death if he hasn't accumulated enough rage before dying.",
    tips: "Trade hits early to fill rage fast; Rageblade is strongest mid-game before enemies have full emerald armor. Pair with a healer so you survive long enough to keep the blade.",
  },
  {
    name: "Grim Reaper",
    roles: ["Frontline"],
    tier: "B",
    kitClass: "Fighter",
    kitRoles: ["Snowball"],
    description: "Grim Reaper's special ability lets him reap the souls of defeated enemies, gaining temporary buffs (movement speed, damage, regen). The more kills he chains, the more stacked his buffs are, making him a snowball fighter who scales with team kill pressure.",
    tips: "Stick close to fights so you can reap every soul. If the team isn't getting kills, Grim falls off; play around comps that can chain picks.",
  },
  {
    name: "Ares",
    roles: ["Ranged"],
    tier: "A",
    kitClass: "Ranged",
    kitRoles: ["SJ", "MJ"],
    description: "Ares is a strong SJ and MJ kit that excels at ranged combat. He buys Spears from the shop for 35 Iron. Each spear deals 52 damage with 40% armor penetration and explodes on impact, knocking back all enemies within a 4 block radius. Spears also apply the Zapped effect for 5 seconds. He gets a free spear every 40 seconds and can hold a max of 10. Getting the final hit with a spear returns it to your inventory.",
    tips: "Great for pressuring enemies mid-air during sky battles. Use spear AOE knockback to void opponents during SJ and MJ fights. Spam spears for free damage before engaging in melee.",
  },
  {
    name: "Styx",
    roles: ["Bed Breaker", "Support"],
    tier: "S",
    kitClass: "Movement",
    kitRoles: ["Bypass"],
    description: "Styx is the backbone of the Bypass strategy. She starts with a Confluence Portal she can place anywhere. When she kills an enemy, a second linked portal spawns where they died and lasts 30 seconds, letting Styx and all teammates teleport between the two portals. After death she enters a Ghost state, allowing her to stay on the field and connect portals even while dead. She is the key teleport enabler in 5v5 bypass.",
    tips: "Place your base portal near your bed early. Rush the enemy base, get a kill, die, and your teammates immediately teleport in. Pair with Kaida, Crypt, Lian, and Pirate Davey for the full bypass.",
  },
  {
    name: "Kaida",
    roles: ["Frontline", "Bed Breaker"],
    tier: "S",
    kitClass: "Fighter",
    kitRoles: ["Bypass", "Early Game", "MJ", "SJ"],
    description: "Kaida is a versatile fighter who summons a Void Dragon. Her Summoner Claws replace her sword. They have a 7 block attack range, hit through walls, and deal AOE damage to multiple enemies at once. Her R ability grows a portal beneath her feet while she slows during the channel, then summons the dragon's head to deal massive AOE damage to all nearby enemies. Claws upgrade as you level up the dragon. She is strong early game, strong in the air, and a top pick for bypass rushing.",
    tips: "Upgrade your dragon claw fast by using the summon ability. Claws hit through walls, so use this in bypass to damage defenders without exposing yourself. Very strong for SJ and MJ with the extended range and AOE.",
  },
  {
    name: "Lian",
    roles: ["Frontline", "Bed Breaker"],
    tier: "A",
    kitClass: "Fighter",
    kitRoles: ["Bypass", "SJ damage"],
    description: "Lian is a high-damage fighter kit with SJ-style burst damage using Dragon Swords. She spawns with 3 swords floating behind her, and each regenerates in 12 seconds. R ability: throw one sword as a homing projectile that locks onto enemies within 6 blocks, dealing 70% of her strongest melee weapon's damage with a 2 second cooldown. Q ultimate: slam all current swords down in a triangular AOE pattern for 120% sword damage plus fire damage with knockback. Her ability damage scales up as her sword tier improves.",
    tips: "Combo R+R+Q for maximum burst by firing 2 sword missiles then slamming the ultimate for a devastating chain. Great for bypass because she can deal heavy damage while teammates hold pressure. The fire from the Q ultimate also applies burn damage over time.",
  },
  {
    name: "Crypt",
    roles: ["Support", "Bed Breaker"],
    tier: "A",
    kitClass: "Fighter (Necromancer)",
    kitRoles: ["Bypass"],
    description: "Crypt is a necromancer who builds an undead army during bypass. When Crypt or any teammate kills an enemy, a Gravestone spawns where they died. Crypt uses his Necromancer Staff to collect the soul and summon a Skeleton. Each skeleton has 125 HP, inherits the killed player's weapon and strongest helmet, and deals 88% of the original weapon's damage. Skeletons last 120 seconds and Crypt can have up to 5 active at once. Summoning a 6th removes the oldest.",
    tips: "In bypass, prioritize collecting gravestones from early kills to build your army fast. Skeletons can break beds and attack defenders while your team focuses on fighting. Great in 5v5 because the constant stream of kills keeps your army full.",
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
    why: "This is S tier for fast bypass because double Styx gives repeat portal pressure, double Kaida brings massive AOE burst, and Warden anchors the fight so the rush does not crumble on entry.",
    early: "Both Styx players set portal angles while Warden leads the first fight. The Kaidas should burst defenders through walls and force the enemy bed area open.",
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
  early: "Do not split hard. Silas stays with the team while Metal gets value and Noelle watches bed.",
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
    name: "Pirate Davey / Umbra / Umbra / Fisher / Fisher",
    tag: "Bed Pressure",
    tier: "A+",
    icon: "◆",
    accentA: "#93c5fd",
    accentB: "#3b82f6",
    roles: ["Bed Breaker", "Support", "Bed Breaker", "Economy", "Defender"],
    why: "Pirate Davey and Umbra give real bed-break threat. Umbra creates space, Fisher scales.",
    early: "Umbra and Pirate Davey should not both full send instantly. Scout bed angles while Fisher scales.",
    mid: "Use Umbra to split defenders,  Pirate Davey hits the bed angle with cannon TNT.",
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
    why: "Lucia gives economy and fight value, Umbra and Whisper give control, Baker gives heals and pies, Lassy = free kills.",
    early: "Lucia should get value without dying. Baker and Whisper keep the team stable.",
    mid: "Use Umbra/Whisper utility to force bad enemy positioning. Lassy waits for the bed angle.",
    win: "Use macro and utility to make enemies rotate wrong, then Lucia/Lassy breaks bed.",
    bestInto: "Messy teams that chase too hard.",
    weakness: "Needs clean calls because it has less raw main-jugg power.",
  },
];

const ROLE_GUIDE = [
  {
    role: "Frontline",
    icon: "⚔",
    job: "Main jugg. Starts fights, takes space, protects support, and creates pressure by winning trades.",
    kits: ["Cait", "Silas", "Warden", "Sheila", "Nyx", "Freya", "Lucia", "Aery", "Eldertree", "Lassy", "Kaida", "Lian", "Barbarian", "Grim Reaper", "Hannah", "Umeko"],
  },
  {
    role: "Support",
    icon: "✚",
    job: "Keeps fights clean with healing, setup, static/chip pressure, peel, or utility.",
    kits: ["Star", "Lassy", "Melody", "Amy", "Infernal Shielder", "Nyoka", "Baker", "Whisper", "Umbra", "Lani", "Zeno", "Styx", "Crypt", "Noelle", "Silas", "Wren", "Uma", "Zola"],
  },
  {
    role: "Economy",
    icon: "⬡",
    job: "Builds the gear lead so the team does not need to force bad early fights.",
    kits: ["Metal", "Fisher", "Farmer", "Lucia", "Beekeeper", "Wren", "Pirate Davey"],
  },
  {
    role: "Defender",
    icon: "⬢",
    job: "Protects bed, watches incoming pressure, and stops free breaks.",
    kits: ["Noelle", "Fisher", "Zola", "Marina", "Infernal Shielder", "Baker"],
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
    kits: ["Archer", "Uma", "Umeko", "Whim", "Zeno", "Ares"],
  },
];

const COUNTERS = [
  {
    title: "Against Cait Pressure",
    icon: "☠",
    plan: "Do not feed Cait free contract value. Keep economy kits protected and force Cait to fight through your frontline.",
    good: ["Lassy", "Noelle", "Whisper", "Silas"],
    avoid: "Long messy fights where Cait keeps getting resets.",
  },
  {
    title: "Against Melody Pocket",
    icon: "♪",
    plan: "Do not trade forever into healing. Burst one target fast, split Melody from the main jugg, or force bed pressure.",
    good: ["Cait", "Lassy", "Zeno", "Hannah"],
    avoid: "Standing in front of them and trading forever.",
  },
  {
    title: "Against Smoke / Pirate Davey",
    icon: "◆",
    plan: "Track bed breakers at all times. If Smoke or Pirate Davey disappears, stop chasing and check bed.",
    good: ["Noelle", "Marina", "Zola", "Baker", "Infernal Shielder"],
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
function CountUp({ value, suffix = "" }) { const [shown, setShown] = useState(0); useEffect(() => { let frame; const start = performance.now(); const tick = (now) => { const progress = Math.min(1, (now - start) / 1100); const eased = 1 - Math.pow(1 - progress, 3); setShown(Math.round(value * eased)); if (progress < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [value]); return <>{shown}{suffix}</>; }
function TopNav({ tab, setTab }) { const [open, setOpen] = useState(false); const go = (next) => { setTab(next); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }; return <header className="topNav"><button className="brand" onClick={() => go("home")}><span className="brandDot" /><span>BW META</span></button><nav className="desktopLinks">{NAV_ITEMS.map((item) => <button key={item.key} className={"navLink " + (tab === item.key ? "active" : "")} onClick={() => go(item.key)}>{item.label}</button>)}</nav><div className="navRight"><span className="creatorBadge">by justcyril</span><span className="seasonBadge">Season 16</span><button className="hamburger" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu"><span /><span /><span /></button></div><div className={"mobilePanel " + (open ? "open" : "")}><div className="mobilePanelTop"><span className="seasonBadge mobile">Season 16</span><button onClick={() => setOpen(false)}>×</button></div><span className="creatorBadge mobileCreator">made by justcyril</span>{NAV_ITEMS.map((item) => <button key={item.key} className={"mobileNavLink " + (tab === item.key ? "active" : "")} onClick={() => go(item.key)}>{item.label}</button>)}</div></header>; }
function SectionHeader({ eyebrow, title, subtitle, align = "left" }) { return <div className={"sectionHeader " + (align === "center" ? "center" : "")}><div className="eyebrow">{eyebrow}</div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>; }
function Hero({ setTab }) { const particles = Array.from({ length: 22 }, (_, i) => i); const watchlist = ["Kaida", "Styx", "Metal", "Cait", "Aery", "Lassy", "Ares", "Melody"]; return <section className="hero"><div className="heroGridOverlay" /><div className="heroGlow" /><div className="particles">{particles.map((item) => <span key={item} style={{ "--i": item, "--x": ((item * 47) % 100) + "%", "--y": (10 + ((item * 29) % 76)) + "%" }} />)}</div><div className="heroInner"><div className="heroKicker">Season 16 Competitive Index</div><div className="heroCredit">Made by justcyril</div><h1><span>DOMINATE 5v5.</span><span>BUILD <em>SMARTER.</em></span></h1><p>The only BedWars meta guide you need. Builds, drafts, kits, and strategy for serious players.</p><div className="heroActions"><RippleButton className="btn primary" onClick={() => setTab("meta")}>View Meta Builds</RippleButton><RippleButton className="btn outline" onClick={() => setTab("draft")}>Build Your Draft</RippleButton></div><div className="heroFeatured"><span className="heroFeaturedLabel">S-tier watchlist</span><div>{watchlist.map((name) => <button key={name} onClick={() => setTab("kits")}>{name}</button>)}</div></div><div className="heroStats"><div><strong><CountUp value={ALL_KITS.length} /></strong><span>Kits tracked</span></div><div><strong><CountUp value={META_BUILDS.length} /></strong><span>Meta builds</span></div><div><strong><CountUp value={ROLE_GUIDE.length} /></strong><span>Roles covered</span></div><div><strong><CountUp value={16} /></strong><span>Season</span></div></div></div></section>; }

function HomeCommandCenter({ setTab }) { const cards = [{ label: "Best Meta Core", title: "Kaida / Kaida / Warden / Styx / Styx", text: "Fast bypass pressure with double portal lanes and massive AOE entry damage.", action: "Open Meta", tab: "meta" }, { label: "Draft Lab", title: "Score Your 5v5", text: "Build a team, check missing roles, and get an instant win condition.", action: "Build Draft", tab: "draft" }, { label: "Kit Database", title: "Find S-tier Picks", text: "Filter by Bypass, SJ/MJ, tier, or role and read practical kit notes.", action: "Browse Kits", tab: "kits" }]; return <Reveal><section className="section commandSection"><div className="commandGrid">{cards.map((card) => <button key={card.label} className="commandCard interactiveCard" onClick={() => setTab(card.tab)}><span>{card.label}</span><h3>{card.title}</h3><p>{card.text}</p><em>{card.action}</em></button>)}</div></section></Reveal>; }
function BuildCard({ build, index }) { const [open, setOpen] = useState(index === 0); const s = tierStyle(build.tier); const rows = [["Early", build.early], ["Mid", build.mid], ["Win", build.win], ["Best Into", build.bestInto], ["Weakness", build.weakness]]; return <article className={"buildCard interactiveCard " + (build.tier === "S" ? "sTier" : "")} style={{ "--accent": s.c, "--delay": (index * 55) + "ms" }}><button className="buildHeader" onClick={() => setOpen((v) => !v)}><span className="accentBar" /><div className="buildMain"><div className="buildMetaLine"><span className="buildTag">{build.tag}</span><TierBadge tier={build.tier} large /></div><h3>{build.name}</h3><div className="roleTags">{build.roles.map((role, i) => <RoleTag key={role + "-" + i} role={role} compact />)}</div><p>{build.why}</p></div><span className="breakdownBtn">{open ? "Hide breakdown" : "See full breakdown"}</span></button>{open && <div className="buildBreakdown">{rows.map(([label, text]) => <div key={label} className={"infoTile " + (label === "Weakness" ? "danger" : "")}><span>{label}</span><p>{text}</p></div>)}</div>}</article>; }
function MetaBuilds() { const builds = useMemo(() => [...META_BUILDS], []); return <Reveal><section className="section"><SectionHeader eyebrow="SEASON 16 META" title="Top 5v5 Builds" subtitle="Pro-ready team cores with phase plans, role shape, and win conditions." /><div className="buildList">{builds.map((build, index) => <BuildCard key={build.name} build={build} index={index} />)}</div></section></Reveal>; }
function evaluateDraft(picks) { const chosen = picks.map(getKit).filter(Boolean); const has = (role) => chosen.some((kit) => kit.roles.includes(role)); const hasKit = (name) => picks.includes(name); const roles = { Frontline: has("Frontline"), Support: has("Support"), Economy: has("Economy"), Defender: has("Defender"), "Bed Breaker": has("Bed Breaker"), Ranged: has("Ranged") }; const late = roles.Economy || ["Melody", "Fisher", "Metal", "Beekeeper", "Farmer", "Zeno", "Warden", "Noelle", "Infernal Shielder", "Nyoka"].some(hasKit); let score = 0; if (roles.Frontline) score += 25; if (roles.Support) score += 25; if (roles.Economy) score += 25; if (roles.Defender) score += 15; if (roles["Bed Breaker"]) score += 10; if (roles.Ranged && score < 100) score += 5; if (!roles["Bed Breaker"] && late && roles.Frontline && roles.Support && roles.Economy) score += 10; score = Math.min(score, 100); const synergies = []; if (hasKit("Styx") && hasKit("Kaida") && hasKit("Lian") && hasKit("Crypt")) synergies.push("Bypass core: Styx opens the portal while Kaida, Lian, and Crypt flood the enemy base."); if (hasKit("Cait") && hasKit("Lassy")) synergies.push("Cait + Lassy turns one pull into contract value."); if (hasKit("Pirate Davey") && hasKit("Umbra")) synergies.push("Pirate Davey + Umbra creates real bed-break windows with cannon TNT."); if (hasKit("Melody") && chosen.some((kit) => kit.roles.includes("Frontline"))) synergies.push("Melody pocket makes the frontline much harder to trade into."); if (hasKit("Zeno")) synergies.push("Zeno chip makes resets and healing much weaker."); if (hasKit("Infernal Shielder")) synergies.push("Infernal Shielder stabilizes bridge fights and blocks projectile pressure."); if (hasKit("Ares")) synergies.push("Ares spear knockback controls SJ and MJ fights."); const verdict = score >= 95 ? "ELITE" : score >= 80 ? "STRONG" : score >= 60 ? "PLAYABLE" : "RISKY"; return { score, verdict, roles, synergies }; }
function analyzeDraft(picks) { const chosen = picks.map(getKit).filter(Boolean); const names = picks; const hasKit = (name) => names.includes(name); const hasRole = (role) => chosen.some((kit) => kit.roles.includes(role)); const evaluation = evaluateDraft(picks); const strengths = []; const weaknesses = []; const tips = []; let playstyle = "Balanced Core"; let timing = "Mid"; if (hasRole("Frontline")) strengths.push("Frontline presence can take space and start real fights."); if (hasRole("Support")) strengths.push("Support utility keeps the carry alive and helps fights stay clean."); if (hasRole("Economy")) strengths.push("Economy lets the team scale without forcing bad early fights."); if (hasRole("Defender")) strengths.push("Defender coverage protects bed while the team rotates."); if (hasRole("Bed Breaker")) strengths.push("Bed break threat converts won fights into objective pressure."); if (hasRole("Ranged")) strengths.push("Ranged chip softens targets before melee commits."); if (!hasRole("Frontline")) weaknesses.push("Missing a main jugg/frontline makes space hard to take."); if (!hasRole("Support")) weaknesses.push("Missing support means fewer saves, peels, and clean engages."); if (!hasRole("Economy")) weaknesses.push("No economy kit means the team must win early or fall behind."); if (!hasRole("Defender")) weaknesses.push("No true defender leaves bed open to bypass and split pressure."); if (!hasRole("Bed Breaker")) weaknesses.push("No bed breaker can make clean fight wins harder to convert."); if (hasKit("Cait") && hasKit("Lassy")) { playstyle = "Pick Core"; tips.push("Use Lassy pull to isolate one player, then Cait should finish for contract value."); } if (hasKit("Pirate Davey") && hasKit("Umbra")) { playstyle = "Bed Break"; tips.push("Umbra should split defenders before Pirate Davey commits to the bed break with cannon TNT."); } if (hasKit("Warden") && hasKit("Melody")) { playstyle = "Sustain Core"; timing = "Late"; tips.push("Stay close to Melody and force long fights where healing matters."); } if (hasKit("Zeno")) { playstyle = "Static Control"; tips.push("Let the main jugg start, then Zeno follows with chip so enemies cannot reset."); } if (hasKit("Infernal Shielder")) { playstyle = "Stall Support"; timing = "Mid/Late"; tips.push("Fight grouped so the shield protects the push instead of only one player."); } if (hasKit("Styx") && hasKit("Kaida") && hasKit("Lian") && hasKit("Crypt")) { playstyle = "Bypass Rush"; timing = "Early"; tips.push("Styx creates the portal angle, then Kaida and Lian burst while Crypt stacks skeleton pressure."); } const summaries = { "Bypass Rush": "This is a fast bypass comp. Rush early, do not scale; the goal is bed destroyed before 3 minutes.", "Pick Core": "This is a pick-based comp. Isolate one target, convert kills into value, then push before the reset.", "Sustain Core": "This is a sustain comp that wins long fights. Stay near Melody, avoid splits, and make enemy trades feel useless.", "Bed Break": "This comp has real bed break threat. Win a fight first, then immediately send the bed breaker before defenders reset.", "Static Control": "Zeno ranged chip makes enemies barely heal between fights. Let the main jugg start, then Zeno follows up.", "Stall Support": "Infernal Shielder stalls pushes and blocks bridge spam. Fight grouped so the shield protects everyone.", "Balanced Core": "Balanced comp. Fight grouped, call one target at a time, and convert wins into bed pressure." }; if (weaknesses.length === 0) weaknesses.push("Main risk is discipline: splitting, chasing, or leaving bed open can throw the comp."); return { playstyle, timing, summary: summaries[playstyle], strengths: unique(strengths).slice(0, 5), weaknesses: unique(weaknesses).slice(0, 4), synergies: evaluation.synergies, winCondition: hasRole("Bed Breaker") ? "Win one fight cleanly, force defenders away, then send the bed breaker before they reset." : "Protect economy and support early, win grouped fights, then convert with TNT and gear lead.", tip: tips[0] || "Fight 2-3 grouped, call one target, and never chase so far that bed or support gets picked." }; }
function ScoreRing({ score }) { const [shown, setShown] = useState(0); const radius = 78; const circumference = 2 * Math.PI * radius; const color = score >= 80 ? "var(--green)" : score >= 60 ? "var(--gold)" : "var(--red)"; useEffect(() => { let frame; let current = 0; const start = performance.now(); const tick = (now) => { const p = Math.min(1, (now - start) / 1000); const eased = 1 - Math.pow(1 - p, 3); current = Math.round(score * eased); setShown(current); if (p < 1) frame = requestAnimationFrame(tick); }; frame = requestAnimationFrame(tick); return () => cancelAnimationFrame(frame); }, [score]); return <div className="scoreRing" style={{ "--scoreColor": color }}><svg viewBox="0 0 190 190"><circle cx="95" cy="95" r={radius} className="ringTrack" /><circle cx="95" cy="95" r={radius} className="ringProgress" strokeDasharray={circumference} strokeDashoffset={circumference - (shown / 100) * circumference} /></svg><div className="scoreText"><strong>{shown}</strong><span>/100</span></div></div>; }
function KitPicker({ activeSlot, picks, onPick, onClose }) { const [query, setQuery] = useState(""); const rank = { S: 0, A: 1, B: 2, C: 3 }; const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return [...ALL_KITS].filter((kit) => !q || [kit.name, ...(kit.roles || []), ...(kit.kitRoles || []), kit.description, kit.tips].filter(Boolean).join(" ").toLowerCase().includes(q)).sort((a, b) => (rank[a.tier] ?? 3) - (rank[b.tier] ?? 3) || a.name.localeCompare(b.name)); }, [query]); if (activeSlot === null) return null; return <div className="pickerBackdrop" onMouseDown={onClose}><div className="kitPicker" onMouseDown={(e) => e.stopPropagation()}><div className="pickerTop"><div><span className="eyebrow">Slot {activeSlot + 1}</span><h3>Select a kit</h3></div><button onClick={onClose}>×</button></div><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kits, roles, tiers..." /><div className="pickerList">{filtered.map((kit) => <button key={kit.name} className={"pickerItem " + (picks.includes(kit.name) ? "picked" : "")} onClick={() => onPick(kit.name)}><span><strong>{kit.name}</strong><small>{kit.roles.join(" / ")}</small></span><TierBadge tier={kit.tier} /></button>)}</div></div></div>; }
function DraftBuilder() { const [picks, setPicks] = useState(["Cait", "Lassy", "Star", "Metal", "Noelle"]); const [activeSlot, setActiveSlot] = useState(null); const [loading, setLoading] = useState(false); const evaluation = useMemo(() => evaluateDraft(picks), [picks]); const analysis = useMemo(() => analyzeDraft(picks), [picks]); const updatePick = (slot, kitName) => { setPicks((current) => current.map((pick, index) => (index === slot ? kitName : pick))); setActiveSlot(null); }; const loadComp = (next) => { setPicks(next); setLoading(true); window.setTimeout(() => setLoading(false), 450); }; const run = () => { setLoading(true); window.setTimeout(() => setLoading(false), 600); }; return <Reveal><section className="section draftSection"><SectionHeader eyebrow="DRAFT CHECKER" title="Draft Checker" subtitle="Build your 5v5 and get an instant comp analysis." align="center" /><div className="draftGrid"><div className="draftColumn"><div className="panelTitle">Kit Selector</div><div className="quickDrafts"><button onClick={() => loadComp(["Kaida", "Kaida", "Warden", "Styx", "Styx"])}>Load Bypass S</button><button onClick={() => loadComp(["Cait", "Lassy", "Star", "Metal", "Noelle"])}>Load Safe Core</button></div><div className="slotStack">{picks.map((pick, index) => { const kit = getKit(pick); return <button key={index} className="slotCard interactiveCard" onClick={() => setActiveSlot(index)}><span className="slotNumber">0{index + 1}</span><div><strong>{kit?.name || "Empty"}</strong><small>{kit?.roles?.[0] || "Select kit"}</small></div>{kit && <TierBadge tier={kit.tier} />}</button>; })}</div></div><div className="draftColumn scoreColumn"><ScoreRing score={evaluation.score} /><div className="verdict">{evaluation.verdict}</div><p>{evaluation.score >= 80 ? "Tournament-ready structure." : "Patch the missing roles before queueing."}</p><div className="coverageGrid">{Object.entries(evaluation.roles).map(([role, covered]) => <span key={role} className={"coveragePill " + (covered ? "ok" : "bad")}>{role}</span>)}</div><RippleButton className="btn primary analyzeButton" onClick={run}>Analyze</RippleButton></div><div className="draftColumn analysisColumn">{loading ? <div className="loadingBox"><span /><span /><span /><p>Analyzing comp structure...</p></div> : <AnalysisPanel analysis={analysis} evaluation={evaluation} />}</div></div><KitPicker activeSlot={activeSlot} picks={picks} onPick={(name) => updatePick(activeSlot, name)} onClose={() => setActiveSlot(null)} /></section></Reveal>; }
function AnalysisPanel({ analysis, evaluation }) { return <div className="analysisPanel"><div className="analysisTop"><span>{analysis.playstyle}</span><em>Peaks {analysis.timing}</em></div><p className="summaryText">{analysis.summary}</p><div className="analysisLists"><div><h4>Strengths</h4>{analysis.strengths.map((item) => <p key={item} className="goodItem">✓ {item}</p>)}</div><div><h4>Weaknesses</h4>{analysis.weaknesses.map((item) => <p key={item} className="badItem">! {item}</p>)}</div></div><div className="miniBlock"><span>Synergies</span>{evaluation.synergies.length ? evaluation.synergies.map((item) => <p key={item}>{item}</p>) : <p>No standout synergy yet. Add a clear pair or objective plan.</p>}</div><div className="miniBlock"><span>Win condition</span><p>{analysis.winCondition}</p></div><div className="proTip"><strong>PRO TIP</strong>{analysis.tip}</div></div>; }
function KitBrowser() { const [query, setQuery] = useState(""); const [filter, setFilter] = useState("All"); const [expanded, setExpanded] = useState({}); const filters = ["All", "S Tier", "A Tier", "B Tier", "Bypass", "SJ & MJ", "Frontline", "Support", "Economy", "Defender", "Bed Breaker", "Ranged"]; const rank = { S: 0, A: 1, B: 2, C: 3 }; const filtered = useMemo(() => { const q = query.trim().toLowerCase(); return [...ALL_KITS].filter((kit) => { const text = [kit.name, kit.tier, kit.kitClass, ...(kit.roles || []), ...(kit.kitRoles || []), kit.description, kit.tips].filter(Boolean).join(" ").toLowerCase(); const roleText = (kit.kitRoles || []).join(" ").toLowerCase(); const filterMatch = filter === "All" || (filter === "S Tier" && kit.tier === "S") || (filter === "A Tier" && kit.tier === "A") || (filter === "B Tier" && kit.tier === "B") || (filter === "Bypass" && roleText.includes("bypass")) || (filter === "SJ & MJ" && (roleText.includes("sj") || roleText.includes("mj"))) || kit.roles.includes(filter); return (!q || text.includes(q)) && filterMatch; }).sort((a, b) => (rank[a.tier] ?? 3) - (rank[b.tier] ?? 3) || a.name.localeCompare(b.name)); }, [query, filter]); return <Reveal><section className="section kitSection"><SectionHeader eyebrow="KIT DATABASE" title="Kit Database" subtitle="Search, filter, and study every tracked competitive kit." /><div className="kitToolbar"><div className="kitSearchRow"><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search kits, roles, tips..." /><span>{filtered.length} shown</span></div><div className="filterTabs">{filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}</div></div>{filtered.length === 0 ? <div className="emptyState"><h3>No kits found</h3><p>Try another search or switch back to All.</p></div> : <div className="kitGrid">{filtered.map((kit, index) => { const isExpanded = expanded[kit.name]; const hasDetails = kit.description || kit.tips; return <article key={kit.name} className={"kitCard interactiveCard " + (hasDetails ? "elevated " : "") + (kit.tier === "S" ? "sTierKit" : "")} style={{ "--delay": (index * 25) + "ms" }}><div className="kitHead"><h3>{kit.name}</h3><TierBadge tier={kit.tier} /></div><div className="roleTags">{kit.roles.map((role) => <RoleTag key={role} role={role} compact />)}</div>{kit.kitRoles && <div className="kitSubRoles">{kit.kitRoles.join(" / ")}</div>}{kit.description && <button className="expandDescription" onClick={() => setExpanded((old) => ({ ...old, [kit.name]: !old[kit.name] }))}>{isExpanded ? "Hide details" : "Read description"}</button>}{kit.description && isExpanded && <p className="kitDescription">{kit.description}</p>}{kit.tips && isExpanded && <div className="tipsBox"><strong>Tips</strong>{kit.tips}</div>}</article>; })}</div>}</section></Reveal>; }
function BypassStrategy() { const steps = [["01", "Pirate Davey cannon", "Pirate Davey sets up a cannon and feeds it discounted TNT, doubling each shot to chip enemy bed defenses from range."], ["02", "Kaida entry", "Kaida enters first and uses dragon claw AOE to burst defenders through walls."], ["03", "Styx portal", "Styx places a Confluence Portal near enemy bed, then intentionally dies."], ["04", "Team flood", "The whole team teleports through the portal instantly into the enemy base."], ["05", "Crypt pressure", "Crypt converts gravestones into skeletons that distract and attack defenders."], ["06", "Lian burst", "Lian combos R+R+Q while teammates pin defenders in place."], ["07", "Repeat cycle", "Styx ghost form reconnects portals and the team floods in again."], ["08", "Bed break", "Sustained pressure destroys bed before defenders can reset."]]; const counters = ["Always keep one dedicated defender watching bed; never leave base empty after winning a fight.", "Buy blast protection or defense blocks early.", "Use Hannah or Noelle to peel Styx before she gets the kill and links the portal.", "Infernal Shielder blocks Kaida burst damage during the entry rush."]; return <Reveal><section className="section bypassSection"><div className="bypassHero"><div className="eyebrow">BYPASS STRATEGY</div><h2>BYPASS STRATEGY</h2><p>End the game before it starts.</p></div><div className="flowDiagram">{["Pirate Davey", "Kaida", "Styx", "Team teleports", "Crypt + Lian finish"].map((item, index) => <div key={item} className="flowNode"><span>{index + 1}</span>{item}</div>)}</div><div className="bypassGrid"><div className="timelinePanel">{steps.map(([num, title, text]) => <div key={num} className="strategyStep"><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><div className="counterPanel"><h3>How to Counter</h3>{counters.map((counter) => <p key={counter}>! {counter}</p>)}</div></div><div className="bestComps"><h3>Best bypass comps</h3><div className="chipRow">{["Styx", "Kaida", "Lian", "Crypt", "Pirate Davey"].map((kit) => <span key={kit}>{kit}</span>)}</div><div className="chipRow alt">{["Kaida", "Kaida", "Warden", "Styx", "Styx"].map((kit, index) => <span key={kit + index}>{kit}</span>)}</div></div></section></Reveal>; }
function GuidePage() { return <><Reveal><section className="section"><SectionHeader eyebrow="ROLES" title="Role Guide" subtitle="Every slot in a 5v5 has a job. Know yours before you queue." /><div className="roleGuideGrid">{ROLE_GUIDE.map((r) => { const s = roleStyle(r.role); return <article key={r.role} className="roleCard interactiveCard"><div className="roleIcon" style={{ color: s.c, background: s.bg, borderColor: s.b }}>{r.icon}</div><h3 style={{ color: s.c }}>{r.role}</h3><p>{r.job}</p><div className="roleKits">{r.kits.map((kit) => <span key={kit}>{kit}</span>)}</div></article>; })}</div></section></Reveal><Reveal><section className="section"><SectionHeader eyebrow="COUNTERPLAY" title="Beat the Meta Threats" subtitle="Fast answers for common 5v5 problems." /><div className="counterGrid">{COUNTERS.map((counter) => <article key={counter.title} className="counterCard interactiveCard"><div className="counterIcon">{counter.icon}</div><h3>{counter.title}</h3><p>{counter.plan}</p><div className="goodAnswers">{counter.good.map((kit) => <span key={kit}>{kit}</span>)}</div><div className="avoidBox"><strong>Avoid:</strong> {counter.avoid}</div></article>)}</div></section></Reveal><Reveal><section className="section"><SectionHeader eyebrow="MACRO" title="Game Timing" subtitle="Know what your team should be doing before the window is gone." /><div className="timingLine">{TIMING.map((item) => <div key={item.time} className="timeNode"><span>{item.time}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section></Reveal><Reveal><section className="section"><SectionHeader eyebrow="TRAINING" title="Practice Drills" subtitle="Short routines that build cleaner fights and faster calls." /><div className="practiceGrid">{PRACTICE.map((drill) => <article key={drill.title} className="practiceCard interactiveCard"><span className={"difficulty " + drill.level.replace(/\s+/g, "").toLowerCase()}>{drill.level}</span><h3>{drill.title}</h3><p>{drill.text}</p></article>)}</div></section></Reveal></>; }
function AppContent({ tab, setTab }) { if (tab === "meta") return <MetaBuilds />; if (tab === "draft") return <DraftBuilder />; if (tab === "kits") return <KitBrowser />; if (tab === "guide") return <><BypassStrategy /><GuidePage /></>; return <><Hero setTab={setTab} /><HomeCommandCenter setTab={setTab} /><MetaBuilds /><DraftBuilder /><KitBrowser /><BypassStrategy /></>; }
function Footer() { return <footer className="footer"><span className="brand" style={{ pointerEvents: "none" }}><span className="brandDot" /> BW META</span><p className="creatorCredit">Made by justcyril</p><p>Community guide for Roblox BedWars 5v5. Not affiliated with Roblox or the BedWars developers.</p><p>Season 16 · Updated regularly</p></footer>; }
export default function App() { useFonts(); const [tab, setTab] = useState("home"); return <div className="app"><style>{CSS}</style><MouseLight /><TopNav tab={tab} setTab={setTab} /><main><AppContent tab={tab} setTab={setTab} /></main><Footer /></div>; }

const CSS = "\n*, *::before, *::after { box-sizing: border-box; }\n* { min-width: 0; }\n:root { --bg:#020810; --surface:#080f1e; --surface2:#0d1628; --border:rgba(255,255,255,.07); --border-bright:rgba(255,255,255,.14); --cyan:#22d3ee; --cyan-dim:rgba(34,211,238,.15); --gold:#fbbf24; --gold-dim:rgba(251,191,36,.15); --red:#f87171; --green:#34d399; --text:#f0f9ff; --text2:rgba(186,214,240,.7); --text3:rgba(120,160,200,.45); --font-body:\"Inter\",-apple-system,BlinkMacSystemFont,\"Segoe UI\",sans-serif; --font-mono:\"JetBrains Mono\",ui-monospace,SFMono-Regular,Menlo,monospace; }\nhtml { scroll-behavior:smooth; background:var(--bg); }\nbody { margin:0; overflow-x:hidden; color:var(--text); background:var(--bg); font-family:var(--font-body); -webkit-font-smoothing:antialiased; }\nbutton,input { font:inherit; } button { cursor:pointer; } ::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-track{background:#030711}::-webkit-scrollbar-thumb{background:rgba(34,211,238,.55);border-radius:999px;border:2px solid #030711}\n.app { min-height:100vh; padding-bottom:max(56px, env(safe-area-inset-bottom)); background:radial-gradient(circle at 50% 0%, rgba(34,211,238,.12), transparent 34%), var(--bg); }\nmain { position:relative; z-index:2; padding-top:72px; }\n.mouseLight { position:fixed; inset:0; pointer-events:none; z-index:1; background:radial-gradient(circle at var(--mx) var(--my), rgba(34,211,238,.16), transparent 28%); mix-blend-mode:screen; }\n.topNav { position:fixed; top:0; left:0; right:0; z-index:50; height:72px; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:18px; padding:0 clamp(16px,4vw,48px); border-bottom:1px solid var(--border); background:rgba(2,8,16,.72); backdrop-filter:blur(22px) saturate(1.4); }\n.brand { border:0; background:transparent; display:inline-flex; align-items:center; gap:10px; color:var(--text); font-family:var(--font-mono); font-size:18px; font-weight:800; letter-spacing:.08em; }.brandDot{width:10px;height:10px;border-radius:50%;background:var(--cyan);box-shadow:0 0 18px var(--cyan)}\n.desktopLinks{display:flex;align-items:center;justify-content:center;gap:24px}.navLink{position:relative;border:0;background:transparent;color:var(--text2);font-weight:800;padding:25px 0}.navLink.active,.navLink:hover{color:var(--text)}.navLink.active::after{content:\"\";position:absolute;left:0;right:0;bottom:16px;height:2px;border-radius:999px;background:var(--cyan);box-shadow:0 0 16px var(--cyan)}.navRight{justify-self:end;display:flex;align-items:center;gap:12px}.creatorBadge{display:inline-flex;align-items:center;border:1px solid rgba(34,211,238,.3);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:999px;padding:8px 11px;font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase;box-shadow:0 0 18px rgba(34,211,238,.12)}.mobileCreator{display:none;margin:0 0 14px;justify-content:center}.seasonBadge{display:inline-flex;align-items:center;border:1px solid rgba(251,191,36,.34);background:var(--gold-dim);color:var(--gold);border-radius:999px;padding:8px 12px;font-family:var(--font-mono);font-weight:800;font-size:12px;text-transform:uppercase}.hamburger{display:none;width:42px;height:42px;border:1px solid var(--border-bright);background:rgba(255,255,255,.04);border-radius:12px}.hamburger span{display:block;width:18px;height:2px;margin:3px auto;background:var(--text);border-radius:999px}.mobilePanel{position:fixed;top:0;right:0;width:min(340px,88vw);height:100vh;padding:22px;background:rgba(8,15,30,.96);border-left:1px solid var(--border-bright);transform:translateX(105%);transition:transform .28s ease;box-shadow:-30px 0 80px rgba(0,0,0,.55)}.mobilePanel.open{transform:translateX(0)}.mobilePanelTop{display:flex;align-items:center;justify-content:space-between;margin-bottom:26px}.mobilePanelTop button{border:0;background:transparent;color:var(--text);font-size:34px}.mobileNavLink{width:100%;border:1px solid var(--border);background:rgba(255,255,255,.04);color:var(--text);border-radius:16px;padding:16px;text-align:left;margin-bottom:10px;font-weight:900}.mobileNavLink.active{border-color:rgba(34,211,238,.4);box-shadow:0 0 24px rgba(34,211,238,.16)}\n.hero{position:relative;min-height:100vh;display:grid;place-items:center;overflow:hidden;padding:110px 18px 80px}.heroGridOverlay{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:48px 48px;mask-image:radial-gradient(circle at 50% 45%,black 0%,transparent 72%)}.heroGlow{position:absolute;width:min(920px,100vw);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.28),rgba(37,99,235,.12) 38%,transparent 67%);filter:blur(8px);animation:glowPulse 5s ease-in-out infinite}.particles span{position:absolute;width:3px;height:3px;border-radius:50%;left:var(--x);top:var(--y);background:var(--cyan);box-shadow:0 0 12px var(--cyan);opacity:.55;animation:drift calc(8s + var(--i)*.4s) linear infinite}.heroInner{position:relative;z-index:2;max-width:1120px;text-align:center}.heroKicker,.eyebrow{color:var(--cyan);font-family:var(--font-mono);font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase}.heroCredit{display:inline-flex;margin-top:12px;border:1px solid rgba(34,211,238,.34);background:rgba(34,211,238,.1);color:var(--cyan);border-radius:999px;padding:8px 13px;font-family:var(--font-mono);font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;box-shadow:0 0 24px rgba(34,211,238,.16)}.heroFeatured{margin:24px auto 0;max-width:760px;border:1px solid rgba(34,211,238,.18);background:linear-gradient(135deg,rgba(34,211,238,.10),rgba(255,255,255,.035));border-radius:22px;padding:14px;display:grid;gap:11px;box-shadow:0 18px 60px rgba(0,0,0,.24)}.heroFeaturedLabel{color:var(--text3);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}.heroFeatured>div{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}.heroFeatured button{border:1px solid rgba(251,191,36,.24);background:rgba(251,191,36,.09);color:var(--gold);border-radius:999px;padding:8px 11px;font-family:var(--font-mono);font-size:11px;font-weight:900}.hero h1{margin:18px 0 0;font-size:clamp(54px,9vw,118px);line-height:.86;letter-spacing:-.06em;font-weight:900}.hero h1 span{display:block}.hero h1 em{font-style:normal;background:linear-gradient(90deg,#60a5fa,var(--cyan),#a7f3d0);-webkit-background-clip:text;background-clip:text;color:transparent}.hero p{margin:28px auto 0;max-width:720px;color:var(--text2);font-size:clamp(16px,2vw,20px);line-height:1.75}.heroActions{display:flex;flex-wrap:wrap;justify-content:center;gap:14px;margin-top:34px}.btn{border-radius:14px;padding:14px 20px;font-weight:900;border:1px solid transparent;position:relative;overflow:hidden}.btn.primary{color:#021018;background:linear-gradient(180deg,#67e8f9,var(--cyan));box-shadow:0 16px 42px rgba(34,211,238,.26)}.btn.outline{color:var(--text);background:rgba(255,255,255,.04);border-color:rgba(34,211,238,.34)}.rippleBtn{position:relative;overflow:hidden}.ripple{position:absolute;width:10px;height:10px;border-radius:50%;pointer-events:none;transform:translate(-50%,-50%);background:rgba(255,255,255,.55);animation:ripple .62s ease-out forwards}.heroStats{display:grid;grid-template-columns:repeat(4,minmax(120px,1fr));gap:12px;max-width:760px;margin:38px auto 0}.heroStats div{border:1px solid var(--border);background:rgba(8,15,30,.58);backdrop-filter:blur(18px);border-radius:18px;padding:18px}.heroStats strong{display:block;color:var(--text);font-family:var(--font-mono);font-size:30px}.heroStats span{color:var(--text3);font-size:12px;font-weight:800;text-transform:uppercase}\n.section{width:min(1180px,calc(100% - 32px));margin:0 auto;padding:96px 0}.commandSection{padding-top:36px}.commandGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.commandCard{border-radius:24px;padding:22px;text-align:left;color:var(--text)}.commandCard span{color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.commandCard h3{margin:10px 0 8px;font-size:22px;letter-spacing:-.04em}.commandCard p{margin:0;color:var(--text2);line-height:1.6}.commandCard em{display:inline-flex;margin-top:16px;color:var(--gold);font-family:var(--font-mono);font-size:11px;font-style:normal;font-weight:900;text-transform:uppercase}.sectionHeader{margin-bottom:28px}.sectionHeader.center{text-align:center}.sectionHeader h2{margin:8px 0 0;font-size:clamp(34px,5vw,58px);line-height:.95;letter-spacing:-.05em}.sectionHeader p{max-width:660px;color:var(--text2);line-height:1.65}.sectionHeader.center p{margin-inline:auto}.reveal{opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}.reveal.in{opacity:1;transform:translateY(0)}.interactiveCard{border:1px solid var(--border);background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.025)),var(--surface);box-shadow:0 20px 70px rgba(0,0,0,.25);transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease}.interactiveCard:hover{transform:translateY(-3px);border-color:rgba(34,211,238,.28);box-shadow:0 26px 80px rgba(0,0,0,.32),0 0 34px rgba(34,211,238,.1)}.buildList{display:grid;gap:18px}.buildCard{position:relative;border-radius:24px;overflow:hidden;animation:fadeUp .5s ease both;animation-delay:var(--delay)}.buildCard.sTier::before{content:\"\";position:absolute;inset:0;border-radius:inherit;border:1px solid rgba(251,191,36,.3);background:linear-gradient(110deg,transparent 0%,rgba(251,191,36,.1) 42%,transparent 56%);animation:shimmer 4.8s linear infinite;pointer-events:none}.buildHeader{width:100%;border:0;background:transparent;color:inherit;display:grid;grid-template-columns:8px 1fr auto;gap:20px;padding:24px;text-align:left}.accentBar{width:8px;min-height:100%;border-radius:999px;background:var(--accent);box-shadow:0 0 22px var(--accent)}.buildMetaLine{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px}.buildTag{color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.15em;text-transform:uppercase}.buildMain h3{margin:0;font-size:clamp(22px,3vw,34px);letter-spacing:-.04em}.roleTags{display:flex;flex-wrap:wrap;gap:7px;margin-top:12px}.roleTag{display:inline-flex;border:1px solid;border-radius:999px;padding:5px 9px;font-family:var(--font-mono);font-size:11px;font-weight:800}.roleTag.compact{font-size:10px;padding:4px 8px}.buildMain p{color:var(--text2);line-height:1.7;margin:14px 0 0}.tierBadge{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:30px;border:1px solid;border-radius:999px;font-family:var(--font-mono);font-weight:900;font-size:12px;animation:tierPop .5s ease both}.tierBadge.large{min-width:42px;height:42px;font-size:15px}.breakdownBtn{align-self:start;border:1px solid rgba(34,211,238,.28);color:var(--cyan);background:rgba(34,211,238,.08);border-radius:999px;padding:10px 13px;font-size:12px;font-weight:900;white-space:nowrap}.buildBreakdown{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:0 24px 24px 52px}.infoTile,.miniBlock{border:1px solid var(--border);border-radius:18px;background:rgba(255,255,255,.035);padding:16px}.infoTile span,.miniBlock span,.panelTitle{color:var(--cyan);font-family:var(--font-mono);font-size:11px;font-weight:900;letter-spacing:.12em;text-transform:uppercase}.quickDrafts{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:14px}.quickDrafts button{border:1px solid rgba(34,211,238,.28);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:12px;padding:10px;font-family:var(--font-mono);font-size:11px;font-weight:900;text-transform:uppercase}.infoTile p,.miniBlock p{color:var(--text2);line-height:1.65;margin:8px 0 0}.infoTile.danger{border-color:rgba(248,113,113,.24)}\n.draftGrid{display:grid;grid-template-columns:.9fr 1fr 1.1fr;gap:18px;align-items:stretch}.draftColumn{border:1px solid var(--border);background:rgba(8,15,30,.72);border-radius:26px;padding:22px;backdrop-filter:blur(16px)}.slotStack{display:grid;gap:12px;margin-top:18px}.slotCard{width:100%;border-radius:18px;padding:16px;display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:12px;color:var(--text);text-align:left}.slotNumber{color:var(--text3);font-family:var(--font-mono);font-weight:900}.slotCard strong{display:block;font-size:17px}.slotCard small{color:var(--text3);font-weight:800}.scoreColumn{display:grid;justify-items:center;align-content:center;text-align:center}.scoreRing{position:relative;width:190px;height:190px}.scoreRing svg{width:100%;height:100%;transform:rotate(-90deg)}.ringTrack,.ringProgress{fill:none;stroke-width:12}.ringTrack{stroke:rgba(255,255,255,.07)}.ringProgress{stroke:var(--scoreColor);stroke-linecap:round;transition:stroke-dashoffset .25s linear,stroke .25s;filter:drop-shadow(0 0 13px var(--scoreColor))}.scoreText{position:absolute;inset:0;display:grid;place-items:center}.scoreText strong{font-family:var(--font-mono);font-size:54px}.scoreText span{margin-top:54px;color:var(--text3);position:absolute}.verdict{margin-top:12px;font-family:var(--font-mono);font-size:24px;color:var(--cyan);font-weight:900;letter-spacing:.1em}.scoreColumn p{color:var(--text2)}.coverageGrid{display:flex;flex-wrap:wrap;justify-content:center;gap:7px;margin:16px 0 20px}.coveragePill{border:1px solid rgba(248,113,113,.24);color:var(--red);background:rgba(248,113,113,.08);border-radius:999px;padding:7px 10px;font-family:var(--font-mono);font-size:10px;font-weight:900}.coveragePill.ok{border-color:rgba(52,211,153,.3);color:var(--green);background:rgba(52,211,153,.1)}.analyzeButton{width:100%}.analysisPanel{display:grid;gap:14px}.analysisTop{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.analysisTop span,.analysisTop em{border:1px solid rgba(34,211,238,.28);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:999px;padding:8px 11px;font-family:var(--font-mono);font-style:normal;font-size:11px;font-weight:900}.summaryText{color:var(--text2);line-height:1.7}.analysisLists{display:grid;grid-template-columns:1fr 1fr;gap:12px}.analysisLists h4{margin:0 0 8px}.goodItem,.badItem{margin:6px 0;border-radius:12px;padding:9px 10px;line-height:1.45;font-size:13px}.goodItem{color:#bbf7d0;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.16)}.badItem{color:#fecaca;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.16)}.proTip{border:1px solid rgba(52,211,153,.2);background:rgba(52,211,153,.08);color:#bbf7d0;border-radius:16px;padding:14px;line-height:1.55}.proTip strong{display:block;font-family:var(--font-mono);color:var(--green);margin-bottom:5px}.loadingBox{min-height:320px;display:grid;place-items:center;align-content:center;gap:10px;color:var(--text2)}.loadingBox span{width:10px;height:10px;border-radius:50%;background:var(--cyan);animation:dotPulse 1s ease-in-out infinite}.loadingBox span:nth-child(2){animation-delay:.15s}.loadingBox span:nth-child(3){animation-delay:.3s}.pickerBackdrop{position:fixed;inset:0;z-index:80;display:grid;place-items:center;padding:18px;background:rgba(0,0,0,.58);backdrop-filter:blur(10px)}.kitPicker{width:min(620px,100%);max-height:min(760px,88vh);border:1px solid var(--border-bright);background:#07101f;border-radius:26px;padding:20px;box-shadow:0 35px 100px rgba(0,0,0,.65)}.pickerTop{display:flex;justify-content:space-between;gap:14px}.pickerTop h3{margin:4px 0 0;font-size:28px}.pickerTop button{border:0;color:var(--text);background:transparent;font-size:32px}.kitPicker input,.kitToolbar input{width:100%;border:1px solid var(--border-bright);background:rgba(255,255,255,.04);color:var(--text);border-radius:16px;padding:14px 16px;outline:none}.pickerList{display:grid;gap:8px;margin-top:14px;max-height:470px;overflow:auto;padding-right:4px}.pickerItem{border:1px solid var(--border);background:rgba(255,255,255,.035);color:var(--text);border-radius:16px;padding:13px;display:flex;align-items:center;justify-content:space-between;gap:12px;text-align:left}.pickerItem:hover,.pickerItem.picked{border-color:rgba(34,211,238,.35);background:rgba(34,211,238,.08)}.pickerItem strong,.pickerItem small{display:block}.pickerItem small{color:var(--text3);margin-top:3px}\n.kitToolbar{display:grid;gap:14px;margin-bottom:24px}.kitSearchRow{display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px}.kitSearchRow span{border:1px solid var(--border);background:rgba(255,255,255,.04);border-radius:999px;padding:10px 12px;color:var(--text2);font-family:var(--font-mono);font-size:11px;font-weight:900;white-space:nowrap}.emptyState{border:1px solid var(--border);background:rgba(255,255,255,.035);border-radius:24px;padding:38px;text-align:center}.emptyState h3{margin:0 0 8px;font-size:24px}.emptyState p{margin:0;color:var(--text2)}.filterTabs{display:flex;flex-wrap:wrap;gap:8px}.filterTabs button{border:1px solid var(--border);background:rgba(255,255,255,.035);color:var(--text2);border-radius:999px;padding:9px 13px;font-weight:900;font-size:12px}.filterTabs button.active,.filterTabs button:hover{color:var(--text);border-color:rgba(34,211,238,.38);background:rgba(34,211,238,.1)}.kitGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));grid-auto-flow:dense;gap:14px}.kitCard{position:relative;border-radius:22px;padding:18px;animation:fadeUp .45s ease both;animation-delay:var(--delay)}.kitCard.elevated{border-color:rgba(255,255,255,.13)}.kitCard.sTierKit{border-top-color:rgba(251,191,36,.72);box-shadow:0 18px 60px rgba(0,0,0,.24),inset 0 1px 0 rgba(251,191,36,.32)}.kitHead{display:flex;align-items:center;justify-content:space-between;gap:12px}.kitHead h3{margin:0;font-size:21px;letter-spacing:-.025em}.kitSubRoles{color:var(--text3);font-family:var(--font-mono);font-size:11px;margin-top:12px;text-transform:uppercase}.expandDescription{margin-top:14px;border:1px solid rgba(34,211,238,.28);color:var(--cyan);background:rgba(34,211,238,.08);border-radius:12px;padding:9px 11px;font-weight:900}.kitDescription{color:var(--text2);line-height:1.65}.tipsBox{margin-top:12px;border:1px solid rgba(52,211,153,.18);background:rgba(52,211,153,.08);color:#bbf7d0;border-radius:14px;padding:12px;line-height:1.55}.tipsBox strong{display:block;color:var(--green);font-family:var(--font-mono);margin-bottom:5px}\n.bypassHero{border:1px solid rgba(192,132,252,.22);border-radius:30px;padding:clamp(28px,5vw,58px);background:radial-gradient(circle at 20% 0%,rgba(192,132,252,.24),transparent 42%),linear-gradient(135deg,rgba(76,29,149,.35),rgba(8,15,30,.86))}.bypassHero h2{margin:8px 0 0;font-size:clamp(44px,7vw,82px);letter-spacing:-.06em}.bypassHero p{color:#ddd6fe;font-size:20px}.flowDiagram{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin:22px 0}.flowNode{position:relative;border:1px solid rgba(192,132,252,.28);background:rgba(88,28,135,.22);color:#ede9fe;border-radius:18px;padding:16px;text-align:center;font-weight:900}.flowNode:not(:last-child)::after{content:\"\";position:absolute;top:50%;right:-13px;width:13px;height:2px;background:#a78bfa;box-shadow:0 0 12px #a78bfa}.flowNode span{display:block;color:#c4b5fd;font-family:var(--font-mono);font-size:11px;margin-bottom:5px}.bypassGrid{display:grid;grid-template-columns:1.3fr .7fr;gap:18px}.timelinePanel,.counterPanel,.bestComps{border:1px solid rgba(192,132,252,.2);background:rgba(8,15,30,.76);border-radius:24px;padding:22px}.strategyStep{display:grid;grid-template-columns:54px 1fr;gap:14px;padding:16px 0;border-bottom:1px solid var(--border)}.strategyStep:last-child{border-bottom:0}.strategyStep>span{width:42px;height:42px;display:grid;place-items:center;border-radius:14px;background:rgba(192,132,252,.15);color:#c4b5fd;font-family:var(--font-mono);font-weight:900}.strategyStep h3,.counterPanel h3,.bestComps h3{margin:0}.strategyStep p,.counterPanel p{color:var(--text2);line-height:1.6}.counterPanel{border-color:rgba(248,113,113,.24)}.counterPanel h3{color:var(--red)}.counterPanel p{color:#fecaca;background:rgba(248,113,113,.07);border:1px solid rgba(248,113,113,.14);border-radius:14px;padding:12px}.bestComps{margin-top:18px}.chipRow,.goodAnswers{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.chipRow span,.goodAnswers span{border:1px solid rgba(34,211,238,.28);background:rgba(34,211,238,.08);color:var(--cyan);border-radius:999px;padding:7px 11px;font-weight:900;font-size:12px}.chipRow.alt span{border-color:rgba(192,132,252,.3);background:rgba(192,132,252,.1);color:#d8b4fe}.roleGuideGrid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }.roleCard { border-radius:24px; padding:22px; }.roleIcon { width:48px; height:48px; display:grid; place-items:center; border-radius:16px; font-size:22px; border:1px solid; margin-bottom:14px; }.roleCard h3 { margin:0 0 8px; font-size:22px; letter-spacing:-.03em; }.roleCard p { color:var(--text2); line-height:1.65; margin:0 0 14px; }.roleKits { display:flex; flex-wrap:wrap; gap:7px; }.roleKits span { border:1px solid var(--border-bright); background:rgba(255,255,255,.04); color:var(--text2); border-radius:999px; padding:5px 10px; font-size:12px; font-weight:700; }.counterGrid,.practiceGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.counterCard,.practiceCard{border-radius:24px;padding:22px}.counterIcon{width:48px;height:48px;display:grid;place-items:center;border-radius:16px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.2);color:var(--cyan);font-size:23px}.counterCard h3,.practiceCard h3{margin:14px 0 8px;font-size:24px}.counterCard p,.practiceCard p{color:var(--text2);line-height:1.65}.avoidBox{border:1px solid rgba(248,113,113,.18);background:rgba(248,113,113,.08);color:#fecaca;border-radius:14px;padding:12px}.timingLine{display:grid;gap:16px}.timeNode{position:relative;margin-left:26px;border:1px solid var(--border);background:rgba(8,15,30,.72);border-radius:20px;padding:18px}.timeNode::before{content:\"\";position:absolute;left:-29px;top:23px;width:13px;height:13px;border-radius:50%;background:var(--cyan);box-shadow:0 0 16px var(--cyan)}.timeNode span{color:var(--cyan);font-family:var(--font-mono);font-weight:900;font-size:12px}.timeNode h3{margin:7px 0}.timeNode p{color:var(--text2);line-height:1.65}.difficulty{display:inline-flex;border-radius:999px;padding:7px 10px;font-family:var(--font-mono);font-size:11px;font-weight:900}.difficulty.beginner{color:var(--green);background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.22)}.difficulty.coreskill{color:var(--gold);background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.22)}.difficulty.advanced{color:var(--red);background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.22)}.footer { border-top:1px solid var(--border); background:rgba(8,15,30,.72); padding:32px clamp(16px,4vw,48px); display:flex; flex-direction:column; align-items:center; gap:10px; text-align:center; }.footer p { color:var(--text3); font-size:13px; margin:0; }.footer .creatorCredit { color:var(--cyan); font-family:var(--font-mono); font-size:14px; font-weight:900; letter-spacing:.12em; text-transform:uppercase; }\n@keyframes glowPulse{50%{transform:scale(1.05);opacity:.75}}@keyframes drift{from{transform:translate3d(0,0,0)}to{transform:translate3d(32px,-70px,0);opacity:.1}}@keyframes ripple{to{width:420px;height:420px;opacity:0}}@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes shimmer{from{transform:translateX(-120%)}to{transform:translateX(120%)}}@keyframes tierPop{0%{transform:scale(.78);filter:brightness(1.8)}100%{transform:scale(1);filter:brightness(1)}}@keyframes dotPulse{50%{transform:scale(1.4);opacity:.45}}\n@media (max-width:960px){.topNav{grid-template-columns:1fr auto}.desktopLinks{display:none}.hamburger{display:block}.hero{min-height:80vh}.draftGrid,.bypassGrid,.flowDiagram,.commandGrid{grid-template-columns:1fr}.flowNode:not(:last-child)::after{display:none}.analysisLists,.buildBreakdown,.counterGrid,.practiceGrid{grid-template-columns:1fr}.roleGuideGrid { grid-template-columns:repeat(2,1fr); }.buildHeader{grid-template-columns:7px 1fr}.breakdownBtn{grid-column:2;justify-self:start}.buildBreakdown{padding-left:24px}}\n@media (max-width:640px){main { padding-top:64px; }.creatorBadge{display:none}.mobileCreator{display:flex}.kitSearchRow{grid-template-columns:1fr}.heroFeatured{padding:12px}.heroFeatured>div{justify-content:flex-start;overflow-x:auto;flex-wrap:nowrap;padding-bottom:2px}.heroFeatured button{white-space:nowrap}.topNav{height:64px;padding:0 14px}.brand{font-size:15px}.seasonBadge{display:none}.seasonBadge.mobile{display:inline-flex}.heroStats{grid-template-columns:repeat(2,1fr)}.hero h1{font-size:48px}.section{width:min(100% - 24px,1180px);padding:68px 0}.heroActions .btn{width:100%}.kitGrid{grid-template-columns:1fr}.slotCard{grid-template-columns:30px 1fr auto}.roleGuideGrid { grid-template-columns:1fr; }}\n";

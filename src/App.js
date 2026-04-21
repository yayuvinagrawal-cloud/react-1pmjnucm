import React from "react";
export default function BedwarsMetaSite() {
  const comps = [
    {
      name: "Sheila / Star / Noelle / Beekeeper",
      tag: "Core comp",
      why: "Reliable, well-rounded setup with pressure, sustain, and steady scaling.",
      useWhen: "Use when your team has good coordination and your Beekeeper can consistently build value early (prioritize getting bees quickly rather than overcommitting to base).",
      early: "Split 2 mid / 2 base. Take only favorable fights.",
      mid: "Play around Sheila and Star to control space and take one clean team fight.",
      win: "Convert a won fight into immediate bed pressure.",
    },
    {
      name: "Farmer / Fisher / Star / Amy",
      tag: "Stable econ",
      why: "Consistent resource scaling with strong defensive stability.",
      useWhen: "When running a stable economy with two bed defenders; prioritize a safe early game and scale into mid game.",
      early: "Avoid unnecessary fights and protect your economy players.",
      mid: "Prioritize armor, upgrades, and enchants efficiently.",
      win: "Leverage gear advantage and push as a group.",
    },
    {
      name: "Lani / Lani / Warden (or Nyx) / Fisher",
      tag: "Bypass",
      why: "Designed to avoid standard engagements and create fast win conditions through bed pressure.",
      useWhen: "Against slower teams or when aiming for shorter games.",
      early: "Split lanes. Lani players create angles while Fisher focuses on economy.",
      mid: "Maintain side pressure and avoid full team engagements.",
      win: "Capitalize on openings to break beds and collapse quickly.",
    },
  ];

  const roles = [
    { key: "CYCLE", desc: "Scaling kits such as Metal, Beekeeper, Farmer, and Fisher." },
    { key: "BD", desc: "Bed defender. Maintains generator control and base stability." },
    { key: "MJ", desc: "Main jugg. Primary PvP role. Amy and Freya are strong examples that are less kill-dependent." },
    { key: "SJ", desc: "Second jugg. Supports the main jugg and creates advantages (e.g., Zeno, Lassy, Star)." },
    { key: "BBER", desc: "Bed breaker. Focuses on identifying openings and ending games." },
  ];

  const quickGuide = [
    "Avoid forcing early fights unless there is a clear advantage.",
    "Engage primarily in groups of 2–3 players.",
    "Protect cycle kits during the early phase.",
    "Prioritize early blocks and a stone sword over unnecessary fights.",
    "One clean team fight often determines the outcome of the match.",
    "Vs cheaters: don’t ego fight. play gear, stack blocks/TNT, have 1 BBER look for openings while others pressure and tnt rain.",
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-neutral-900">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">
        <div className="mb-8 overflow-hidden rounded-[32px] border border-black/5 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <div className="border-b border-black/5 px-6 py-4 sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <div className="rounded-full bg-black/[0.03] px-4 py-1.5 text-xs font-medium text-neutral-500">
                squads reference
              </div>
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-sm font-medium text-neutral-600">
                Roblox BedWars
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Squads comps, roles, and win conditions
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-500 sm:text-lg">
                A concise reference for effective ranked play focused on structure, roles, and execution.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-3xl border border-black/5 bg-[#fafafa] p-5">
                <div className="text-sm text-neutral-500">Best for</div>
                <div className="mt-2 text-lg font-semibold">4-stack ranked teams</div>
              </div>
              <div className="rounded-3xl border border-black/5 bg-[#fafafa] p-5">
                <div className="text-sm text-neutral-500">Focus</div>
                <div className="mt-2 text-lg font-semibold">Roles and coordination</div>
              </div>
              <div className="rounded-3xl border border-black/5 bg-[#fafafa] p-5">
                <div className="text-sm text-neutral-500">Approach</div>
                <div className="mt-2 text-lg font-semibold">Convert advantages quickly</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">Win checklist</h2>
              <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-neutral-500">core</span>
            </div>
            <div className="space-y-3">
              {quickGuide.map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-2xl bg-[#f8f8f8] p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold shadow-sm ring-1 ring-black/5">
                    {index + 1}
                  </div>
                  <p className="pt-1 text-sm leading-6 text-neutral-600">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-7">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight">Roles</h2>
              <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-neutral-500">definitions</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((r) => (
                <div key={r.key} className="rounded-3xl border border-black/5 bg-[#fafafa] p-5 transition-transform duration-200 hover:-translate-y-0.5">
                  <div className="text-sm font-semibold tracking-[0.18em] text-neutral-400">{r.key}</div>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">{r.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-7">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Recommended comps</h2>
              <p className="mt-1 text-sm text-neutral-500">When to use them and how they typically convert games.</p>
            </div>
            <div className="rounded-full bg-black/[0.04] px-4 py-1.5 text-xs font-medium text-neutral-500">
              ranked squads
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            {comps.map((comp) => (
              <article key={comp.name} className="group rounded-[28px] border border-black/5 bg-[#fafafa] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] sm:p-6">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400">{comp.tag}</div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">{comp.name}</h3>
                  </div>
                  <div className="rounded-full border border-black/5 bg-white px-3 py-1 text-xs font-medium text-neutral-500">
                    comp
                  </div>
                </div>

                <p className="mb-4 text-sm leading-6 text-neutral-600">{comp.why}</p>

                <div className="mb-5 rounded-2xl bg-white p-4 ring-1 ring-black/5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Use when</div>
                  <div className="mt-2 text-sm font-medium text-neutral-700">{comp.useWhen}</div>
                </div>

                <div className="space-y-3">
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Early</div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{comp.early}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Mid</div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{comp.mid}</p>
                  </div>
                  <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Win condition</div>
                    <p className="mt-2 text-sm leading-6 text-neutral-600">{comp.win}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

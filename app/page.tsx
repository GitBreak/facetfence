'use client';
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/ban-ts-comment, react/no-unescaped-entities, react-hooks/exhaustive-deps */

import React, { useMemo, useState } from "react";
import { Check, Shield, SlidersHorizontal, Filter, Bot, Link as LinkIcon, Timer, Globe2, FileCog, Zap, LineChart, Wrench } from "lucide-react";
import { motion } from "framer-motion";

// Brand palette
const brand = {
  blue: "#3782f2",
  black: "#111111",
  gray: "#292929",
};

// Simple analytics helper (GA4/GTM friendly)
function track(event: string, params: Record<string, any> = {}) {
  try {
    // @ts-ignore
    window.dataLayer = (window as any).dataLayer || [];
    // @ts-ignore
    (window as any).dataLayer.push({ event, ...params });
  } catch (_) {}
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-sm md:text-base font-medium text-white/80 hover:text-white transition">{children}</a>
);

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
    {children}
  </span>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3"><Check className="mt-1 h-5 w-5 flex-none" /><span>{children}</span></li>
);

function usePolicyResult(opts: { filter: boolean; sort: boolean; page: boolean }) {
  const { filter, sort, page } = opts;
  return useMemo(() => {
    const active: string[] = [];
    if (filter) active.push("filter.v.*");
    if (sort) active.push("sort_by");
    if (page) active.push("page");

    if (!active.length) return {
      verdict: "Index",
      canonical: "Self",
      robots: "Allow",
      note: "No faceted parameters detected. Safe to index.",
    };

    // Simple policy: filters/sort/pagination → noindex + canonical to base, robots allow except disallow /search
    const canonical = "Canonical → Clean URL (no params)";
    const robots = page ? "Allow (noindex handles duplication)" : "Allow";

    return {
      verdict: "Noindex",
      canonical,
      robots,
      note: `Params detected: ${active.join(", ")}. Apply canonical to base and set meta robots noindex,follow.`,
    };
  }, [opts]);
}

export default function FacetFenceLanding() {
  const [filter, setFilter] = useState(true);
  const [sort, setSort] = useState(true);
  const [page, setPage] = useState(true);
  const result = usePolicyResult({ filter, sort, page });

  return (
    <div className="min-h-screen bg-[#0b0e13] text-white selection:bg-white/20">
      {/* JSON-LD for SoftwareApplication & Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "FacetFence",
            applicationCategory: "SEOUtility",
            operatingSystem: "Shopify",
            description:
              "Facet & canonical policy manager for Shopify. Stops crawl waste from filters/sorting/pagination and ships clean schema.",
            offers: [
              { "@type": "Offer", price: "29", priceCurrency: "USD" },
              { "@type": "Offer", price: "79", priceCurrency: "USD" },
              { "@type": "Offer", price: "199", priceCurrency: "USD" },
            ],
            publisher: { "@type": "Organization", name: "FacetFence" },
          }),
        }}
      />
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0b0e13]/70 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-3 md:py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl" style={{ background: brand.blue }} />
            <span className="text-lg md:text-xl font-semibold">FacetFence</span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#how">How it works</NavLink>
            <NavLink href="#bundle">Firebreak</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <NavLink href="#faq">FAQ</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#pricing" onClick={() => track('cta_click', { cta: 'header_learn_more' })} className="hidden sm:inline-flex rounded-xl border border-white/15 px-4 py-2 text-sm hover:bg-white/10">Learn more</a>
            <a href="#signup" onClick={() => track('cta_click', { cta: 'header_start_trial' })} className="inline-flex rounded-xl px-4 py-2 text-sm font-semibold" style={{ background: brand.blue }}>
              Start 14‑day free trial
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full blur-3xl opacity-40" style={{ background: brand.blue }} />
          <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full blur-3xl opacity-30" style={{ background: brand.gray }} />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-14 md:pt-24 pb-10 md:pb-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Pill>
              <Shield className="h-4 w-4" />
              Shopify SEO Firebreak
            </Pill>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">
              Stop crawl waste. Boost LCP. Ship clean schema.
            </h1>
            <p className="mt-4 text-white/80 max-w-xl">
              FacetFence is a facet & canonical policy manager for Shopify. Kill crawl budget leaks from <code>?filter.v.*</code>, <code>?sort_by=</code>, and pagination. Ship faster pages and tidy structured data — without fighting Liquid.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#signup" onClick={() => track('cta_click', { cta: 'hero_start_trial' })} className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold" style={{ background: brand.blue }}>
                Start free trial
              </a>
              <a href="#pricing" onClick={() => track('cta_click', { cta: 'hero_pricing' })} className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/10">
                See pricing
              </a>
              <a href="#chat" onClick={() => track('cta_click', { cta: 'hero_chat' })} className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-5 py-3 font-semibold hover:bg-white/10">
                Chat with us
              </a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-white/70">
              <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4"/> Built for Shopify (OS 2.0)</span>
              <span className="inline-flex items-center gap-2"><Timer className="h-4 w-4"/> 10‑min install</span>
              <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4"/> Zero theme bloat</span>
            </div>
          </motion.div>

          {/* Interactive Policy Simulator */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2"><SlidersHorizontal className="h-5 w-5"/> Policy Simulator</h3>
                <Pill><FileCog className="h-4 w-4"/> Live policy</Pill>
              </div>
              <p className="mt-2 text-sm text-white/70">Toggle typical faceted params and see the applied policy.</p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button onClick={() => setFilter(v => !v)} className={`rounded-2xl px-3 py-2 text-sm border ${filter ? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'}`}>
                  <div className="flex items-center gap-2 justify-center"><Filter className="h-4 w-4"/> filter.v.*</div>
                </button>
                <button onClick={() => setSort(v => !v)} className={`rounded-2xl px-3 py-2 text-sm border ${sort ? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'}`}>
                  <div className="flex items-center gap-2 justify-center"><SlidersHorizontal className="h-4 w-4"/> sort_by</div>
                </button>
                <button onClick={() => setPage(v => !v)} className={`rounded-2xl px-3 py-2 text-sm border ${page ? 'bg-white/10 border-white/20' : 'border-white/10 hover:bg-white/5'}`}>
                  <div className="flex items-center gap-2 justify-center"><LinkIcon className="h-4 w-4"/> page</div>
                </button>
              </div>

              <div className="mt-5 rounded-2xl bg-black/40 border border-white/10 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/50">Verdict</div>
                    <div className="text-base font-semibold" style={{ color: result.verdict === 'Index' ? '#6ee7b7' : '#fca5a5' }}>{result.verdict}</div>
                  </div>
                  <div>
                    <div className="text-white/50">Robots</div>
                    <div className="text-base font-semibold">{result.robots}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-white/50">Canonical</div>
                    <div className="text-base font-semibold">{result.canonical}</div>
                  </div>
                </div>
                <p className="mt-3 text-xs text-white/70">{result.note}</p>
              </div>

              <div className="mt-5">
                <div className="text-xs text-white/60">Liquid helper (auto‑injected):</div>
                <pre className="mt-2 rounded-2xl bg-black/60 p-4 text-xs overflow-auto"><code>{`{% if request.query %}
  {% assign blocklist = 'filter.v.,sort_by,page' | split: ',' %}
  {% for p in blocklist %}
    {% if request.query contains p %}
      <meta name="robots" content="noindex,follow">
      <link rel="canonical" href="{{ request.path }}">
      {% break %}
    {% endif %}
  {% endfor %}
{% endif %}`}</code></pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos / proof */}
      <section className="py-8 md:py-10 border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-center gap-6 text-white/60">
          <span className="text-xs uppercase tracking-widest">Compatible with</span>
          <div className="h-6 w-[1px] bg-white/10" />
          <span className="text-sm">Shopify Online Store 2.0</span>
          <div className="h-6 w-[1px] bg-white/10" />
          <span className="text-sm">Markets & hreflang</span>
          <div className="h-6 w-[1px] bg-white/10" />
          <span className="text-sm">Theme App Extensions</span>
          <div className="h-6 w-[1px] bg-white/10" />
          <span className="text-sm">GA4 & GSC Insights</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold">One bundle. Five jobs done right.</h2>
            <p className="mt-3 text-white/80">FacetFence is part of <strong>Shopify SEO Firebreak</strong> — a no‑nonsense toolkit that stops crawl waste, accelerates LCP, cleans your schema, and tightens internal links across Markets.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard icon={<Filter />} title="FacetFence" subtitle="Facet & Canonical Policy Manager">
              Auto‑noindex + canonicalize <code>?filter.v.*</code>, <code>?sort_by=</code>, and pagination. Guidance for <code>robots.txt.liquid</code>. No more duplicate crawl traps.
            </FeatureCard>
            <FeatureCard icon={<Zap />} title="LCP Turbo" subtitle="Performance Guardrails">
              Preload hero media, defer app bloat, serve AVIF/WebP, and lazy‑load below the fold. Template‑level LCP budgets enforced.
            </FeatureCard>
            <FeatureCard icon={<LinkIcon />} title="Linksmith" subtitle="Internal Link Auditor">
              Kill redirect chains, update stale inlinks after handle changes, and surface orphaned money pages.
            </FeatureCard>
            <FeatureCard icon={<Bot />} title="SchemaClean" subtitle="Structured Data Sanity">
              Single source of truth for Product, Offer, Reviews, Breadcrumb, Organization. No duplicate JSON‑LD from apps.
            </FeatureCard>
            <FeatureCard icon={<Globe2 />} title="MarketsGuard" subtitle="i18n & Canonicals">
              Stable canonicals per market, clean hreflang, currency/language param controls, and cross‑market duplication checks.
            </FeatureCard>
            <FeatureCard icon={<LineChart />} title="Impact Reports" subtitle="SEO you can prove">
              Track indexed pages, crawl stats, LCP/INP per template, and schema validity. Tie fixes to revenue.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 md:py-24 border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">How FacetFence works</h2>
            <ol className="mt-6 space-y-5 text-white/80">
              <li className="flex gap-4"><span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: brand.blue }}>1</span><div><strong>Detect faceted URLs</strong> — We watch for Shopify’s usual suspects: <code>filter.v.*</code>, <code>sort_by</code>, and <code>page</code>.
              </div></li>
              <li className="flex gap-4"><span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: brand.blue }}>2</span><div><strong>Apply policy</strong> — Auto‑inject <code>noindex,follow</code>, rewrite <code>rel=canonical</code> to the clean URL, and optionally disallow noisy paths in <code>robots.txt.liquid</code>.
              </div></li>
              <li className="flex gap-4"><span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: brand.blue }}>3</span><div><strong>Enforce guardrails</strong> — LCP budgets, schema deduping, and internal‑link hygiene run on a schedule so things don’t regress.
              </div></li>
              <li className="flex gap-4"><span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: brand.blue }}>4</span><div><strong>Prove impact</strong> — We track index coverage, crawl stats, and Core Web Vitals by template.
              </div></li>
            </ol>

            <div className="mt-8 rounded-2xl border border-white/10 p-5">
              <div className="text-sm text-white/60">Policy DSL (editable):</div>
              <pre className="mt-2 rounded-xl bg-black/60 p-4 text-xs overflow-auto"><code>{`policy:
  - match: "*?filter.v.*=*"
    action: [noindex, canonical_base]
  - match: "*?sort_by=*"
    action: [noindex, canonical_base]
  - match: "*?page=*"
    action: [noindex, canonical_base]
  robots_txt:
    disallow:
      - "/search"
      - "/*?utm_*"
`}</code></pre>
              <p className="mt-2 text-xs text-white/60">We ship sane defaults. You can override per‑collection or template.</p>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Wrench className="h-5 w-5"/> Shopify‑native install</h3>
            <ul className="mt-4 space-y-3 text-white/80">
              <Bullet>Install via <strong>Theme App Extension</strong> (no theme edits needed).</Bullet>
              <Bullet>Optional <strong>robots.txt.liquid</strong> guidance and preview before publishing.</Bullet>
              <Bullet>Works with <strong>Markets</strong> and custom domains/subfolders.</Bullet>
              <Bullet><strong>No lock‑in</strong>: uninstall leaves your theme clean.</Bullet>
            </ul>
            <div className="mt-6 rounded-2xl bg-black/40 border border-white/10 p-4">
              <div className="text-sm text-white/70">Expected wins (typical):</div>
              <ul className="mt-2 grid sm:grid-cols-2 gap-2 text-sm">
                <li>−60–90% duplicate crawl</li>
                <li>−200–800ms LCP on collection/PDP</li>
                <li>+ cleaner index coverage</li>
                <li>+ valid Product schema</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bundle callout */}
      <section id="bundle" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Shopify SEO Firebreak</h2>
            <p className="mt-3 text-white/80">Bundle FacetFence with <strong>LCP Turbo</strong>, <strong>Linksmith</strong>, <strong>SchemaClean</strong>, and <strong>MarketsGuard</strong>. One install, five wins.</p>
            <ul className="mt-5 space-y-3 text-white/80">
              <Bullet>Stop crawl waste from filters, sorting, and pagination.</Bullet>
              <Bullet>Enforce LCP budgets and defer third‑party bloat.</Bullet>
              <Bullet>Fix redirect chains and stale inlinks from handle changes.</Bullet>
              <Bullet>Ship valid, deduped JSON‑LD that matches the DOM.</Bullet>
              <Bullet>Keep hreflang and market canonicals stable.</Bullet>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold flex items-center gap-2"><Shield className="h-5 w-5"/> Why it matters</h3>
            <p className="mt-2 text-white/80">Crawl budget wasted on faceted URLs slows discovery of the pages that actually sell. Meanwhile bloated themes and messy schema erode rankings and revenue. Firebreak fixes the root causes in one place.</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <Stat label="Crawl waste cut" value="60–90%" />
              <Stat label="LCP improvement" value="200–800ms" />
              <Stat label="Schema errors" value="→ 0" />
              <Stat label="Setup time" value="~10 min" />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-16 md:py-24 border-t border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">Straightforward pricing</h2>
            <p className="mt-3 text-white/80">14‑day free trial. Cancel anytime. Partner/agency plan with revenue share available.</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            <PricingCard
              name="Starter"
              price="$29"
              blurb="FacetFence presets + basic LCP guardrails"
              cta="Start free trial"
              features={[
                "Facet & canonical policies (defaults)",
                "Noindex + canonical for filters/sort/pagination",
                "Robots.txt.liquid guidance",
                "Basic LCP: hero preload & lazy below‑fold",
                "Template‑level checks (Collections, PDP)",
              ]}
              highlighted={false}
            />
            <PricingCard
              name="Growth"
              price="$79"
              blurb="Adds Linksmith & SchemaClean"
              cta="Start free trial"
              features={[
                "Everything in Starter",
                "Linksmith: fix redirect chains & stale inlinks",
                "SchemaClean: Product/Offer/Review/Breadcrumb",
                "GA4/GSC impact snapshots",
                "Email support",
              ]}
              highlighted={true}
            />
            <PricingCard
              name="Scale"
              price="$199"
              blurb="MarketsGuard + reports + priority support"
              cta="Start free trial"
              features={[
                "Everything in Growth",
                "MarketsGuard: i18n canonicals & hreflang",
                "Advanced impact reports",
                "Priority support",
                "SLA & onboarding help",
              ]}
              highlighted={false}
            />
          </div>

          <div className="mt-6 text-center text-white/70 text-sm">
            Need volume or a partner plan? <a href="#chat" className="underline">Chat with us</a> about agency revenue share.
          </div>
        </div>
      </section>

      {/* Signup */}
      <SignupSection />

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">FAQ</h2>
            <p className="mt-3 text-white/80">Blunt answers to common questions.</p>
          </div>
          <div className="space-y-5">
            <FaqItem q="Will this break my theme?" a="No. It installs via Theme App Extension. Uninstalling removes all code. No edits to your theme files are required." />
            <FaqItem q="Do I still need to edit robots.txt.liquid?" a="We provide suggested rules and a preview. You choose what to publish. Most stores keep /search disallowed and let noindex handle the rest." />
            <FaqItem q="Does this replace my SEO app?" a="No. Firebreak solves crawl waste, LCP guardrails, schema sanity, and internal links — the unsexy stuff that moves revenue. Use your SEO app for content and on‑page tooling." />
            <FaqItem q="Will it help with Core Web Vitals?" a="Yes. LCP Turbo preloads hero media, defers third‑party scripts, and enforces template budgets. Expect 200–800ms LCP wins on Collections/PDPs." />
            <FaqItem q="How fast can I see results?" a="Index coverage and crawl reductions show up in days; LCP improvements are immediate after publish. Schema fixes validate right away." />
          </div>
        </div>
      </section>

      {/* Contact + Legal */}
      <ContactSection />
      <LegalSections />

      {/* Sticky mobile CTA */}
      <StickyCTA />

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg" style={{ background: brand.blue }} />
            <span className="font-semibold">FacetFence</span>
            <span className="text-white/50">· Shopify SEO Firebreak</span>
          </div>
          <div className="text-white/60 text-sm">Tagline: <em>“Stop crawl waste. Boost LCP. Ship clean schema.”</em></div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#privacy" className="text-white/60 hover:text-white">Privacy</a>
            <a href="#terms" className="text-white/60 hover:text-white">Terms</a>
            <a href="#chat" className="text-white/60 hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SignupSection() {
  const [email, setEmail] = React.useState("");
  const [store, setStore] = React.useState("");
  const [plan, setPlan] = React.useState("Growth");
  const [agree, setAgree] = React.useState(false);
  const [ok, setOk] = React.useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!agree) return;
    track('lead_submit', { email, store, plan });
    setOk(true);
  }

  return (
    <section id="signup" className="py-16 md:py-24 border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Start your 14‑day free trial</h2>
        <p className="mt-3 text-white/80">No theme edits. Cancel anytime. Pick a plan to get early access.</p>
        <form onSubmit={submit} className="mt-8 text-left rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/60" htmlFor="email">Work email</label>
              <input id="email" aria-label="Email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="you@brand.com" />
            </div>
            <div>
              <label className="text-xs text-white/60" htmlFor="store">Shopify store URL</label>
              <input id="store" aria-label="Shopify store URL" required type="url" value={store} onChange={e=>setStore(e.target.value)} className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="https://yourstore.myshopify.com" />
            </div>
          </div>

          <fieldset className="mt-4">
            <legend className="text-xs text-white/60">Plan</legend>
            <div className="mt-2 grid sm:grid-cols-3 gap-3">
              {['Starter', 'Growth', 'Scale'].map(p => (
                <label key={p} className={`flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 cursor-pointer ${plan===p? 'ring-2 ring-[rgba(55,130,242,0.6)]' : ''}`}>
                  <div className="text-sm">{p}</div>
                  <input type="radio" name="plan" value={p} checked={plan===p} onChange={()=>setPlan(p)} />
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-4 flex items-center gap-2 text-sm text-white/70">
            <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
            I agree to the <a href="#terms" className="underline">Terms</a> and <a href="#privacy" className="underline">Privacy Policy</a>.
          </label>

          <button type="submit" disabled={!agree} onClick={() => track('cta_click', { cta: 'signup_submit' })} className="mt-6 w-full rounded-2xl px-5 py-3 font-semibold disabled:opacity-60" style={{ background: brand.blue }}>
            {ok ? 'You\'re in! We\'ll email you shortly.' : 'Create my trial'}
          </button>

          {ok && (
            <p className="mt-3 text-center text-white/70 text-sm">Thanks! We\'ll review your store and send activation steps.</p>
          )}
        </form>

        <div className="mt-4 text-white/60 text-sm">Prefer to talk first? <a href="#chat" className="underline">Contact us</a>.</div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [msg, setMsg] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  function send(e: React.FormEvent) {
    e.preventDefault();
    track('contact_submit', { email });
    setSent(true);
  }
  return (
    <section id="chat" className="py-16 md:py-24 border-t border-white/10">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Questions? Talk to a human.</h2>
        <p className="mt-3 text-white/80">Email us at <a className="underline" href="mailto:founders@facetfence.com">founders@facetfence.com</a> or drop a note below.</p>
        <form onSubmit={send} className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-left">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="text-xs text-white/60" htmlFor="contact-email">Email</label>
              <input id="contact-email" required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="you@brand.com" />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-white/60" htmlFor="contact-msg">Message</label>
              <textarea id="contact-msg" required value={msg} onChange={e=>setMsg(e.target.value)} rows={3} className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/30" placeholder="Tell us what you need…" />
            </div>
          </div>
          <button type="submit" className="mt-4 w-full rounded-2xl px-5 py-3 font-semibold" style={{ background: brand.blue }}>
            {sent ? 'Sent — we\'ll reply ASAP' : 'Send message'}
          </button>
        </form>
      </div>
    </section>
  );
}

function LegalSections() {
  return (
    <section className="py-12 border-t border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 text-sm text-white/70">
        <div id="privacy">
          <h3 className="text-white font-semibold">Privacy (snapshot)</h3>
          <p className="mt-2">We only collect what we need to run FacetFence (email, store URL, usage analytics). No theme files are modified; uninstall removes app code. We do not sell data. Full policy will be linked here.</p>
        </div>
        <div id="terms">
          <h3 className="text-white font-semibold">Terms (snapshot)</h3>
          <p className="mt-2">14‑day free trial. Monthly subscription, cancel anytime. Provided "as‑is"; reasonable support included per plan. By installing, you agree not to abuse, resell, or reverse engineer the service.</p>
        </div>
      </div>
    </section>
  );
}

function StickyCTA() {
  return (
    <div className="fixed bottom-3 left-3 right-3 md:hidden z-50">
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0b0e13]/90 backdrop-blur px-4 py-3 shadow-2xl">
        <div className="text-sm">
          <div className="font-semibold">FacetFence</div>
          <div className="text-white/60">Start free for 14 days</div>
        </div>
        <a href="#signup" onClick={() => track('cta_click', { cta: 'sticky_start_trial' })} className="rounded-xl px-4 py-2 font-semibold" style={{ background: brand.blue }}>Start trial</a>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white/10 p-2">{icon}</div>
        <div>
          <div className="font-semibold">{title}</div>
          {subtitle && <div className="text-sm text-white/60">{subtitle}</div>}
        </div>
      </div>
      <p className="mt-3 text-white/80 text-sm">{children}</p>
    </div>
  );
}

function PricingCard({ name, price, blurb, features, cta, highlighted }: { name: string; price: string; blurb: string; features: string[]; cta: string; highlighted?: boolean }) {
  return (
    <div className={`relative rounded-3xl border ${highlighted ? 'border-[rgba(55,130,242,0.6)] shadow-[0_0_0_2px_rgba(55,130,242,0.2)]' : 'border-white/10'} bg-white/[0.03] p-6 flex flex-col`}>
      {highlighted && <div className="absolute -top-3 left-6 rounded-full px-3 py-1 text-xs" style={{ background: brand.blue }}>Most Popular</div>}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xl font-semibold">{name}</div>
          <div className="text-white/60 text-sm">{blurb}</div>
        </div>
        <div className="text-3xl font-extrabold" style={{ color: brand.blue }}>{price}<span className="text-base text-white/60">/mo</span></div>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-white/80">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2"><Check className="h-5 w-5 flex-none" /> <span>{f}</span></li>
        ))}
      </ul>
      <a href="#signup" onClick={() => track('cta_click', { cta: `pricing_${name.toLowerCase()}_start_trial` })} className="mt-6 inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold" style={{ background: brand.blue }}>{cta}</a>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10">
      <button onClick={() => setOpen(o => !o)} className="w-full text-left px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="font-medium">{q}</div>
          <div className={`h-5 w-5 transition ${open ? 'rotate-45' : ''}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M12 5v14M5 12h14" /></svg>
          </div>
        </div>
      </button>
      {open && <div className="px-4 pb-4 -mt-2 text-white/80 text-sm">{a}</div>}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-center">
      <div className="text-2xl font-extrabold" style={{ color: brand.blue }}>{value}</div>
      <div className="text-xs text-white/60 mt-1">{label}</div>
    </div>
  );
}

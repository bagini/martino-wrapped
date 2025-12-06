"use client"

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Brain,
  Compass,
  Activity,
  Globe2,
  LayoutDashboard,
  Filter,
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  Search,
  Wand2,
  Map,
  HeartPulse,
  Network,
  Target,
  Stars,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const modes = ["All", "Work", "Life", "Meta"] as const;
type Mode = (typeof modes)[number];

type CardMode = "Work" | "Life" | "Meta" | "Mixed";

interface DashboardCard {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  tags: string[];
  mode: CardMode;
}

const usageTopicMix = [
  { label: "VC / Investing / Macro", value: 38 },
  { label: "AI Tools & Ontologies", value: 23 },
  { label: "Travel & Lifestyle", value: 17 },
  { label: "Property / Legal / Tax", value: 11 },
  { label: "Health & Performance", value: 7 },
  { label: "Creative / Kids / Art", value: 4 },
];

const focus2026 = [
  { label: "Work systems & VC toolkit", value: 40 },
  { label: "Family & life design", value: 35 },
  { label: "Health & performance", value: 25 },
];

const dashboardCards: DashboardCard[] = [
  {
    id: "vc-ontology",
    title: "VC Ontology & Second Brain",
    subtitle: "You think in systems, not one-off answers",
    description:
      "You used ChatGPT to sketch a global VC ontology, JSON-LD schemas, and AI-enabled workflows for sourcing, memos, and decision rationales. The goal wasn’t just ‘better notes’, but a reusable investment OS that compounds over time.",
    tags: [
      "VC ontology",
      "JSON-LD",
      "RAG / knowledge graph",
      "Decision frameworks",
    ],
    mode: "Work",
  },
  {
    id: "deals-structures",
    title: "Deals, Secondaries & Structures",
    subtitle: "Thinking in scenarios, carries, and optionality",
    description:
      "You explored secondaries (e.g. AI infra players), partial take-profit frameworks, and structures like carry taxation and BVI/US/Lux vehicles. You repeatedly asked for matrices and factor models, showing a strong risk/return and scenario mindset.",
    tags: ["Secondaries", "Carry & tax", "Macro risk", "Factor models"],
    mode: "Work",
  },
  {
    id: "comms-narrative",
    title: "Narrative & LP / Founder Comms",
    subtitle: "Sharp but kind communication",
    description:
      "From OpenAI allocation updates to intros between Rafa and Pedro, and positioning EGV in a sentence, you used ChatGPT to tune language across EN, PT-BR, and IT. Tone: respectful, concise, human, no fluff.",
    tags: ["LP updates", "Founder-friendly", "Bilingual comms", "Positioning"],
    mode: "Work",
  },
  {
    id: "travel-family",
    title: "Travel Architect: Kids, Grandma, and Adventure",
    subtitle: "Optimizing for memories per euro, not just logistics",
    description:
      "You designed trips where constraints really matter: 9–11y kids, an 80y-old mother, seasons, budgets, and energy levels. Think Hungary, Finland cabins, Bali vs Thailand, Prague school trips. You asked for itineraries that mix culture, nature, and realistic pacing.",
    tags: ["Family trips", "Kid-friendly", "Grandma-friendly", "Logistics"],
    mode: "Life",
  },
  {
    id: "home-decisions",
    title: "Home & Property as a Portfolio",
    subtitle: "ROI mindset in the physical world",
    description:
      "From dishwashers and telescopes to property and renovation ROI, you consistently framed home decisions as small capital allocation problems: price/value, durability, energy class, and long-term convenience.",
    tags: ["Property", "Appliance ROI", "Energy class", "Trade-offs"],
    mode: "Life",
  },
  {
    id: "health-performance",
    title: "Health & Performance OS",
    subtitle: "From heart rate formulas to thyroid nuance",
    description:
      "You went beyond gadgets: HR formulas (Tanaka, Karvonen), heart rate reserve, hypothyroidism (Bianco), supplements, magnesium timing, running at -10 °C, and devices like Hume / Whoop / Garmin. The pattern: evidence-aware curiosity and long-term health horizon.",
    tags: ["HR / HRV", "Thyroid", "Supplements", "Cold runs"],
    mode: "Life",
  },
  {
    id: "super-systems",
    title: "Systems & Frameworks Bias",
    subtitle: "Your default question: ‘How do we generalize this?’",
    description:
      "You often requested matrices, stepwise frameworks, JSON-LD ontologies, templates, decision trees, and scoring models. It’s less ‘What should I do?’ and more ‘How should I reason about this class of problems forever?’",
    tags: ["Systems thinking", "Frameworks", "Reusable templates"],
    mode: "Meta",
  },
  {
    id: "multi-lingual",
    title: "Multilingual Operator",
    subtitle: "PT-BR, IT, EN as a single workspace",
    description:
      "You flowed between Portuguese, Italian, and English depending on audience: LPs, co-investors, school parents, lawyers, and founders. ChatGPT became a translation layer for your cross-border life and work.",
    tags: ["Portuguese", "Italian", "English", "Cross-border"],
    mode: "Meta",
  },
  {
    id: "warm-high-standards",
    title: "Warm, High-Standard Communicator",
    subtitle: "High bar for clarity, zero tolerance for coldness",
    description:
      "You repeatedly refined emails and messages until they felt simultaneously clear, concise, and genuinely warm. This is a consistent signature: you care that the other side feels respected and not overwhelmed.",
    tags: ["Warm tone", "Clarity", "Empathy", "Concise writing"],
    mode: "Meta",
  },
  {
    id: "curious-builder",
    title: "Curious Builder Mindset",
    subtitle: "Life and funds as products you’re iterating on",
    description:
      "From AI VC tooling and secondaries to LEGO displays, telescopes in the mountains with kids, and health dashboards, your instinct is to turn everything into an iterative build with v1, v2, v3.",
    tags: ["Builder", "Iteration", "Experiments"],
    mode: "Mixed",
  },
];

const betsAndExperiments: DashboardCard[] = [
  {
    id: "bet-vc-toolkit",
    title: "Bet #1: AI-Native VC Toolkit",
    subtitle: "From ontology slides to an actual cockpit",
    description:
      "2025 showed a clear pull: you want a live deal room powered by your ontology, scoring models, and RAG. In 2026, a realistic bet is shipping a minimum viable ‘Martino Deal OS’ that your team actually uses.",
    tags: ["Deal cockpit", "Ontology v2", "RAG for IC"],
    mode: "Work",
  },
  {
    id: "bet-family-os",
    title: "Bet #2: Family & Travel OS",
    subtitle: "Standard operating procedures for memories",
    description:
      "You’ve basically designed a template engine for trips: constraints, budgets, mobility, local culture, kid/elder-friendliness. Turning this into checklists and templates would reduce friction every time you plan something new.",
    tags: ["Travel templates", "Checklists", "Family OS"],
    mode: "Life",
  },
  {
    id: "bet-health-dashboard",
    title: "Bet #3: Health & Training Dashboard",
    subtitle: "Less mental overhead, more consistent data",
    description:
      "You already track HR, thyroid nuance, supplements, and wearable data. A simple, visual dashboard—built once, reused forever—would reduce cognitive load and make patterns obvious.",
    tags: ["Health dashboard", "Quantified self", "Long-term"],
    mode: "Life",
  },
  {
    id: "exp-automation",
    title: "Experiment: Automation Layer",
    subtitle: "Glue your tools together",
    description:
      "You’ve explored RAG, Canvas, ontologies, and integrations. A 2026 experiment is a thin glue layer that routinely syncs deals, notes, and contacts into your VC brain without manual friction.",
    tags: ["Automations", "Pipelines", "Knowledge sync"],
    mode: "Work",
  },
  {
    id: "prediction-fun",
    title: "Fun Predictions for 2026",
    subtitle: "Light-hearted, but pretty plausible",
    description:
      "You’ll ask if a destination is both kid- and grandma-friendly at least three times. You’ll iterate your VC ontology again, closer to a product. And you’ll keep using ChatGPT for more contracts, structures, and ‘translation’ between worlds.",
    tags: ["Predictions", "Fun", "Meta"],
    mode: "Meta",
  },
];

const tourSteps = [
  {
    id: "hero",
    title: "Hero Overview",
    text: "Start here: a snapshot of how you and ChatGPT worked together in 2025.",
  },
  {
    id: "usage",
    title: "Usage Patterns",
    text: "See how your questions cluster into work, life, and meta-OS themes.",
  },
  {
    id: "investor",
    title: "Investor & Builder Mode",
    text: "Dive into how you used ChatGPT as a co-pilot for theses, deals, and structures.",
  },
  {
    id: "superpowers",
    title: "Signature Superpowers",
    text: "Patterns in how your mind works when you interact with your AI co-pilot.",
  },
  {
    id: "outlook",
    title: "2026 Outlook",
    text: "Personalized bets, experiments, and playful predictions for next year.",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const MartinoWrappedDashboard: React.FC = () => {
  const [mode, setMode] = useState<Mode>("All");
  const [search, setSearch] = useState("");
  const [tourIndex, setTourIndex] = useState<number | null>(0);

  const filteredCards = useMemo(() => {
    const searchLower = search.toLowerCase();
    return dashboardCards.filter((card) => {
      const matchesMode =
        mode === "All" ||
        card.mode === mode ||
        (mode === "Work" && card.mode === "Mixed") ||
        (mode === "Life" && card.mode === "Mixed") ||
        (mode === "Meta" && card.mode === "Mixed");
      const matchesSearch =
        !searchLower ||
        card.title.toLowerCase().includes(searchLower) ||
        card.description.toLowerCase().includes(searchLower) ||
        card.tags.some((t) => t.toLowerCase().includes(searchLower));
      return matchesMode && matchesSearch;
    });
  }, [mode, search]);

  const filteredBets = useMemo(() => {
    const searchLower = search.toLowerCase();
    return betsAndExperiments.filter((card) => {
      const matchesMode =
        mode === "All" ||
        card.mode === mode ||
        (mode === "Work" && card.mode === "Mixed") ||
        (mode === "Life" && card.mode === "Mixed") ||
        (mode === "Meta" && card.mode === "Mixed");
      const matchesSearch =
        !searchLower ||
        card.title.toLowerCase().includes(searchLower) ||
        card.description.toLowerCase().includes(searchLower) ||
        card.tags.some((t) => t.toLowerCase().includes(searchLower));
      return matchesMode && matchesSearch;
    });
  }, [mode, search]);

  const closeTour = () => setTourIndex(null);
  const nextTour = () =>
    setTourIndex((prev) =>
      prev === null || prev >= tourSteps.length - 1 ? null : prev + 1
    );
  const prevTour = () =>
    setTourIndex((prev) =>
      prev === null || prev <= 0 ? 0 : prev - 1
    );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        {/* Hero */}
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-6 shadow-xl shadow-slate-900/70 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="space-y-3 md:w-2/3">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-700/60">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Martino × ChatGPT · 2025 Wrapped</span>
              </div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-7 w-7 text-sky-400" />
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  VC Brain, Human Heart
                </h1>
              </div>
              <p className="max-w-2xl text-sm text-slate-300 md:text-base">
                A year of using ChatGPT as your second brain for deals,
                frameworks, and family life. From AI-native VC theses and
                secondaries to Finland cabins, telescopes, and health
                experiments—this is how you actually used your copilot in 2025.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="border-0 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 ring-1 ring-emerald-500/40"
                >
                  <Activity className="mr-1.5 h-3.5 w-3.5" />
                  Power user vibes unlocked
                </Badge>
                <Badge
                  variant="outline"
                  className="border-0 bg-sky-500/10 px-3 py-1 text-xs text-sky-300 ring-1 ring-sky-500/40"
                >
                  ~1,700+ messages · 60% Work · 40% Life
                </Badge>
                <Badge
                  variant="outline"
                  className="border-0 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-300 ring-1 ring-fuchsia-500/40"
                >
                  Investor · Life Architect · AI Tinkerer
                </Badge>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:w-1/3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  <Brain className="h-4 w-4 text-sky-400" />
                  Your 2025 ChatGPT Profile
                </h2>
                <div className="space-y-3 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>Investor & Company Builder</span>
                    <span className="font-semibold text-sky-300">High</span>
                  </div>
                  <Progress value={88} className="h-1.5 bg-slate-800" />
                  <div className="flex items-center justify-between">
                    <span>Life Architect & Planner</span>
                    <span className="font-semibold text-emerald-300">Strong</span>
                  </div>
                  <Progress value={78} className="h-1.5 bg-slate-800" />
                  <div className="flex items-center justify-between">
                    <span>AI & Ontology Tinkerer</span>
                    <span className="font-semibold text-fuchsia-300">
                      Obvious
                    </span>
                  </div>
                  <Progress value={92} className="h-1.5 bg-slate-800" />
                  <p className="pt-2 text-[11px] text-slate-400">
                    You rarely ask for a one-off answer. You ask for reusable
                    systems—ontologies, frameworks, checklists—that you can keep
                    reusing across work and life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Filters & search */}
        <section className="mb-6">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
                View mode
              </span>
              <div className="flex flex-wrap gap-1.5 pl-2">
                {modes.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`rounded-full px-3 py-1 text-xs transition ${
                      mode === m
                        ? "bg-sky-500/90 text-slate-50 shadow-sm shadow-sky-500/40"
                        : "bg-slate-900/80 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="pointer-events-none absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search your 2025 (e.g. ‘Finland’, ‘ontology’)…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-8 w-full border-slate-700 bg-slate-900 pl-7 text-xs placeholder:text-slate-500"
                />
              </div>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 border border-slate-800 bg-slate-900/70"
                title="Reset filters"
                onClick={() => {
                  setMode("All");
                  setSearch("");
                }}
              >
                <X className="h-3.5 w-3.5 text-slate-300" />
              </Button>
            </div>
          </div>
        </section>

        {/* Usage patterns */}
        <motion.section
          id="usage"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-sky-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                How You Used ChatGPT in 2025
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              Topic mix & power-user habits (approximate, not literal logs)
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-slate-800 bg-slate-950/80">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-100">
                  <Activity className="h-4 w-4 text-emerald-400" />
                  Topic Mix
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {usageTopicMix.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-medium text-slate-200">
                        {item.value}%
                      </span>
                    </div>
                    <Progress
                      value={item.value}
                      className="h-1.5 bg-slate-900"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/80">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-100">
                  <Wand2 className="h-4 w-4 text-fuchsia-400" />
                  Power-User Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-200">
                <p className="text-slate-300">
                  You leaned on ChatGPT as a high-leverage thinking partner:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge className="bg-slate-900 text-slate-100 ring-1 ring-sky-500/60">
                    Asks for tables & matrices
                  </Badge>
                  <Badge className="bg-slate-900 text-slate-100 ring-1 ring-fuchsia-500/60">
                    Loves ontologies & JSON-LD
                  </Badge>
                  <Badge className="bg-slate-900 text-slate-100 ring-1 ring-emerald-500/60">
                    Bilingual / trilingual drafts
                  </Badge>
                  <Badge className="bg-slate-900 text-slate-100 ring-1 ring-amber-500/60">
                    Contract & memo co-drafter
                  </Badge>
                  <Badge className="bg-slate-900 text-slate-100 ring-1 ring-cyan-500/60">
                    Travel & life planning OS
                  </Badge>
                </div>
                <p className="pt-1 text-[11px] text-slate-400">
                  You rarely copy answers blindly; you remix them into your own
                  systems, emails, and frameworks.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 bg-slate-950/80">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-100">
                  <Compass className="h-4 w-4 text-amber-400" />
                  2025 Timeline Vibes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs text-slate-200">
                <ul className="space-y-1.5">
                  <li>
                    <span className="mr-2 rounded-full bg-sky-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-sky-200">
                      Q1
                    </span>
                    VC tooling, AI workflows, ontologies, RAG & decision
                    frameworks.
                  </li>
                  <li>
                    <span className="mr-2 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-200">
                      Q2
                    </span>
                    Travel planning (Finland, Central Europe), home and property
                    decisions.
                  </li>
                  <li>
                    <span className="mr-2 rounded-full bg-fuchsia-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-fuchsia-200">
                      Q3
                    </span>
                    Secondaries, AI fund strategy, LP comms, and exit scenarios.
                  </li>
                  <li>
                    <span className="mr-2 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-amber-200">
                      Q4
                    </span>
                    Health optimization, devices, supplements, and “winter
                    operating system”.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Investor & company builder */}
        <motion.section
          id="investor"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.05 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Network className="h-4 w-4 text-sky-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Investor & Company Builder Mode
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              How you used ChatGPT to think in bets, theses, and structures
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {filteredCards
              .filter((c) => ["Work", "Mixed"].includes(c.mode))
              .slice(0, 3)
              .map((card) => (
                <Card
                  key={card.id}
                  className="flex h-full flex-col border-slate-800 bg-slate-950/80"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-100">
                      {card.title}
                    </CardTitle>
                    {card.subtitle && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        {card.subtitle}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between space-y-3 text-xs text-slate-200">
                    <p>{card.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-slate-900 text-[11px] text-slate-50 ring-1 ring-slate-700/70"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.section>

        {/* Life architect */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Map className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Life Architect Mode
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              Designing trips, home decisions, and your health OS
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {filteredCards
              .filter((c) => ["Life", "Mixed"].includes(c.mode))
              .slice(0, 3)
              .map((card) => (
                <Card
                  key={card.id}
                  className="flex h-full flex-col border-slate-800 bg-slate-950/80"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-100">
                      {card.title}
                    </CardTitle>
                    {card.subtitle && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        {card.subtitle}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between space-y-3 text-xs text-slate-200">
                    <p>{card.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-slate-900 text-[11px] text-slate-50 ring-1 ring-slate-700/70"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.section>

        {/* Superpowers */}
        <motion.section
          id="superpowers"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Stars className="h-4 w-4 text-fuchsia-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                Your Signature Superpowers
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              How your mind tends to work when you use ChatGPT
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {filteredCards
              .filter((c) => ["Meta", "Mixed"].includes(c.mode))
              .slice(0, 3)
              .map((card) => (
                <Card
                  key={card.id}
                  className="flex h-full flex-col border-slate-800 bg-slate-950/80"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-slate-100">
                      {card.title}
                    </CardTitle>
                    {card.subtitle && (
                      <p className="mt-1 text-[11px] text-slate-400">
                        {card.subtitle}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between space-y-3 text-xs text-slate-200">
                    <p>{card.description}</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {card.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="bg-slate-900 text-[11px] text-slate-50 ring-1 ring-slate-700/70"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </motion.section>

        {/* 2026 Outlook */}
        <motion.section
          id="outlook"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-4 space-y-4"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-sky-400" />
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
                2026 Outlook: Bets, Experiments & Predictions
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">
              Not forecasts—just smart, personalized suggestions
            </span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-slate-800 bg-slate-950/80">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm text-slate-100">
                  <LayoutDashboard className="h-4 w-4 text-sky-400" />
                  Focus Mix for 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs text-slate-200">
                <p className="text-slate-300">
                  If you keep following your current curiosity, your 2026 focus
                  might naturally cluster like this:
                </p>
                {focus2026.map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>{item.label}</span>
                      <span className="font-medium text-slate-200">
                        {item.value}%
                      </span>
                    </div>
                    <Progress
                      value={item.value}
                      className="h-1.5 bg-slate-900"
                    />
                  </div>
                ))}
                <p className="pt-1 text-[11px] text-slate-400">
                  Net-net: more leverage from systems, not more hours.
                </p>
              </CardContent>
            </Card>

            {filteredBets.slice(0, 2).map((card) => (
              <Card
                key={card.id}
                className="flex h-full flex-col border-slate-800 bg-slate-950/80"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-100">
                    {card.title}
                  </CardTitle>
                  {card.subtitle && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      {card.subtitle}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between space-y-3 text-xs text-slate-200">
                  <p>{card.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-slate-900 text-[11px] text-slate-50 ring-1 ring-slate-700/70"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {filteredBets.slice(2, 5).map((card) => (
              <Card
                key={card.id}
                className="flex h-full flex-col border-slate-800 bg-slate-950/80"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-slate-100">
                    {card.title}
                  </CardTitle>
                  {card.subtitle && (
                    <p className="mt-1 text-[11px] text-slate-400">
                      {card.subtitle}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between space-y-3 text-xs text-slate-200">
                  <p>{card.description}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <Badge
                        key={tag}
                        className="bg-slate-900 text-[11px] text-slate-50 ring-1 ring-slate-700/70"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Tiny footer */}
        <footer className="mt-6 flex items-center justify-between border-t border-slate-900 pt-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" />
            <span>
              This dashboard is a reflective synthesis based on your 2025
              conversations with ChatGPT—approximate, not literal logs.
            </span>
          </div>
          <div className="hidden items-center gap-1 md:flex">
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Martino × ChatGPT</span>
          </div>
        </footer>
      </div>

      {/* Guided tour overlay */}
      <AnimatePresence>
        {tourIndex !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-950/95 p-4 shadow-xl shadow-black/60"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    <Sparkles className="h-3.5 w-3.5 text-sky-400" />
                    <span>Guided Tour</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    {tourSteps[tourIndex].title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">
                    {tourSteps[tourIndex].text}
                  </p>
                </div>
                <button
                  onClick={closeTour}
                  className="rounded-full p-1 hover:bg-slate-800"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  Step {tourIndex + 1} of {tourSteps.length}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={tourIndex === 0}
                    onClick={prevTour}
                    className="h-7 w-7 border border-slate-700 bg-slate-900/70"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </Button>
                  {tourIndex < tourSteps.length - 1 ? (
                    <Button
                      size="sm"
                      onClick={nextTour}
                      className="h-7 rounded-full bg-sky-500 px-3 text-[11px] font-medium text-slate-50 hover:bg-sky-400"
                    >
                      Next
                      <ChevronRight className="ml-1 h-3 w-3" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={closeTour}
                      className="h-7 rounded-full bg-emerald-500 px-3 text-[11px] font-medium text-slate-50 hover:bg-emerald-400"
                    >
                      Finish
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MartinoWrappedDashboard;

import React from 'react';
import { Shield, Sparkles, CheckCircle, Search, ArrowRight, Layers, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage({ onLaunchDashboard }) {
  // Features list
  const features = [
    {
      icon: Layers,
      title: 'Automated Extraction',
      description: 'Upload complex PDFs and let our models instantly isolate statistics, percentages, Dates, and core assertions.',
      color: 'from-brand-indigo/20 to-brand-indigo/5 text-brand-indigo'
    },
    {
      icon: Search,
      title: 'Live Web Synthesis',
      description: 'Orchestrate queries via Tavily and SerpAPI to crawl active search indexes and news feeds for current fact matches.',
      color: 'from-brand-teal/20 to-brand-teal/5 text-brand-teal'
    },
    {
      icon: Shield,
      title: 'Fact Discrepancy Audits',
      description: 'Categorize claims as Verified, Inaccurate, or False with explicit accuracy details, confidence scores, and source URLs.',
      color: 'from-brand-violet/20 to-brand-violet/5 text-brand-violet'
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden flex flex-col justify-between py-12 px-6 lg:px-10 max-w-7xl mx-auto">
      {/* BACKGROUND DECORATIVE ORBS (STUNNING GLOW EFFECTS) */}
      <div className="absolute top-[10%] right-[-5%] w-[350px] h-[350px] rounded-full bg-brand-indigo/15 dark:bg-brand-indigo/15 blur-[80px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[20%] left-[-5%] w-[300px] h-[300px] rounded-full bg-brand-teal/10 dark:bg-brand-teal/10 blur-[85px] pointer-events-none animate-pulse-slow" />

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-1 my-6 relative z-10">
        
        {/* Left Side: Taglines & CTAs */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-indigo/25 bg-brand-indigo/10 text-brand-indigo dark:text-brand-teal text-xs font-semibold tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI-POWERED REAL-TIME VERIFICATION PLATFORM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] bg-gradient-to-r from-slate-950 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent"
          >
            Verify Document Facts in <span className="bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-teal bg-clip-text text-transparent">Real-Time</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed"
          >
            TruthLayer AI parses digital documents, automatically extracts factual figures and stats, queries active search indexes, and evaluates claim accuracy to deliver instant confidence-backed reports.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4.5 pt-2"
          >
            <button
              onClick={onLaunchDashboard}
              className="flex items-center justify-center gap-2 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-bold shadow-lg shadow-brand-indigo/35 hover:shadow-xl hover:shadow-brand-indigo/40 hover:scale-[1.02] active:scale-[0.98] transition-all relative overflow-hidden group select-none"
            >
              {/* Button inner glow overlay */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span>Launch Trust Dashboard</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                const specTab = document.getElementById('features-section');
                if (specTab) specTab.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center justify-center gap-2 px-6 py-4.5 rounded-2xl border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
            >
              <span>Explore Features</span>
            </button>
          </motion.div>
        </div>

        {/* Right Side: High-Fidelity Floating Visual Interface Teaser */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 25 }}
          className="lg:col-span-5 relative flex items-center justify-center"
        >
          {/* Glowing central orb */}
          <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-brand-indigo to-brand-teal opacity-25 dark:opacity-20 blur-[50px] animate-pulse-slow" />
          
          {/* Custom mock visual board */}
          <div className="w-full max-w-[340px] p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel relative shadow-2xl space-y-4 text-left select-none scale-[1.01] hover:scale-[1.03] transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                  FACT MONITOR
                </span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-semibold">TRUTHLAYER CORE</span>
            </div>

            {/* Simulated Verified card */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between gap-3 shadow-inner">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase font-bold text-emerald-500 tracking-wider">Verified Fact</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate mt-0.5">ChatGPT weekly users crossed 250M</p>
              </div>
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
            </div>

            {/* Simulated False card */}
            <div className="p-3 rounded-2xl bg-rose-500/10 dark:bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-3 shadow-inner">
              <div className="min-w-0 flex-1">
                <p className="text-[9px] uppercase font-bold text-rose-500 tracking-wider">Disproved Discrepancy</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate mt-0.5">India has 95% internet penetration</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-black shrink-0">❌</div>
            </div>

            {/* Simulated score panel */}
            <div className="p-3 rounded-2xl bg-slate-100/50 dark:bg-white/3 border border-slate-200/40 dark:border-white/5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">Document Accuracy</p>
                <p className="text-sm font-extrabold text-slate-800 dark:text-white mt-0.5">Moderate Integrity</p>
              </div>
              <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-r-transparent flex items-center justify-center text-xs font-extrabold text-amber-500 font-mono">
                67%
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Feature Grid Segment */}
      <div id="features-section" className="border-t border-slate-200/50 dark:border-white/5 pt-16 mt-16 scroll-mt-24 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            How TruthLayer AI Operates
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 mt-2 font-medium">
            Next generation NLP integrations designed to bring deep verification to digital records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={feature.title}
                className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel text-left hover:scale-[1.02] transition-transform duration-200 group relative"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${feature.color} flex items-center justify-center mb-6 shadow-md`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

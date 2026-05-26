import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, XCircle, Sparkles, BookOpen, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SourceCard from './SourceCard';

export default function ClaimCard({ result = {}, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    claim = '',
    status = 'False',
    confidence = 80,
    correctFact = '',
    explanation = '',
    source = {}
  } = result;

  // Map status values to appropriate design tokens
  const getStatusStyles = (stat) => {
    switch (stat) {
      case 'Verified':
        return {
          icon: CheckCircle2,
          textClass: 'text-emerald-500',
          bgClass: 'bg-emerald-500/10 border-emerald-500/15',
          glowClass: 'shadow-emerald-500/5',
          accentBorder: 'border-l-emerald-500',
          badge: 'Verified'
        };
      case 'Inaccurate':
        return {
          icon: AlertTriangle,
          textClass: 'text-amber-500',
          bgClass: 'bg-amber-500/10 border-amber-500/15',
          glowClass: 'shadow-amber-500/5',
          accentBorder: 'border-l-amber-500',
          badge: 'Inaccurate'
        };
      default:
        return {
          icon: XCircle,
          textClass: 'text-rose-500',
          bgClass: 'bg-rose-500/10 border-rose-500/15',
          glowClass: 'shadow-rose-500/5',
          accentBorder: 'border-l-rose-500',
          badge: 'False'
        };
    }
  };

  const style = getStatusStyles(status);
  const StatusIcon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 260, damping: 25 }}
      className={`rounded-3xl border border-slate-200/50 dark:border-white/5 bg-slate-50/40 dark:bg-slate-900/10 hover:bg-slate-100/40 dark:hover:bg-slate-900/20 shadow-sm border-l-4 ${style.accentBorder} overflow-hidden cursor-pointer transition-all duration-200`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Header Panel (Always visible summary card) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 lg:p-6">
        <div className="flex-1 min-w-0 pr-2">
          {/* Claim Statement */}
          <div className="flex items-start gap-3">
            <Quote className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0 rotate-180 mt-1" />
            <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-snug">
              {claim}
            </h4>
          </div>
        </div>

        {/* Right tools (Status Badge, Confidence, and Expand indicator) */}
        <div className="flex items-center justify-between sm:justify-end gap-5.5">
          {/* Circular confidence score badge */}
          <div className="flex items-center gap-2 bg-slate-200/40 dark:bg-white/2 px-3 py-1.5 rounded-xl border border-slate-200/40 dark:border-white/5 shrink-0 select-none">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
              Conf:
            </span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {confidence}%
            </span>
          </div>

          {/* Status Label Badge */}
          <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-bold shrink-0 ${style.bgClass} ${style.textClass}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{style.badge}</span>
          </div>

          {/* Toggle Expand Arrow */}
          <div className="p-1.5 rounded-xl border border-slate-200/40 dark:border-white/5 text-slate-400 dark:text-slate-500 bg-white/20 dark:bg-white/2 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            )}
          </div>
        </div>
      </div>

      {/* Expandable Details Container */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="border-t border-slate-200/50 dark:border-white/5"
            onClick={(e) => e.stopPropagation()} // Prevent expand toggle inside detail clicks
          >
            <div className="p-5 lg:p-6 bg-slate-100/30 dark:bg-black/10 space-y-6">
              {/* Comparative: Original Statement vs live Corrected Facts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Card: Original */}
                <div className="p-4.5 rounded-2xl bg-white/50 dark:bg-[#121824]/50 border border-slate-200/50 dark:border-white/5 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-indigo/2 dark:bg-brand-indigo/5 rounded-full blur-xl" />
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mb-2 block">
                    Original Asserted Statement
                  </span>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    "{claim}"
                  </p>
                </div>

                {/* Right Card: Corrected Fact */}
                <div className="p-4.5 rounded-2xl bg-white/50 dark:bg-[#121824]/50 border border-slate-200/50 dark:border-white/5 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand-teal/2 dark:bg-brand-teal/5 rounded-full blur-xl" />
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-2 block ${style.textClass}`}>
                    TruthLayer Corroborated Fact
                  </span>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {correctFact}
                  </p>
                </div>
              </div>

              {/* AI Verification Rationale Block */}
              <div className="p-4.5 rounded-2xl bg-white/50 dark:bg-[#121824]/50 border border-slate-200/50 dark:border-white/5 text-left">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-indigo dark:text-brand-teal uppercase tracking-wider mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  <span>AI Verification Reasoning</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {explanation}
                </p>
              </div>

              {/* Cite Sources / Reference web cards */}
              {source && source.url && (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Corroborating Web Evidence Citation</span>
                  </div>
                  <SourceCard source={source} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

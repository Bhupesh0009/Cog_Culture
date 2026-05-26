import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertTriangle, XCircle, BarChart3, HelpCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatsWidget({ metadata = {}, truthScore = 0 }) {
  const {
    totalClaims = 0,
    verifiedCount = 0,
    inaccurateCount = 0,
    falseCount = 0,
    averageConfidence = 80
  } = metadata;

  // Animate numbers from 0 on load for premium micro-experience
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(truthScore);
    }, 150);
    return () => clearTimeout(timer);
  }, [truthScore]);

  // SVG parameters for the Truth Score Circle
  const radius = 64;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine standard alert level colors based on truth score
  const getScoreColor = (score) => {
    if (score >= 80) return 'stroke-emerald-500 text-emerald-500';
    if (score >= 50) return 'stroke-amber-500 text-amber-500';
    return 'stroke-rose-500 text-rose-500';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
    if (score >= 50) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 1. Overall Truth Score Radial Ring Chart (Large Card) */}
      <div className="lg:col-span-1 p-6 flex flex-col items-center justify-center text-center rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-full blur-xl pointer-events-none" />
        
        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-brand-indigo" />
          <span>Overall Truth Score</span>
        </h4>

        {/* Circular Progress Gauge */}
        <div className="relative flex items-center justify-center w-36 h-36 mb-6">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle
              className="stroke-slate-200 dark:stroke-white/5"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Animated Front Stroke */}
            <motion.circle
              className={`transition-all duration-1000 ease-out ${getScoreColor(truthScore)}`}
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference + ' ' + circumference}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          
          {/* Central score percentage */}
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-white">
              {animatedScore}%
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase mt-0.5 tracking-wider">
              FACTUALITY
            </span>
          </div>
        </div>

        {/* Truth Level Indicator text */}
        <div className={`px-4 py-1.5 rounded-full border text-xs font-semibold select-none ${getScoreBgColor(truthScore)}`}>
          {truthScore >= 80 ? '🔒 HIGHLY TRUSTWORTHY' : truthScore >= 50 ? '⚠️ MODERATE INTEGRITY' : '🚨 CRITICAL FACTS WARN'}
        </div>
      </div>

      {/* 2. Individual claims breakdown statistics */}
      <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel flex flex-col justify-between relative">
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-xl pointer-events-none" />

        <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1.5">
          <BarChart3 className="w-3.5 h-3.5 text-brand-teal" />
          <span>Claims Extraction Breakdown</span>
        </h4>

        {/* Grid cards representing counts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
          {/* Total */}
          <div className="p-4 rounded-2xl bg-slate-100/40 dark:bg-white/2 border border-slate-200/40 dark:border-white/5 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">Total Claims</span>
            <span className="text-2xl font-bold text-slate-800 dark:text-white mt-3">{totalClaims}</span>
          </div>

          {/* Verified */}
          <div className="p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/5 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between text-emerald-500">
              <span className="text-xs font-semibold">Verified</span>
              <CheckCircle className="w-4 h-4 shrink-0" />
            </div>
            <span className="text-2xl font-bold text-emerald-500 mt-3">{verifiedCount}</span>
          </div>

          {/* Inaccurate */}
          <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/10 dark:border-amber-500/5 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between text-amber-500">
              <span className="text-xs font-semibold">Inaccurate</span>
              <AlertTriangle className="w-4 h-4 shrink-0" />
            </div>
            <span className="text-2xl font-bold text-amber-500 mt-3">{inaccurateCount}</span>
          </div>

          {/* False */}
          <div className="p-4 rounded-2xl bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/10 dark:border-rose-500/5 flex flex-col justify-between hover:scale-[1.02] transition-transform">
            <div className="flex items-center justify-between text-rose-500">
              <span className="text-xs font-semibold">False</span>
              <XCircle className="w-4 h-4 shrink-0" />
            </div>
            <span className="text-2xl font-bold text-rose-500 mt-3">{falseCount}</span>
          </div>
        </div>

        {/* Secondary metric details: Confidence Score */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-200/50 dark:border-white/5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              AI Verification Confidence Average:
            </span>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              {averageConfidence}%
            </span>
          </div>
          {/* Progress bar */}
          <div className="w-full sm:w-48 h-2 rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-indigo to-brand-teal rounded-full" 
              style={{ width: `${averageConfidence}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

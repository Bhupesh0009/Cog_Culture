import React, { useState } from 'react';
import { ArrowLeft, Download, ShieldCheck, Filter, FileText, CheckCircle, AlertTriangle, XCircle, File } from 'lucide-react';
import { motion } from 'framer-motion';
import StatsWidget from '../components/StatsWidget';
import PDFPreview from '../components/PDFPreview';
import ClaimCard from '../components/ClaimCard';

export default function ResultsPage({ report = {}, selectedFile, onBack }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'Verified' | 'Inaccurate' | 'False'

  const {
    documentName = 'Document.pdf',
    truthScore = 100,
    summary = '',
    metadata = {},
    results = []
  } = report;

  // Filter claim results
  const filteredClaims = results.filter((claim) => {
    if (activeFilter === 'all') return true;
    return claim.status === activeFilter;
  });

  const getStatusTextClass = (score) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto py-4">
      {/* 1. Header Toolbar (Back action, export actions) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print border-b border-slate-200/50 dark:border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100/20 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm flex items-center justify-center"
            title="Upload new file"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] text-brand-teal uppercase tracking-widest font-bold">
              Analysis complete
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Verification Report
            </h1>
          </div>
        </div>

        {/* Action items */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-200/40 dark:hover:bg-white/5 text-xs transition-all flex items-center gap-2"
          >
            <File className="w-4 h-4" />
            <span>Upload New PDF</span>
          </button>
          <button
            onClick={handlePrintReport}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-indigo to-brand-violet text-white font-bold hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-brand-indigo/25 text-xs transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </button>
        </div>
      </div>

      {/* 2. Executive Summary Banner (Glow card) */}
      <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel relative overflow-hidden text-left shadow-lg">
        {/* Glow orbs background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-brand-indigo/10 text-brand-indigo dark:text-brand-teal border border-brand-indigo/20 shrink-0 select-none">
            <ShieldCheck className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
              AI Executive Synthesized Summary
            </h3>
            <p className="text-slate-700 dark:text-slate-200 font-bold text-base mt-2 leading-relaxed">
              {summary}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 font-mono uppercase">
              Audited at: {new Date(metadata.verifiedAt || '').toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Global Stats metrics widgets */}
      <div className="no-print">
        <StatsWidget metadata={metadata} truthScore={truthScore} />
      </div>

      {/* 4. Main content splitter (PDF Preview Left / Interactive Cards Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Document Text / Skeletal visual preview */}
        <div className="lg:col-span-4 h-full sticky top-28 no-print">
          <PDFPreview 
            selectedFile={selectedFile} 
            extractedText={results.map(r => r.claim).join('\n\n')} 
            pageCount={metadata.pageCount || 1} 
          />
        </div>

        {/* Right Side: Claim Verification detail checklists */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header block with interactive filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base tracking-tight text-left">
              Factual Claims Evaluations
            </h3>
            
            {/* Filter pills */}
            <div className="flex items-center flex-wrap gap-2 bg-slate-200/50 dark:bg-white/5 p-1 rounded-2xl border border-slate-200/50 dark:border-white/5 text-xs font-semibold select-none">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-xl transition-all ${activeFilter === 'all' ? 'bg-white dark:bg-white/10 text-brand-indigo dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                All ({results.length})
              </button>
              <button
                onClick={() => setActiveTab('Verified')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeFilter === 'Verified' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Verified ({metadata.verifiedCount || 0})</span>
              </button>
              <button
                onClick={() => setActiveTab('Inaccurate')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeFilter === 'Inaccurate' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/10 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Inaccurate ({metadata.inaccurateCount || 0})</span>
              </button>
              <button
                onClick={() => setActiveTab('False')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${activeFilter === 'False' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/10 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'}`}
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>False ({metadata.falseCount || 0})</span>
              </button>
            </div>
          </div>

          {/* List of Claims Cards */}
          <div className="space-y-4">
            {filteredClaims.length > 0 ? (
              filteredClaims.map((claim, idx) => (
                <ClaimCard key={idx} index={idx} result={claim} />
              ))
            ) : (
              <div className="p-12 text-center rounded-3xl border border-slate-200/50 dark:border-white/5 bg-slate-50/20 dark:bg-white/2">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  No claims match the active status filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRINT-ONLY LAYOUT CONTAINER */}
      <div className="hidden print:block text-left p-6 font-sans">
        <div className="border-b-2 border-slate-900 pb-4 mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">TRUTHLAYER AI - VERIFICATION AUDIT</h1>
          <p className="text-xs text-slate-500 mt-1 uppercase">DOCUMENT FACT-CHECK ACCURACY CERTIFICATE</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <p><b>Document:</b> {documentName}</p>
            <p><b>Audit Date:</b> {new Date(metadata.verifiedAt || '').toLocaleString()}</p>
            <p><b>Pages:</b> {metadata.pageCount || 1}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold">TRUTH INTEGRITY SCORE: <span className={getStatusTextClass(truthScore)}>{truthScore}%</span></p>
            <p><b>Claims Evaluated:</b> {metadata.totalClaims}</p>
          </div>
        </div>

        <div className="border border-slate-300 p-4 rounded-xl mb-6 bg-slate-50 text-sm">
          <p className="font-bold uppercase text-[10px] text-slate-400 mb-1">Executive Summary</p>
          <p className="font-semibold text-slate-800">{summary}</p>
        </div>

        <h3 className="font-bold text-lg border-b border-slate-300 pb-2 mb-4">EXTRACTED STATEMENTS AUDIT LOG</h3>
        <div className="space-y-4">
          {results.map((r, idx) => (
            <div key={idx} className="border border-slate-300 p-4 rounded-xl break-inside-avoid text-sm">
              <div className="flex justify-between font-bold border-b border-slate-200 pb-1.5 mb-2">
                <span>[#{idx + 1}] Assertion Checked</span>
                <span className={getStatusTextClass(r.status === 'Verified' ? 90 : r.status === 'Inaccurate' ? 60 : 30)}>
                  {r.status.toUpperCase()} ({r.confidence}% Conf)
                </span>
              </div>
              <p className="mb-2"><b>Claim:</b> "{r.claim}"</p>
              <p className="mb-2"><b>Verified Fact:</b> {r.correctFact}</p>
              <p className="mb-2 text-xs text-slate-600"><b>AI Evaluation:</b> {r.explanation}</p>
              <p className="text-[10px] text-slate-500"><b>Source Citation:</b> {r.source?.title || 'Live Search Index'} - {r.source?.url}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

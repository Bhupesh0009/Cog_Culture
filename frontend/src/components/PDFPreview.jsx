import React, { useState } from 'react';
import { Eye, FileText, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PDFPreview({ selectedFile, extractedText, pageCount = 1 }) {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'text'
  const [currentPage, setCurrentPage] = useState(1);

  // Convert bytes to readable formats
  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-slate-200/50 dark:border-white/5 overflow-hidden glass-panel">
      {/* Panel Title Bar */}
      <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-200/50 dark:border-white/5 bg-slate-50/50 dark:bg-white/2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-brand-teal" />
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm tracking-tight">
            Document Intelligence Preview
          </h3>
        </div>
        
        {/* Toggle buttons between visual representation and plain extracted text */}
        {extractedText && (
          <div className="flex items-center bg-slate-200/50 dark:bg-white/5 p-1 rounded-xl border border-slate-200/40 dark:border-white/5">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${activeTab === 'visual'
                  ? 'bg-white dark:bg-white/10 text-brand-indigo dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Skeletons</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${activeTab === 'text'
                  ? 'bg-white dark:bg-white/10 text-brand-indigo dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Parsed Text</span>
            </button>
          </div>
        )}
      </div>

      {/* Document File Specifications Bar */}
      <div className="px-6 py-3 bg-slate-100/40 dark:bg-white/2 border-b border-slate-200/50 dark:border-white/5 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
        <span className="truncate pr-4 max-w-[200px]">
          📄 {selectedFile?.name || 'document.pdf'}
        </span>
        <span className="shrink-0 flex items-center gap-3">
          <span>Pages: <b className="text-slate-700 dark:text-slate-300 font-bold">{pageCount}</b></span>
          <span className="text-slate-300 dark:text-white/10">|</span>
          <span>Size: <b className="text-slate-700 dark:text-slate-300 font-bold">{formatFileSize(selectedFile?.size)}</b></span>
        </span>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 p-6 overflow-y-auto max-h-[420px] min-h-[350px] bg-slate-50/20 dark:bg-black/10">
        <AnimatePresence mode="wait">
          {activeTab === 'visual' ? (
            /* VISUAL REPRESENTATION (STUNNING DOCUMENT SKELETONS) */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              key="visual-view"
              className="flex flex-col items-center justify-center py-6"
            >
              {/* Styled Page Sheet */}
              <div className="w-[240px] h-[320px] rounded-2xl bg-white dark:bg-[#121824] shadow-xl border border-slate-200/50 dark:border-white/5 p-6 relative overflow-hidden flex flex-col justify-between group select-none">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-xl pointer-events-none" />
                
                {/* Header visual */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-brand-indigo/15 dark:bg-brand-indigo/25 flex items-center justify-center text-[10px] text-brand-indigo dark:text-brand-teal">🛡️</div>
                    <div className="h-2.5 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  </div>
                  <div className="h-4 w-full bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-full" />
                  <div className="h-3 w-4/5 bg-slate-100 dark:bg-slate-800 rounded-full" />
                </div>

                {/* Skeletons block */}
                <div className="space-y-3.5 my-4 flex-1 pt-6">
                  <div className="h-2.5 w-full bg-slate-200/80 dark:bg-slate-800/80 rounded-full" />
                  <div className="h-2.5 w-[90%] bg-slate-200/80 dark:bg-slate-800/80 rounded-full" />
                  <div className="h-2.5 w-[95%] bg-slate-200/80 dark:bg-slate-800/80 rounded-full" />
                  <div className="h-2.5 w-[85%] bg-slate-200/80 dark:bg-slate-800/80 rounded-full" />
                  <div className="h-2.5 w-[40%] bg-brand-indigo/20 dark:bg-brand-indigo/35 rounded-full" />
                </div>

                {/* Visual statistics badge inside mock page */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-3 text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                  <span>TRUTHLAYER CORE PREVIEW</span>
                  <span>PAGE {currentPage} OF {pageCount}</span>
                </div>
              </div>

              {/* Paginated Page Selector Controls */}
              {pageCount > 1 && (
                <div className="flex items-center gap-3.5 mt-5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="p-1.5 rounded-lg border border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Page {currentPage} of {pageCount}
                  </span>
                  <button
                    disabled={currentPage === pageCount}
                    onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                    className="p-1.5 rounded-lg border border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* PLAIN EXTRACTED TEXT VIEW */
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              key="text-view"
              className="text-left font-mono text-xs leading-relaxed text-slate-600 dark:text-slate-400 bg-white/40 dark:bg-black/25 p-5.5 rounded-2xl border border-slate-200/40 dark:border-white/5"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-teal uppercase tracking-wider mb-3 select-none">
                <Eye className="w-3.5 h-3.5 animate-pulse" />
                <span>Extracted digital stream</span>
              </div>
              <p className="whitespace-pre-wrap select-all">
                {extractedText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

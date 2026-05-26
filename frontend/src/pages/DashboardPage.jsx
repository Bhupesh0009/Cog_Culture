import React, { useState, useEffect } from 'react';
import { ShieldCheck, Play, Loader2, ArrowRight, Settings, FileText, Database, ShieldAlert, Cpu, Sparkles, BookOpen, Layers, CheckCircle2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import UploadZone from '../components/UploadZone';
import { uploadAndVerifyPDF } from '../services/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

export default function DashboardPage({ onVerificationComplete, activeTab = 'dashboard' }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  // LocalStorage to save fact-check records in the history log
  const [historyLog, setHistoryLog] = useLocalStorage('truthlayer_history', []);

  // Standard steps in our AI fact checking pipeline
  const steps = [
    { title: 'Secure Transfer', description: 'Uploading digital PDF stream to processing servers...' },
    { title: 'Text Parsing', description: 'Executing pdf-parse text layer extraction and formatting...' },
    { title: 'AI Claim Isolation', description: 'Extracting statistics, percentages, dates, and milestones...' },
    { title: 'Live Search Indexing', description: 'Orchestrating concurrent web crawl searches via Tavily...' },
    { title: 'Fact Matching Synthesis', description: 'Evaluating assertions with LLM models for final report...' }
  ];

  // Auto-progress stepper animations to give an immersive terminal feel
  useEffect(() => {
    let timer;
    if (isLoading && activeStep < steps.length - 1) {
      // Simulate steps 1 through 4 at smooth intervals, but halt on final processing step
      // where the API will actually resolve the promise
      const duration = activeStep === 0 ? 1500 : activeStep === 1 ? 2500 : activeStep === 2 ? 3000 : 3500;
      timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, duration);
    }
    return () => clearTimeout(timer);
  }, [isLoading, activeStep]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setErrorMsg('');
  };

  const handleStartVerification = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setActiveStep(0);
    setUploadPercent(0);
    setErrorMsg('');

    try {
      // Step 0: Axios uploads
      const data = await uploadAndVerifyPDF(selectedFile, (percent) => {
        setUploadPercent(percent);
      });

      // Complete all steps quickly to finish transition beautifully
      setActiveStep(steps.length - 1);
      
      // Save report in local history log
      const newRecord = {
        id: Math.random().toString(36).substring(7),
        fileName: selectedFile.name,
        date: new Date().toLocaleString(),
        truthScore: data.truthScore,
        totalClaims: data.metadata.totalClaims,
        reportData: data
      };
      
      setHistoryLog(prev => [newRecord, ...prev]);

      // Delay transition briefly so user sees the completed terminal checklist
      setTimeout(() => {
        setIsLoading(false);
        onVerificationComplete(data, selectedFile);
      }, 1000);

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'An error occurred during verification. Please try again.');
      setIsLoading(false);
    }
  };

  // Pre-built samples click trigger
  const handleLoadSample = (sampleType) => {
    // Generate simulated standard documents
    let fileName = '';
    let mockContent = '';
    
    if (sampleType === 'earnings') {
      fileName = 'Q1_Tech_Earnings_Report.pdf';
      mockContent = `TruthLayer AI global survey metrics show Q1 2026 was a massive milestone. OpenAI announced its consumer base had successfully surpassed 250 million weekly active users, indicating astronomical growth. Furthermore, Apple Inc. market cap reached a record $7.5 trillion in 2026, solidifying its place.`;
    } else {
      fileName = 'Telecom_Penetration_Audit_2026.pdf';
      mockContent = `India has achieved 95% internet penetration as of Q1 2026, driven primarily by 5G mobile rollouts in rural areas. Meanwhile, SpaceX successfully landed its crewed Starship on Mars in early 2026, setting a new standard for human space exploration.`;
    }

    // Convert string into mock Blob to select it in our system
    const blob = new Blob([mockContent], { type: 'application/pdf' });
    const file = new File([blob], fileName, { type: 'application/pdf', lastModified: new Date() });
    
    setSelectedFile(file);
    onFileSelectSample(file);
  };

  // Custom helper so the component processes samples correctly
  const onFileSelectSample = (file) => {
    setSelectedFile(file);
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <AnimatePresence mode="wait">
        
        {/* RENDER ACTIVE PIPELINE LOADING STEPPER CONTAINER */}
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            key="stepper"
            className="p-8 sm:p-12 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel shadow-xl text-left relative overflow-hidden"
          >
            {/* Pulsing glow background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-indigo/10 dark:bg-brand-indigo/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3 border-b border-slate-200/50 dark:border-white/5 pb-5 mb-8">
              <Loader2 className="w-6 h-6 text-brand-indigo animate-spin shrink-0" />
              <div>
                <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-lg leading-tight">
                  TruthLayer Parsing Orchestrator
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase mt-0.5">
                  Real-time pipeline logs active
                </p>
              </div>
            </div>

            {/* Stepper items checklist */}
            <div className="space-y-6">
              {steps.map((step, idx) => {
                const isFinished = activeStep > idx;
                const isActive = activeStep === idx;
                const isWaiting = activeStep < idx;

                return (
                  <div key={idx} className="flex gap-4 relative">
                    {/* Stepper connecting line */}
                    {idx < steps.length - 1 && (
                      <div className={`absolute top-7 left-3.5 bottom-[-24px] w-0.5
                        ${isFinished ? 'bg-brand-teal' : 'bg-slate-200 dark:bg-white/5'}
                      `} />
                    )}

                    {/* Step Icon */}
                    <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shrink-0 border-2 transition-all font-bold text-xs select-none
                      ${isFinished 
                        ? 'bg-brand-teal/10 border-brand-teal text-brand-teal' 
                        : isActive 
                          ? 'bg-brand-indigo/15 border-brand-indigo text-brand-indigo animate-pulse'
                          : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-400'
                      }`}
                    >
                      {isFinished ? '✓' : idx + 1}
                    </div>

                    {/* Step Text details */}
                    <div className="text-left py-0.5">
                      <h4 className={`text-sm font-bold transition-colors
                        ${isFinished ? 'text-slate-800 dark:text-slate-300' : isActive ? 'text-brand-indigo dark:text-white' : 'text-slate-400'}
                      `}>
                        {step.title}
                        {isActive && idx === 0 && ` (${uploadPercent}%)`}
                      </h4>
                      <p className={`text-xs mt-1 transition-colors leading-relaxed font-medium
                        ${isFinished ? 'text-slate-400 dark:text-slate-500' : isActive ? 'text-slate-600 dark:text-slate-400' : 'text-slate-400/60'}
                      `}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          
          /* GENERAL TABS ROUTING DISPATCHER */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="dashboard-views"
            className="space-y-8"
          >
            {/* A. DASHBOARD VIEW (DRAG & DROP CONTAINER) */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 text-center">
                <div className="max-w-xl mx-auto space-y-3">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    Fact-Check Your Documents
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium">
                    Upload any digital text PDF to isolate assertions, cross-reference records, and verify metrics.
                  </p>
                </div>

                <UploadZone 
                  onFileSelect={handleFileSelect} 
                  selectedFile={selectedFile} 
                  setSelectedFile={setSelectedFile} 
                />

                {/* Verification Trigger Button */}
                {selectedFile && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={handleStartVerification}
                      className="flex items-center gap-2 px-8 py-4.5 rounded-2xl bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-teal text-white font-bold shadow-lg shadow-brand-indigo/35 hover:scale-[1.02] active:scale-[0.98] transition-all select-none group"
                    >
                      <Play className="w-5 h-5 fill-white group-hover:scale-105 transition-transform" />
                      <span>Start Document Verification</span>
                    </button>
                  </motion.div>
                )}

                {/* Error messages card */}
                {errorMsg && (
                  <div className="max-w-lg mx-auto p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-rose-500 text-xs font-semibold flex items-center gap-2 text-left">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <p>{errorMsg}</p>
                  </div>
                )}
              </div>
            )}

            {/* B. VERIFICATION HISTORY VIEW */}
            {activeTab === 'history' && (
              <div className="space-y-6 text-left">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Audits Log History
                </h2>
                
                {historyLog.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {historyLog.map((record) => (
                      <div
                        key={record.id}
                        onClick={() => onVerificationComplete(record.reportData, new File([], record.fileName))}
                        className="p-5 rounded-2xl border border-slate-200/50 dark:border-white/5 glass-panel hover:border-brand-teal/50 hover:bg-slate-100/10 transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-indigo/2 rounded-full blur-lg" />
                        <div className="min-w-0 flex-1 pr-4">
                          <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate group-hover:text-brand-indigo dark:group-hover:text-brand-teal transition-colors">
                            {record.fileName}
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{record.date}</p>
                          <p className="text-xs text-slate-500 mt-2">Parsed claims: <b>{record.totalClaims}</b></p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className={`text-sm font-extrabold px-3 py-1.5 rounded-xl border font-mono
                            ${record.truthScore >= 80 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : record.truthScore >= 50 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}
                          `}>
                            {record.truthScore}%
                          </span>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-3xl border border-slate-200/50 dark:border-white/5 bg-slate-50/20 dark:bg-white/2">
                    <History className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                      No document audits found in your history logs.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* C. SAMPLE TEMPLATES VIEW */}
            {activeTab === 'templates' && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Sample Test Templates
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">
                    Test TruthLayer AI instantly without downloading manual PDFs first. Click a template to auto-stage it!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Earnings sample */}
                  <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-full blur-xl" />
                    <div className="space-y-3.5 mb-6 text-left">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/10">
                        <FileText className="w-5 h-5 animate-pulse" />
                      </div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 group-hover:text-brand-indigo transition-colors">
                        Tech Q1 Financials
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        Contains statements regarding OpenAI active weekly users (250M) and Apple's market capitalization ($7.5 Trillion). Excellent test for Verified vs False claims.
                      </p>
                    </div>
                    <button
                      onClick={() => handleLoadSample('earnings')}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand-indigo hover:text-white dark:bg-white/5 dark:hover:bg-brand-indigo text-xs font-bold text-slate-700 dark:text-slate-300 transition-all select-none"
                    >
                      Stage earnings report
                    </button>
                  </div>

                  {/* Telecom sample */}
                  <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel flex flex-col justify-between hover:scale-[1.01] hover:shadow-md transition-all relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-xl" />
                    <div className="space-y-3.5 mb-6 text-left">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-teal/10 text-brand-teal border border-brand-teal/10">
                        <Database className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 group-hover:text-brand-teal transition-colors">
                        Telecom penetration sheet
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                        Asserts metrics about India's internet penetration rate (95%) and SpaceX Starship landed crew on Mars. Great example of disproving exaggerated stats.
                      </p>
                    </div>
                    <button
                      onClick={() => handleLoadSample('telecom')}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-brand-teal hover:text-white dark:bg-white/5 dark:hover:bg-brand-teal text-xs font-bold text-slate-700 dark:text-slate-300 transition-all select-none"
                    >
                      Stage telecom report
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* D. API CONFIGURATIONS SETTINGS VIEW */}
            {activeTab === 'settings' && (
              <div className="space-y-6 text-left">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    API Orchestration Configurations
                  </h2>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">
                    Configure your backend keys to transition from simulated mock templates into live web searches.
                  </p>
                </div>

                <div className="p-6 rounded-3xl border border-slate-200/50 dark:border-white/5 glass-panel space-y-4 max-w-2xl relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-indigo/2 rounded-full blur-2xl" />
                  
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Settings className="w-4 h-4 text-brand-indigo" />
                    <span>How to enable live credentials</span>
                  </h3>
                  
                  <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    <p>
                      TruthLayer AI uses a smart simulated mock system when API keys are absent to verify demo documents. To perform live fact checks on real custom uploads, configure environment variables in your backend:
                    </p>
                    
                    <ol className="list-decimal pl-5 space-y-3">
                      <li>
                        Open the environment configuration file: <br />
                        <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-[11px] font-bold select-all font-mono">
                          backend/.env
                        </code>
                      </li>
                      <li>
                        Acquire a <b>Google Gemini API Key</b> from Google AI Studio and configure: <br />
                        <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-[11px] font-bold font-mono">
                          GEMINI_API_KEY=AIzaSy...
                        </code>
                      </li>
                      <li>
                        Acquire a <b>Tavily Search API Key</b> from Tavily dashboard and configure: <br />
                        <code className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 text-[11px] font-bold font-mono">
                          TAVILY_API_KEY=tvly-...
                        </code>
                      </li>
                      <li>
                        Restart your backend server to load the new credentials. The header badge will automatically shift to <b className="text-emerald-500">Live AI Mode Active</b>!
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

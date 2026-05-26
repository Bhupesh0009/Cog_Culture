import React from 'react';
import { Shield, LayoutDashboard, History, Settings, FileText, HelpCircle, HelpCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'history', label: 'Verification History', icon: History },
    { id: 'templates', label: 'Sample Documents', icon: FileText },
    { id: 'settings', label: 'API Configurations', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col w-72 border-r transition-transform duration-300 lg:translate-x-0 glass-panel
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          border-slate-200/50 dark:border-white/5`}
      >
        {/* Sidebar Header Brand Logo */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-slate-200/50 dark:border-white/5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-indigo to-brand-teal text-white shadow-lg shadow-brand-indigo/35 dark:shadow-brand-indigo/20">
            <Shield className="w-5.5 h-5.5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              TruthLayer<span className="text-brand-teal font-extrabold">.AI</span>
            </h1>
            <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 dark:text-slate-500">
              Trust Engine Core
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-2.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false); // Close mobile tray
                }}
                className={`relative flex items-center gap-3.5 w-full px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 group overflow-hidden
                  ${isActive 
                    ? 'text-brand-indigo dark:text-white' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
              >
                {/* Active Glowing Block using Framer Motion */}
                {isActive && (
                  <motion.div
                    layoutId="active-nav-glow"
                    className="absolute inset-0 z-0 bg-gradient-to-r from-brand-indigo/10 to-brand-teal/5 dark:from-brand-indigo/20 dark:to-brand-teal/5 border-l-4 border-brand-indigo dark:border-brand-teal"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon className={`relative z-10 w-5 h-5 transition-transform duration-200 group-hover:scale-105
                  ${isActive ? 'text-brand-indigo dark:text-brand-teal' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} 
                />
                
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer / API Badge */}
        <div className="p-6 border-t border-slate-200/50 dark:border-white/5">
          <div className="p-4 rounded-2xl bg-slate-100/50 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-full blur-xl transition-all duration-300 group-hover:scale-125" />
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex w-2.5 h-2.5 rounded-full bg-brand-teal animate-pulse" />
              <span className="text-[11px] font-bold tracking-wide uppercase text-slate-400 dark:text-slate-400">
                System Status
              </span>
            </div>
            <p className="text-[12px] font-medium text-slate-600 dark:text-slate-300">
              Orchestrator Online
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
              Tavily & Gemini Active
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

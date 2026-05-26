import React, { useEffect, useState } from 'react';
import { Menu, Sun, Moon, ShieldAlert, Cpu, CheckCircle, Wifi, WifiOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { checkServerHealth } from '../services/api';

export default function Header({ sidebarOpen, setSidebarOpen }) {
  const { isDark, toggleTheme } = useTheme();
  const [serverState, setServerState] = useState({ online: false, mode: 'CHECKING' });

  // Query server health status on render to notify if server is online & active mode
  useEffect(() => {
    const fetchHealth = async () => {
      const health = await checkServerHealth();
      setServerState(health);
    };

    fetchHealth();
    
    // Check every 30 seconds
    const interval = setInterval(fetchHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-10 h-20 border-b glass-panel border-slate-200/50 dark:border-white/5">
      {/* Mobile Hamburger menu */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 -ml-2 rounded-xl lg:hidden text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden sm:block">
          <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Factual Verification Dashboard
          </h2>
          <p className="text-[11px] text-slate-400 dark:text-slate-500">
            TruthLayer Core v1.0.0
          </p>
        </div>
      </div>

      {/* Control Tools */}
      <div className="flex items-center gap-4.5">
        {/* Dynamic Mode Badge */}
        <div className={`hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold select-none
          ${serverState.online 
            ? serverState.mode === 'LIVE_AI'
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
            : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
          }`}
        >
          {serverState.online ? (
            serverState.mode === 'LIVE_AI' ? (
              <>
                <Cpu className="w-3.5 h-3.5 animate-pulse" />
                <span>Live AI Mode Active</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Out-Of-The-Box Demo Active</span>
              </>
            )
          ) : (
            <>
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Backend Offline</span>
            </>
          )}
        </div>

        {/* Server Connection Status */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 px-3 py-1.5 rounded-full">
          {serverState.online ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-brand-teal" />
              <span className="font-semibold text-[11px]">CONNECTED</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-semibold text-[11px] text-rose-400">DISCONNECTED</span>
            </>
          )}
        </div>

        {/* Dark/Light mode Toggle Switch */}
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100/20 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
          aria-label="Toggle Theme"
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400 transition-transform duration-500 hover:rotate-45" />
          ) : (
            <Moon className="w-5 h-5 text-brand-indigo transition-transform duration-500 hover:-rotate-12" />
          )}
        </button>
      </div>
    </header>
  );
}

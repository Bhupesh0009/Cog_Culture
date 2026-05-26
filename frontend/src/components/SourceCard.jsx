import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

export default function SourceCard({ source = {} }) {
  const { title = 'External Source', url = '#', snippet = '' } = source;

  // Extract base domain to show favicons clean & clear
  const getDomain = (urlStr) => {
    try {
      const urlObj = new URL(urlStr);
      return urlObj.hostname.replace('www.', '');
    } catch {
      return '';
    }
  };

  const domain = getDomain(url);
  // Using Google's favicon fetcher tool to get high-quality icons or fallback to Globe
  const faviconUrl = domain 
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=64` 
    : null;

  return (
    <div className="group relative p-4 rounded-2xl bg-white/40 dark:bg-[#121824]/40 border border-slate-200/50 dark:border-white/5 hover:border-brand-teal/50 hover:bg-white/60 dark:hover:bg-[#121824]/60 hover:shadow-md transition-all duration-200 text-left">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Favicon / Globe Container */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/40 dark:border-white/5 overflow-hidden shrink-0 select-none">
            {faviconUrl ? (
              <img 
                src={faviconUrl} 
                alt={domain} 
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none'; // hide if broken
                }}
              />
            ) : (
              <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            )}
          </div>
          
          <div className="min-w-0">
            <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate pr-2 group-hover:text-brand-indigo dark:group-hover:text-brand-teal transition-colors">
              {title}
            </h5>
            {domain && (
              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wide uppercase">
                {domain}
              </p>
            )}
          </div>
        </div>

        {/* Redirect link button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg border border-slate-200/60 dark:border-white/5 text-slate-400 dark:text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5 transition-all"
          title="Open web reference"
          onClick={(e) => e.stopPropagation()} // Prevent card expand
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Snippet text */}
      {snippet && (
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
          "{snippet}"
        </p>
      )}
    </div>
  );
}

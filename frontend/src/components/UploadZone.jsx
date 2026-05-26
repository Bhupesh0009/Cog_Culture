import React, { useRef, useState } from 'react';
import { UploadCloud, File, AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UploadZone({ onFileSelect, selectedFile, setSelectedFile }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = (file) => {
    setErrorMsg('');
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMsg('Invalid file format. Only PDF files are supported.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File is too large. Maximum size allowed is 10MB.');
      return;
    }

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerInputClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Convert bytes to readable MB/KB
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Hidden input file tag */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="hidden"
      />

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={triggerInputClick}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-10 cursor-pointer rounded-3xl border-2 border-dashed transition-all duration-300 glass-panel
          ${isDragActive 
            ? 'border-brand-indigo bg-brand-indigo/5 dark:bg-brand-indigo/10 shadow-lg shadow-brand-indigo/10 dark:shadow-brand-indigo/20 scale-[1.02]' 
            : 'border-slate-300 dark:border-white/10 hover:border-brand-teal/80 hover:shadow-lg hover:shadow-brand-teal/5 dark:hover:shadow-brand-teal/10'
          }`}
      >
        {/* Decorative corner glows */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-indigo/5 dark:bg-brand-indigo/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-teal/5 dark:bg-brand-teal/10 rounded-full blur-xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            /* Upload Action State */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="uploader"
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-indigo/15 to-brand-teal/10 text-brand-indigo dark:text-brand-teal mb-6 shadow-inner border border-brand-indigo/10 dark:border-white/5">
                <UploadCloud className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                Drag & drop your document here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
                or <span className="text-brand-indigo dark:text-brand-teal font-semibold underline">browse files</span> to upload a PDF (max 10MB)
              </p>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                🛡️ SECURE VERIFICATION CORE
              </div>
            </motion.div>
          ) : (
            /* Selected File State */
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key="file-details"
              className="flex items-center justify-between w-full p-4.5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/50 dark:border-white/5 relative z-10"
              onClick={(e) => e.stopPropagation()} // Prevent trigger upload click
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  <File className="w-6 h-6" />
                </div>
                <div className="text-left min-w-0">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate pr-4">
                    {selectedFile.name}
                  </h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    {formatFileSize(selectedFile.size)} • PDF Document
                  </p>
                </div>
              </div>

              <button
                onClick={removeFile}
                className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-xl transition-all"
                title="Remove File"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Alert Display */}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mt-4 px-4.5 py-2.5 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

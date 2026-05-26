import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ResultsPage from './pages/ResultsPage';

function MainAppShell() {
  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'dashboard' | 'results'
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'history' | 'templates' | 'settings'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleLaunchDashboard = () => {
    setActiveView('dashboard');
    setActiveTab('dashboard');
  };

  const handleVerificationComplete = (data, file) => {
    setReportData(data);
    setSelectedFile(file);
    setActiveView('results');
  };

  const handleBackToDashboard = () => {
    setReportData(null);
    setSelectedFile(null);
    setActiveView('dashboard');
    setActiveTab('dashboard');
  };

  // 1. Render Standalone Landing Page
  if (activeView === 'landing') {
    return (
      <LandingPage onLaunchDashboard={handleLaunchDashboard} />
    );
  }

  // 2. Render Main Platform Interface Dashboard & Results (with Sidebar and Header Layouts)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors duration-300">
      {/* Platform Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (activeView === 'results') {
            setActiveView('dashboard'); // Auto redirect back to upload tabs if browsing other views
          }
        }} 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
      />

      {/* Main Container Shell */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 px-6 py-8 lg:px-10">
          {activeView === 'dashboard' ? (
            <DashboardPage 
              activeTab={activeTab} 
              onVerificationComplete={handleVerificationComplete} 
            />
          ) : (
            <ResultsPage 
              report={reportData} 
              selectedFile={selectedFile} 
              onBack={handleBackToDashboard} 
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppShell />
    </ThemeProvider>
  );
}

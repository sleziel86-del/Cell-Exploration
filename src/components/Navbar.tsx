import React from 'react';
import { Volume2, VolumeX, Sparkles, BookOpen, Puzzle, HelpCircle, Table2, Award, Home } from 'lucide-react';
import { soundManager } from '../utils/audio';

export type ActiveTab = 'home' | 'learn' | 'diagram' | 'matchup' | 'quiz' | 'table' | 'dashboard';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  studentName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  onToggleMute,
  studentName,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'learn', label: 'Learn Mode', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'diagram', label: 'Drag Diagram', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'matchup', label: 'Match-Up', icon: <Puzzle className="w-4 h-4" /> },
    { id: 'quiz', label: 'Quiz Challenge', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'table', label: 'Reference Table', icon: <Table2 className="w-4 h-4" /> },
    { id: 'dashboard', label: 'Parent Dashboard', icon: <Award className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            soundManager.playPop();
            setActiveTab('home');
          }}
          className="flex items-center gap-2 group text-left cursor-pointer focus-visible:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl">🔬</span>
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-slate-900 tracking-tight block leading-tight">
              Cell Explorers
            </span>
            <span className="text-[11px] font-medium text-emerald-700 tracking-wide uppercase">
              Primary 5 Science
            </span>
          </div>
        </button>

        {/* Zone 2: 4-7 clean single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-1 bg-amber-50/70 p-1 rounded-xl border border-amber-100">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playPop();
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile / Tablet Quick Selector */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-xs py-1">
          <select
            value={activeTab}
            onChange={(e) => {
              soundManager.playPop();
              setActiveTab(e.target.value as ActiveTab);
            }}
            className="text-xs font-semibold bg-amber-50 border border-amber-200 text-slate-800 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-emerald-500"
          >
            {navItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Zone 3: Primary Actions (Sound Mute Toggle + Student Badge) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className={`p-2 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-500 border-slate-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
            title={isMuted ? 'Sound muted — click to unmute' : 'Sound active — click to mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            <span className="hidden sm:inline text-xs">{isMuted ? 'Muted' : 'Audio On'}</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('dashboard');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            title="Open Parent Dashboard"
          >
            <span>👨‍👩‍👧</span>
            <span className="max-w-[80px] sm:max-w-[110px] truncate">{studentName}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

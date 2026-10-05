/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { LearnMode } from './components/LearnMode';
import { InteractiveDiagram } from './components/InteractiveDiagram';
import { MatchUpGame } from './components/MatchUpGame';
import { QuizChallenge } from './components/QuizChallenge';
import { QuickReferenceTable } from './components/QuickReferenceTable';
import { ParentDashboard } from './components/ParentDashboard';
import { soundManager } from './utils/audio';
import { loadProgress } from './utils/progressStore';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [learnCellType, setLearnCellType] = useState<'plant' | 'animal'>('plant');
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [studentName, setStudentName] = useState<string>('Young Scientist');
  const [bestQuizScore, setBestQuizScore] = useState<number>(0);

  // Sync state from progress store
  useEffect(() => {
    const prog = loadProgress();
    setStudentName(prog.studentName);
    setBestQuizScore(prog.bestQuizScore);
  }, [activeTab]);

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectMode = (tab: ActiveTab, initialCellType?: 'plant' | 'animal') => {
    if (initialCellType) {
      setLearnCellType(initialCellType);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800 font-sans selection:bg-emerald-200">
      {/* Top Bar Contract (Wordmark, Nav links, Action controls) */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        studentName={studentName}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'home' && (
          <HomeScreen onSelectMode={handleSelectMode} bestQuizScore={bestQuizScore} />
        )}

        {activeTab === 'learn' && <LearnMode initialCellType={learnCellType} />}

        {activeTab === 'diagram' && <InteractiveDiagram />}

        {activeTab === 'matchup' && <MatchUpGame />}

        {activeTab === 'quiz' && (
          <QuizChallenge onGoToDashboard={() => setActiveTab('dashboard')} />
        )}

        {activeTab === 'table' && <QuickReferenceTable />}

        {activeTab === 'dashboard' && (
          <ParentDashboard
            onStartQuiz={() => setActiveTab('quiz')}
            onStartDiagram={() => setActiveTab('diagram')}
          />
        )}
      </main>

      {/* Clean Footer (No telemetry, no fake version badges, quiet educational footer) */}
      <footer className="border-t border-amber-200/80 bg-white/70 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-heading font-bold text-slate-800 text-sm block">
              Cell Explorers · Primary 5 Science Revision Lab
            </span>
            <span>Designed for independent student revision on tablets & laptops. No login required.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('learn');
              }}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Learn Mode
            </button>
            <span>·</span>
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('diagram');
              }}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Drag & Drop
            </button>
            <span>·</span>
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('quiz');
              }}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Quiz Challenge
            </button>
            <span>·</span>
            <button
              onClick={() => {
                soundManager.playPop();
                setActiveTab('dashboard');
              }}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Parent Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { Sparkles, HelpCircle, Puzzle, Table2, Award, ArrowRight, ShieldCheck, Zap, Sun } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { soundManager } from '../utils/audio';

interface HomeScreenProps {
  onSelectMode: (tab: ActiveTab, initialCellType?: 'plant' | 'animal') => void;
  bestQuizScore: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectMode, bestQuizScore }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* 1. Hero Section with Bright Colourful Title & Short Welcome */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-600 text-white p-6 sm:p-10 shadow-lg border-4 border-emerald-400/40">
        {/* Subtle decorative background circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Primary 5 Science Revision Lab</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
              Cell Explorers! 🔬
            </h1>

            <p className="text-base sm:text-lg text-emerald-50 font-medium leading-relaxed max-w-xl">
              Hi Scientist! Let’s explore the amazing parts that make up living cells — and what each one does!
            </p>

            {/* Crucial Curriculum Tip */}
            <div className="bg-emerald-900/40 border border-emerald-300/30 rounded-2xl p-3.5 text-xs sm:text-sm text-emerald-100 flex items-start gap-3 backdrop-blur-xs">
              <span className="text-xl shrink-0">💡</span>
              <p>
                <strong className="text-amber-200 font-bold">Scientist Memory Rule:</strong> All living cells have a <span className="underline decoration-amber-300">Nucleus</span>, <span className="underline decoration-amber-300">Cytoplasm</span>, and <span className="underline decoration-amber-300">Cell Membrane</span>. But only <strong className="text-emerald-200">Plant Cells</strong> have a tough <strong>Cell Wall</strong> and green <strong>Chloroplasts</strong>!
              </p>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-md w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-emerald-300 rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition duration-300" />
              <div className="relative bg-white/10 rounded-2xl overflow-hidden border-2 border-white/30 backdrop-blur-xs p-2">
                <img
                  src="/src/assets/images/cell_hero_cartoon_1791199220333.jpg"
                  alt="Cartoon Plant and Animal Cells in Classroom"
                  referrerPolicy="no-referrer"
                  className="w-full h-52 sm:h-60 object-cover rounded-xl shadow-inner transform group-hover:scale-102 transition duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Two Big Buttons: Animal Cell and Plant Cell (Prompt Requirement #1) */}
      <div className="space-y-4">
        <div className="text-center sm:text-left">
          <h2 className="font-heading text-2xl font-bold text-slate-800">
            Choose a Cell to Explore
          </h2>
          <p className="text-sm text-slate-600">
            Click either cell below to start learning its nicknames and functions!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Big Button 1: Animal Cell */}
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectMode('learn', 'animal');
            }}
            className="group text-left relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100/70 border-3 border-amber-300 hover:border-amber-500 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:rotate-6 transition-transform">
                🐾
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full">
                Flexible Shape
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors flex items-center gap-2">
                Animal Cell
                <ArrowRight className="w-5 h-5 text-amber-600 group-hover:translate-x-1.5 transition-transform" />
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Found in humans, birds, puppies, and fish! Features a flexible cell membrane, the powerhouse mitochondria, and small temporary vacuoles.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-amber-200/70 flex flex-wrap gap-2 text-xs font-semibold text-amber-900">
              <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">🧠 Nucleus (The Brain)</span>
              <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">⚡ Mitochondria (The Powerhouse)</span>
              <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-amber-200">🛡️ Cell Membrane</span>
            </div>
          </button>

          {/* Big Button 2: Plant Cell */}
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectMode('learn', 'plant');
            }}
            className="group text-left relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100/70 border-3 border-emerald-300 hover:border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-400"
          >
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-md group-hover:rotate-6 transition-transform">
                🌱
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/80 px-3 py-1 rounded-full">
                Fixed Regular Shape
              </span>
            </div>

            <div className="mt-5 space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-2">
                Plant Cell
                <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1.5 transition-transform" />
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Found in trees, leaves, and flowers! Equipped with a tough outer cell wall, green food-making chloroplasts, and a giant central vacuole.
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-emerald-200/70 flex flex-wrap gap-2 text-xs font-semibold text-emerald-900">
              <span className="bg-emerald-200/90 text-emerald-950 font-bold px-2.5 py-1 rounded-lg border border-emerald-300">
                🧱 Cell Wall (Plant Only!)
              </span>
              <span className="bg-lime-200/90 text-lime-950 font-bold px-2.5 py-1 rounded-lg border border-lime-300">
                ☀️ Chloroplast (Plant Only!)
              </span>
              <span className="bg-white/80 px-2.5 py-1 rounded-lg border border-emerald-200">
                💧 Large Central Vacuole
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* 3. Interactive Activity Hub */}
      <div className="space-y-4">
        <h2 className="font-heading text-2xl font-bold text-slate-800">
          Practice & Test Your Knowledge
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Drag-and-Drop Diagram */}
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectMode('diagram');
            }}
            className="group text-left bg-white border-2 border-sky-200 hover:border-sky-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              🧩
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-lg group-hover:text-sky-600 transition-colors">
              Drag & Drop
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Drag labels directly onto cartoon cell diagrams. Works with touch & mouse!
            </p>
          </button>

          {/* Card 2: Match-Up Game */}
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectMode('matchup');
            }}
            className="group text-left bg-white border-2 border-purple-200 hover:border-purple-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              🎯
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-lg group-hover:text-purple-600 transition-colors">
              Match-Up Game
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Link each cell part to its famous nickname and primary function!
            </p>
          </button>

          {/* Card 3: Quiz Challenge */}
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectMode('quiz');
            }}
            className="group text-left bg-white border-2 border-rose-200 hover:border-rose-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                🏆
              </div>
              {bestQuizScore > 0 && (
                <span className="text-[11px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  Best: {bestQuizScore}/8
                </span>
              )}
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-lg group-hover:text-rose-600 transition-colors">
              Quiz Challenge
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              8 multiple-choice questions with instant feedback and expert scores!
            </p>
          </button>

          {/* Card 4: Quick Reference Table */}
          <button
            onClick={() => {
              soundManager.playPop();
              onSelectMode('table');
            }}
            className="group text-left bg-white border-2 border-amber-200 hover:border-amber-400 p-5 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">
              📋
            </div>
            <h4 className="font-heading font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors">
              Reference Table
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              Clean revision chart with audio read-aloud and "(plant only)" markers.
            </p>
          </button>
        </div>
      </div>

      {/* 4. Parent / Teacher Dashboard Banner */}
      <div className="bg-gradient-to-r from-amber-100 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/30 flex items-center justify-center text-2xl shrink-0">
            📊
          </div>
          <div>
            <h4 className="font-heading font-bold text-amber-950 text-base">
              Score-Tracking Dashboard for Parents & Teachers
            </h4>
            <p className="text-xs text-amber-800">
              Track quiz attempts, mastered organelles, areas to practice, and print a custom Primary 5 Scientist Certificate.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            soundManager.playPop();
            onSelectMode('dashboard');
          }}
          className="whitespace-nowrap px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
        >
          View Dashboard
        </button>
      </div>
    </div>
  );
};

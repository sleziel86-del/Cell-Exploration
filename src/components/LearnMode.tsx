import React, { useState, useEffect } from 'react';
import { CELL_PARTS, CellPart } from '../data/cellData';
import { PlantCellSvg } from './PlantCellSvg';
import { AnimalCellSvg } from './AnimalCellSvg';
import { soundManager } from '../utils/audio';
import { Volume2, Sparkles, CheckCircle2, AlertCircle, Info, ChevronRight, Layers } from 'lucide-react';

interface LearnModeProps {
  initialCellType?: 'plant' | 'animal';
}

export const LearnMode: React.FC<LearnModeProps> = ({ initialCellType = 'plant' }) => {
  const [cellType, setCellType] = useState<'plant' | 'animal'>(initialCellType);
  const [selectedPartId, setSelectedPartId] = useState<string>('nucleus');

  useEffect(() => {
    if (initialCellType) {
      setCellType(initialCellType);
    }
  }, [initialCellType]);

  const activePart = CELL_PARTS.find((p) => p.id === selectedPartId) || CELL_PARTS[0];

  const handleSelectPart = (partId: string) => {
    soundManager.playPop();
    setSelectedPartId(partId);
  };

  const handleSpeak = (text: string) => {
    soundManager.speak(text);
  };

  // Filter parts relevant to this cell type
  const availableParts = CELL_PARTS.filter((part) => {
    if (cellType === 'animal' && part.isPlantOnly) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 1. Header with Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Interactive Biology Explorer</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Learn Mode: Cell Anatomy
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Click on any part in the cartoon diagram or list to discover its nickname, function, and secrets!
          </p>
        </div>

        {/* Plant vs Animal Toggle */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-100/70 rounded-2xl border border-amber-200 self-start sm:self-auto">
          <button
            onClick={() => {
              soundManager.playPop();
              setCellType('plant');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              cellType === 'plant'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🌱</span>
            <span>Plant Cell</span>
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setCellType('animal');
              // If currently selected part is plant-only, switch to nucleus
              if (activePart.isPlantOnly) {
                setSelectedPartId('nucleus');
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              cellType === 'animal'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🐾</span>
            <span>Animal Cell</span>
          </button>
        </div>
      </div>

      {/* 2. Critical Alert: Plant-Only Highlight (Requirement #2) */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center text-xl shrink-0 font-bold">
            🌱
          </div>
          <div>
            <h4 className="font-heading font-bold text-emerald-950 text-sm sm:text-base">
              Key Primary 5 Examination Rule!
            </h4>
            <p className="text-xs sm:text-sm text-emerald-900">
              <strong className="underline decoration-emerald-500 font-bold">Cell Wall</strong> and{' '}
              <strong className="underline decoration-emerald-500 font-bold">Chloroplasts</strong> are{' '}
              <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-md font-bold text-xs uppercase">
                ONLY in plant cells
              </span>
              ! Animal cells never have them.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            soundManager.playPop();
            setCellType('plant');
            setSelectedPartId('cell_wall');
          }}
          className="text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
        >
          Inspect Plant-Only Parts →
        </button>
      </div>

      {/* 3. Main Stage: Split Layout (Cartoon SVG Diagram on Left, Detail Card & Part List on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Cartoon Diagram */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-amber-200/80 p-4 sm:p-6 shadow-xs flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Interactive Cartoon Diagram</span>
            </span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Click any organelle to inspect!
            </span>
          </div>

          <div className="w-full py-2">
            {cellType === 'plant' ? (
              <PlantCellSvg selectedPartId={selectedPartId} onSelectPart={handleSelectPart} />
            ) : (
              <AnimalCellSvg selectedPartId={selectedPartId} onSelectPart={handleSelectPart} />
            )}
          </div>

          {/* Organelle Quick Click Ribbon */}
          <div className="w-full mt-4 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-600 block mb-2">
              Organelles in {cellType === 'plant' ? 'Plant' : 'Animal'} Cell:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {availableParts.map((part) => {
                const isSelected = selectedPartId === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectPart(part.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-xs scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: part.svgColor }}
                    />
                    <span>{part.name}</span>
                    {part.isPlantOnly && (
                      <span className="text-[10px] text-emerald-300 font-bold">(plant only)</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Selected Part Deep Dive Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border-2 border-amber-300 p-6 shadow-md space-y-4">
            {/* Header: Name, Nickname & Audio button */}
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading text-2xl font-bold text-slate-900">
                    {activePart.name}
                  </h3>
                  {activePart.isPlantOnly ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                      Plant Only 🌱
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                      In Both Cells
                    </span>
                  )}
                </div>

                {/* Nickname prominently featured */}
                <div className="mt-1">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider block">
                    Famous Nickname:
                  </span>
                  <span className="font-heading text-xl font-bold text-amber-600 block">
                    "{activePart.nickname}"
                  </span>
                </div>
              </div>

              {/* Read Aloud Button */}
              <button
                onClick={() =>
                  handleSpeak(`${activePart.name}. ${activePart.consistentPhrasing}. ${activePart.simpleDescription}`)
                }
                className="p-2.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer shrink-0"
                title="Listen to pronunciation and description"
                aria-label="Listen to description"
              >
                <Volume2 className="w-5 h-5 text-amber-700" />
              </button>
            </div>

            {/* Consistent Phrasing Box: "The [nickname] — [function]" */}
            <div className="bg-amber-50/80 border-2 border-amber-200/90 rounded-2xl p-4 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                Primary 5 Golden Rule:
              </span>
              <p className="text-sm font-bold text-slate-800 leading-snug">
                {activePart.consistentPhrasing}
              </p>
            </div>

            {/* Simple Description */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Simple Description:
              </span>
              <p className="text-sm text-slate-700 leading-relaxed">
                {activePart.simpleDescription}
              </p>
            </div>

            {/* Role in current cell type */}
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700 block">
                In {cellType === 'plant' ? 'Plant Cells' : 'Animal Cells'}:
              </span>
              <p className="text-slate-600">
                {cellType === 'plant' ? activePart.plantRoleNote : activePart.animalRoleNote}
              </p>
            </div>

            {/* Did you know fun fact */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 flex items-start gap-2.5">
              <span className="text-base shrink-0">✨</span>
              <p className="text-xs text-sky-900 leading-relaxed">
                <strong>Did you know?</strong> {activePart.funFact}
              </p>
            </div>
          </div>

          {/* Quick Comparison Card */}
          <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl border border-amber-200 p-4 space-y-2">
            <h4 className="font-heading font-bold text-sm text-slate-900 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-amber-600" />
              <span>Plant vs Animal Summary Checklist</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                <span className="font-bold text-emerald-900 block mb-1">🌱 Plant Cell</span>
                <ul className="space-y-1 text-emerald-800 text-[11px]">
                  <li>✅ Has tough Cell Wall</li>
                  <li>✅ Has Chloroplasts</li>
                  <li>✅ 1 Giant Central Vacuole</li>
                  <li>✅ Regular fixed shape</li>
                </ul>
              </div>
              <div className="bg-amber-50/80 p-2.5 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900 block mb-1">🐾 Animal Cell</span>
                <ul className="space-y-1 text-amber-800 text-[11px]">
                  <li>❌ NO Cell Wall</li>
                  <li>❌ NO Chloroplasts</li>
                  <li>✅ Small temporary vacuoles</li>
                  <li>✅ Flexible irregular shape</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

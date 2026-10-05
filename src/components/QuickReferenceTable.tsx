import React, { useState } from 'react';
import { CELL_PARTS, CellPart } from '../data/cellData';
import { soundManager } from '../utils/audio';
import { Table2, Volume2, Sparkles, Filter, Check, ShieldAlert } from 'lucide-react';

export const QuickReferenceTable: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'plant_only' | 'both'>('all');

  const filteredParts = CELL_PARTS.filter((part) => {
    if (filter === 'plant_only') return part.isPlantOnly;
    if (filter === 'both') return !part.isPlantOnly;
    return true;
  });

  const handleSpeak = (part: CellPart) => {
    soundManager.speak(`${part.name}. Nickname: ${part.nickname}. Function: ${part.functionText}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 1. Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Primary 5 Revision Matrix</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Quick Reference Table 📋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Clean overview of all cell parts, official nicknames, and core functions.
          </p>
        </div>

        {/* Filter Controls (compliant with Zero-Pill & functional tabs) */}
        <div className="flex items-center gap-1 p-1 bg-amber-50 rounded-xl border border-amber-200 self-start sm:self-auto">
          <button
            onClick={() => {
              soundManager.playPop();
              setFilter('all');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Parts ({CELL_PARTS.length})
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setFilter('plant_only');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'plant_only'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Plant Only (2) 🌱
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setFilter('both');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'both'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            In Both Cells (6) 🐾🌱
          </button>
        </div>
      </div>

      {/* 2. Educational Golden Rule Box */}
      <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-950 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl shrink-0">🌟</span>
          <div>
            <strong>Primary 5 Tip:</strong> Always look out for the{' '}
            <span className="bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
              (plant only)
            </span>{' '}
            label. Animal cells lack cell walls and chloroplasts so animals can stay light and move!
          </div>
        </div>
      </div>

      {/* 3. The Clean Table (Desktop & Tablet View) */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-amber-100/60 border-b-2 border-amber-200 text-slate-800 text-xs sm:text-sm font-heading">
                <th className="py-4 px-5 font-bold">Cell Part</th>
                <th className="py-4 px-5 font-bold">Famous Nickname</th>
                <th className="py-4 px-5 font-bold">What It Does (Function)</th>
                <th className="py-4 px-5 font-bold whitespace-nowrap">Found In</th>
                <th className="py-4 px-4 font-bold text-center w-16">Audio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredParts.map((part) => (
                <tr
                  key={part.id}
                  className={`hover:bg-amber-50/40 transition-colors ${
                    part.isPlantOnly ? 'bg-emerald-50/20' : ''
                  }`}
                >
                  {/* Cell Part Name */}
                  <td className="py-4 px-5 font-bold text-slate-900 flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: part.svgColor }}
                    />
                    <span>{part.name}</span>
                  </td>

                  {/* Nickname */}
                  <td className="py-4 px-5 font-semibold text-amber-700 whitespace-nowrap">
                    "{part.nickname}"
                  </td>

                  {/* Function & Consistent Phrasing */}
                  <td className="py-4 px-5 text-slate-700 leading-relaxed max-w-md">
                    <div className="font-semibold text-slate-900 text-xs text-amber-900/90 mb-0.5">
                      {part.consistentPhrasing}
                    </div>
                    <span className="text-xs text-slate-600 block">{part.simpleDescription}</span>
                  </td>

                  {/* Found In Column with prominent (plant only) label */}
                  <td className="py-4 px-5 whitespace-nowrap">
                    {part.isPlantOnly ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 font-bold text-xs">
                        <span>🌱</span>
                        <span>Plant Only (plant only)</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium text-xs">
                        <span>🐾🌱 Both Plant & Animal</span>
                      </span>
                    )}
                  </td>

                  {/* Audio Read-out */}
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleSpeak(part)}
                      className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 transition-colors cursor-pointer border border-amber-200"
                      title={`Listen to ${part.name}`}
                      aria-label={`Listen to ${part.name}`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

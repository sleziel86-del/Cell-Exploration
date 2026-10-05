import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CELL_PARTS, PLANT_CELL_HOTSPOTS, ANIMAL_CELL_HOTSPOTS, DiagramHotspot } from '../data/cellData';
import { PlantCellSvg } from './PlantCellSvg';
import { AnimalCellSvg } from './AnimalCellSvg';
import { soundManager } from '../utils/audio';
import { recordDiagramCompletion } from '../utils/progressStore';
import { Sparkles, CheckCircle2, RotateCcw, HelpCircle, ArrowRight, Lightbulb } from 'lucide-react';

export const InteractiveDiagram: React.FC = () => {
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  // Map of hotspot partId -> placed boolean
  const [placedParts, setPlacedParts] = useState<Record<string, boolean>>({});
  // Selected badge for click-to-place (tablet friendly)
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [draggedPartId, setDraggedPartId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'hint' | 'neutral' }>({
    text: 'Drag a label or tap a word, then tap its target circle on the cell!',
    type: 'neutral',
  });

  const hotspots = cellType === 'plant' ? PLANT_CELL_HOTSPOTS : ANIMAL_CELL_HOTSPOTS;
  const totalHotspots = hotspots.length;
  const placedCount = Object.keys(placedParts).filter((k) => placedParts[k]).length;
  const isComplete = placedCount === totalHotspots && totalHotspots > 0;

  const handleSwitchType = (type: 'plant' | 'animal') => {
    soundManager.playPop();
    setCellType(type);
    setPlacedParts({});
    setSelectedBadge(null);
    setFeedbackMsg({
      text: `Let's label the ${type === 'plant' ? 'Plant' : 'Animal'} Cell! Drag labels to their matching positions.`,
      type: 'neutral',
    });
  };

  const handleReset = () => {
    soundManager.playPop();
    setPlacedParts({});
    setSelectedBadge(null);
    setFeedbackMsg({
      text: 'Diagram reset! Ready to try again.',
      type: 'neutral',
    });
  };

  const tryPlacePart = (targetPartId: string, incomingPartId: string) => {
    if (targetPartId === incomingPartId) {
      // Correct match!
      soundManager.playCorrect();
      const updated = { ...placedParts, [targetPartId]: true };
      setPlacedParts(updated);
      setSelectedBadge(null);

      const partInfo = CELL_PARTS.find((p) => p.id === targetPartId);
      const nickname = partInfo ? `"${partInfo.nickname}"` : '';

      const newPlacedCount = Object.keys(updated).filter((k) => updated[k]).length;
      if (newPlacedCount === totalHotspots) {
        soundManager.playFanfare();
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        recordDiagramCompletion(cellType);
        setFeedbackMsg({
          text: `🎉 Incredible work! You accurately labeled all parts of the ${cellType === 'plant' ? 'Plant' : 'Animal'} Cell!`,
          type: 'success',
        });
      } else {
        setFeedbackMsg({
          text: `Correct! ✅ ${partInfo?.name} (${nickname}) placed successfully!`,
          type: 'success',
        });
      }
    } else {
      // Wrong match
      soundManager.playWrong();
      const expected = CELL_PARTS.find((p) => p.id === targetPartId);
      const attempted = CELL_PARTS.find((p) => p.id === incomingPartId);
      setFeedbackMsg({
        text: `Not quite! 💡 This spot is for ${expected?.name} (${expected?.nickname}). You picked ${attempted?.name}. Try again!`,
        type: 'hint',
      });
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (partId: string) => {
    soundManager.playPop();
    setDraggedPartId(partId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnHotspot = (targetPartId: string) => {
    if (!draggedPartId) return;
    tryPlacePart(targetPartId, draggedPartId);
    setDraggedPartId(null);
  };

  // Click-to-place Handler (Tablet friendly)
  const handleBadgeClick = (partId: string) => {
    soundManager.playPop();
    if (selectedBadge === partId) {
      setSelectedBadge(null);
    } else {
      setSelectedBadge(partId);
      const part = CELL_PARTS.find((p) => p.id === partId);
      setFeedbackMsg({
        text: `Selected: ${part?.name}. Now tap the matching circle on the diagram!`,
        type: 'neutral',
      });
    }
  };

  const handleHotspotClick = (targetPartId: string) => {
    if (placedParts[targetPartId]) {
      // Already placed, pronounce
      const part = CELL_PARTS.find((p) => p.id === targetPartId);
      if (part) soundManager.speak(`${part.name}. ${part.consistentPhrasing}`);
      return;
    }
    if (selectedBadge) {
      tryPlacePart(targetPartId, selectedBadge);
    } else {
      const part = CELL_PARTS.find((p) => p.id === targetPartId);
      setFeedbackMsg({
        text: `Hint: Find "${part?.name}" (${part?.nickname}) from the word bank below!`,
        type: 'hint',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 1. Header with Mode Selector and Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-700 mb-1">
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span>Interactive Drag & Drop Practice</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Label the Cell Diagram
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Drag the labels onto the correct target spots on the cell, or tap a label then tap the target!
          </p>
        </div>

        {/* Toggle between Plant & Animal Diagrams */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-100/70 rounded-2xl border border-amber-200 self-start sm:self-auto">
          <button
            onClick={() => handleSwitchType('plant')}
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
            onClick={() => handleSwitchType('animal')}
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

      {/* 2. Feedback & Progress Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 ${
              feedbackMsg.type === 'success'
                ? 'bg-emerald-100 text-emerald-700'
                : feedbackMsg.type === 'hint'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-sky-100 text-sky-700'
            }`}
          >
            {feedbackMsg.type === 'success' ? '✅' : feedbackMsg.type === 'hint' ? '💡' : '🎯'}
          </div>
          <p
            className={`text-xs sm:text-sm font-medium ${
              feedbackMsg.type === 'success'
                ? 'text-emerald-900'
                : feedbackMsg.type === 'hint'
                ? 'text-amber-900'
                : 'text-slate-700'
            }`}
          >
            {feedbackMsg.text}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Progress
            </span>
            <span className="font-heading text-base font-bold text-emerald-600">
              {placedCount} / {totalHotspots} Placed
            </span>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            title="Reset Diagram"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Interactive Diagram Stage with Hotspots */}
      <div className="relative bg-white rounded-3xl border-2 border-amber-200/80 p-4 sm:p-8 shadow-xs overflow-hidden">
        {/* SVG Cartoon in Background */}
        <div className="max-w-[540px] mx-auto relative">
          {cellType === 'plant' ? (
            <PlantCellSvg selectedPartId={null} onSelectPart={() => {}} isQuizOrDropMode={true} />
          ) : (
            <AnimalCellSvg selectedPartId={null} onSelectPart={() => {}} isQuizOrDropMode={true} />
          )}

          {/* Hotspot Target Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {hotspots.map((spot) => {
              const isPlaced = placedParts[spot.partId];
              const part = CELL_PARTS.find((p) => p.id === spot.partId);

              return (
                <div key={spot.partId}>
                  {/* Pointer Line */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    <line
                      x1={`${spot.labelPosition.x}%`}
                      y1={`${spot.labelPosition.y}%`}
                      x2={`${spot.pointerPosition.x}%`}
                      y2={`${spot.pointerPosition.y}%`}
                      stroke={isPlaced ? '#10b981' : '#94a3b8'}
                      strokeWidth="2.5"
                      strokeDasharray={isPlaced ? 'none' : '4 3'}
                    />
                    <circle
                      cx={`${spot.pointerPosition.x}%`}
                      cy={`${spot.pointerPosition.y}%`}
                      r="4.5"
                      fill={isPlaced ? '#10b981' : '#64748b'}
                    />
                  </svg>

                  {/* Drop Socket / Target Label Button */}
                  <div
                    style={{
                      left: `${spot.labelPosition.x}%`,
                      top: `${spot.labelPosition.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropOnHotspot(spot.partId)}
                    onClick={() => handleHotspotClick(spot.partId)}
                    className={`absolute pointer-events-auto transition-all cursor-pointer ${
                      isPlaced
                        ? 'bg-emerald-600 text-white shadow-md scale-102 ring-2 ring-emerald-300'
                        : selectedBadge
                        ? 'bg-amber-100 hover:bg-amber-200 border-2 border-dashed border-amber-500 text-amber-900 animate-pulse'
                        : 'bg-white hover:bg-sky-50 border-2 border-dashed border-slate-400 text-slate-600'
                    } px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs`}
                  >
                    {isPlaced ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        <span>{spot.name}</span>
                        <span className="hidden sm:inline text-[10px] text-emerald-200">
                          ({part?.nickname})
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" />
                        <span>{selectedBadge ? `Drop ${selectedBadge ? 'here' : ''}` : 'Target Spot'}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Banner when 100% finished */}
        {isComplete && (
          <div className="mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 text-center shadow-lg space-y-3">
            <h3 className="font-heading text-2xl font-bold">
              🎉 Cell Master Achievement Unlocked!
            </h3>
            <p className="text-sm text-emerald-100 max-w-lg mx-auto">
              You correctly identified and placed all parts of the {cellType === 'plant' ? 'Plant' : 'Animal'} Cell! This achievement has been added to your Parent Progress Dashboard.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => handleSwitchType(cellType === 'plant' ? 'animal' : 'plant')}
                className="px-5 py-2.5 bg-white text-emerald-800 rounded-xl text-xs font-bold shadow-md hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                Now Label the {cellType === 'plant' ? 'Animal' : 'Plant'} Cell →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4. Word Bank of Labels to Drag / Tap */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-800 flex items-center gap-2">
              <span>Word Bank</span>
              <span className="text-xs font-normal text-slate-500">
                (Tap to select or drag onto the diagram)
              </span>
            </h3>
          </div>
          {selectedBadge && (
            <button
              onClick={() => setSelectedBadge(null)}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold cursor-pointer"
            >
              Cancel Selection
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2.5">
          {hotspots.map((spot) => {
            const isPlaced = placedParts[spot.partId];
            const isSelected = selectedBadge === spot.partId;
            const part = CELL_PARTS.find((p) => p.id === spot.partId);

            if (isPlaced) {
              return (
                <div
                  key={spot.partId}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 line-through border border-slate-200 flex items-center gap-1.5 opacity-60"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{spot.name}</span>
                </div>
              );
            }

            return (
              <button
                key={spot.partId}
                draggable
                onDragStart={() => handleDragStart(spot.partId)}
                onClick={() => handleBadgeClick(spot.partId)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border-2 transition-all cursor-grab active:cursor-grabbing flex items-center gap-2 ${
                  isSelected
                    ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-200 scale-105'
                    : 'bg-white hover:bg-amber-50 text-slate-800 border-amber-200 hover:border-amber-400 shadow-xs'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: part?.svgColor || '#cbd5e1' }}
                />
                <span>{spot.name}</span>
                <span className="text-[11px] text-amber-700 font-normal">
                  ({part?.nickname})
                </span>
                {part?.isPlantOnly && (
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                    plant only
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

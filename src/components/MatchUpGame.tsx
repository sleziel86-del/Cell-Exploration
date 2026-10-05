import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CELL_PARTS, CellPart } from '../data/cellData';
import { soundManager } from '../utils/audio';
import { recordMatchUpWin } from '../utils/progressStore';
import { Puzzle, CheckCircle2, RotateCcw, Clock, Trophy, Sparkles, ArrowRight } from 'lucide-react';

interface MatchItem {
  id: string;
  name: string;
  nickname: string;
  functionText: string;
  isPlantOnly: boolean;
}

export const MatchUpGame: React.FC = () => {
  // Current game mode: 'part_to_nickname' or 'nickname_to_function' or 'trio'
  const [stage, setStage] = useState<'part_to_nickname' | 'nickname_to_function'>('part_to_nickname');
  
  // Selected items in left and right column
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  // Successfully matched IDs
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [shuffledLeft, setShuffledLeft] = useState<CellPart[]>([]);
  const [shuffledRight, setShuffledRight] = useState<CellPart[]>([]);
  
  // Drag and drop state
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [gameWon, setGameWon] = useState<boolean>(false);

  // Shuffler
  const startNewGame = (currentStage = stage) => {
    soundManager.playPop();
    const parts = [...CELL_PARTS];
    // Shuffle arrays
    const left = [...parts].sort(() => Math.random() - 0.5);
    const right = [...parts].sort(() => Math.random() - 0.5);

    setShuffledLeft(left);
    setShuffledRight(right);
    setMatchedIds([]);
    setSelectedLeft(null);
    setSelectedRight(null);
    setGameWon(false);
    setTimerSeconds(0);
    setTimerActive(true);
  };

  useEffect(() => {
    startNewGame(stage);
  }, [stage]);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerActive && !gameWon) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, gameWon]);

  // Check matching logic
  const handleAttemptMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      // MATCH SUCCESS!
      soundManager.playCorrect();
      const updated = [...matchedIds, leftId];
      setMatchedIds(updated);
      setSelectedLeft(null);
      setSelectedRight(null);

      // Check win condition
      if (updated.length === CELL_PARTS.length) {
        soundManager.playFanfare();
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        setGameWon(true);
        setTimerActive(false);
        recordMatchUpWin(timerSeconds);
      }
    } else {
      // MISMATCH
      soundManager.playWrong();
      setSelectedLeft(null);
      setSelectedRight(null);
    }
  };

  // Drag & drop handlers
  const handleDragStart = (id: string) => {
    soundManager.playPop();
    setDraggedId(id);
  };

  const handleDropOnTarget = (targetId: string) => {
    if (!draggedId) return;
    handleAttemptMatch(draggedId, targetId);
    setDraggedId(null);
  };

  // Click-to-match handlers
  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundManager.playPop();
    setSelectedLeft(id);
    if (selectedRight) {
      handleAttemptMatch(id, selectedRight);
    }
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    soundManager.playPop();
    setSelectedRight(id);
    if (selectedLeft) {
      handleAttemptMatch(selectedLeft, id);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 1. Header & Stage Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Interactive Memory Challenge</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Cell Match-Up Game 🎯
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Drag items to match, or tap one card on each side to pair them up!
          </p>
        </div>

        {/* Stage Toggle */}
        <div className="flex items-center gap-2 p-1.5 bg-amber-100/70 rounded-2xl border border-amber-200 self-start sm:self-auto">
          <button
            onClick={() => {
              setStage('part_to_nickname');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              stage === 'part_to_nickname'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Level 1: Part ➔ Nickname
          </button>
          <button
            onClick={() => {
              setStage('nickname_to_function');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              stage === 'nickname_to_function'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-700 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            Level 2: Nickname ➔ Function
          </button>
        </div>
      </div>

      {/* 2. Game Stats Bar */}
      <div className="flex items-center justify-between bg-white px-5 py-3.5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Time: <span className="font-mono tabular-nums text-slate-900 font-bold">{formatTime(timerSeconds)}</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-emerald-600" />
            <span>Pairs Matched: <span className="font-bold text-emerald-600">{matchedIds.length} / {CELL_PARTS.length}</span></span>
          </div>
        </div>

        <button
          onClick={() => startNewGame(stage)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Restart</span>
        </button>
      </div>

      {/* 3. Victory Screen */}
      {gameWon && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 text-white rounded-3xl p-6 sm:p-8 text-center shadow-lg space-y-4 animate-bounce-subtle">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner">
            🎉
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Match-Up Master!
          </h2>
          <p className="text-sm sm:text-base text-emerald-50 max-w-md mx-auto">
            You matched all 8 cell parts in just{' '}
            <strong className="text-amber-200 font-bold">{formatTime(timerSeconds)}</strong>! Outstanding memory, Scientist!
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {stage === 'part_to_nickname' ? (
              <button
                onClick={() => setStage('nickname_to_function')}
                className="px-5 py-2.5 bg-white text-emerald-800 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-50 transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Play Level 2: Nickname ➔ Function</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => startNewGame('part_to_nickname')}
                className="px-5 py-2.5 bg-white text-emerald-800 rounded-xl text-xs sm:text-sm font-bold shadow-md hover:bg-emerald-50 transition-colors cursor-pointer"
              >
                Play Again from Level 1
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Match-Up Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-heading font-bold text-slate-800 text-base">
              {stage === 'part_to_nickname' ? '1. Cell Parts' : '1. Famous Nicknames'}
            </h3>
            <span className="text-xs text-slate-500">
              {stage === 'part_to_nickname'
                ? 'Drag or tap a cell organelle'
                : 'Drag or tap a cell nickname'}
            </span>
          </div>

          <div className="space-y-2.5">
            {shuffledLeft.map((part) => {
              const isMatched = matchedIds.includes(part.id);
              const isSelected = selectedLeft === part.id;

              return (
                <div
                  key={part.id}
                  draggable={!isMatched}
                  onDragStart={() => handleDragStart(part.id)}
                  onClick={() => handleLeftClick(part.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all select-none cursor-pointer flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-75'
                      : isSelected
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102 ring-4 ring-purple-200'
                      : 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-purple-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: part.svgColor }}
                    />
                    <div>
                      <span className="font-heading font-bold text-sm block">
                        {stage === 'part_to_nickname' ? part.name : `"${part.nickname}"`}
                      </span>
                      {part.isPlantOnly && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          (plant only)
                        </span>
                      )}
                    </div>
                  </div>

                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-5 shadow-xs space-y-3">
          <div className="border-b border-slate-100 pb-2">
            <h3 className="font-heading font-bold text-slate-800 text-base">
              {stage === 'part_to_nickname' ? '2. Famous Nicknames' : '2. Organelle Functions'}
            </h3>
            <span className="text-xs text-slate-500">
              {stage === 'part_to_nickname'
                ? 'Drop or tap the matching nickname'
                : 'Drop or tap the matching job / function'}
            </span>
          </div>

          <div className="space-y-2.5">
            {shuffledRight.map((part) => {
              const isMatched = matchedIds.includes(part.id);
              const isSelected = selectedRight === part.id;

              return (
                <div
                  key={part.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDropOnTarget(part.id)}
                  onClick={() => handleRightClick(part.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all select-none cursor-pointer flex items-center justify-between ${
                    isMatched
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-75'
                      : isSelected
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-102 ring-4 ring-purple-200'
                      : 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-purple-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base shrink-0">
                      {stage === 'part_to_nickname' ? '🏷️' : '⚙️'}
                    </span>
                    <div>
                      {stage === 'part_to_nickname' ? (
                        <span className="font-heading font-bold text-sm block">
                          "{part.nickname}"
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-700 block leading-snug">
                          {part.functionText}
                        </span>
                      )}
                    </div>
                  </div>

                  {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

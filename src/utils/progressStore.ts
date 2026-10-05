export interface QuizAttempt {
  id: string;
  timestamp: number;
  dateStr: string;
  score: number;
  totalQuestions: number;
  wrongPartIds: string[];
}

export interface StudentProgress {
  studentName: string;
  quizzesTaken: number;
  bestQuizScore: number;
  lastQuizScore: number;
  matchUpWins: number;
  bestMatchUpTimeSeconds: number | null;
  plantDiagramCompleted: boolean;
  animalDiagramCompleted: boolean;
  attempts: QuizAttempt[];
  partsNeedPractice: Record<string, number>; // partId -> mistake count
  partsMastered: string[]; // partIds that have been answered right
}

const STORAGE_KEY = 'cell_explorers_p5_progress';

const defaultProgress: StudentProgress = {
  studentName: 'Young Scientist',
  quizzesTaken: 0,
  bestQuizScore: 0,
  lastQuizScore: 0,
  matchUpWins: 0,
  bestMatchUpTimeSeconds: null,
  plantDiagramCompleted: false,
  animalDiagramCompleted: false,
  attempts: [],
  partsNeedPractice: {},
  partsMastered: [],
};

export function loadProgress(): StudentProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    return { ...defaultProgress, ...JSON.parse(raw) };
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: StudentProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // ignore
  }
}

export function recordQuizResult(score: number, total: number, wrongPartIds: string[], allQuestionPartIds: string[]): StudentProgress {
  const current = loadProgress();
  const attempt: QuizAttempt = {
    id: 'quiz_' + Date.now(),
    timestamp: Date.now(),
    dateStr: new Date().toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    score,
    totalQuestions: total,
    wrongPartIds,
  };

  const updatedMistakes = { ...current.partsNeedPractice };
  wrongPartIds.forEach((pid) => {
    updatedMistakes[pid] = (updatedMistakes[pid] || 0) + 1;
  });

  const correctPartIds = allQuestionPartIds.filter((pid) => !wrongPartIds.includes(pid));
  const updatedMastered = Array.from(new Set([...current.partsMastered, ...correctPartIds]));

  const updated: StudentProgress = {
    ...current,
    quizzesTaken: current.quizzesTaken + 1,
    bestQuizScore: Math.max(current.bestQuizScore, score),
    lastQuizScore: score,
    attempts: [attempt, ...current.attempts].slice(0, 15), // keep last 15
    partsNeedPractice: updatedMistakes,
    partsMastered: updatedMastered,
  };

  saveProgress(updated);
  return updated;
}

export function recordMatchUpWin(timeSeconds: number): StudentProgress {
  const current = loadProgress();
  const updated: StudentProgress = {
    ...current,
    matchUpWins: current.matchUpWins + 1,
    bestMatchUpTimeSeconds: current.bestMatchUpTimeSeconds
      ? Math.min(current.bestMatchUpTimeSeconds, timeSeconds)
      : timeSeconds,
  };
  saveProgress(updated);
  return updated;
}

export function recordDiagramCompletion(type: 'plant' | 'animal'): StudentProgress {
  const current = loadProgress();
  const updated: StudentProgress = {
    ...current,
    plantDiagramCompleted: type === 'plant' ? true : current.plantDiagramCompleted,
    animalDiagramCompleted: type === 'animal' ? true : current.animalDiagramCompleted,
  };
  saveProgress(updated);
  return updated;
}

export function updateStudentName(name: string): StudentProgress {
  const current = loadProgress();
  const updated = { ...current, studentName: name.trim() || 'Young Scientist' };
  saveProgress(updated);
  return updated;
}

export function resetProgress(): StudentProgress {
  saveProgress(defaultProgress);
  return defaultProgress;
}

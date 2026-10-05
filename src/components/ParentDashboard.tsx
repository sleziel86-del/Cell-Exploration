import React, { useState, useEffect } from 'react';
import {
  StudentProgress,
  loadProgress,
  updateStudentName,
  resetProgress,
  QuizAttempt,
} from '../utils/progressStore';
import { CELL_PARTS } from '../data/cellData';
import { soundManager } from '../utils/audio';
import {
  Award,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Printer,
  Sparkles,
  Trophy,
  Clock,
  UserCheck,
  Edit2,
  BookOpen,
} from 'lucide-react';

interface ParentDashboardProps {
  onStartQuiz: () => void;
  onStartDiagram: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  onStartQuiz,
  onStartDiagram,
}) => {
  const [progress, setProgress] = useState<StudentProgress>(loadProgress());
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(progress.studentName);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playPop();
    const updated = updateStudentName(tempName);
    setProgress(updated);
    setIsEditingName(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all quiz scores and progress?')) {
      soundManager.playPop();
      const updated = resetProgress();
      setProgress(updated);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate learning recommendations based on mistakes
  const partsNeedingReview = Object.entries(progress.partsNeedPractice)
    .sort((a, b) => b[1] - a[1])
    .map(([pid]) => CELL_PARTS.find((p) => p.id === pid))
    .filter(Boolean);

  const masteredParts = CELL_PARTS.filter((p) =>
    progress.partsMastered.includes(p.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* 1. Header with Student Profile */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-emerald-500 flex items-center justify-center text-3xl text-white shadow-sm shrink-0">
            👨‍🔬
          </div>
          <div>
            <div className="flex items-center gap-2">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="border-2 border-amber-400 rounded-xl px-3 py-1 text-lg font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Enter student name"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 cursor-pointer"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <>
                  <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {progress.studentName}
                  </h1>
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setIsEditingName(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer"
                    title="Edit Student Name"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Primary 5 Science · Plant & Animal Cells Mastery Dashboard
            </p>
          </div>
        </div>

        {/* Certificate Button & Reset */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => {
              soundManager.playPop();
              setShowCertificate(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
          >
            <Award className="w-4 h-4" />
            <span>Generate Certificate</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Reset All Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Best Quiz Score */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Best Quiz Score</span>
            <Trophy className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading text-3xl font-extrabold text-emerald-700">
            {progress.bestQuizScore} / 8
          </div>
          <span className="text-xs text-slate-500 block">
            {progress.quizzesTaken} total {progress.quizzesTaken === 1 ? 'attempt' : 'attempts'} completed
          </span>
        </div>

        {/* Metric 2: Plant Diagram Badge */}
        <div className="bg-white rounded-2xl border-2 border-sky-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Plant Cell Diagram</span>
            <span>🌱</span>
          </div>
          <div className="font-heading text-xl font-bold flex items-center gap-2 text-slate-900 pt-1">
            {progress.plantDiagramCompleted ? (
              <span className="text-emerald-600 flex items-center gap-1.5 text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Fully Labeled!</span>
              </span>
            ) : (
              <span className="text-slate-400 text-sm font-medium">Incomplete</span>
            )}
          </div>
          <span className="text-xs text-slate-500 block">
            {progress.plantDiagramCompleted ? 'All 7 organelles placed' : 'Not yet completed'}
          </span>
        </div>

        {/* Metric 3: Animal Diagram Badge */}
        <div className="bg-white rounded-2xl border-2 border-amber-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Animal Cell Diagram</span>
            <span>🐾</span>
          </div>
          <div className="font-heading text-xl font-bold flex items-center gap-2 text-slate-900 pt-1">
            {progress.animalDiagramCompleted ? (
              <span className="text-emerald-600 flex items-center gap-1.5 text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Fully Labeled!</span>
              </span>
            ) : (
              <span className="text-slate-400 text-sm font-medium">Incomplete</span>
            )}
          </div>
          <span className="text-xs text-slate-500 block">
            {progress.animalDiagramCompleted ? 'All 6 organelles placed' : 'Not yet completed'}
          </span>
        </div>

        {/* Metric 4: Match-Up Wins */}
        <div className="bg-white rounded-2xl border-2 border-purple-200 p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Match-Up Games</span>
            <Clock className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-heading text-3xl font-extrabold text-purple-700">
            {progress.matchUpWins} Wins
          </div>
          <span className="text-xs text-slate-500 block">
            {progress.bestMatchUpTimeSeconds
              ? `Best speed: ${progress.bestMatchUpTimeSeconds}s`
              : 'No games finished yet'}
          </span>
        </div>
      </div>

      {/* 3. Strengths & Targeted Review Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mastered Parts */}
        <div className="bg-white rounded-3xl border-2 border-emerald-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
              ✓
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Mastered Cell Concepts
              </h3>
              <p className="text-xs text-slate-500">
                Concepts answered accurately in quiz sessions
              </p>
            </div>
          </div>

          {masteredParts.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {masteredParts.map((part) => (
                <div
                  key={part.id}
                  className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2 text-xs font-semibold text-emerald-950 flex items-center gap-2"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: part.svgColor }}
                  />
                  <span>{part.name}</span>
                  <span className="text-emerald-700 font-normal">({part.nickname})</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic bg-slate-50 p-4 rounded-xl">
              Complete a quiz session to display verified mastered cell parts here!
            </p>
          )}
        </div>

        {/* Areas Needing Practice */}
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
              💡
            </div>
            <div>
              <h3 className="font-heading font-bold text-slate-900 text-base">
                Recommended Focus Areas
              </h3>
              <p className="text-xs text-slate-500">
                Organelles where hints or retries were needed
              </p>
            </div>
          </div>

          {partsNeedingReview.length > 0 ? (
            <div className="space-y-2">
              {partsNeedingReview.slice(0, 3).map((part) => (
                <div
                  key={part!.id}
                  className="bg-amber-50/70 border border-amber-200 rounded-xl p-3 text-xs flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-amber-950 block">
                      {part!.name} — "{part!.nickname}"
                    </span>
                    <span className="text-slate-600 block text-[11px]">
                      {part!.consistentPhrasing}
                    </span>
                  </div>
                  {part!.isPlantOnly && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded shrink-0">
                      plant only
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
              No weak areas detected! All questions answered with high accuracy.
            </p>
          )}
        </div>
      </div>

      {/* 4. Quiz History Log */}
      <div className="bg-white rounded-3xl border-2 border-amber-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-slate-900 text-base">
            Recent Quiz Attempts
          </h3>
          <button
            onClick={onStartQuiz}
            className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            Take New Quiz
          </button>
        </div>

        {progress.attempts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-4">Date & Time</th>
                  <th className="py-2.5 px-4">Score</th>
                  <th className="py-2.5 px-4">Percentage</th>
                  <th className="py-2.5 px-4">Review Needed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {progress.attempts.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-amber-50/30">
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {attempt.dateStr}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {attempt.score} / {attempt.totalQuestions}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`font-semibold px-2 py-0.5 rounded-full ${
                          attempt.score >= 7
                            ? 'bg-emerald-100 text-emerald-800'
                            : attempt.score >= 5
                            ? 'bg-sky-100 text-sky-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {Math.round((attempt.score / attempt.totalQuestions) * 100)}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {attempt.wrongPartIds.length > 0
                        ? attempt.wrongPartIds
                            .map((pid) => CELL_PARTS.find((p) => p.id === pid)?.name)
                            .filter(Boolean)
                            .join(', ')
                        : 'None (Perfect!)'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
            No quiz attempts yet. Start the 8-question quiz to log results!
          </div>
        )}
      </div>

      {/* 5. Printable Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-10 border-4 border-amber-300 shadow-2xl relative space-y-6 print:border-none print:shadow-none print:p-0">
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b pb-4 print:hidden">
              <span className="text-xs font-bold uppercase text-amber-700">
                Primary 5 Science Certificate Preview
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Official Certificate Visual */}
            <div className="border-8 border-double border-amber-400 p-8 rounded-2xl text-center space-y-5 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 shadow-inner">
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-amber-300 shadow-md">
                <img
                  src="/src/assets/images/cell_scientist_badge_1791199234268.jpg"
                  alt="Scientist Badge"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-emerald-700 block">
                  Certificate of Achievement
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Primary 5 Cell Biology Expert
                </h2>
              </div>

              <p className="text-xs text-slate-600">This official award certifies that</p>

              <div className="font-heading text-3xl sm:text-4xl font-bold text-amber-700 border-b-2 border-amber-300 pb-2 inline-block px-8">
                {progress.studentName}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto leading-relaxed">
                has successfully explored plant and animal cell anatomy, mastered organelle nicknames and functions, and achieved a top score of{' '}
                <strong className="text-emerald-700">{progress.bestQuizScore}/8</strong> on the Primary 5 Cell Mastery Challenge.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-6 border-t border-amber-200 text-left text-xs text-slate-600">
                <div>
                  <span className="block text-[11px] text-slate-400">Awarded on</span>
                  <span className="font-semibold text-slate-800">
                    {new Date().toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="text-right">
                  <div className="w-32 border-b border-slate-400 ml-auto mb-1"></div>
                  <span className="text-[11px] text-slate-500">Teacher / Parent Signature</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

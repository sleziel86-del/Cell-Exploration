import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QuizQuestion, CELL_PARTS } from '../data/cellData';
import { soundManager } from '../utils/audio';
import { recordQuizResult } from '../utils/progressStore';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, Lightbulb, Sparkles } from 'lucide-react';

interface QuizChallengeProps {
  onGoToDashboard: () => void;
}

export const QuizChallenge: React.FC<QuizChallengeProps> = ({ onGoToDashboard }) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [wrongPartIds, setWrongPartIds] = useState<string[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectChoice = (choice: string) => {
    if (hasSubmitted && isCorrect) return; // already locked
    soundManager.playPop();
    setSelectedAnswer(choice);
    setShowHint(false);

    const correct = choice === currentQ.correctAnswer;
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      soundManager.playCorrect();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playWrong();
      if (!wrongPartIds.includes(currentQ.partId)) {
        setWrongPartIds((prev) => [...prev, currentQ.partId]);
      }
    }
  };

  const handleNextQuestion = () => {
    soundManager.playPop();
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
      setIsCorrect(false);
      setShowHint(false);
    } else {
      // Quiz complete!
      const finalScore = isCorrect ? score : score; // already incremented
      setIsQuizComplete(true);
      if (finalScore >= 6) {
        soundManager.playFanfare();
        confetti({ particleCount: 110, spread: 75, origin: { y: 0.6 } });
      } else {
        soundManager.playCorrect();
      }

      // Record in parent store
      const allPids = QUIZ_QUESTIONS.map((q) => q.partId);
      recordQuizResult(finalScore, totalQuestions, wrongPartIds, allPids);
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playPop();
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setWrongPartIds([]);
    setIsQuizComplete(false);
    setShowHint(false);
  };

  const getScoreMessage = (finalScore: number) => {
    if (finalScore === 8) {
      return {
        title: '8/8 — You’re a Cell Master! 🏆',
        desc: 'Sensational score! You know all plant and animal cell parts, nicknames, and functions by heart!',
        color: 'from-amber-400 to-amber-600',
      };
    }
    if (finalScore >= 7) {
      return {
        title: `${finalScore}/8 — You’re a Cell Expert! 🎉`,
        desc: 'Awesome job! You have mastered the Primary 5 cell curriculum!',
        color: 'from-emerald-500 to-teal-600',
      };
    }
    if (finalScore >= 5) {
      return {
        title: `${finalScore}/8 — Great Effort, Scientist! 🌟`,
        desc: 'Well done! A quick revision of the nicknames and you will get a perfect score next time!',
        color: 'from-sky-500 to-blue-600',
      };
    }
    return {
      title: `${finalScore}/8 — Keep Practicing, Young Scientist! 💡`,
      desc: 'Use the Learn Mode diagrams and Match-Up Game to review the organelle nicknames, then try again!',
      color: 'from-purple-500 to-indigo-600',
    };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* 1. Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border-2 border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">
            <Sparkles className="w-4 h-4 text-rose-500" />
            <span>Primary 5 Revision Challenge</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
            Cell Quiz Challenge 🏆
          </h1>
        </div>

        {!isQuizComplete && (
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Question
            </span>
            <span className="font-heading text-lg font-bold text-rose-600">
              {currentIdx + 1} of {totalQuestions}
            </span>
          </div>
        )}
      </div>

      {/* 2. Progress Tracker Bar */}
      {!isQuizComplete && (
        <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-rose-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      )}

      {/* 3. Main Question Card or Final Score Card */}
      {!isQuizComplete ? (
        <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <div className="inline-block bg-rose-50 text-rose-700 text-xs font-bold px-3 py-1 rounded-full border border-rose-200">
              Question #{currentIdx + 1}
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
          </div>

          {/* Multiple Choice Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.choices.map((choice) => {
              const isSelected = selectedAnswer === choice;
              const isChoiceCorrect = choice === currentQ.correctAnswer;

              let btnStyles =
                'bg-white hover:bg-rose-50/50 border-2 border-slate-200 hover:border-rose-300 text-slate-800';

              if (hasSubmitted) {
                if (isChoiceCorrect) {
                  btnStyles = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200 font-bold';
                } else if (isSelected && !isChoiceCorrect) {
                  btnStyles = 'bg-rose-50 border-2 border-rose-400 text-rose-950 opacity-90';
                } else {
                  btnStyles = 'bg-slate-50 border border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={choice}
                  onClick={() => handleSelectChoice(choice)}
                  disabled={hasSubmitted && isCorrect}
                  className={`p-4 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between text-sm sm:text-base font-semibold shadow-xs ${btnStyles}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                      {choice[0]}
                    </span>
                    <span>{choice}</span>
                  </div>

                  {hasSubmitted && isChoiceCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {hasSubmitted && isSelected && !isChoiceCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Feedback Message (Prompt Requirement: "Great job! ✅" or "Try again — it’s the powerhouse! 💡") */}
          {hasSubmitted && (
            <div
              className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{isCorrect ? '✅' : '💡'}</span>
                <div>
                  <h4 className="font-heading font-bold text-base">
                    {isCorrect ? 'Great job! ✅' : `Try again — ${currentQ.hint} 💡`}
                  </h4>
                  <p className="text-xs sm:text-sm mt-0.5 opacity-90">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                {!isCorrect && (
                  <button
                    onClick={() => {
                      soundManager.playPop();
                      setHasSubmitted(false);
                      setSelectedAnswer(null);
                    }}
                    className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Retry Choice
                  </button>
                )}
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <span>{currentIdx + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Final Score Card */
        <div className="bg-white rounded-3xl border-2 border-rose-200 p-6 sm:p-10 shadow-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-4xl shadow-md text-white">
            🏆
          </div>

          <div className="space-y-2">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900">
              {getScoreMessage(score).title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              {getScoreMessage(score).desc}
            </p>
          </div>

          {/* Quick Score Metrics */}
          <div className="max-w-md mx-auto grid grid-cols-2 gap-3 text-left">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Correct Answers
              </span>
              <span className="font-heading text-2xl font-bold text-emerald-800">
                {score} / {totalQuestions}
              </span>
            </div>
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                Accuracy Rate
              </span>
              <span className="font-heading text-2xl font-bold text-amber-800">
                {Math.round((score / totalQuestions) * 100)}%
              </span>
            </div>
          </div>

          {/* Buttons to restart or view parent dashboard */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Quiz Again</span>
            </button>
            <button
              onClick={onGoToDashboard}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>View Parent Progress Report</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

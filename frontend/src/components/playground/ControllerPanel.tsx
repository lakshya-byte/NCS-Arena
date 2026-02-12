import { Button } from "@/components/ui/button";
import {
  RotateCcw,
  Zap,
  ArrowRight,
  ArrowLeft,
  Timer,
  FileQuestion,
} from "lucide-react";

interface ControllerPanelProps {
  timerLabel: string;
  onReset: () => void;
  onSubmit: () => void;
  onNext: () => void;
  onBack: () => void;
  onViewQuestion: () => void;
  submitting?: boolean;
  submitDisabled?: boolean;
  isAccepted?: boolean;
  isLastLevel?: boolean;
  isFirstLevel?: boolean;
}

export const ControllerPanel = ({
  timerLabel,
  onReset,
  onSubmit,
  onNext,
  onBack,
  onViewQuestion,
  submitting = false,
  submitDisabled = false,
  isAccepted = false,
  isLastLevel = false,
  isFirstLevel = false,
}: ControllerPanelProps) => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Timer */}
      <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/50 rounded-full px-4 py-1.5">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-sm opacity-20 animate-pulse"></div>
          <Timer size={13} className="text-indigo-400 relative z-10" />
        </div>
        <span className="font-mono text-sm font-medium text-slate-200 tracking-wider tabular-nums">
          {timerLabel}
        </span>
      </div>

      <div className="h-4 w-px bg-slate-800"></div>

      {/* View Question */}
      <button
        onClick={onViewQuestion}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 transition-all"
        title="View Question"
      >
        <FileQuestion size={12} />
        Question
      </button>

      {/* Reset */}
      <button
        onClick={onReset}
        className="group p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-all duration-300"
        title="Reset Code"
      >
        <RotateCcw
          size={13}
          className="group-hover:-rotate-180 transition-transform duration-500"
        />
      </button>

      <div className="h-4 w-px bg-slate-800"></div>

      {/* Back Level */}
      {!isFirstLevel && (
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 border border-slate-700 transition-all duration-200"
        >
          <ArrowLeft size={12} />
          BACK
        </button>
      )}

      {/* Submit */}
      <Button
        onClick={onSubmit}
        disabled={submitting || submitDisabled}
        className="relative overflow-hidden rounded-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)] h-8 px-5 font-medium text-[10px] tracking-widest transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
            <span>DEPLOYING</span>
          </div>
        ) : (
          <span className="flex items-center gap-2">
            <Zap size={12} className="fill-white" />
            SUBMIT
          </span>
        )}
      </Button>

      {/* Next Level — always visible, disabled until accepted */}
      {!isLastLevel && (
        <button
          onClick={onNext}
          disabled={!isAccepted}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
            isAccepted
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 animate-pulse"
              : "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
          }`}
        >
          NEXT
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { Timer, RotateCcw, Play, Zap } from "lucide-react";

interface ControllerPanelProps {
  timerLabel: string;
  onReset: () => void;
  onSubmit: () => void;
  submitting?: boolean;
}

export const ControllerPanel = ({
  timerLabel,
  onReset,
  onSubmit,
  submitting = false,
}: ControllerPanelProps) => {
  return (
    <div className="flex items-center gap-4 bg-slate-900/50 backdrop-blur-lg border border-slate-800/50 rounded-full py-1.5 px-2 pl-6 shadow-2xl shadow-indigo-500/10">
      
      {/* --- Timer Display --- */}
      <div className="flex items-center gap-3 min-w-[100px] select-none">
        <div className="relative">
             <div className="absolute inset-0 bg-indigo-500 blur-sm opacity-20 animate-pulse"></div>
             <Timer size={14} className="text-indigo-400 relative z-10" />
        </div>
        <span className="font-mono text-sm font-medium text-slate-200 tracking-wider">
            {timerLabel}
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-4 w-px bg-slate-800"></div>

      {/* --- Action Buttons --- */}
      <div className="flex gap-2">
        {/* Reset Button (Ghost) */}
        <button 
            onClick={onReset}
            className="group p-2 rounded-full hover:bg-slate-800 text-slate-500 hover:text-white transition-all duration-300"
            title="Reset Code"
        >
            <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
        </button>

        {/* Run / Submit Button (Hero) */}
        <Button
          onClick={onSubmit}
          disabled={submitting}
          className="relative overflow-hidden rounded-full bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)] h-8 px-5 font-medium text-[10px] tracking-widest transition-all active:scale-95"
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
          
          {/* Shimmer Effect */}
          {!submitting && (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"></div>
          )}
        </Button>
      </div>
    </div>
  );
};
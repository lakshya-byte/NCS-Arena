import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Lightbulb, Lock } from "lucide-react";

interface QuestionDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  hints: string[];
}

export const QuestionDialog = ({
  open,
  onClose,
  title,
  description,
  hints,
}: QuestionDialogProps) => {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleShowNextHint = () => {
    if (revealedCount < hints.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  const allRevealed = revealedCount >= hints.length;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-[#0B1120] border-slate-700/60 text-slate-200 max-w-lg sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-white">
            {title || "Loading..."}
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-sm leading-relaxed whitespace-pre-line pt-2">
            {description || "Fetching mission details..."}
          </DialogDescription>
        </DialogHeader>

        {/* Hints Section */}
        {hints.length > 0 && (
          <div className="mt-4 border-t border-slate-800/60 pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Intel ({revealedCount}/{hints.length})
              </span>
            </div>

            {/* Revealed hints */}
            {revealedCount > 0 && (
              <div className="space-y-2.5 mb-4">
                {hints.slice(0, revealedCount).map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm font-mono bg-amber-500/5 border border-amber-500/10 rounded-lg px-3 py-2.5 animate-in fade-in slide-in-from-top-1 duration-300"
                  >
                    <Lightbulb
                      size={12}
                      className="mt-0.5 text-amber-500 shrink-0"
                    />
                    <span className="text-amber-200/80">
                      <span className="text-amber-400 font-bold">
                        HINT #{i + 1}:
                      </span>{" "}
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Show Next Hint button */}
            <button
              onClick={handleShowNextHint}
              disabled={allRevealed}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                allRevealed
                  ? "bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-800"
                  : "bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/20"
              }`}
            >
              {allRevealed ? (
                <>
                  <Lock size={12} />
                  No more hints
                </>
              ) : (
                <>
                  <Lightbulb size={12} />
                  Show Next Hint
                </>
              )}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

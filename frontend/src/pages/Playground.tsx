import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileTree } from "@/components/playground/FileTree";
import { Editor } from "@/components/playground/Editor";
import { Preview } from "@/components/playground/Preview";
import { ControllerPanel } from "@/components/playground/ControllerPanel";
import { apiClient } from "../services/http";
import { ENDPOINTS } from "../services/api";
import {
  Lightbulb,
  CheckCircle2,
  XCircle,

  Cpu,
  Timer,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FileType = "html" | "css" | "js";

const HTML_BOILERPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Page Title</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>`;

const Playground = () => {
  // --- STATE & HOOKS ---
  const { contestId, participantId, questionId } = useParams();
  const navigate = useNavigate();

  const [activeFile, setActiveFile] = useState<FileType>("html");
  const [isReady, setIsReady] = useState(false);

  // Question State
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDesc, setQuestionDesc] = useState("");
  const [timerLabel, setTimerLabel] = useState("00:00");
  const [level, setLevel] = useState<number | null>(null);

  // Hint State
  const [hints, setHints] = useState<string[]>([]);
  const [shownHints, setShownHints] = useState<string[]>([]);

  // Submission State
  const [allQuestionIds, setAllQuestionIds] = useState<string[]>([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [submitResult, setSubmitResult] = useState<
    "accepted" | "rejected" | null
  >(null);
  const [submitReason, setSubmitReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Editor Content
  const [html, setHtml] = useState(HTML_BOILERPLATE);
  const [css, setCss] = useState("/* Write your CSS here */");
  const [js, setJs] = useState(
    '// Write your logic here\nconsole.log("System Initialized");',
  );

  // --- EFFECTS ---

  // Boot screen simulation
  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  // Init Level + Timer + Question
  useEffect(() => {
    const initLevel = async () => {
      if (!contestId || !participantId || !questionId) return;

      const derivedLevel = Number(questionId.charAt(1)); // Adjust logic if needed based on ID format
      setLevel(derivedLevel);

      try {
        // Start level timer
        const startRes = await apiClient.post(ENDPOINTS.START_LEVEL, {
          contestId,
          participantId,
          level: derivedLevel,
        });

        const startTime = new Date(startRes.data.attempt.startTime).getTime();

        const interval = setInterval(() => {
          const diff = Date.now() - startTime;
          const sec = Math.floor(diff / 1000);
          const m = String(Math.floor(sec / 60)).padStart(2, "0");
          const s = String(sec % 60).padStart(2, "0");
          setTimerLabel(`${m}:${s}`);
        }, 1000);

        // Fetch question + hints
        const qRes = await apiClient.get(ENDPOINTS.QUESTION(questionId));
        setQuestionTitle(qRes.data.question.title);
        setQuestionDesc(qRes.data.question.problem);
        setHints(qRes.data.question.hints || []);
        setShownHints([]); // Reset hints on new question

        return () => clearInterval(interval);
      } catch (err) {
        console.error("Initialization failed", err);
      }
    };

    initLevel();
  }, [contestId, participantId, questionId]);

  // Load Question Order
  useEffect(() => {
    const fetchOrder = async () => {
      if (!contestId) return;
      try {
        const res = await apiClient.get(ENDPOINTS.CONTESTS);
        const contest = res.data.contests.find((c: any) => c._id === contestId);
        if (contest) {
          const ids = contest.questions.map((q: any) => q.questionId);
          setAllQuestionIds(ids);
        }
      } catch (err) {
        console.error("Fetch order failed", err);
      }
    };
    fetchOrder();
  }, [contestId]);

  // Reset UI state when question changes
  useEffect(() => {
    setIsAccepted(false);
    setSubmitResult(null);
    setSubmitReason(null);
  }, [questionId]);

  // --- HANDLERS ---

  const handleChange = (file: FileType, value?: string) => {
    if (file === "html") setHtml(value || "");
    if (file === "css") setCss(value || "");
    if (file === "js") setJs(value || "");
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const res = await apiClient.post(ENDPOINTS.SUBMIT_CODE, {
        contestId,
        participantId,
        level,
        questionId,
        html,
        css,
        js,
      });

      const result = res.data.result;
      const reason = res.data.reason;

      setSubmitResult(result);
      setSubmitReason(reason);
      setIsAccepted(result === "accepted");
    } catch (err) {
      console.error("Submit failed:", err);
      setSubmitResult("rejected");
      setSubmitReason("Network or Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    const idx = allQuestionIds.indexOf(questionId!);
    const nextId = allQuestionIds[idx + 1];
    if (nextId) {
      navigate(`/play/${contestId}/${participantId}/${nextId}`);
    }
  };

  const handleHint = () => {
    if (shownHints.length >= hints.length) return;
    const nextHint = hints[shownHints.length];
    setShownHints((prev) => [...prev, nextHint]);
  };

  if (!isReady) return <BootLoader />;

  return (
    <div className="h-screen w-full bg-[#020617] text-slate-200 flex flex-col overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* --- LAYER 0: ATMOSPHERE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen opacity-40 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
      </div>

      {/* --- LAYER 1: NAVBAR (Fixed Top) --- */}

      {/* --- LAYER 2: MISSION HUD (Question Header) --- */}
      <div className="flex-none bg-[#0B1120] border-b border-white/5 shadow-2xl z-40 relative">
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
          {/* Question Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                LEVEL {level || "?"}
              </span>
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                {questionTitle || "Loading Mission..."}
              </h1>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              {questionDesc ||
                "Establishing secure connection to problem server..."}
            </p>
          </div>

          {/* Timer & Meta */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 shadow-inner">
              <Timer size={14} className="text-indigo-400 animate-pulse" />
              <span className="font-mono text-base font-bold text-slate-200 tabular-nums">
                {timerLabel}
              </span>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC FEEDBACK STRIPS (Hints & Results) --- */}

        {/* Hints Banner */}
        {shownHints.length > 0 && (
          <div className="bg-amber-950/20 border-t border-amber-500/20 px-6 py-2 flex flex-col gap-1">
            {shownHints.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-xs text-amber-200/90 font-mono"
              >
                <Lightbulb
                  size={12}
                  className="mt-0.5 text-amber-500 shrink-0"
                />
                <span>
                  HINT_0{i + 1}: <span className="text-amber-100/70">{h}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Result Banner (Accepted/Rejected) */}
        {submitResult && (
          <div
            className={cn(
              "px-6 py-3 border-t flex items-center gap-3 animate-in slide-in-from-top-2 duration-300",
              submitResult === "accepted"
                ? "bg-emerald-950/30 border-emerald-500/30"
                : "bg-red-950/30 border-red-500/30",
            )}
          >
            {submitResult === "accepted" ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={18} />
                <span className="font-bold text-sm tracking-wide">
                  SOLUTION VERIFIED. ACCESS GRANTED.
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <XCircle size={18} />
                <span className="font-bold text-sm tracking-wide">
                  COMPILATION REJECTED.
                </span>
              </div>
            )}

            {/* Failure Reason */}
            {submitResult === "rejected" && submitReason && (
              <span className="text-xs text-red-300/80 font-mono border-l border-red-500/30 pl-3 ml-2">
                ERR: {submitReason}
              </span>
            )}
          </div>
        )}
      </div>

      {/* --- LAYER 3: WORKSPACE (Sidebar | Editor | Preview) --- */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* SIDEBAR */}
        <div className="w-64 flex-none bg-[#020617] border-r border-white/5 hidden md:flex flex-col z-20">
          <FileTree activeFile={activeFile} onSelect={setActiveFile} />
        </div>

        {/* MAIN AREA */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120] relative">
          {/* Action Bar (Controller) */}
          <div className="h-12 flex-none border-b border-white/5 bg-[#020617] flex items-center justify-between px-4 z-30">
            {/* Left: Hint Toggle */}
            <button
              onClick={handleHint}
              disabled={shownHints.length >= hints.length}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                shownHints.length >= hints.length
                  ? "text-slate-600 bg-slate-900 cursor-not-allowed"
                  : "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20",
              )}
            >
              <Lightbulb size={12} />
              {shownHints.length >= hints.length
                ? "INTEL DEPLETED"
                : "REQUEST INTEL"}
            </button>

            {/* Right: Controller */}
            <ControllerPanel
              timerLabel={timerLabel}
              onReset={() => {
                setHtml(HTML_BOILERPLATE);
                setCss("/* Write your CSS here */");
                setJs(
                  '// Write your logic here\nconsole.log("System Initialized");',
                );
              }}
              onSubmit={handleSubmit}
              submitting={isSubmitting} // Pass this prop if ControllerPanel accepts it
            />

            {/* Next Button (Only shows if accepted) */}
            {/* You can integrate this into ControllerPanel or keep distinct */}
            {isAccepted && (
              <button
                onClick={handleNext}
                className="ml-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 animate-pulse"
              >
                NEXT LEVEL &rarr;
              </button>
            )}
          </div>

          {/* SPLIT EDITOR/PREVIEW */}
          <div className="flex-1 flex overflow-hidden ">
            {/* Editor Pane (Flexible) */}
            <div className="flex-1 border-r border-white/5 relative flex flex-col min-w-0 bg-[#0B1120]">
              <Editor
                activeFile={activeFile}
                html={html}
                css={css}
                js={js}
                onChange={handleChange}
              />
            </div>

            {/* Preview Pane (Flexible - Hidden on mobile) */}
            <div className="flex-1 bg-slate-100/5 relative hidden lg:flex flex-col p-0.5 overflow-hidden">
              {/* Iframe */}
              <div className="flex-1 relative bg-white">
                <Preview html={html} css={css} js={js} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// --- BOOT LOADER ---
const BootLoader = () => (
  <div className="h-screen w-full bg-[#020617] flex items-center justify-center flex-col gap-6 relative overflow-hidden z-[100]">
    <div className="relative">
      <div className="w-16 h-16 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
      <div className="absolute inset-2 rounded-full border-2 border-indigo-500/20 border-b-indigo-400 animate-spin-reverse"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Cpu size={20} className="text-indigo-500 animate-pulse" />
      </div>
    </div>
    <div className="font-mono text-xs tracking-[0.3em] text-indigo-400 animate-pulse">
      SYSTEM INITIALIZING
    </div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
  </div>
);

export default Playground;

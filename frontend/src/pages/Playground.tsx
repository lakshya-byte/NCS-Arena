import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FileTree } from "@/components/playground/FileTree";
import { Editor } from "@/components/playground/Editor";
import { Preview } from "@/components/playground/Preview";
import { ControllerPanel } from "@/components/playground/ControllerPanel";
import { QuestionDialog } from "@/components/playground/QuestionDialog";
import { apiClient } from "../services/http";
import { ENDPOINTS } from "../services/api";
import { CheckCircle2, XCircle, Cpu } from "lucide-react";
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

const CSS_BOILERPLATE = "/* Write your CSS here */";
const JS_BOILERPLATE =
  '// Write your logic here\nconsole.log("System Initialized");';

const Playground = () => {
  const { contestId, participantId, questionId } = useParams();
  const navigate = useNavigate();

  const [activeFile, setActiveFile] = useState<FileType>("html");
  const [isReady, setIsReady] = useState(false);

  // Question
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDesc, setQuestionDesc] = useState("");
  const [hints, setHints] = useState<string[]>([]);
  const [level, setLevel] = useState<number | null>(null);

  // Question dialog
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);

  // Timer
  const [timerLabel, setTimerLabel] = useState("00:00");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Submissions / contest order
  const [allQuestionIds, setAllQuestionIds] = useState<string[]>([]);
  const [isAccepted, setIsAccepted] = useState(false);
  const [submitResult, setSubmitResult] = useState<
    "accepted" | "rejected" | null
  >(null);
  const [submitReason, setSubmitReason] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Editor content
  const [html, setHtml] = useState(HTML_BOILERPLATE);
  const [css, setCss] = useState(CSS_BOILERPLATE);
  const [js, setJs] = useState(JS_BOILERPLATE);

  // Boot
  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  // Load question order from contest
  useEffect(() => {
    const fetchOrder = async () => {
      if (!contestId) return;
      try {
        const res = await apiClient.get(ENDPOINTS.CONTESTS);
        const contest = res.data.contests.find(
          (c: { _id: string }) => c._id === contestId,
        );
        if (contest) {
          setAllQuestionIds(
            contest.questions.map((q: { questionId: string }) => q.questionId),
          );
        }
      } catch (err) {
        console.error("Fetch order failed:", err);
      }
    };
    fetchOrder();
  }, [contestId]);

  // Init level: timer + question + persistence
  useEffect(() => {
    const initLevel = async () => {
      if (!contestId || !participantId || !questionId) return;

      const derivedLevel = Number(questionId.charAt(1));
      setLevel(derivedLevel);

      // Reset per-level state
      setIsAccepted(false);
      setSubmitResult(null);
      setSubmitReason(null);
      setHints([]);

      try {
        // 1. Start level timer
        const startRes = await apiClient.post(ENDPOINTS.START_LEVEL, {
          contestId,
          participantId,
          level: derivedLevel,
        });

        const startTime = new Date(startRes.data.attempt.startTime).getTime();

        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
          const diff = Date.now() - startTime;
          const sec = Math.floor(diff / 1000);
          const m = String(Math.floor(sec / 60)).padStart(2, "0");
          const s = String(sec % 60).padStart(2, "0");
          setTimerLabel(`${m}:${s}`);
        }, 1000);

        // 2. Fetch question + hints
        const qRes = await apiClient.get(ENDPOINTS.QUESTION(questionId));
        setQuestionTitle(qRes.data.question.title);
        setQuestionDesc(qRes.data.question.problem);
        setHints(qRes.data.question.hints || []);

        // 3. Submission persistence
        try {
          const subRes = await apiClient.get(
            ENDPOINTS.SUBMISSIONS(contestId, participantId),
          );
          const subs = subRes.data.submissions || [];
          const levelSubs = subs.filter(
            (s: { level: number }) => s.level === derivedLevel,
          );
          if (levelSubs.length > 0) {
            const latest = levelSubs[0];
            if (latest.html) setHtml(latest.html);
            if (latest.css) setCss(latest.css);
            if (latest.js) setJs(latest.js);
            if (
              levelSubs.some((s: { result: string }) => s.result === "accepted")
            ) {
              setIsAccepted(true);
              setSubmitResult("accepted");
              // STOP timer — level already completed
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
            }
          } else {
            setHtml(HTML_BOILERPLATE);
            setCss(CSS_BOILERPLATE);
            setJs(JS_BOILERPLATE);
          }
        } catch {
          // endpoint might not exist yet
        }
      } catch (err) {
        console.error("Initialization failed:", err);
      }
    };

    initLevel();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [contestId, participantId, questionId]);

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

      if (result === "accepted") {
        try {
          const saved = localStorage.getItem("contestSession");
          if (saved) {
            const session = JSON.parse(saved);
            session.lastQuestionId = questionId;
            localStorage.setItem("contestSession", JSON.stringify(session));
          }
        } catch {
          /* ignore */
        }
      }
    } catch (err) {
      console.error("Submit failed:", err);
      setSubmitResult("rejected");
      setSubmitReason("Network or Server Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = useCallback(() => {
    if (!questionId || !isAccepted) return;
    const idx = allQuestionIds.indexOf(questionId);
    const nextId = allQuestionIds[idx + 1];
    if (nextId) {
      navigate(`/play/${contestId}/${participantId}/${nextId}`);
    }
  }, [
    questionId,
    isAccepted,
    allQuestionIds,
    contestId,
    participantId,
    navigate,
  ]);

  const handleBack = useCallback(() => {
    if (!questionId) return;
    const idx = allQuestionIds.indexOf(questionId);
    const prevId = allQuestionIds[idx - 1];
    if (prevId) {
      navigate(`/play/${contestId}/${participantId}/${prevId}`);
    }
  }, [questionId, allQuestionIds, contestId, participantId, navigate]);

  const isLastLevel = questionId
    ? allQuestionIds.indexOf(questionId) === allQuestionIds.length - 1
    : false;

  const isFirstLevel = questionId
    ? allQuestionIds.indexOf(questionId) === 0
    : true;

  if (!isReady) return <BootLoader />;

  return (
    <div className="h-screen w-full bg-[#020617] text-slate-200 flex flex-col overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen opacity-30"></div>
      </div>

      {/* ═══ TOP BAR: Level badge + Title + Controller ═══ */}
      <div className="flex-none bg-[#0B1120] border-b border-white/5 shadow-2xl z-40 relative">
        {/* Row 1: Badge + Title */}
        <div className="px-6 pt-3 pb-1 flex items-center gap-3">
          <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
            LEVEL {level || "?"}
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight truncate">
            {questionTitle || "Loading Mission..."}
          </h1>
        </div>

        {/* Row 2: Controller panel (timer, question btn, reset, back, submit, next) */}
        <div className="px-6 pb-3 pt-1 flex items-center justify-end">
          <ControllerPanel
            timerLabel={timerLabel}
            onReset={() => {
              setHtml(HTML_BOILERPLATE);
              setCss(CSS_BOILERPLATE);
              setJs(JS_BOILERPLATE);
            }}
            onSubmit={handleSubmit}
            onNext={handleNext}
            onBack={handleBack}
            onViewQuestion={() => setQuestionDialogOpen(true)}
            submitting={isSubmitting}
            submitDisabled={isAccepted}
            isAccepted={isAccepted}
            isLastLevel={isLastLevel}
            isFirstLevel={isFirstLevel}
          />
        </div>

        {/* Result Banner */}
        {submitResult && (
          <div
            className={cn(
              "px-6 py-2.5 border-t flex items-center gap-3 animate-in slide-in-from-top-2 duration-300",
              submitResult === "accepted"
                ? "bg-emerald-950/30 border-emerald-500/30"
                : "bg-red-950/30 border-red-500/30",
            )}
          >
            {submitResult === "accepted" ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 size={16} />
                <span className="font-bold text-xs tracking-wide">
                  SOLUTION VERIFIED — ACCESS GRANTED
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <XCircle size={16} />
                <span className="font-bold text-xs tracking-wide">
                  REJECTED
                </span>
                {submitReason && (
                  <span className="text-[11px] text-red-300/80 font-mono border-l border-red-500/30 pl-3 ml-1">
                    {submitReason}
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══ WORKSPACE: Editor + Preview (full remaining height) ═══ */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar */}
        <div className="w-56 flex-none bg-[#020617] border-r border-white/5 hidden md:flex flex-col z-20">
          <FileTree activeFile={activeFile} onSelect={setActiveFile} />
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120] relative border-r border-white/5">
          <Editor
            activeFile={activeFile}
            html={html}
            css={css}
            js={js}
            onChange={handleChange}
          />
        </div>

        {/* Preview */}
        <div className="flex-1 bg-slate-100/5 relative hidden lg:flex flex-col p-0.5 overflow-hidden">
          <div className="flex-1 relative bg-white">
            <Preview html={html} css={css} js={js} />
          </div>
        </div>
      </div>

      {/* ═══ QUESTION + HINTS DIALOG ═══ */}
      <QuestionDialog
        open={questionDialogOpen}
        onClose={() => setQuestionDialogOpen(false)}
        title={questionTitle}
        description={questionDesc}
        hints={hints}
      />
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
  </div>
);

export default Playground;

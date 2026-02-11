import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/layout/Navbar";
import { FileTree } from "@/components/playground/FileTree";
import { Editor } from "@/components/playground/Editor";
import { Preview } from "@/components/playground/Preview";
import { ControllerPanel } from "@/components/playground/ControllerPanel";

type FileType = "html" | "css" | "js";
const API = "http://localhost:5000/api";

const Playground = () => {
  const { contestId, participantId , questionId } = useParams();
  // const LEVEL = 1; // will make dynamic later

  // UI + editor state
  const [activeFile, setActiveFile] = useState<FileType>("html");
  const [isReady, setIsReady] = useState(false);

  // Backend-driven content
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionDesc, setQuestionDesc] = useState("");
  const [timerLabel, setTimerLabel] = useState("00:00");

  const HTMLBoilderPlate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Page Title</title>
    <!-- Link to external CSS file (optional) -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- All visible content goes here -->
    <h1>Hello, World!</h1>

    <!-- Link to external JavaScript file (optional, placed at the end of the body for performance) -->
    <script src="scripts.js"></script>
</body>
</html>
`;

  // Editor content (your defaults preserved)
  const [html, setHtml] = useState(HTMLBoilderPlate);

  const [css, setCss] = useState(`/* Write your CSS here */`);

  const [js, setJs] = useState(`// Write your logic here
console.log("System Initialized");`);

  // Boot sequence (unchanged)
  useEffect(() => {
    setTimeout(() => setIsReady(true), 600);
  }, []);

  // ======= NEW: CONNECT TO BACKEND =======
  useEffect(() => {
    const initLevel = async () => {
      // 1) Derive level from questionId (l2q7 → 2)
      const level = Number(questionId?.charAt(1));

      // 2) Start THIS LEVEL in backend (per-level tracking)
      const startRes = await axios.post(`${API}/level/start`, {
        contestId,
        participantId,
        level,
      });

      const startTime = new Date(startRes.data.attempt.startTime).getTime();

      // 3) PER-LEVEL UI TIMER (what user sees)
      const interval = setInterval(() => {
        const diff = Date.now() - startTime;
        const sec = Math.floor(diff / 1000);
        const m = String(Math.floor(sec / 60)).padStart(2, "0");
        const s = String(sec % 60).padStart(2, "0");
        setTimerLabel(`${m}:${s}`);
      }, 1000);

      // 4) Load question by ID (no contest lookup needed for title/desc)
      const qRes = await axios.get(`${API}/question/${questionId}`);
      setQuestionTitle(qRes.data.question.title);
      setQuestionDesc(qRes.data.question.problem);

      // cleanup when level/question changes
      return () => clearInterval(interval);
    };

    if (contestId && participantId && questionId) {
      initLevel();
    }
  }, [contestId, participantId, questionId]);

  // ======================================

  const handleChange = (file: FileType, value?: string) => {
    if (file === "html") setHtml(value || "");
    if (file === "css") setCss(value || "");
    if (file === "js") setJs(value || "");
  };

  if (!isReady) return <BootLoader />;

  return (
    <div className="h-screen w-full bg-[#020617] text-slate-200 flex flex-col overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Ambient effects (unchanged) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[100px] rounded-full mix-blend-screen opacity-30"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* ======= NEW: QUESTION HEADER (ONLY ADDITION TO LAYOUT) ======= */}
      <div className="px-6 py-4 max-w-7xl mx-auto relative z-20">
        <h1 className="text-xl font-bold text-slate-100">
          {questionTitle || "Loading question..."}
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">{questionDesc}</p>
      </div>
      {/* ============================================================= */}

      {/* WORKSPACE */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        <div className="w-64 flex-none bg-[#020617] relative z-20 hidden md:block">
          <FileTree activeFile={activeFile} onSelect={setActiveFile} />
        </div>

        <div className="flex-1 flex flex-col min-w-0 bg-[#0B1120] relative">
          <div className="h-14 flex-none border-b border-slate-800/60 bg-[#020617] flex items-center justify-between px-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-slate-500">
                Connected to
              </span>
              <span className="font-bold text-slate-200">US-EAST-1</span>
            </div>

            <ControllerPanel
              timerLabel={timerLabel}
              onReset={() => {
                setHtml("");
                setCss("");
                setJs("");
              }}
              onSubmit={() => console.log("Submit Payload Sent")}
            />
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 border-r border-slate-800/60 relative flex flex-col min-w-0">
              <Editor
                activeFile={activeFile}
                html={html}
                css={css}
                js={js}
                onChange={handleChange}
              />
            </div>

            <div className="flex-1 bg-white relative hidden lg:block">
              <Preview html={html} css={css} js={js} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// BootLoader (unchanged)
const BootLoader = () => (
  <div className="h-screen w-full bg-[#020617] flex items-center justify-center flex-col gap-2 relative overflow-hidden">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-indigo-500/20 border-b-indigo-500 animate-spin-reverse opacity-50"></div>
    </div>
    <div className="mt-4 font-mono text-xs tracking-[0.2em] text-indigo-400 animate-pulse">
      INITIALIZING ENVIRONMENT
    </div>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
  </div>
);

export default Playground;

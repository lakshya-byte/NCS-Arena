import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FileCode2, FileJson, LayoutTemplate, Zap } from "lucide-react";
import { useRef } from "react";

type FileType = "html" | "css" | "js";

interface EditorProps {
  activeFile: FileType;
  html: string;
  css: string;
  js: string;
  onChange: (file: FileType, value: string | undefined) => void;
}

export const Editor = ({
  activeFile,
  html,
  css,
  js,
  onChange,
}: EditorProps) => {
  const editorRef = useRef<any>(null);

  const value = activeFile === "html" ? html : activeFile === "css" ? css : js;

  const language =
    activeFile === "html"
      ? "html"
      : activeFile === "css"
        ? "css"
        : "javascript";

  const Icon =
    activeFile === "html"
      ? LayoutTemplate
      : activeFile === "css"
        ? FileCode2
        : FileJson;

  const iconColor =
    activeFile === "html"
      ? "text-orange-500"
      : activeFile === "css"
        ? "text-blue-500"
        : "text-yellow-400";

  const onMount = (editor, monaco) => {
    editorRef.current = editor;

    // ===== GOD-MODE THEME =====
    monaco.editor.defineTheme("god-mode", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0B1120",
        "editor.lineHighlightBackground": "#1e293b50",
        "editorLineNumber.foreground": "#475569",
        "editorGutter.background": "#0B1120",
        "editor.selectionBackground": "#6366f130",
        "editorCursor.foreground": "#818cf8",
        "editorWhitespace.foreground": "#33415550",
      },
    });

    monaco.editor.setTheme("god-mode");

    // ===== ENABLE RICH HTML INTELLIGENCE =====
    monaco.languages.html.htmlDefaults.setOptions({
      format: {
        wrapLineLength: 120,
        tabSize: 2,
        insertSpaces: true,
      },
      suggest: {
        showElements: true,
        showAttributes: true,
      },
    });

    // ===== ENABLE EMMET (SUPER IMPORTANT) =====
    monaco.languages.registerCompletionItemProvider("html", {
      provideCompletionItems: () => ({
        suggestions: [],
      }),
    });
  };

  const OPTIONS = {
    height: "100%",
    language,
    value,
    theme: "god-mode",
    onChange: (val: string | undefined) => onChange(activeFile, val),

    options: {
      // ========== CORE UX ==========
      automaticLayout: true,
      fontSize: 13,
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      minimap: { enabled: false },
      lineNumbers: "on" as const,
      roundedSelection: false,
      scrollBeyondLastLine: false,
      padding: { top: 16, bottom: 16 },
      cursorBlinking: "smooth" as const,
      cursorSmoothCaretAnimation: "on" as const,
      renderLineHighlight: "line" as const,
      fontLigatures: true,

      // ========== EDITING POWER ==========
      autoClosingBrackets: "always" as const,
      autoClosingQuotes: "always" as const,
      autoSurround: "languageDefined" as const,
      autoIndent: "advanced" as const,
      formatOnType: true,
      formatOnPaste: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "smart" as const,

      quickSuggestions: {
        other: true,
        comments: true,
        strings: true,
      },

      suggestSelection: "first" as const,
      snippetSuggestions: "inline" as const,
      parameterHints: { enabled: true },
      hover: { enabled: true },

      // ========== NAVIGATION ==========
      smoothScrolling: true,
      mouseWheelZoom: true,
      multiCursorModifier: "alt" as const,
      multiCursorPaste: "spread" as const,

      // ========== CODE STRUCTURE ==========
      folding: true,
      foldingStrategy: "indentation" as const,
      showFoldingControls: "always" as const,
      guides: { indentation: true },

      // ========== RENDERING ==========
      renderWhitespace: "selection" as const,
      renderControlCharacters: false,
      renderIndentGuides: true,
      matchBrackets: "always" as const,
      glyphMargin: true,
      lineDecorationsWidth: 10,

      // ========== ERRORS & HINTS ==========
      lightbulb: { enabled: true },
      codeLens: true,
      inlayHints: { enabled: true },

      // ========== PERFORMANCE ==========
      largeFileOptimizations: true,
      occurrencesHighlight: "singleFile" as const,
    },
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#0B1120] border-r border-slate-800/50">
      {/* HEADER */}
      <div className="flex-none h-10 border-b border-slate-800/50 bg-[#020617] flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Icon size={14} className={iconColor} />
          <span className="font-mono text-xs tracking-wide text-slate-400">
            {activeFile === "html"
              ? "index.html"
              : activeFile === "css"
                ? "styles.css"
                : "script.js"}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700 ml-1"></div>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
          <span className="flex items-center gap-1">
            <Zap size={10} className="text-indigo-500" />
            <span>LIVE</span>
          </span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* MONACO */}
      <div className="flex-1 relative pt-2">
        <MonacoEditor {...OPTIONS} onMount={onMount} />
      </div>
    </div>
  );
};

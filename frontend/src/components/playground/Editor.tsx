import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FileCode2, FileJson, LayoutTemplate, Zap } from "lucide-react";

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
  const value = activeFile === "html" ? html : activeFile === "css" ? css : js;
  const language = activeFile === "html" ? "html" : activeFile === "css" ? "css" : "javascript";

  // Dynamic Icon based on file type
  const Icon = activeFile === 'html' ? LayoutTemplate : activeFile === 'css' ? FileCode2 : FileJson;
  const iconColor = activeFile === 'html' ? "text-orange-500" : activeFile === 'css' ? "text-blue-500" : "text-yellow-400";

  return (
    <div className="flex flex-col h-full w-full bg-[#0B1120] border-r border-slate-800/50">
      
      {/* --- Editor Header / Tabs --- */}
      <div className="flex-none h-10 border-b border-slate-800/50 bg-[#020617] flex items-center justify-between px-4 select-none">
        
        {/* Active Tab */}
        <div className="flex items-center gap-2 text-sm text-slate-300">
            <Icon size={14} className={iconColor} />
            <span className="font-mono text-xs tracking-wide text-slate-400">
                {activeFile === 'html' ? 'index.html' : activeFile === 'css' ? 'styles.css' : 'script.js'}
            </span>
            {/* "Modified" dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700 ml-1"></div>
        </div>

        {/* Metadata (Right Side) */}
        <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
            <span className="flex items-center gap-1">
                <Zap size={10} className="text-indigo-500" />
                <span>LIVE</span>
            </span>
            <span>UTF-8</span>
        </div>
      </div>

      {/* --- Monaco Instance --- */}
      <div className="flex-1 relative pt-2">
        <MonacoEditor
          height="100%"
          language={language}
          value={value}
          theme="vs-dark" 
          onChange={(val) => onChange(activeFile, val)}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: '"JetBrains Mono", "Fira Code", monospace', // Pro Fonts
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            renderLineHighlight: "line",
            fontLigatures: true,
            scrollbar: {
                vertical: 'visible',
                horizontal: 'visible',
                useShadows: false,
                verticalScrollbarSize: 10,
            }
          }}
          // THE GOD MODE THEME INJECTION
          onMount={(editor, monaco) => {
            monaco.editor.defineTheme('god-mode', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    'editor.background': '#0B1120', // Matches Tailwind bg-[#0B1120]
                    'editor.lineHighlightBackground': '#1e293b50', // Subtle line highlight
                    'editorLineNumber.foreground': '#475569', // Slate-600
                    'editorGutter.background': '#0B1120',
                }
            });
            monaco.editor.setTheme('god-mode');
          }}
        />
      </div>
    </div>
  );
};
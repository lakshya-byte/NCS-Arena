import { cn } from "@/lib/utils";
import { 
  FileCode2, 
  FileJson, 
  LayoutTemplate, 
  FolderOpen, 
  Hash 
} from "lucide-react";

type FileType = "html" | "css" | "js";

interface FileTreeProps {
  activeFile: FileType;
  onSelect: (file: FileType) => void;
}

export const FileTree = ({ activeFile, onSelect }: FileTreeProps) => {
  const files = [
    { 
        id: "html", 
        label: "index.html", 
        icon: LayoutTemplate, 
        color: "text-orange-500", 
        desc: "Structure" 
    },
    { 
        id: "css", 
        label: "styles.css", 
        icon: FileCode2, 
        color: "text-blue-500", 
        desc: "Styling" 
    },
    { 
        id: "js", 
        label: "script.js", 
        icon: FileJson, 
        color: "text-yellow-400", 
        desc: "Logic" 
    },
  ] as const;

  return (
    <div className="h-full flex flex-col bg-[#020617] border-r border-slate-800/60 select-none">
      
      {/* --- Header --- */}
      <div className="p-4 border-b border-slate-800/40">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
          <Hash size={10} className="text-indigo-500" />
          Project Root
        </div>
        
        {/* Root Folder Indicator */}
        <div className="flex items-center gap-2 text-sm text-slate-300 font-medium px-2 py-1.5 rounded-lg bg-slate-900/50 border border-slate-800/50">
          <FolderOpen size={14} className="text-indigo-400" />
          <span className="font-mono text-xs text-slate-400">src/playground</span>
        </div>
      </div>

      {/* --- File List --- */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {files.map((file) => {
            const isActive = activeFile === file.id;
            const Icon = file.icon;

            return (
              <div
                key={file.id}
                onClick={() => onSelect(file.id as FileType)}
                className={cn(
                  "group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 border border-transparent",
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/10"
                    : "hover:bg-slate-900 hover:border-slate-800/50"
                )}
              >
                {/* Active Neon Bar (Left) */}
                <div className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-0"
                )}></div>

                {/* File Icon */}
                <Icon 
                  size={16} 
                  className={cn(
                    "transition-colors duration-300", 
                    isActive ? file.color : "text-slate-600 group-hover:text-slate-400"
                  )} 
                />

                {/* Text Content */}
                <div className="flex flex-col">
                    <span className={cn(
                        "text-xs font-mono tracking-wide transition-colors",
                        isActive ? "text-indigo-50 font-medium" : "text-slate-500 group-hover:text-slate-300"
                    )}>
                        {file.label}
                    </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
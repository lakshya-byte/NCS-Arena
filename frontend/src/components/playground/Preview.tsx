import { RefreshCw, Monitor, Smartphone, Tablet } from "lucide-react";
import { useState } from "react";

interface PreviewProps {
  html: string;
  css: string;
  js: string;
}

export const Preview = ({ html, css, js }: PreviewProps) => {
  const [key, setKey] = useState(0); // Force iframe reload

  const srcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
            body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
            ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (e) {
            console.error(e);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="flex flex-col h-full bg-white relative shadow-inner">
      
      {/* --- Browser Chrome Header --- */}
      <div className="flex-none h-10 border-b border-slate-200 bg-slate-50 flex items-center px-3 justify-between select-none">
        
        {/* Left: Traffic Lights & URL */}
        <div className="flex items-center gap-3 flex-1">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-500/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 border border-green-500/20"></div>
            </div>

            {/* Fake URL Bar */}
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded px-2 py-0.5 text-[10px] text-slate-400 font-mono shadow-sm flex-1 max-w-[200px]">
                <span className="text-slate-300">https://</span>
                <span>localhost:3000</span>
            </div>
        </div>

        {/* Right: Device Toggles & Refresh */}
        <div className="flex items-center gap-3 text-slate-400">
            <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
                <button className="p-1 hover:bg-slate-200 rounded text-slate-600"><Monitor size={12} /></button>
                <button className="p-1 hover:bg-slate-200 rounded"><Tablet size={12} /></button>
                <button className="p-1 hover:bg-slate-200 rounded"><Smartphone size={12} /></button>
            </div>
            <button 
                onClick={() => setKey((prev) => prev + 1)} 
                className="p-1 hover:bg-slate-200 rounded text-slate-500 hover:rotate-180 transition-transform duration-500"
                title="Refresh Preview"
            >
                <RefreshCw size={12} />
            </button>
        </div>
      </div>

      {/* --- The Sandbox --- */}
      <div className="flex-1 relative bg-white">
        <iframe
          key={key}
          title="preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          className="w-full h-full border-none block"
        />
        
        {/* Helper Badge for "Empty State" (Optional polish) */}
        {!html && !css && !js && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded text-xs text-slate-400 font-medium">
                    Output Preview
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
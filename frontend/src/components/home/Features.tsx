import React from "react";
import { Globe, Cpu, Zap, CheckCircle2, Trophy, Terminal } from "lucide-react";

// --- Types ---
interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: string;
  children?: React.ReactNode; // For the abstract UI visualization
}

// --- Components ---

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, children }) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1">
      {/* Hover Gradient Bloom */}
      <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-50/50 blur-3xl transition-all duration-500 group-hover:bg-indigo-100/50"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-indigo-600 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white">
          {icon}
        </div>

        {/* Text */}
        <h3 className="mb-3 text-xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-500 leading-relaxed mb-8">{description}</p>

        {/* Visual Anchor (The Abstract UI) */}
        <div className="mt-auto pt-4 relative min-h-[100px] w-full overflow-hidden rounded-lg border border-slate-100 bg-slate-50/50">
           {children}
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Texture matching Hero */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-6">
            <Zap size={12} className="fill-indigo-600" />
            Under the Hood
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
            Not just regex checks. <br />
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              Actual Engineering.
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            We built a grading engine that understands the difference between 
            <i>"works on my machine"</i> and <i>"works in production."</i>
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-8 md:grid-cols-3">
          
          {/* Card 1: Browser Grading */}
          <FeatureCard
            icon={<Globe size={24} />}
            title="Live Browser Grading"
            description="Your HTML, CSS, and JS run in a real headless Chrome instance using Puppeteer."
          >
            {/* Abstract Browser UI */}
            <div className="absolute inset-2 bg-white rounded shadow-sm border border-slate-100 flex flex-col group-hover:translate-y-1 transition-transform">
                <div className="h-4 border-b border-slate-100 bg-slate-50 flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                </div>
                <div className="p-3 space-y-2">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-green-600 bg-green-50 p-1 rounded border border-green-100">
                        <CheckCircle2 size={10} />
                        <span>computedStyles: matched</span>
                    </div>
                    <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                </div>
            </div>
          </FeatureCard>

          {/* Card 2: Smart Tests */}
          <FeatureCard
            icon={<Cpu size={24} />}
            title="Semantic Analysis"
            description="Our tests traverse the AST (Abstract Syntax Tree), allowing multiple valid solutions."
          >
            {/* Abstract Code UI */}
            <div className="absolute inset-2 bg-slate-900 rounded shadow-sm flex flex-col p-3 font-mono text-[10px] text-slate-300 overflow-hidden group-hover:scale-105 transition-transform origin-bottom">
                <div className="flex gap-2 mb-1">
                    <span className="text-purple-400">if</span>
                    <span>(valid)</span>
                    <span className="text-yellow-400">return</span>
                    <span className="text-green-400">true</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-slate-500">// Flex or Grid?</span>
                </div>
                <div className="flex gap-2">
                   <span className="text-slate-500">// Both pass.</span>
                </div>
                <div className="mt-auto flex justify-end">
                    <Terminal size={12} className="text-indigo-400" />
                </div>
            </div>
          </FeatureCard>

          {/* Card 3: Leaderboard */}
          <FeatureCard
            icon={<Trophy size={24} />}
            title="Realtime Elo Ratings"
            description="Watch your global rank update instantly as you solve levels and optimize code."
          >
            {/* Abstract Leaderboard UI */}
            <div className="absolute inset-x-4 bottom-0 h-24 bg-white border-t border-x border-slate-200 rounded-t-lg p-2 shadow-sm group-hover:translate-y-0 translate-y-2 transition-transform">
                <div className="flex items-center justify-between p-1.5 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-amber-100 text-amber-600 text-[8px] flex items-center justify-center font-bold">1</div>
                        <div className="w-12 h-2 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="text-[8px] font-bold text-green-600">+24 pts</div>
                </div>
                <div className="flex items-center justify-between p-1.5">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 text-[8px] flex items-center justify-center font-bold">2</div>
                        <div className="w-8 h-2 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="text-[8px] font-bold text-slate-400">--</div>
                </div>
            </div>
          </FeatureCard>

        </div>
      </div>
    </section>
  );
};
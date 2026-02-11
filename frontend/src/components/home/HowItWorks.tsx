import React from "react";
import { UserPlus, Code2, TrendingUp, ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  return (
    <section id="how" className="relative py-24 bg-slate-50 overflow-hidden">
      
      {/* --- Background Elements --- */}
      {/* 1. Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      {/* 2. Gradient Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/40 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-bold tracking-wide text-indigo-600 uppercase mb-3">
            The Process
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            From Zero to <span className="text-indigo-600">Hero</span> in 3 Steps.
          </h3>
          <p className="text-lg text-slate-500">
            No complex setup. No CLI tools to install. Just open your browser and start solving real-world frontend challenges.
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Step 1: Register */}
          <StepCard
            number="01"
            title="Join the Arena"
            description="Create an account in seconds. Filter contests by difficulty (Junior vs Senior) or tech stack."
            icon={<UserPlus size={24} />}
          >
            {/* Abstract UI: Registration Form */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-white border border-slate-200 rounded-t-xl shadow-lg p-4 flex flex-col gap-3 group-hover:translate-y-[-10px] transition-transform duration-500">
              <div className="h-2 w-1/3 bg-slate-100 rounded-full"></div>
              <div className="h-8 w-full bg-slate-50 border border-slate-100 rounded-lg flex items-center px-3">
                <div className="h-1.5 w-1.5 rounded-full bg-slate-300 animate-pulse"></div>
              </div>
              <div className="h-8 w-full bg-indigo-600 rounded-lg shadow-md shadow-indigo-200"></div>
            </div>
          </StepCard>

          {/* Step 2: Code */}
          <StepCard
            number="02"
            title="Code Live"
            description="Access our in-browser IDE. It comes pre-configured with React, Vue, or vanilla JS templates."
            icon={<Code2 size={24} />}
          >
             {/* Abstract UI: Code Editor */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-slate-900 rounded-t-xl shadow-2xl p-4 flex flex-col gap-2 group-hover:translate-y-[-10px] transition-transform duration-500 border-t border-slate-700">
                <div className="flex gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="w-8 h-1.5 bg-purple-500 rounded-full"></div>
                    <div className="w-12 h-1.5 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="w-24 h-1.5 bg-slate-600 rounded-full pl-4"></div>
                  <div className="w-16 h-1.5 bg-slate-600 rounded-full pl-4"></div>
                </div>
             </div>
          </StepCard>

          {/* Step 3: Compete */}
          <StepCard
            number="03"
            title="Rank Up"
            description="Submit your solution. If it passes our Puppeteer tests, you gain Elo points instantly."
            icon={<TrendingUp size={24} />}
          >
            {/* Abstract UI: Rank Badge/Graph */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-white border border-slate-200 rounded-t-xl shadow-lg p-4 flex items-end justify-between gap-2 group-hover:translate-y-[-10px] transition-transform duration-500">
                <div className="w-full bg-slate-100 rounded-t-sm h-[40%]"></div>
                <div className="w-full bg-indigo-100 rounded-t-sm h-[70%] relative group">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    YOU
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-t-sm h-[50%]"></div>
             </div>
          </StepCard>

        </div>

        {/* --- Bottom CTA --- */}
        <div className="mt-20 flex justify-center">
            <button className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800 hover:ring-4 hover:ring-slate-200">
                Start Coding Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
      </div>
    </section>
  );
};

// --- Reusable Step Card Component ---

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description, icon, children }) => {
  return (
    <div className="group relative h-[400px] flex flex-col bg-white rounded-3xl border border-slate-200 p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 hover:border-indigo-100">
      
      {/* Huge Watermark Number */}
      <div className="absolute -right-4 -top-10 text-[180px] font-bold text-slate-50/80 pointer-events-none select-none group-hover:text-indigo-50/50 transition-colors duration-500">
        {number}
      </div>

      {/* Icon & Title */}
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
          {icon}
        </div>
        <h4 className="text-2xl font-bold text-slate-900 mb-3">
          {title}
        </h4>
        <p className="text-slate-500 leading-relaxed pr-4">
          {description}
        </p>
      </div>

      {/* Visual Anchor (The Abstract UI) */}
      {/* This renders the 'children' (the mockups) at the bottom */}
      {children}
    </div>
  );
};
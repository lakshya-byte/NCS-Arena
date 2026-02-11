import { useEffect, useState, useRef, type MouseEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { 
  ArrowRight, 
  Search, 
  Code2, 
  Cpu, 
  Layers 
} from "lucide-react";
import type { Contest } from "@/types";

const API = "http://localhost:5000/api";

export const Contests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await axios.get(`${API}/contest`);
        setContests(res.data.contests || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch contests", error);
        setLoading(false);
      }
    };
    fetchContests();
  }, []);

  // 3D Stagger Entrance
  useEffect(() => {
    if (!loading && contests.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".contest-card-wrapper",
          { 
            y: 100, 
            opacity: 0, 
            rotateX: 10, 
            transformOrigin: "top center" 
          },
          { 
            y: 0, 
            opacity: 1, 
            rotateX: 0, 
            duration: 0.8, 
            ease: "power4.out", 
            stagger: 0.1 
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [loading, contests]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/30 font-sans">

      {/* --- God-Tier Background (Grid + Noise + Vignette) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Base Dark Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.2]"></div>
         {/* Secondary Fine Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:10px_10px] opacity-[0.05]"></div>
         {/* Radial Gradient Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen"></div>
         {/* Vignette */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]"></div>
      </div>

      <div ref={containerRef} className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* --- Header Architecture --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-12 h-12 bg-indigo-500/20 blur-xl rounded-full"></div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-widest mb-4 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
              System Online
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-white">
              Contest <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Protocol</span>
            </h1>
            <p className="text-slate-400 mt-4 text-lg max-w-xl leading-relaxed">
              Engage in high-frequency coding battles. Execute logic, optimize runtime, and dominate the leaderboard.
            </p>
          </div>

          {/* Glass Filter Bar */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl shadow-2xl">
             <FilterButton active label="All" count={contests.length} />
             <FilterButton label="Live" count={contests.filter(c => new Date() >= new Date(c.startTime) && new Date() <= new Date(c.endTime)).length} />
             <FilterButton label="Upcoming" />
             <div className="w-px h-6 bg-slate-800 mx-1"></div>
             <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-white">
                <Search size={18} />
             </button>
          </div>
        </div>

        {/* --- The Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contests.map((contest) => (
            <SpotlightCard key={contest._id} contest={contest} navigate={navigate} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Spotlight Card Component (The Core Magic) ---

const SpotlightCard = ({ contest, navigate }: { contest: Contest; navigate: any }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  // Status Logic
  const now = new Date();
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);
  let status: "live" | "upcoming" | "ended" = "upcoming";
  if (now >= start && now <= end) status = "live";
  if (now > end) status = "ended";

  return (
    <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="contest-card-wrapper group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/50 shadow-2xl transition-all duration-300 active:scale-[0.98]"
    >
        {/* --- The Moving Spotlight Gradient --- */}
        <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
                opacity,
                background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.15), transparent 40%)`,
            }}
        />
        
        {/* --- The Moving Border Glow --- */}
        <div 
             className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
             style={{
                opacity,
                background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(99,102,241,0.4), transparent 40%)`,
                maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                WebkitMaskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '1px' // This defines border width
             }}
        />

        {/* Content Container (Needs higher z-index to sit on top of spotlight) */}
        <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
            
            {/* Top Row: Tech Stack + Status */}
            <div className="flex justify-between items-start mb-8">
                <div className="flex -space-x-2">
                     <TechIcon icon={<Code2 size={14} />} color="text-blue-400" bg="bg-blue-500/10" />
                     <TechIcon icon={<Cpu size={14} />} color="text-amber-400" bg="bg-amber-500/10" />
                     <TechIcon icon={<Layers size={14} />} color="text-purple-400" bg="bg-purple-500/10" />
                </div>

                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    status === 'live' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-[0_0_10px_rgba(34,197,94,0.2)]' 
                    : status === 'upcoming'
                    ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status === 'live' ? 'bg-green-400 animate-pulse' : 'bg-current'}`}></span>
                    {status}
                </div>
            </div>

            {/* Title & Desc */}
            <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-indigo-300 transition-colors">
                {contest.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-8 flex-grow">
                {contest.description}
            </p>

            {/* Ticket Stub / Metadata Area */}
            <div className="relative rounded-xl bg-slate-900/50 border border-slate-800 p-4 mb-6 group-hover:border-slate-700 transition-colors">
                {/* Decorative Dashed Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-slate-800 rounded-full"></div>

                <div className="grid grid-cols-2 gap-4">
                    <DataPoint label="START" value={new Date(contest.startTime).toLocaleDateString(undefined, {month:'short', day:'numeric', hour:'2-digit'})} />
                    <DataPoint label="END" value={new Date(contest.endTime).toLocaleDateString(undefined, {month:'short', day:'numeric', hour:'2-digit'})} align="right" />
                </div>
            </div>

            {/* Action Trigger */}
            <button 
                onClick={() => navigate(`/register/${contest._id}`)}
                disabled={status === 'ended'}
                className="relative w-full overflow-hidden rounded-xl bg-slate-100 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:animate-shimmer"></div>
                <span className="relative flex items-center justify-center gap-2">
                    {status === 'ended' ? 'Access Denied' : 'Initialize Sequence'} 
                    {status !== 'ended' && <ArrowRight size={16} />}
                </span>
            </button>
        </div>
    </div>
  );
};

// --- Sub-Components for Clean Code ---

const TechIcon = ({ icon, color, bg }: { icon: any; color: string; bg: string }) => (
    <div className={`w-8 h-8 rounded-full border border-slate-800 bg-slate-900 flex items-center justify-center ${color} shadow-lg relative z-0 ring-2 ring-slate-950`}>
        {icon}
    </div>
);

const DataPoint = ({ label, value, align = 'left' }: { label: string; value: string; align?: 'left'|'right' }) => (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start'}`}>
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{label}</span>
        <span className="text-sm font-mono font-medium text-slate-200">{value}</span>
    </div>
);

const FilterButton = ({ label, count, active }: { label: string; count?: number; active?: boolean }) => (
    <button className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
        active 
        ? 'bg-slate-800 text-white shadow-lg shadow-indigo-500/10' 
        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
    }`}>
        {label}
        {count !== undefined && <span className="ml-2 text-xs opacity-50 font-mono">{count}</span>}
    </button>
);

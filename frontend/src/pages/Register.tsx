import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { apiClient } from "../services/http";
import { ENDPOINTS } from "../services/api";
import {
  User,
  Hash,
  GitBranch,
  Calendar,
  ArrowRight,
  Loader2,
  ShieldCheck,
  Terminal,
} from "lucide-react";

const Register = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    rollNo: "",
    branch: "",
    year: "",
  });

  // -------- AUTO-RESUME LOGIC (YOU ARE MISSING THIS) --------
  useEffect(() => {
    if (!contestId) return;

    const saved = localStorage.getItem("contestSession");
    if (!saved) return;

    const session = JSON.parse(saved);

    if (session.contestId === contestId && session.participantId) {
      const targetQuestion = session.lastQuestionId || session.firstQuestionId;

      navigate(`/play/${contestId}/${session.participantId}/${targetQuestion}`);
    }
  }, [contestId]);

  // Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".register-card",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" },
      );
      gsap.fromTo(
        ".form-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3 },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.rollNo) return;

    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 800));

      // 1) Register participant
      const res = await apiClient.post(ENDPOINTS.REGISTER, {
        contestId,
        ...form,
      });

      const participantId = res.data.participant?._id || res.data._id;

      // 2) Fetch contest to get FIRST questionId
      const contestRes = await apiClient.get(ENDPOINTS.CONTESTS);
      const contest = contestRes.data.contests.find(
        (c: any) => c._id === contestId,
      );

      const firstQuestionId = contest.questions[0]?.questionId;

      if (!firstQuestionId) {
        alert("No questions assigned to this contest.");
        setIsLoading(false);
        return;
      }

      // 3) SAVE CLEAN SESSION OBJECT (single source of truth)
      const session = {
        contestId,
        participantId,
        firstQuestionId,
        lastQuestionId: firstQuestionId, // start here
        registeredAt: new Date().toISOString(),
        profile: form,
      };

      localStorage.setItem("contestSession", JSON.stringify(session));

      // 4) Success animation
      gsap.to(".register-card", {
        y: -20,
        opacity: 0,
        duration: 0.3,
      });

      // 5) Redirect to playground
      setTimeout(() => {
        navigate(`/play/${contestId}/${participantId}/${firstQuestionId}`);
      }, 300);
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed — check console.");
      setIsLoading(false);
    }
  };

  // Field Config for cleaner rendering
  const fields = [
    {
      name: "name",
      label: "Full Name",
      placeholder: "e.g. Alex Dev",
      icon: User,
      type: "text",
    },
    {
      name: "rollNo",
      label: "Roll Number",
      placeholder: "e.g. 21CS001",
      icon: Hash,
      type: "text",
    },
    {
      name: "branch",
      label: "Branch / Department",
      placeholder: "e.g. Computer Science",
      icon: GitBranch,
      type: "text",
    },
    {
      name: "year",
      label: "Graduation Year",
      placeholder: "e.g. 2025",
      icon: Calendar,
      type: "number",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30">
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.2]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div
        ref={containerRef}
        className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh]"
      >
        {/* --- The Glass Obelisk --- */}
        <div className="register-card w-full max-w-md relative">
          {/* Decorative Top Connector */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-px h-12 bg-gradient-to-b from-transparent to-indigo-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-black/5">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-white/5 text-xs font-mono text-slate-400 mb-4">
                <Terminal size={12} className="text-indigo-400" />
                <span>ESTABLISH CONNECTION</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Participant Entry
              </h1>
              <p className="text-slate-500 text-sm mt-2">
                Enter your credentials to access the contest environment.
              </p>
            </div>

            {/* Form Inputs */}
            <div className="space-y-5">
              {fields.map((field) => (
                <div key={field.name} className="form-item group relative">
                  <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1.5 ml-1">
                    {field.label}
                  </label>
                  <div
                    className={`relative transition-all duration-300 ${focusedField === field.name ? "scale-[1.02]" : ""}`}
                  >
                    <div
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        focusedField === field.name
                          ? "text-indigo-400"
                          : "text-slate-500"
                      }`}
                    >
                      <field.icon size={18} />
                    </div>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={(form as any)[field.name]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full bg-slate-950/50 border text-sm text-slate-200 rounded-xl py-3.5 pl-12 pr-4 outline-none transition-all duration-300 placeholder:text-slate-600 ${
                        focusedField === field.name
                          ? "border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)] ring-1 ring-indigo-500/20"
                          : "border-slate-800 hover:border-slate-700"
                      }`}
                    />
                    {/* Status Indicator Dot */}
                    <div
                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                        (form as any)[field.name].length > 0
                          ? "bg-green-500"
                          : "bg-slate-800"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Button */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full relative overflow-hidden bg-indigo-600 hover:bg-indigo-500 text-white h-12 rounded-xl font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    <span className="text-sm font-mono tracking-wide">
                      VERIFYING...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Initialize Session</span>
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                )}

                {/* Shimmer Effect */}
                {!isLoading && (
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                )}
              </Button>

              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-600 font-mono">
                <ShieldCheck size={12} />
                <span>256-BIT ENCRYPTED CONNECTION</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

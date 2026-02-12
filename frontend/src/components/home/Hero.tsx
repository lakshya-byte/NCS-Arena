import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import gsap from "gsap";

const TYPEWRITER_PHRASES = [
  "Win in Real Time.",
  "Build & Deploy.",
  "Conquer Challenges.",
  "Level Up Fast.",
];

export const Hero = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-badge", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.from(".hero-title", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.1,
      });
      gsap.from(".hero-sub", { y: 30, opacity: 0, duration: 1, delay: 0.3 });
      gsap.from(".hero-btns", {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
      });
      gsap.from(".hero-visual", {
        y: 100,
        opacity: 0,
        rotateX: 10,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.6,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Typewriter effect
  useEffect(() => {
    const phrase = TYPEWRITER_PHRASES[phraseIdx];
    const speed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(phrase.slice(0, displayText.length + 1));
        if (displayText.length + 1 === phrase.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayText(phrase.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIdx]);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-32 md:pt-48 md:pb-40 overflow-hidden bg-white selection:bg-indigo-100 selection:text-indigo-900"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-indigo-400 opacity-20 blur-[100px]"></div>
      <div className="absolute right-0 bottom-0 -z-10 h-[400px] w-[400px] bg-purple-100/50 rounded-full blur-[80px]"></div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center relative z-10">
        <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 shadow-[0_2px_10px_-3px_rgba(99,102,241,0.2)] backdrop-blur-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Season 4 Live Now
          </span>
        </div>

        <h1 className="hero-title max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
          Code. Compete. <br className="hidden md:block" />
          <span className="relative whitespace-nowrap">
            <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              {displayText}
              <span className="animate-pulse text-indigo-400">|</span>
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full h-3 text-indigo-200 -z-10"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
            </svg>
          </span>
        </h1>

        <p className="hero-sub mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          The first live browser-based coding arena. Your frontend code is
          graded instantly with{" "}
          <span className="font-semibold text-slate-900">
            AI-powered analysis
          </span>{" "}
          and a realtime global leaderboard.
        </p>

        <div className="hero-btns mt-10 flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
          <Button
            size="lg"
            className="group relative h-12 px-8 rounded-xl bg-slate-900 text-white shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)] hover:bg-slate-800 hover:shadow-[0_1px_40px_rgba(0,0,0,0.2)] transition-all duration-300"
            onClick={() => navigate("/contests")}
          >
            <span className="relative flex items-center gap-2">
              Explore Contests
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 px-8 rounded-xl border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all bg-white/80 backdrop-blur-sm"
            onClick={() =>
              document
                .getElementById("how")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              How it Works
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

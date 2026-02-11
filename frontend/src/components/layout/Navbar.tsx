import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Assuming shadcn/ui or similar
import gsap from "gsap";
import { Menu, X, Code2, Trophy } from "lucide-react"; // Icons for pro feel

export const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initial Float Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "power4.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  // Mobile Menu Animation
  useEffect(() => {
    if (isMobileMenuOpen) {
      gsap.to(".mobile-menu", { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" });
    } else {
      gsap.to(".mobile-menu", { height: 0, opacity: 0, duration: 0.3, ease: "power3.in" });
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-6 px-4">
      {/* Container: Pointer-events-auto ensures we can click the nav, 
        but the wrapper allows clicks to pass through to the page behind it on the sides.
      */}
      <nav
        ref={navRef}
        className="pointer-events-auto w-full max-w-5xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl ring-1 ring-black/5 overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-3 md:px-6 md:py-4">
          
          {/* --- Brand / Logo --- */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="bg-gradient-to-tr from-indigo-600 to-violet-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all duration-300">
              <Code2 size={20} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              CodeContest
            </span>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="#about" label="About" />
            <NavLink href="#how" label="How it Works" />
            <NavLink href="#faq" label="FAQ" />
          </div>

          {/* --- CTA & Mobile Toggle --- */}
          <div className="flex items-center gap-3">
            <Button
              className="hidden md:flex bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 active:scale-95 transition-all rounded-xl font-medium px-6"
              onClick={() => navigate("/contests")}
            >
              <Trophy className="w-4 h-4 mr-2 text-indigo-300" />
              Explore Contests
            </Button>

            {/* Mobile Toggle Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu (Collapsible) --- */}
        <div className="mobile-menu h-0 opacity-0 overflow-hidden bg-slate-50 border-t border-slate-100 md:hidden">
          <div className="flex flex-col p-4 gap-2">
            <MobileLink onClick={() => setIsMobileMenuOpen(false)} href="#about">About</MobileLink>
            <MobileLink onClick={() => setIsMobileMenuOpen(false)} href="#how">How it Works</MobileLink>
            <MobileLink onClick={() => setIsMobileMenuOpen(false)} href="#faq">FAQ</MobileLink>
            <div className="h-px bg-slate-200 my-2" />
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6 shadow-lg shadow-indigo-500/20"
              onClick={() => {
                navigate("/contests");
                setIsMobileMenuOpen(false);
              }}
            >
              Start Competing
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

// --- Sub Components for Reusability ---

const NavLink = ({ href, label }) => (
  <a
    href={href}
    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 rounded-full transition-all duration-200"
  >
    {label}
  </a>
);

const MobileLink = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block w-full px-4 py-3 text-base font-medium text-slate-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm rounded-xl transition-all"
  >
    {children}
  </a>
);
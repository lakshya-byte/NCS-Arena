import React from "react";
import { Button } from "@/components/ui/button";
import { Code2, Github, Twitter, Linkedin, Heart, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 text-slate-300 overflow-hidden">
      
      {/* --- Visual Effects --- */}
      {/* 1. Top Glow Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      
      {/* 2. Background Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-20 mb-16">
          
          {/* --- Brand Column (Span 4) --- */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6 text-white group cursor-pointer">
               <div className="bg-indigo-600/20 p-2 rounded-lg border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300">
                  <Code2 size={24} className="text-indigo-400 group-hover:text-white transition-colors" />
               </div>
               <span className="text-xl font-bold tracking-tight">CodeContest</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 pr-4">
              The world's first realtime frontend coding arena. 
              Compete in browser-based challenges, visualize your rank, 
              and get hired by top tech companies.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* --- Links Column 1 --- */}
          <div className="md:col-span-2 md:col-start-6">
            <h3 className="text-white font-semibold mb-6">Product</h3>
            <ul className="space-y-4">
              <FooterLink href="/contests">Contests</FooterLink>
              <FooterLink href="/leaderboard">Leaderboard</FooterLink>
              <FooterLink href="/playground">Playground</FooterLink>
              <FooterLink href="/pricing">Pricing</FooterLink>
            </ul>
          </div>

          {/* --- Links Column 2 --- */}
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-6">Company</h3>
            <ul className="space-y-4">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* --- CTA Micro-Card (Span 3) --- */}
          <div className="md:col-span-3">
             <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-indigo-500/30 transition-colors duration-300">
                <h3 className="text-white font-semibold mb-2">Ready to compete?</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Join over 10,000 developers shipping code daily.
                </p>
                <Button className="w-full bg-white text-slate-950 hover:bg-indigo-50 hover:text-indigo-700 font-bold transition-all">
                  Get Started <ArrowRight size={16} className="ml-2" />
                </Button>
             </div>
          </div>
        </div>

        {/* --- Bottom Bar --- */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 flex items-center gap-2">
            <span>© {new Date().getFullYear()} CodeContest Inc.</span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1">
               Made with <Heart size={12} className="text-red-500 fill-red-500/20" /> by Developers
            </span>
          </div>

          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Sub Components ---

const SocialIcon = ({ icon, href }: { icon: React.ReactNode; href: string }) => (
  <a 
    href={href} 
    className="h-10 w-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <a 
      href={href} 
      className="text-sm text-slate-400 hover:text-indigo-400 hover:translate-x-1 inline-block transition-all duration-200"
    >
      {children}
    </a>
  </li>
);
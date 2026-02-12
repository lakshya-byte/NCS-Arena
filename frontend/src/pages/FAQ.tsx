import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "What is NCS Arena?",
    a: "NCS Arena is a live browser-based coding platform where students compete in frontend challenges. Your code (HTML, CSS, JS) is graded instantly by AI and scores appear on a real-time leaderboard.",
  },
  {
    q: "Do I need to install anything?",
    a: "No! Everything runs in the browser. You just need a modern browser like Chrome, Firefox, or Edge.",
  },
  {
    q: "How does the grading work?",
    a: "When you submit your code, it is sent to our backend where an AI model evaluates your HTML/CSS/JS against the problem requirements. Results are returned in seconds.",
  },
  {
    q: "What happens if I refresh or leave the page?",
    a: "Your progress is saved! When you return, the system will automatically pick up where you left off, loading your last submitted code into the editor.",
  },
  {
    q: "Can I use frameworks?",
    a: "Currently contests are vanilla HTML/CSS/JS. We plan to add React and Vue templates in future seasons.",
  },
  {
    q: "How are ties broken?",
    a: "When two participants have the same number of levels passed, the one with the lower total time wins.",
  },
  {
    q: "Is this free?",
    a: "Yes! NCS Arena is completely free for all participants.",
  },
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-6">
              <HelpCircle size={12} />
              FAQ
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-500 max-w-xl mx-auto">
              Everything you need to know about NCS Arena.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-200 hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-semibold text-slate-900 pr-4">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                      openIdx === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIdx === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-slate-500 leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;

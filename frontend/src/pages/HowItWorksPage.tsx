import { UserPlus, Code2, Send, Trophy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    number: "01",
    icon: <UserPlus size={24} />,
    title: "Register",
    description:
      "Find an active contest and register with your name and roll number. It takes 10 seconds.",
    color: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
    iconColor: "bg-blue-50 text-blue-600",
  },
  {
    number: "02",
    icon: <Code2 size={24} />,
    title: "Code",
    description:
      "Write HTML, CSS, and JS in our in-browser code editor. See a live preview of your work beside the editor.",
    color: "from-indigo-500/10 to-indigo-600/5 border-indigo-500/20",
    iconColor: "bg-indigo-50 text-indigo-600",
  },
  {
    number: "03",
    icon: <Send size={24} />,
    title: "Submit",
    description:
      "Hit SUBMIT and our AI evaluates your code instantly. If accepted, you move to the next level!",
    color: "from-violet-500/10 to-violet-600/5 border-violet-500/20",
    iconColor: "bg-violet-50 text-violet-600",
  },
  {
    number: "04",
    icon: <Trophy size={24} />,
    title: "Win",
    description:
      "Climb the live leaderboard. The fastest coder with the most levels cleared wins the contest!",
    color: "from-amber-500/10 to-amber-600/5 border-amber-500/20",
    iconColor: "bg-amber-50 text-amber-600",
  },
];

const HowItWorksPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <section className="pt-36 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-6">
            How It Works
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            From Zero to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Champion
            </span>{" "}
            in 4 Steps
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            No setup. No CLI tools. Just open your browser and start solving
            real frontend challenges.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${step.color} border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group`}
              >
                {/* Watermark */}
                <div className="absolute -right-4 -top-8 text-[140px] font-bold text-slate-100/60 pointer-events-none select-none group-hover:text-indigo-100/40 transition-colors duration-500">
                  {step.number}
                </div>

                <div className="relative z-10">
                  <div
                    className={`w-14 h-14 rounded-2xl ${step.iconColor} flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <button
            onClick={() => navigate("/contests")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-xl"
          >
            Start Coding Now <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;

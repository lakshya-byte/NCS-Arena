import { Users, Code2, Globe, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-100/50 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-6">
            <Heart size={12} className="fill-indigo-600" />
            About Us
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Coding Contests, <br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Reimagined.
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            NCS Arena is a live browser-based coding platform where students
            compete to solve frontend challenges, graded by AI in real time with
            a live leaderboard.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            What We Believe In
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code2 size={28} />,
                title: "Learning by Doing",
                desc: "Write real code, get real feedback. No multiple-choice, no theory dumps — just you and the browser.",
              },
              {
                icon: <Users size={28} />,
                title: "Fair Competition",
                desc: "AI grading means no bias. Every participant is evaluated on the merit of their code.",
              },
              {
                icon: <Globe size={28} />,
                title: "Access for Everyone",
                desc: "All you need is a browser. No installs, no setup, no barriers to entry.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Jump In?</h2>
          <p className="text-slate-500 mb-8">
            Join thousands of developers competing in real-time frontend
            challenges.
          </p>
          <button
            onClick={() => navigate("/contests")}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-xl"
          >
            Browse Contests <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;

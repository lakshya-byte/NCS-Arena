import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../service/http";
import { API } from "../service/api";

interface Contest {
  _id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  levels: number[];
  isActive: boolean;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    http
      .get(API.GET_CONTESTS)
      .then((res) => setContests(res.data.contests ?? []))
      .catch((err) => console.error("Fetch contests failed:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-7 w-40 bg-slate-800 rounded mb-6 animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-800/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">All Contests</h1>
          <p className="text-sm text-slate-500 mt-1">
            {contests.length} contest{contests.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/create-contest")}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all"
        >
          + New Contest
        </button>
      </div>

      {contests.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-sm">
            No contests yet. Create one to get started.
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {contests.map((c) => {
          const isLive = new Date(c.endTime) > new Date();
          return (
            <div
              key={c._id}
              className="group relative p-5 rounded-xl bg-[#0B1120] border border-slate-800/60 hover:border-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3">
                    <h2 className="text-[15px] font-semibold text-white group-hover:text-indigo-300 transition-colors">
                      {c.title}
                    </h2>
                    <span
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        isLive
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isLive
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-slate-600"
                        }`}
                      />
                      {isLive ? "Live" : "Ended"}
                    </span>
                  </div>

                  {c.description && (
                    <p className="text-xs text-slate-500 line-clamp-1 max-w-lg">
                      {c.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-slate-600 font-mono">
                    <span>{new Date(c.startTime).toLocaleDateString()}</span>
                    <span className="text-slate-700">→</span>
                    <span>{new Date(c.endTime).toLocaleDateString()}</span>
                    {c.levels?.length > 0 && (
                      <>
                        <span className="text-slate-700">•</span>
                        <span>{c.levels.length} levels</span>
                      </>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/admin/contest/${c._id}`)}
                  className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-200"
                >
                  View Participants →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

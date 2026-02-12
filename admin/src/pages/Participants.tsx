import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../service/http";
import { API } from "../service/api";

interface Attempt {
  _id: string;
  level: number;
  startTime: string;
  autoResult: string | null;
  adminResult: string | null;
}

interface ParticipantData {
  _id: string;
  name: string;
  rollNo: string;
  branch: string;
  year: string;
  status: string;
  levelsPassed: number;
  totalTime: number;
  attempts: Attempt[];
}

export default function Participants() {
  const navigate = useNavigate();
  const { contestId } = useParams<{ contestId: string }>();

  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [disqualifying, setDisqualifying] = useState<string | null>(null);

  const loadParticipants = useCallback(async () => {
    if (!contestId) return;
    try {
      setLoading(true);
      const res = await http.get(API.LIST_PARTICIPANTS(contestId));
      setParticipants(res.data.participants ?? []);
    } catch (err) {
      console.error("Fetch participants failed:", err);
    } finally {
      setLoading(false);
    }
  }, [contestId]);

  useEffect(() => {
    loadParticipants();
  }, [loadParticipants]);

  const handleDisqualify = async (participantId: string) => {
    if (!window.confirm("Disqualify this participant?")) return;
    try {
      setDisqualifying(participantId);
      await http.put(API.DISQUALIFY(participantId));
      await loadParticipants();
    } catch (err) {
      console.error("Disqualify failed:", err);
    } finally {
      setDisqualifying(null);
    }
  };

  const formatTime = (ms: number) => {
    if (!ms || ms <= 0) return "—";
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="h-7 w-48 bg-slate-800 rounded mb-6 animate-pulse" />
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 bg-slate-800/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">Participants</h1>
          <p className="text-sm text-slate-500 mt-1">
            {participants.length} registered
          </p>
        </div>
        <button
          onClick={() => navigate("/admin")}
          className="text-xs text-slate-500 hover:text-white transition-colors font-medium"
        >
          ← Back to Contests
        </button>
      </div>

      {participants.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-sm">No participants yet.</p>
        </div>
      )}

      <div className="grid gap-3">
        {participants.map((p) => (
          <div
            key={p._id}
            className="group p-5 rounded-xl bg-[#0B1120] border border-slate-800/60 hover:border-slate-700/80 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-[15px] font-semibold text-white truncate">
                    {p.name}
                  </h2>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${
                      p.status === "disqualified"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    }`}
                  >
                    {p.status === "disqualified" ? "DISQUALIFIED" : "ACTIVE"}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono">
                  <span>{p.rollNo}</span>
                  <span className="text-slate-700">•</span>
                  <span>{p.branch}</span>
                  <span className="text-slate-700">•</span>
                  <span>{p.year}</span>
                </div>

                <div className="flex items-center gap-5 pt-1">
                  <div className="text-xs">
                    <span className="text-slate-600">Levels: </span>
                    <span className="text-indigo-400 font-bold">
                      {p.levelsPassed}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-600">Time: </span>
                    <span className="text-slate-300 font-medium">
                      {formatTime(p.totalTime)}
                    </span>
                  </div>
                  <div className="text-xs">
                    <span className="text-slate-600">Attempts: </span>
                    <span className="text-slate-300 font-medium">
                      {p.attempts?.length ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-none">
                <button
                  onClick={() =>
                    navigate(`/admin/contest/${contestId}/${p._id}`)
                  }
                  className="px-3.5 py-2 rounded-lg text-xs font-bold bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-200"
                >
                  View Submissions →
                </button>

                {p.status !== "disqualified" && (
                  <button
                    onClick={() => handleDisqualify(p._id)}
                    disabled={disqualifying === p._id}
                    className="px-3.5 py-2 rounded-lg text-xs font-bold bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait"
                  >
                    {disqualifying === p._id ? "..." : "Disqualify"}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

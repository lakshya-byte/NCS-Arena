import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../services/http";
import { ENDPOINTS } from "../services/api";
import { socket } from "../lib/socket";
import gsap from "gsap";
import { Trophy, Clock, Layers, Wifi } from "lucide-react";

interface Player {
  _id: string;
  name: string;
  levelsPassed: number;
  totalTime: number;
}

const Leaderboard = () => {
  const { contestId } = useParams();
  const [rows, setRows] = useState<Player[]>([]);
  const [connected, setConnected] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  // Initial fetch + socket
  useEffect(() => {
    if (!contestId) return;

    // Fetch leaderboard
    apiClient
      .get(ENDPOINTS.LEADERBOARD(contestId))
      .then((res) => setRows(res.data.leaderboard || []))
      .catch((err) => console.error("Leaderboard fetch error:", err));

    // Connect socket
    if (!socket.connected) socket.connect();
    socket.emit("joinContest", { contestId });
    setConnected(true);

    socket.on("leaderboard:update", (data: Player[]) => {
      setRows(data);
    });

    return () => {
      socket.off("leaderboard:update");
      socket.disconnect();
      setConnected(false);
    };
  }, [contestId]);

  // Animate rows on update
  useEffect(() => {
    if (!tableRef.current) return;
    gsap.fromTo(
      tableRef.current.querySelectorAll("tr"),
      { opacity: 0, y: 15 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
      },
    );
  }, [rows]);

  const formatTime = (ms: number) => {
    if (!ms || ms <= 0) return "—";
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const top3 = rows.slice(0, 3);

  const podiumColors = [
    "from-amber-500/20 to-amber-600/5 border-amber-500/30",
    "from-slate-400/20 to-slate-500/5 border-slate-400/30",
    "from-orange-600/20 to-orange-700/5 border-orange-600/30",
  ];
  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-[#020617] text-white pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-400 mb-4">
            <Wifi
              size={10}
              className={
                connected ? "text-emerald-400 animate-pulse" : "text-red-400"
              }
            />
            {connected ? "LIVE" : "CONNECTING..."}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Live Leaderboard
          </h1>
          <p className="text-slate-500 text-sm">
            {rows.length} participants ranked
          </p>
        </div>

        {/* Podium */}
        {top3.length > 0 && (
          <div className="flex justify-center items-end gap-4 mb-12">
            {/* 2nd */}
            {top3[1] && (
              <div
                className={`w-44 p-5 rounded-2xl bg-gradient-to-b ${podiumColors[1]} border backdrop-blur-sm text-center transition-all duration-500`}
              >
                <div className="text-3xl mb-2">{medals[1]}</div>
                <h3 className="text-sm font-bold text-white truncate">
                  {top3[1].name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-400">
                  <Layers size={10} /> {top3[1].levelsPassed}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {formatTime(top3[1].totalTime)}
                </div>
              </div>
            )}

            {/* 1st */}
            {top3[0] && (
              <div
                className={`w-52 p-6 rounded-2xl bg-gradient-to-b ${podiumColors[0]} border backdrop-blur-sm text-center transition-all duration-500 shadow-lg shadow-amber-500/10 -mt-4`}
              >
                <div className="text-4xl mb-2">{medals[0]}</div>
                <h3 className="text-base font-bold text-white truncate">
                  {top3[0].name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-300">
                  <Layers size={10} /> {top3[0].levelsPassed}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {formatTime(top3[0].totalTime)}
                </div>
              </div>
            )}

            {/* 3rd */}
            {top3[2] && (
              <div
                className={`w-44 p-5 rounded-2xl bg-gradient-to-b ${podiumColors[2]} border backdrop-blur-sm text-center transition-all duration-500`}
              >
                <div className="text-3xl mb-2">{medals[2]}</div>
                <h3 className="text-sm font-bold text-white truncate">
                  {top3[2].name}
                </h3>
                <div className="flex items-center justify-center gap-1 mt-2 text-xs text-slate-400">
                  <Layers size={10} /> {top3[2].levelsPassed}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {formatTime(top3[2].totalTime)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Full table */}
        <div
          className="rounded-2xl bg-[#0B1120] border border-slate-800/60 overflow-hidden"
          ref={tableRef}
        >
          <div className="px-6 py-4 border-b border-slate-800/60 flex items-center gap-2">
            <Trophy size={14} className="text-indigo-400" />
            <h2 className="text-sm font-bold text-slate-300">
              All Participants
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800/40">
                <th className="text-left px-6 py-3">Rank</th>
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3 flex items-center gap-1">
                  <Layers size={10} /> Levels
                </th>
                <th className="text-left px-6 py-3 flex items-center gap-1">
                  <Clock size={10} /> Time
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p, i) => (
                <tr
                  key={p._id}
                  className="border-b border-slate-800/30 last:border-0 hover:bg-slate-900/40 transition-colors duration-200"
                >
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold ${
                        i < 3
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                          : "text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-white font-medium">
                    {p.name}
                  </td>
                  <td className="px-6 py-3.5 text-indigo-400 font-bold">
                    {p.levelsPassed}
                  </td>
                  <td className="px-6 py-3.5 text-slate-400 font-mono text-xs">
                    {formatTime(p.totalTime)}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center text-slate-600 text-sm"
                  >
                    No participants yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

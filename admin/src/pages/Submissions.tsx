import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../service/http";
import { API } from "../service/api";

/* ── Types ── */

interface Attempt {
  _id: string;
  level: number;
  startTime: string;
  bestSubmitTime?: string;
  autoResult: string | null;
  adminResult: string | null;
}

interface Participant {
  _id: string;
  name: string;
  attempts: Attempt[];
}

interface Submission {
  _id: string;
  level: number;
  html: string;
  css?: string;
  js?: string;
  submittedAt: string;
  result: string;
}

const ALL_LEVELS = [1, 2, 3, 4, 5];

/* ── Component ── */

export default function Submissions() {
  const navigate = useNavigate();
  const { contestId, participantId } = useParams<{
    contestId: string;
    participantId: string;
  }>();

  const [participant, setParticipant] = useState<Participant | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [overriding, setOverriding] = useState<string | null>(null);
  const [expandedCode, setExpandedCode] = useState<
    Record<string, string | null>
  >({});

  /* ── Load participant (for attempts) ── */
  const loadParticipant = useCallback(async () => {
    if (!contestId) return;
    try {
      const res = await http.get(API.LIST_PARTICIPANTS(contestId));
      const all: Participant[] = res.data.participants ?? [];
      const found = all.find((p) => p._id === participantId) ?? null;
      setParticipant(found);
    } catch (err) {
      console.error("Fetch participant failed:", err);
    }
  }, [contestId, participantId]);

  /* ── Load submissions (code) ── */
  const loadSubmissions = useCallback(async () => {
    if (!contestId || !participantId) return;
    try {
      const res = await http.get(
        API.LIST_SUBMISSIONS(contestId, participantId),
      );
      setSubmissions(res.data.submissions ?? []);
    } catch (err) {
      console.error("Fetch submissions failed:", err);
    }
  }, [contestId, participantId]);

  /* ── Initial load ── */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadParticipant(), loadSubmissions()]);
      setLoading(false);
    };
    init();
  }, [loadParticipant, loadSubmissions]);

  /* ── Override (Pass / Fail) ── */
  const handleOverride = async (
    attemptId: string,
    adminResult: "accepted" | "rejected",
  ) => {
    try {
      setOverriding(attemptId);
      await http.put(API.OVERRIDE_ATTEMPT(attemptId), { adminResult });
      await Promise.all([loadParticipant(), loadSubmissions()]);
    } catch (err) {
      console.error("Override failed:", err);
    } finally {
      setOverriding(null);
    }
  };

  /* ── Toggle code panel ── */
  const toggleCode = (id: string, tab: string) => {
    setExpandedCode((prev) => ({
      ...prev,
      [id]: prev[id] === tab ? null : tab,
    }));
  };

  /* ── Helpers ── */
  const attempts = participant?.attempts ?? [];

  const getAttemptForLevel = (level: number): Attempt | undefined =>
    attempts.find((a) => a.level === level);

  const formatTimeTaken = (attempt: Attempt | undefined): string => {
    if (!attempt) return "—";
    const start = new Date(attempt.startTime).getTime();
    const end = attempt.bestSubmitTime
      ? new Date(attempt.bestSubmitTime).getTime()
      : Date.now();
    const ms = end - start;
    if (ms <= 0) return "—";
    const sec = Math.floor(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const badge = (value: string | null | undefined) => {
    const v = value || "pending";
    if (v === "accepted")
      return {
        text: "accepted",
        cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      };
    if (v === "rejected")
      return {
        text: "rejected",
        cls: "bg-red-500/10 text-red-400 border-red-500/20",
      };
    return {
      text: "pending",
      cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    };
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="p-8">
        <div className="h-7 w-52 bg-slate-800 rounded mb-6 animate-pulse" />
        <div className="h-64 bg-slate-800/40 rounded-xl animate-pulse mb-6" />
        <div className="grid gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-32 bg-slate-800/40 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white">
            {participant?.name ?? "Participant"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Level Control Panel & Code Submissions
          </p>
        </div>
        <button
          onClick={() => navigate(`/admin/contest/${contestId}`)}
          className="text-xs text-slate-500 hover:text-white transition-colors font-medium"
        >
          ← Back to Participants
        </button>
      </div>

      {/* ════════════════════════════════════════════════════
          SECTION A: 5-LEVEL CONTROL PANEL
         ════════════════════════════════════════════════════ */}
      <div className="mb-10 rounded-xl bg-[#0B1120] border border-slate-800/60 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800/60">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Level Control Panel
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800/40">
              <th className="text-left px-5 py-3">Level</th>
              <th className="text-left px-5 py-3">Auto Result</th>
              <th className="text-left px-5 py-3">Admin Result</th>
              <th className="text-left px-5 py-3">Time</th>
              <th className="text-right px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {ALL_LEVELS.map((level) => {
              const attempt = getAttemptForLevel(level);
              const auto = badge(attempt?.autoResult);
              const admin = badge(attempt?.adminResult);
              const hasAttempt = !!attempt;

              return (
                <tr
                  key={level}
                  className="border-b border-slate-800/30 last:border-0 hover:bg-slate-900/30 transition-colors"
                >
                  {/* Level */}
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                      LEVEL {level}
                    </span>
                  </td>

                  {/* Auto Result */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${auto.cls}`}
                    >
                      {auto.text}
                    </span>
                  </td>

                  {/* Admin Result */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${admin.cls}`}
                    >
                      {admin.text}
                    </span>
                  </td>

                  {/* Time */}
                  <td className="px-5 py-3.5 text-xs text-slate-400 font-mono">
                    {formatTimeTaken(attempt)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5 text-right">
                    {hasAttempt ? (
                      <div className="flex items-center justify-end gap-2">
                        {/* Show Pass only if NOT already accepted */}
                        {attempt.adminResult !== "accepted" && (
                          <button
                            onClick={() =>
                              handleOverride(attempt._id, "accepted")
                            }
                            disabled={overriding === attempt._id}
                            className="px-3 py-1 rounded-md text-[11px] font-bold bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white hover:border-emerald-500 transition-all disabled:opacity-40 disabled:cursor-wait"
                          >
                            {overriding === attempt._id ? "..." : "Pass"}
                          </button>
                        )}
                        {/* Fail always visible (for rollback or reject) */}
                        <button
                          onClick={() =>
                            handleOverride(attempt._id, "rejected")
                          }
                          disabled={overriding === attempt._id}
                          className="px-3 py-1 rounded-md text-[11px] font-bold bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600 hover:text-white hover:border-red-500 transition-all disabled:opacity-40 disabled:cursor-wait"
                        >
                          {overriding === attempt._id ? "..." : "Fail"}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-600 font-mono italic">
                        No attempt started
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ════════════════════════════════════════════════════
          SECTION B: CODE SUBMISSIONS (READ-ONLY)
         ════════════════════════════════════════════════════ */}
      <div className="mb-4">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          Code Submissions ({submissions.length})
        </h2>
      </div>

      {submissions.length === 0 && (
        <div className="text-center py-16 rounded-xl bg-[#0B1120] border border-slate-800/60">
          <p className="text-slate-500 text-sm">
            No code submissions from this participant.
          </p>
        </div>
      )}

      <div className="grid gap-4">
        {submissions.map((s) => {
          const expanded = expandedCode[s._id] ?? null;
          const b = badge(s.result);

          return (
            <div
              key={s._id}
              className="rounded-xl bg-[#0B1120] border border-slate-800/60 overflow-hidden"
            >
              {/* Submission header */}
              <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                    LEVEL {s.level}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${b.cls}`}
                  >
                    {b.text}
                  </span>
                  <span className="text-xs text-slate-600 font-mono">
                    {new Date(s.submittedAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Code toggle tabs */}
              <div className="flex border-t border-slate-800/60">
                {(
                  [
                    {
                      key: "html",
                      label: "HTML",
                      color: "text-orange-400",
                      code: s.html,
                    },
                    {
                      key: "css",
                      label: "CSS",
                      color: "text-blue-400",
                      code: s.css,
                    },
                    {
                      key: "js",
                      label: "JS",
                      color: "text-yellow-400",
                      code: s.js,
                    },
                  ] as const
                ).map((tab) =>
                  tab.code ? (
                    <button
                      key={tab.key}
                      onClick={() => toggleCode(s._id, tab.key)}
                      className={`flex-1 px-4 py-2.5 text-xs font-bold transition-all border-r border-slate-800/40 last:border-r-0 ${
                        expanded === tab.key
                          ? `${tab.color} bg-slate-900/80`
                          : "text-slate-600 hover:text-slate-400 hover:bg-slate-900/40"
                      }`}
                    >
                      {tab.label}
                      <span className="ml-1.5 text-[10px] opacity-60">
                        {expanded === tab.key ? "▲" : "▼"}
                      </span>
                    </button>
                  ) : null,
                )}
              </div>

              {/* Code panel */}
              {expanded && (
                <div className="border-t border-slate-800/60 bg-[#020617]">
                  <pre className="p-4 text-xs font-mono text-slate-400 leading-relaxed overflow-x-auto max-h-72 overflow-y-auto whitespace-pre-wrap">
                    {expanded === "html" && s.html}
                    {expanded === "css" && s.css}
                    {expanded === "js" && s.js}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../service/http";
import { API } from "../service/api";

interface QuestionMeta {
  id: string;
  title: string;
}

type PoolMap = Record<string, QuestionMeta[]>; // "1" -> [{id,title}, ...]

export default function CreateContest() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [levels, setLevels] = useState<number[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [pools, setPools] = useState<PoolMap>({});
  const [selectedQuestions, setSelectedQuestions] = useState<
    Record<number, string>
  >({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPools, setLoadingPools] = useState(true);

  /* ── Load question pools on mount ── */
  useEffect(() => {
    http
      .get(API.QUESTION_POOLS)
      .then((res) => setPools(res.data.pools ?? {}))
      .catch((err) => console.error("Load pools failed:", err))
      .finally(() => setLoadingPools(false));
  }, []);

  /* ── Toggle level ── */
  const toggleLevel = (n: number) => {
    setLevels((prev) => {
      if (prev.includes(n)) {
        // Remove level and its selected question
        setSelectedQuestions((sq) => {
          const copy = { ...sq };
          delete copy[n];
          return copy;
        });
        return prev.filter((l) => l !== n);
      }
      return [...prev, n].sort();
    });
  };

  /* ── Select question for a level ── */
  const selectQuestion = (level: number, questionId: string) => {
    setSelectedQuestions((prev) => ({ ...prev, [level]: questionId }));
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    if (levels.length === 0) {
      setError("Select at least one level.");
      return;
    }
    if (!startTime || !endTime) {
      setError("Start time and end time are required.");
      return;
    }

    // Validate each level has a question selected
    for (const level of levels) {
      if (!selectedQuestions[level]) {
        setError(`Select a question for Level ${level}.`);
        return;
      }
    }

    const questions = levels.map((level) => ({
      level,
      questionId: selectedQuestions[level],
    }));

    try {
      setSubmitting(true);
      await http.post(API.CREATE_CONTEST, {
        title: title.trim(),
        description: description.trim(),
        levels,
        questions,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
      });
      navigate("/admin");
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      console.error("Create contest failed:", err);
      setError(
        axiosErr?.response?.data?.message || "Failed to create contest.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg bg-[#020617] border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all";

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-white">Create Contest</h1>
        <button
          onClick={() => navigate("/admin")}
          className="text-xs text-slate-500 hover:text-white transition-colors font-medium"
        >
          ← Back
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-xl bg-[#0B1120] border border-slate-800/60 space-y-5"
      >
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. NCS Arena Round 1"
            className={inputClass}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what this contest is about..."
            rows={3}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Levels (toggle buttons) */}
        <div>
          <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
            Levels
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => toggleLevel(n)}
                className={`w-12 h-10 rounded-lg text-sm font-bold border transition-all duration-200 ${
                  levels.includes(n)
                    ? "bg-indigo-600 text-white border-indigo-500"
                    : "bg-[#020617] text-slate-500 border-slate-800 hover:border-slate-600 hover:text-slate-300"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Per-level question dropdowns */}
        {levels.length > 0 && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
              Question Selection
            </label>

            {loadingPools ? (
              <div className="h-10 bg-slate-800/40 rounded-lg animate-pulse" />
            ) : (
              levels.map((level) => {
                const pool = pools[String(level)] ?? [];
                return (
                  <div key={level} className="flex items-center gap-3">
                    <span className="px-2 py-1 text-[10px] font-bold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono flex-none w-16 text-center">
                      L{level}
                    </span>
                    <select
                      value={selectedQuestions[level] ?? ""}
                      onChange={(e) => selectQuestion(level, e.target.value)}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">— Select question —</option>
                      {pool.map((q) => (
                        <option key={q.id} value={q.id}>
                          {q.id} — {q.title}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* Date/Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
              Start Time
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1.5 uppercase tracking-wider">
              End Time
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-lg text-sm font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition-all disabled:opacity-50 disabled:cursor-wait"
        >
          {submitting ? "Creating..." : "Create Contest"}
        </button>
      </form>
    </div>
  );
}

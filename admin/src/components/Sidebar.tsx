import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const contestMatch = location.pathname.match(/\/admin\/contest\/([^/]+)/);
  const currentContestId = contestMatch ? contestMatch[1] : null;

  const linkClass = (isActive: boolean) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <aside className="w-60 flex-none h-screen bg-[#0B1120] border-r border-slate-800/60 flex flex-col">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-xs font-black text-white">
            N
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">
              NCS Arena
            </h2>
            <p className="text-[10px] text-slate-500 font-medium">
              Admin Console
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          Navigation
        </p>

        <NavLink
          to="/admin"
          end
          className={({ isActive }) => linkClass(isActive)}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          All Contests
        </NavLink>

        <NavLink
          to="/admin/create-contest"
          className={({ isActive }) => linkClass(isActive)}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create Contest
        </NavLink>

        {/* Contextual breadcrumb */}
        {currentContestId && (
          <>
            <p className="px-3 mt-5 mb-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              Current Contest
            </p>
            <NavLink
              to={`/admin/contest/${currentContestId}`}
              end
              className={({ isActive }) => linkClass(isActive)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Participants
            </NavLink>
          </>
        )}
      </nav>

      {/* Footer — Logout */}
      <div className="px-3 py-4 border-t border-slate-800/60 space-y-2">
        <div className="flex items-center gap-2 px-3 mb-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] text-slate-500 font-medium">
            System Online
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}

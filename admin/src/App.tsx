import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Participants from "./pages/Participants";
import Submissions from "./pages/Submissions";
import CreateContest from "./pages/CreateContest";
import Login from "./pages/Login";

/* ── Auth Guard ── */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const location = useLocation();

  if (!isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public — Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected — everything else */}
        <Route
          path="/admin/*"
          element={
            <RequireAuth>
              <div className="flex h-screen bg-[#020617] text-white overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route
                      path="contest/:contestId"
                      element={<Participants />}
                    />
                    <Route
                      path="contest/:contestId/:participantId"
                      element={<Submissions />}
                    />
                    <Route path="create-contest" element={<CreateContest />} />
                  </Routes>
                </main>
              </div>
            </RequireAuth>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

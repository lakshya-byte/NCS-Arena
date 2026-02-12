import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateContest from "./pages/CreateContest";
import Participants from "./pages/Participants";
import AdminNavbar  from "./components/AdminNavbar";

export default function App() {
  return (
    <BrowserRouter>
      <AdminNavbar />

      <div className="min-h-screen bg-[#020617] text-white p-6 pt-20">
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-contest" element={<CreateContest />} />
          <Route
            path="/admin/participants/:contestId"
            element={<Participants />}
          />

          {/* default */}
          <Route path="*" element={<Navigate to="/admin/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

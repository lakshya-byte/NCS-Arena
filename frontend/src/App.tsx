import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Playground from "./pages/Playground";
import Leaderboard from "./pages/Leaderboard";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Contests } from "./pages/Contests";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#020617]">
        
        {/* NAVBAR (fixed at top) */}
        <Navbar />

        {/* PAGE CONTENT — pushed below navbar */}
        <main className="flex-1 pt-20 px-8 z-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register/:contestId" element={<Register />} />
            <Route
              path="/play/:contestId/:participantId/:questionId"
              element={<Playground />}
            />
            <Route path="/leaderboard/:contestId" element={<Leaderboard />} />
            <Route path="/contests" element={<Contests />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

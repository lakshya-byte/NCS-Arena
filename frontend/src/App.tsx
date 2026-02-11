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
    <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/:contestId" element={<Register />} />
        <Route path="/play/:contestId/:participantId/:questionId" element={<Playground />} />
        <Route path="/leaderboard/:contestId" element={<Leaderboard />} />
        <Route path="/contests" element={<Contests />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

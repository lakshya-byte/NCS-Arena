import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Playground from "./pages/Playground";
import Leaderboard from "./pages/Leaderboard";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import HowItWorksPage from "./pages/HowItWorksPage";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Contests } from "./pages/Contests";

const Layout = () => {
  const { pathname } = useLocation();
  const hideNavbar =
    pathname.startsWith("/play/") || pathname.startsWith("/leaderboard/");

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      {!hideNavbar && <Navbar />}

      <main className="flex-1 z-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/register/:contestId" element={<Register />} />
          <Route
            path="/play/:contestId/:participantId/:questionId"
            element={<Playground />}
          />
          <Route path="/leaderboard/:contestId" element={<Leaderboard />} />
        </Routes>
      </main>

      {!hideNavbar && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

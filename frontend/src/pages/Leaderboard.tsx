import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../services/http";
import { ENDPOINTS } from "../services/api";
import { socket } from "../lib/socket";
import gsap from "gsap";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Player {
  _id: string;
  name: string;
  levelsPassed: number;
  totalTime: number;
}

const Leaderboard = () => {
  const { contestId } = useParams();
  const [rows, setRows] = useState<Player[]>([]);
  const podiumRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ---------------- INITIAL FETCH + SOCKET ----------------
  useEffect(() => {
    if (!contestId) return;

    apiClient.get(ENDPOINTS.LEADERBOARD(contestId)).then((res) => {
      console.log(res.data);
      setRows(res.data.leaderboard);
    });

    socket.emit("joinContest", { contestId });

    socket.on("leaderboard:update", (data) => {
      setRows(data);
    });

    return () => {
      socket.off("leaderboard:update");
    };
  }, [contestId]);

  // ---------------- ANIMATE PODIUM ON UPDATE ----------------
  useEffect(() => {
    gsap.fromTo(
      podiumRefs.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      },
    );
  }, [rows]);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Live Leaderboard</h1>

      {/* ---------------- PODIUM ---------------- */}
      <div className="flex justify-center items-end gap-6 mb-10">
        {/* 2nd PLACE */}
        {top3[1] && (
          <Card
            ref={(el) => (podiumRefs.current[1] = el)}
            className="w-52 bg-slate-900 border-slate-800"
          >
            <CardHeader>
              <CardTitle className="text-center text-slate-300">
                🥈 {top3[1].name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm">Levels: {top3[1].levelsPassed}</p>
              <p className="text-xs text-slate-400">
                Time: {top3[1].totalTime} ms
              </p>
            </CardContent>
          </Card>
        )}

        {/* 1st PLACE */}
        {top3[0] && (
          <Card
            ref={(el) => (podiumRefs.current[0] = el)}
            className="w-60 bg-indigo-900/20 border-indigo-500/40 shadow-indigo-500/20 shadow-lg"
          >
            <CardHeader>
              <CardTitle className="text-center text-indigo-300">
                🥇 {top3[0].name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm">Levels: {top3[0].levelsPassed}</p>
              <p className="text-xs text-slate-400">
                Time: {top3[0].totalTime} ms
              </p>
            </CardContent>
          </Card>
        )}

        {/* 3rd PLACE */}
        {top3[2] && (
          <Card
            ref={(el) => (podiumRefs.current[2] = el)}
            className="w-52 bg-slate-900 border-slate-800"
          >
            <CardHeader>
              <CardTitle className="text-center text-slate-300">
                🥉 {top3[2].name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm">Levels: {top3[2].levelsPassed}</p>
              <p className="text-xs text-slate-400">
                Time: {top3[2].totalTime} ms
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ---------------- REST OF LEADERBOARD ---------------- */}
      <Card className="bg-[#0B1120] border-slate-800">
        <CardHeader>
          <CardTitle className="text-slate-200">All Participants</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-400">Rank</TableHead>
                <TableHead className="text-slate-400">Name</TableHead>
                <TableHead className="text-slate-400">Levels Passed</TableHead>
                <TableHead className="text-slate-400">
                  Total Time (ms)
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rest.map((p, i) => (
                <TableRow key={p._id} className="border-slate-800">
                  <TableCell className="text-slate-300">{i + 4}</TableCell>
                  <TableCell className="text-slate-300">{p.name}</TableCell>
                  <TableCell className="text-slate-300">
                    {p.levelsPassed}
                  </TableCell>
                  <TableCell className="text-slate-400">
                    {p.totalTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;

import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    // ---- JOIN CONTEST ROOM ----
    socket.on("joinContest", ({ contestId, participantId }) => {
      if (!contestId) return;

      const room = `contest:${contestId}`;
      socket.join(room);

      console.log(
        `Socket ${socket.id} joined room ${room} (participant: ${participantId || "guest"})`
      );
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

interface ServerToClientEvents {
  notification: (message: string) => void;
  error: (err: { code: string; message: string }) => void;
}

interface ClientToServerEvents {
  join_room: (roomId: string) => void;
  send_message: (payload: { roomId: string; text: string }) => void;
}

interface InterServerEvents {

}

interface SocketData {
  userId: string; 
}

export const initWebSocket = (httpServer: HttpServer) => {
  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    },
    pingTimeout: 60000, 
    connectionStateRecovery: {
    } 
  });

  io.use((socket, next) => {
    const token = socket.handshake.headers['authorization']
    if (token) {
        //socket.data.userId = "user_123"; 
        const bearerToken = (token as string).split(' ')[1];
        // Giải mã và xác thực token ở đây, ví dụ sử dụng JWT
        return next();
    }
    next(new Error("Authentication error"));
  });

  return io;
};
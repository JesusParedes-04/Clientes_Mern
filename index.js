import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./db/connection.js";
import userRouter from "./routes/users.routes.js";
import clientRouter from "./routes/client.routes.js";
import http from "http"; 
import { Server } from "socket.io";

const app = express();
// Crea un servidor HTTP usando Express
const server = http.createServer(app);
// Crea una instancia de socket.io pasando el servidor HTTP 
const io = new Server(server); 

dotenv.config();
// Procesa info de tipo json
app.use(express.json());
conectarDB();

// Configurar CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
}));

// Routing
app.use("/api/users", userRouter);
app.use('/api/clients', clientRouter);

// Socket.IO
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("clienteCreado", (cliente) => {
    console.log("Cliente creado:", cliente);
    io.emit("nuevoCliente", cliente); 
  });
});

server.listen(8080, () => {
  console.log("Server express listening on port 8080");
});

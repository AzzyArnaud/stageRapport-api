const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const ip = require("ip");
const fileUpload = require("express-fileupload");
const RESPONSE_CODES = require("./constants/RESPONSE_CODES");
const RESPONSE_STATUS = require("./constants/RESPONSE_STATUS");
const UserRoutes = require("./routes/utilisateurs/userRoutes");
const categoriesRouter = require("./routes/categories/categoriesRoutes");
const ArticleRoutes = require("./routes/article/articleRoutes");
const chatRoutes = require("./routes/chatMessage/chatMessageRoutes");

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");

// Configuration de l'environnement
dotenv.config({ path: path.join(__dirname, "./.env") });

// Configuration CORS pour Express
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Initialisation de Socket.IO avec configuration CORS
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Routes
app.use("/users", UserRoutes);
app.use("/category", categoriesRouter);
app.use("/articles", ArticleRoutes);
app.use("/message", chatRoutes);

// Gestion des sockets en temps réel
io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté : ", socket.id);

  socket.on("chatMessage", (message) => {
    console.log("Message reçu : ", message);
    io.emit("chatMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté : ", socket.id);
  });
});

// Gestion des routes non trouvées
app.all("*", (req, res) => {
  res.status(RESPONSE_CODES.NOT_FOUND).json({
    statusCode: RESPONSE_CODES.NOT_FOUND,
    httpStatus: RESPONSE_STATUS.NOT_FOUND,
    message: "Route non trouvée",
    result: [],
  });
});

// Port
const port = process.env.PORT || 8000;

// Démarrage du serveur
server.listen(port, () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} - Server is running on : http://${ip.address()}:${port}/`
  );
});

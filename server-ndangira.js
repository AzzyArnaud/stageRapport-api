const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
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
dotenv.config({ path: path.join(__dirname, "./.env") });

const cron = require("./cronJob");

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.use("/users", UserRoutes);
app.use("/category", categoriesRouter);
app.use("/articles", ArticleRoutes);
app.use("/message", chatRoutes);

app.all("*", (req, res) => {
  res.status(RESPONSE_CODES.NOT_FOUND).json({
    statusCode: RESPONSE_CODES.NOT_FOUND,
    httpStatus: RESPONSE_STATUS.NOT_FOUND,
    message: "Route non trouvé",
    result: [],
  });
});
const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(
    `${process.env.NODE_ENV.toUpperCase()} - Server is running on : http://${ip.address()}:${port}/`
  );
});

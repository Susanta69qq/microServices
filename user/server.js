import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(3001, () => {
  console.log("UserService is running on port 3001");
});

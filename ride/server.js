import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(3003, () => {
  console.log("ride service is running on port 3003");
});

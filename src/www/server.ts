import * as http from "http";
import { startServer } from "../app";
import { port } from "../config/app";

async function main() {
  const app = await startServer();
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server on port ${port}`);
  });
}

main();

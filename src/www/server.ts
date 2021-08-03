import { startServer } from "../app";

async function main() {
  const app = await startServer();
  const port = process.env.PORT;

  app.listen(port, () => {
    console.log(`Server on port ${port}`);
  });
}

main();

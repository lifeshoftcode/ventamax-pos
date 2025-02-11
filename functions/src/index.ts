import { onRequest } from "firebase-functions/v2/https";
import {keepSupabaseAlive, keepSupabaseAlive310, keepSupabaseAlive925, keepSupabaseAlive22000} from "./keepSupabaseAlive";


export { keepSupabaseAlive, keepSupabaseAlive310, keepSupabaseAlive925, keepSupabaseAlive22000 };

// Add HTTP function for Cloud Run health check
export const healthCheck = onRequest((_req, res) => {
  res.send("Server running.");
});

// Remove the conditional Express server startup block
// if (require.main === module) {
//   const app = express();
//   app.get("/", (_req: express.Request, res: express.Response) => res.send("Server running."));
//   const port = process.env.PORT || 8080;
//   app.listen(port, () => console.log(`Listening on port ${port}`));
// }


import express, { Request, Response } from "express";
import cors from "cors";

import documents from "./routes/documents";
import account from "./routes/account";

const PORT = 5005;
const BASE_URL = "/TrustID/v1";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  console.log(req.url);
  res.send("App up and running");
});

app.listen(PORT, () => {
  console.log("Listening on Port ", PORT);
});

app.use("/TrustID/v1/documents", documents);
app.use(BASE_URL + "/accounts", account);

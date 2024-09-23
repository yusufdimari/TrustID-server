import express, { Request, Response } from "express";
import cors from "cors";
var admin = require("firebase-admin");

const config = require("../credentials.json");
import documents from "./routes/documents";
import account from "./routes/account";
import nft from "./routes/nft";
import fileUpload from "./routes/fileUpload";
import file from "./routes/file";

const PORT = process.env.PORT || 5005;
const BASE_URL = "/TrustID/v1";
const app = express();

admin.initializeApp({
  credential: admin.credential.cert(config),
});
app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("App up and running");
});

app.listen(PORT, () => {
  console.log("Listening on Port ", PORT);
});

app.use(BASE_URL + "/documents", documents);
app.use(BASE_URL + "/accounts", account);
app.use(BASE_URL + "/nft", nft);
app.use(BASE_URL + "/file-upload", fileUpload);
app.use(BASE_URL + "/file", file);

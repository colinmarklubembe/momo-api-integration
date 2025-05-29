import express from "express";
import dotenv from "dotenv";
import { handleUssdRequests } from "./ussd/controller";
import type { Request, RequestHandler, Response } from "express";

dotenv.config();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to the MTN Momo Integration API");
});

// Service code for requests: *384*59948#
app.post("/ussd", handleUssdRequests as unknown as RequestHandler);

app
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`Environment: ${ENV}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });

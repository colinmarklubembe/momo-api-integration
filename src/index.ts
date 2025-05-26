import express from "express";
import type { Request, Response } from "express";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV || "development";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to the MTN Momo Integration API");
});

app
  .listen(PORT, () => {
    console.log(`Server started on and is running on port ${PORT}`);
    console.log(`Environment: ${ENV}`);
  })
  .on("error", (err) => {
    console.error("Failed to start server:", err);
  });

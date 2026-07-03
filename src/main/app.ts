import express, { type NextFunction, type Request, type Response } from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { makeDependencies } from "./container.js";
import { createRoutes } from "./routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createApp = () => {
  const app = express();
  const dependencies = makeDependencies();

  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

  app.use(express.json());
  app.use(express.static(join(__dirname, "../../public")));
  app.use(createRoutes(dependencies));

  return app;
};

import express, { Express, NextFunction, Request, Response, Router } from "express";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";

import { contextualizeRequest, respondError, respondSuccess } from "./helpers";
import { NotFoundError, R } from "./models";
import { RegisterRoutes } from "./routes";

const firebaseConfig: R<string | number> = process.env.CONFIG
  ? JSON.parse(process.env.CONFIG)
  : undefined;

initializeApp(firebaseConfig);
export const store = getFirestore();

const app: Express = express();
const router = Router();

app.use(express.json());
app.use(contextualizeRequest);
app.use("/api", router);

RegisterRoutes(router); // mount the TSOA generated handlers

router.get("/test", async (_request: Request, response: Response) => {
  respondSuccess(200, response);
});

app.all("*", (request: Request, _response: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot ${request.method.toUpperCase()} ${request.path}`));
});

app.use(respondError);

export const api = onRequest(app);

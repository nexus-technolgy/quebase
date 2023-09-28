/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import express, { Express, Request, Response } from "express";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { onRequest } from "firebase-functions/v2/https";

import { contextualizeRequest, respondError, respondSuccess } from "./helpers";
import { R } from "./models";
import { RegisterRoutes } from "./routes";

const firebaseConfig: R<string | number> = process.env.CONFIG
  ? JSON.parse(process.env.CONFIG)
  : undefined;

initializeApp(firebaseConfig);
export const store = getFirestore();

const app: Express = express();
export const api = onRequest(app);

app.use(express.json());
app.use(contextualizeRequest);
app.get("/test", (_request: Request, response: Response) => respondSuccess(200, response));

if (!app.request.errored) RegisterRoutes(app);

app.use(respondError);

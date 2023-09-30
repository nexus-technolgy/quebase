/**
 * Source: @nexustech/quebase
 *
 * Copyright 2023 Nexustech Pty Ltd [AU]
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License in the root of this project, or at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

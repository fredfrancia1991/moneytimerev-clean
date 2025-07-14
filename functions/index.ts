import * as functions from "firebase-functions";
import next from "next";
import * as express from "express";

const isDev = process.env.NODE_ENV !== "production";
const app = next({ dev: isDev, conf: { distDir: ".next" } });
const handle = app.getRequestHandler();

export const nextApp = functions.https.onRequest(async (req, res) => {
  await app.prepare();
  handle(req, res);
});

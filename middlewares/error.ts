/* eslint-disable import/no-anonymous-default-export */
import { NextApiResponse } from "next";
import { Next } from "../types/custom";

const httpErrors: object = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  500: "Internal server error",
};

const isKnownHTTPErrorStatus = (num: number) =>
  typeof num === "number" && Object.keys(httpErrors).indexOf(`${num}`) >= 0;

export default (
  err: any,
  req: Next.Custom,
  resp: NextApiResponse,
  next: any
) => {
  const statusCode = isKnownHTTPErrorStatus(err) ? err : err.statusCode || 500;
  const message = err.message || httpErrors;
  [statusCode] || err;
  if (statusCode === 500) {
    console.error(statusCode, message);
  }

  resp.status(statusCode).json({ statusCode, message });
  next();
};

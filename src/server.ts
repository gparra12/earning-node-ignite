import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";

import "./database";
import "./shared/container";
import swaggerFile from "./swagger.json";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internatl server error - ${err.message}`,
    });
  }
);

const port: number = 3333;
app.listen(port, () => console.log("Server is running!"));

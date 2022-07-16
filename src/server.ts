import express from "express";
import swaggerUI from "swagger-ui-express";

import swaggerFile from "./swagger.json";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

const port: number = 8080;
app.listen(port, () => console.log("Server is running!"));

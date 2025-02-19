import express, { Express } from "express";
import bodyParser from "body-parser";

import { default as homeworkRoutes } from "./routes/homework.routes";
import { default as miscRoutes } from "./routes/misc.routes";
import { default as loginRoutes } from "./routes/login.routes";

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/homeworks", homeworkRoutes);
app.use("/login", loginRoutes);
app.use("/", miscRoutes);

app.listen(port, () => {
  console.log(`[server]: Server Lisa is running at http://localhost:${port}`);
});

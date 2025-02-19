import express, { Express } from "express";
import bodyParser from "body-parser";

import { default as homeworkRouter } from "./routes/homework.routes";
import { default as loginRouter } from "./routes/login.routes";
import { default as miscRouter } from "./routes/misc.routes";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

app.use("/homeworks", homeworkRouter);
app.use("/login", loginRouter);
app.use("/", miscRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`[server]: Server Bart is running at http://localhost:${port}`);
});

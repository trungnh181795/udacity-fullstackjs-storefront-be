import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import user_routes from "./routes/user";
import product_routes from "./routes/product";
import order_routes from "./routes/order";

const app: Application = express();

const port = process.env.ENV === "test" ? 4000 : 4001;

app.use(bodyParser.json());
app.use(
  cors({
    origin: `https://localhost:${port}`,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

user_routes(app);
product_routes(app);
order_routes(app);

app.listen(port, () => {
  console.info(`App is listening at http://localhost:${port}`);
});

export default app;

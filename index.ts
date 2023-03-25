import express, { Application } from "express";
import cors from "cors";

import Gpt35Controller from "./application/interfaceAdapter/gpt35Controller";

const app: Application = express();
const gpt35Controller = new Gpt35Controller();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/chat", (req, res) => {
  gpt35Controller.reply(req, res);
});

app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});

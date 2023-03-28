import express, { Application } from "express";
import cors from "cors";

import {
  Gpt35Controller,
  Gpt3Controller,
  RinnaController,
} from "./application/interfaceAdapter/index";

const app: Application = express();
const rinnaController = new RinnaController();
const gpt3Controller = new Gpt3Controller();
const gpt35Controller = new Gpt35Controller();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/chat/gpt3", gpt3Controller.reply.bind(gpt3Controller));
app.post("/chat/gpt35", gpt35Controller.reply.bind(gpt35Controller));
app.post("/chat/rinna", rinnaController.reply.bind(rinnaController));
app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
  console.log("You can access the app at http://localhost:3000/");
});

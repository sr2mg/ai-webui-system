import { Request, Response } from "express";
import { ReplyMessageUseCase } from "../usecase/index";
import ChatMessage from "../../domain/entity/chatMessage";
import { RinnaApi } from "../../interface/index";
import Dotenv from "dotenv";

class RinnaController {
  useCase: ReplyMessageUseCase;
  constructor() {
    this.useCase = new ReplyMessageUseCase(new RinnaApi());
    Dotenv.config();
  }

  async reply(request: Request, response: Response) {
    const apiKey =
      request.body.apiKey !== ""
        ? request.body.apiKey
        : process.env.RINNA_API_KEY;
    const message = request.body.message;
    const data = {
      rawInput: message,
    };
    const endpoint = "models/cce";
    const return_json = await this.useCase.execute(data, apiKey, endpoint);
    // return_jsonがえらーのときの処理
    let content = "";
    if (response.statusCode !== 200) {
      content = return_json["status"] + ":" + return_json["error"]["RawInput"];
    } else {
      content = return_json["answer"];
    }
    const chatMessage: ChatMessage = new ChatMessage(content, "bot");
    response.status(200).json(chatMessage);
  }
}
export default RinnaController;

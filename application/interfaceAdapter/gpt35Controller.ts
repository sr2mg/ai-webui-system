import { Request, Response } from "express";
import { ReplyMessageUseCase } from "../usecase/index";
import ChatMessage from "../../domain/entity/chatMessage";
import Dotenv from "dotenv";
class Gpt35Controller {
  useCase: ReplyMessageUseCase;
  constructor() {
    this.useCase = new ReplyMessageUseCase();
    Dotenv.config();
  }

  async reply(request: Request, response: Response) {
    const apiKey =
      request.body.apiKey !== ""
        ? request.body.apiKey
        : process.env.OPENAI_API_KEY;
    const message = request.body.message;
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    const return_json = await this.useCase.execute(data, apiKey);
    // return_jsonがえらーのときの処理
    let content = "";
    if (return_json["error"] !== undefined) {
      content = return_json["error"]["message"];
    } else {
      content = return_json["choices"][0]["message"]["content"];
    }
    const chatMessage: ChatMessage = new ChatMessage(content, "bot");
    response.status(200).json(chatMessage);
  }
}
export default Gpt35Controller;

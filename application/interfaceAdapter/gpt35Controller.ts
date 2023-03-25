import { Request, Response } from "express";
import { ReplyMessageUseCase } from "../usecase/index";
import ChatMessage from "../../domain/entity/chatMessage";

class Gpt35Controller {
  useCase: ReplyMessageUseCase;
  constructor() {
    this.useCase = new ReplyMessageUseCase();
  }

  async reply(request: Request, response: Response) {
    const apiKey = request.body.apiKey;
    const message = request.body.message;
    const data = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    };
    const return_json = await this.useCase.execute(data, apiKey);
    const content = return_json["choices"][0]["message"]["content"];
    const chatMessage: ChatMessage = new ChatMessage(content, "bot");
    response.status(200).json(chatMessage);
  }
}
export default Gpt35Controller;

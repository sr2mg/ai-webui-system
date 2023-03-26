import { Request, Response } from "express";
import { ReplyMessageUseCase } from "../usecase/index";
import ChatMessage from "../../domain/entity/chatMessage";
import OpenaiApi from "../../interface/openaiApi";
import Dotenv from "dotenv";
class Gpt3Controller {
  useCase: ReplyMessageUseCase;
  maxTokens = 100;
  constructor() {
    this.useCase = new ReplyMessageUseCase(new OpenaiApi());
    Dotenv.config();
  }

  async reply(request: Request, response: Response) {
    const apiKey =
      request.body.apiKey !== ""
        ? request.body.apiKey
        : process.env.OPENAI_API_KEY;
    const message = request.body.message;
    const data = {
      model: "text-davinci-003",
      prompt: message,
      max_tokens: this.maxTokens,
    };
    const endpoint = "v1/completions";
    const return_json = await this.useCase.execute(data, apiKey, endpoint);
    // return_jsonがえらーのときの処理
    let content = "";
    if (return_json["error"] !== undefined) {
      content = return_json["error"]["message"];
    } else {
      content = return_json["choices"][0]["text"];
    }
    const chatMessage: ChatMessage = new ChatMessage(content, "bot");
    response.status(200).json(chatMessage);
  }
}
export default Gpt3Controller;

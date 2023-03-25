import ChatMessage from "../../domain/entity/chatMessage";
import GptApi from "../../interface/gptApi";

class ReplyMessageUseCase {
  gptApi: GptApi;
  constructor(gptApi = new GptApi()) {
    this.gptApi = gptApi;
  }

  async execute(input, apiKey) {
    const gptResponse = await this.gptApi.callgptApi(input, apiKey);
    //const chatMessage = new ChatMessage(gptResponse, "bot");
    return gptResponse;
  }
}

export default ReplyMessageUseCase;

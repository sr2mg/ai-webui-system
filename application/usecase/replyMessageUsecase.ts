import ApiInterface from "../../interface/apiInterface";

class ReplyMessageUseCase {
  Api: ApiInterface;
  constructor(Api: ApiInterface) {
    this.Api = Api;
  }

  async execute(input, apiKey, endpoint) {
    console.log("ReplyMessageUseCase.execute");
    const gptResponse = await this.Api.call(input, apiKey, endpoint);
    return gptResponse;
  }
}

export default ReplyMessageUseCase;

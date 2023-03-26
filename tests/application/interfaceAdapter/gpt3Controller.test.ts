import { Request, Response } from "express";
import Gpt3Controller from "../../../application/interfaceAdapter/gpt3Controller";
import ReplyMessageUseCase from "../../../application/usecase/replyMessageUsecase";

// モック用のクラスを定義する
class MockReplyMessageUseCase implements ReplyMessageUseCase {
  Api;
  async execute(input: any, apiKey: string, endpoint: string): Promise<any> {
    // テスト用の適当な値を返す
    return {
      choices: [{ text: "Reply from GPT-3" }],
    };
  }
}

// モック用のリクエストとレスポンスを定義する
const mockRequest = {
  body: {
    apiKey: "test_api_key",
    message: "Hello",
  },
};
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Gpt3Controller", () => {
  test("reply method should return a valid ChatMessage object", async () => {
    // Arrange
    const mockUseCase = new MockReplyMessageUseCase();
    const controller = new Gpt3Controller();
    controller.useCase = mockUseCase as ReplyMessageUseCase;

    // Act
    await controller.reply(
      mockRequest as Request,
      mockResponse as unknown as Response
    );

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      content: "Reply from GPT-3",
      speaker: "bot",
    });
  });
});

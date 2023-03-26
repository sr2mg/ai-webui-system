import { Request, Response } from "express";
import RinnaController from "../../../application/interfaceAdapter/rinnaController";
import ReplyMessageUseCase from "../../../application/usecase/replyMessageUsecase";
import ChatMessage from "../../../domain/entity/chatMessage";

// モック用のクラスを定義する
class MockReplyMessageUseCase implements ReplyMessageUseCase {
  Api;
  async execute(input: any, apiKey: string, endpoint: string): Promise<any> {
    // テスト用の適当な値を返す
    return {
      answer: "Reply from Rinna",
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
// TODO: 異常系も欲しい
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
  statusCode: 200,
};

describe("RinnaController", () => {
  test("reply method should return a valid ChatMessage object", async () => {
    // Arrange
    const mockUseCase = new MockReplyMessageUseCase();
    const controller = new RinnaController();
    controller.useCase = mockUseCase as ReplyMessageUseCase;

    // Act
    await controller.reply(
      mockRequest as Request,
      mockResponse as unknown as Response
    );

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(
      new ChatMessage("Reply from Rinna", "bot")
    );
  });
});

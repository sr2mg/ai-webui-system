import ApiInterface from "../../../interface/apiInterface";
import ReplyMessageUseCase from "../../../application/usecase/replyMessageUsecase";

// Mock ApiInterfaceクラスの実装
class MockApiInterface implements ApiInterface {
  async call(input: any, apiKey: string, endpoint: string): Promise<any> {
    // テストのための適当な値を返す
    return {
      message: "Reply from GPT-3",
      input,
      apiKey,
      endpoint,
    };
  }
}

describe("ReplyMessageUseCase", () => {
  test("execute method returns a response from ApiInterface call method", async () => {
    // Arrange
    const mockApi = new MockApiInterface();
    const useCase = new ReplyMessageUseCase(mockApi);
    const input = "Hello";
    const apiKey = "test_api_key";
    const endpoint = "test_endpoint";

    // Act
    const response = await useCase.execute(input, apiKey, endpoint);

    // Assert
    expect(response).toEqual({
      message: "Reply from GPT-3",
      input,
      apiKey,
      endpoint,
    });
  });
});

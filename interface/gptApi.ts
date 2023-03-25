class GptApi {
  async callgptApi(data, apiKey): Promise<JSON> {
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    const json = await response.json();
    return json;
  }
}
export default GptApi;

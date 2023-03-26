import ApiInterface from "./apiInterface";
class OpenaiApi implements ApiInterface {
  async call(data, apiKey, endpoint): Promise<JSON> {
    const apiUrl = "https://api.openai.com/" + endpoint;
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
export default OpenaiApi;

import ApiInterface from "./apiInterface";
class RinnaApi implements ApiInterface {
  async call(data, apiKey, endpoint): Promise<any> {
    const apiUrl = "https:///api.rinna.co.jp/" + endpoint;
    const headers = {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": `${apiKey}`,
      "Cache-Control": "no-cache",
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });
    console.log("test");
    const json = await response.json();
    return json;
  }
}
export default RinnaApi;

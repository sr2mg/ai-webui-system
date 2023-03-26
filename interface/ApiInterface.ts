interface ApiInterface {
  call(input, apiKey, endpoint): Promise<any>;
}

export default ApiInterface;

class ChatMessage {
  content: string;
  speaker: string;
  constructor(content, speaker: string = "user") {
    this.content = content;
    this.speaker = speaker;
  }
}

export default ChatMessage;

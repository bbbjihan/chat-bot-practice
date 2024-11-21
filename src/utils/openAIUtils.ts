import OpenAI from "openai";
import { Chat } from "openai/resources/index.mjs";
import { Stream } from "openai/streaming.mjs";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const createNewStream = async ({ message }: { message: string }) =>
  client.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    stream: true,
  });

export const openStreamToString = async ({
  appendToTarget,
  stream,
}: {
  appendToTarget: (message: string) => void;
  stream: Stream<Chat.Completions.ChatCompletionChunk>;
}) => {
  for await (const chunk of stream)
    appendToTarget(chunk.choices[0].delta.content || "");
};

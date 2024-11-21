import OpenAI from "openai";
import { Chat } from "openai/resources/index.mjs";
import { Stream } from "openai/streaming.mjs";
import { isNull } from "./typeNarrowFunctions";

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
  callback,
}: {
  appendToTarget: (message: string) => void;
  stream: Stream<Chat.Completions.ChatCompletionChunk>;
  callback: () => void;
}) => {
  for await (const chunk of stream) {
    if (!isNull(chunk.choices[0].finish_reason)) break;
    appendToTarget(chunk.choices[0].delta.content || "");
  }
  callback();
};

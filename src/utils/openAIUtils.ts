import { Message } from "@/types/data";
import { isNull } from "@/utils/typeNarrowFunctions";
import OpenAI from "openai";
import { Chat } from "openai/resources/index.mjs";
import { Stream } from "openai/streaming.mjs";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const createNewStreamWithController = async ({
  messages,
}: {
  messages: Array<Message>;
}) => {
  const controller = new AbortController();

  const stream = await client.chat.completions.create(
    {
      model: "gpt-4",
      messages: messages as Chat.Completions.ChatCompletionMessageParam[],
      stream: true,
    },
    {
      signal: controller.signal,
    }
  );

  return {
    stream,
    abort: () => controller.abort(),
  };
};

export const openStreamToString = async ({
  stream,
  addTextToTarget,
  callback,
}: {
  stream: Stream<Chat.Completions.ChatCompletionChunk>;
  addTextToTarget: (message: string) => void;
  callback?: () => void;
}) => {
  let message = "";
  for await (const chunk of stream) {
    if (!isNull(chunk.choices[0].finish_reason)) break;
    message += chunk.choices[0].delta.content || "";
    addTextToTarget(chunk.choices[0].delta.content || "");
  }
  if (callback) setTimeout(callback, 0);
};

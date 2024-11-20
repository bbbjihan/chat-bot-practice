import useChatHistories from "./ChatHistories/useChatHistories";

const useChat = () => {
  const { chatHistories, appendHistory } = useChatHistories();

  const submitChatUserInput = (message: string) => {
    appendHistory({
      sender: "USER",
      content: message,
      createdAt: new Date().toString(),
    });

    // FOR TEST
    setTimeout(
      () =>
        appendHistory({
          sender: "GPT",
          id: new Date().toString(),
          content: "TEST".repeat(30),
          createdAt: new Date().toString(),
        }),
      100
    );
  };

  const chatInputProps = { submitChatUserInput };
  const chatHistoriesProps = { chatHistories };

  const isChatHistoriesEmpty = chatHistories.length === 0;
  return { chatInputProps, chatHistoriesProps, isChatHistoriesEmpty };
};

export default useChat;

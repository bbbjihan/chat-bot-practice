import { Box } from "@mui/material";
import ChatHistories from "./ChatHistories";
import ChatInput from "./ChatInput";
import useChat from "./useChat";

const Chat = () => {
  const { chatInputProps, chatHistoriesProps, isChatHistoriesEmpty } =
    useChat();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 712,
          height: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: isChatHistoriesEmpty ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        {!isChatHistoriesEmpty && <ChatHistories {...chatHistoriesProps} />}
        <ChatInput {...chatInputProps} />
      </Box>
    </Box>
  );
};

export default Chat;

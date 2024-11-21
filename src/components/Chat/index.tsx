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
        sx={(theme) => ({
          width: "100%",
          flex: 1,
          pb: theme.spacing(3),

          display: "flex",
          flexDirection: "column",
          justifyContent: isChatHistoriesEmpty ? "center" : "space-between",
          alignItems: "center",
        })}
      >
        {!isChatHistoriesEmpty && <ChatHistories {...chatHistoriesProps} />}
        <ChatInput {...chatInputProps} />
      </Box>
    </Box>
  );
};

export default Chat;

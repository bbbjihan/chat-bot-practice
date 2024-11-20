import { Box } from "@mui/material";
import ChatHistory from "./ChatHistory";
import ChatInput from "./ChatInput";
import useChat from "./useChat";

const Chat = () => {
  const { chatInputProps, chatHistoryProps } = useChat();
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 712 }}>
        <ChatHistory {...chatHistoryProps} />
        <ChatInput {...chatInputProps} />
      </Box>
    </Box>
  );
};

export default Chat;

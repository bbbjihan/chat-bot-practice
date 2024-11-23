import Margin from "@/components/Margin";
import { Box } from "@mui/material";
import { v4 } from "uuid";
import useChat from "../useChatbot";
import Message from "./Message";

type Props = ReturnType<typeof useChat>["chatAreaProps"];
const ChatArea = ({ chatAreaData, isStreaming }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        justifyContent: "center",

        overflowX: "hidden",
        overflowY: "auto",

        wordBreak: "break-word",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 762,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Margin H={12} />
        {chatAreaData.map((message, index) => (
          <Message
            key={`chat-history-${index}-${message.id ?? v4()}`}
            message={message}
            isStreaming={index === chatAreaData.length - 1 && isStreaming}
          />
        ))}
      </Box>
      <Margin H={24} />
    </Box>
  );
};
export default ChatArea;

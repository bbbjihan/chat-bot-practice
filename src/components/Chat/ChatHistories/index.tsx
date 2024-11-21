import Margin from "@/components/Margin";
import { Box } from "@mui/material";
import useChat from "../useChat";
import ChatHistory from "./ChatHistory";

type Props = ReturnType<typeof useChat>["chatHistoriesProps"];
const ChatHistories = ({ chatHistories, processChatStatus }: Props) => {
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
        {chatHistories.map((chat, index) => (
          <ChatHistory
            key={`chat-history-${index}-${chat.id}`}
            chat={chat}
            processChatStatus={processChatStatus}
          />
        ))}
      </Box>
      <Margin H={24} />
    </Box>
  );
};
export default ChatHistories;

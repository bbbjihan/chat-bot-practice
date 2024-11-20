import { Box, Typography } from "@mui/material";
import useChat from "../useChat";

type Props = ReturnType<typeof useChat>["chatHistoriesProps"];
const ChatHistories = ({ chatHistories }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      {chatHistories.map((history, index) => (
        <Box
          key={`chat-history-${index}-${history.sender}-${history.createdAt}`}
        >
          <Typography>{history.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};
export default ChatHistories;

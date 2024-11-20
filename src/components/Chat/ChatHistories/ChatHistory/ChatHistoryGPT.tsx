import { GPTChat } from "@/types/data";
import { Box, Typography } from "@mui/material";

interface Props {
  chat: GPTChat;
}
const ChatHistoryGPT = ({ chat }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        p: 1,
      }}
    >
      <Box
        sx={{
          p: 1,
        }}
      >
        <Typography whiteSpace="pre-wrap">{chat.content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatHistoryGPT;

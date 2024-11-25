import { Message } from "@/types/data";
import { Box } from "@mui/material";
import MessageContent from "../MessageContent";

interface Props {
  message: Message;
}
const GPTMessage = ({ message }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <Box
        sx={{
          p: 1,
        }}
      >
        <MessageContent content={message.content} />
      </Box>
    </Box>
  );
};

export default GPTMessage;

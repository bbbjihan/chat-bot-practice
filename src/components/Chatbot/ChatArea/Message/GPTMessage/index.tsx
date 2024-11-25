import InputFocusCursor from "@/components/InputFocusCursor";
import { Message } from "@/types/data";
import { Box } from "@mui/material";
import MessageContent from "../MessageContent";

interface Props {
  message: Message;
  isStreaming: boolean;
}
const GPTMessage = ({ message, isStreaming }: Props) => {
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
      {isStreaming && <InputFocusCursor />}
    </Box>
  );
};

export default GPTMessage;

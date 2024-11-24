import InputFocusCursor from "@/components/InputFocusCursor";
import { Message } from "@/types/data";
import { Box, Typography } from "@mui/material";

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
        p: 1,
      }}
    >
      <Box
        sx={{
          p: 1,
        }}
      >
        <Typography
          whiteSpace="pre-wrap"
          sx={{
            display: "inline",
          }}
        >
          {message.content}
        </Typography>
        {isStreaming && <InputFocusCursor />}
      </Box>
    </Box>
  );
};

export default GPTMessage;

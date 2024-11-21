import InputFocusCursor from "@/components/InputFocusCursor";
import useOpenAI from "@/hooks/useOpenAI";
import { Box, Typography } from "@mui/material";

interface Props {
  requestMessage: string;
  isStreaming: boolean;
  processChatStatus: () => void;
}
const ChatHistoryGPT = ({
  requestMessage,
  isStreaming,
  processChatStatus,
}: Props) => {
  const { message } = useOpenAI({ requestMessage, processChatStatus });

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
          {message}
        </Typography>
        {isStreaming && <InputFocusCursor />}
      </Box>
    </Box>
  );
};

export default ChatHistoryGPT;

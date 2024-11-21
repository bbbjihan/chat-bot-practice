import InputFocusCursor from "@/components/InputFocusCursor";
import useOpenAI from "@/hooks/useOpenAI";
import { Chat } from "@/types/data";
import { Box, Typography } from "@mui/material";

interface Props {
  chatId: string;
  chatHistories: Array<Chat>;
  isStreaming: boolean;
  endStreaming: (chatId: string, responseMessage: string) => void;
}
const GPTMessage = ({
  chatId,
  chatHistories,
  isStreaming,
  endStreaming,
}: Props) => {
  const { message } = useOpenAI({ chatId, chatHistories, endStreaming });

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

export default GPTMessage;

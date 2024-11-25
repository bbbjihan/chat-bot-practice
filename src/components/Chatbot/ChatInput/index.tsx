import SendIcon from "@mui/icons-material/Send";
import StopIcon from "@mui/icons-material/Stop";
import { Box, IconButton, TextField } from "@mui/material";
import useChatbot from "../useChatbot";
import useChatInput from "./useChatInput";

type Props = ReturnType<typeof useChatbot>["chatInputProps"];
const ChatInput = (props: Props) => {
  const { isStreaming } = props;
  const {
    chatUserInput,
    handleChatUserInput,
    handleSubmit,
    handleKeyDown,
    handleStop,
  } = useChatInput(props);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 712,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={(theme) => ({
          width: "100%",
          border: "1px solid #b4b4b4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: theme.spacing(3),
          gap: theme.spacing(2),
          borderRadius: 3,
          transition: "all 0.2 ease",
        })}
      >
        <TextField
          fullWidth
          value={chatUserInput}
          onChange={handleChatUserInput}
          onKeyDown={handleKeyDown}
          variant="outlined"
          multiline
          label="프롬프트를 입력해주세요."
          sx={{
            "& label": {
              color: "black",
            },
            "& label.Mui-focused": {
              color: "black",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#9b9b9b",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#b4b4b4",
              },
              "&:hover fieldset": {
                borderColor: "#b4b4b4",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#9b9b9b",
              },
            },
          }}
        />
        {isStreaming ? (
          <IconButton
            sx={(theme) => ({
              height: "40px",
              width: "40px",
              backgroundColor: theme.palette.grey[100],
              fontSize: "24px",
            })}
            onClick={handleStop}
          >
            <StopIcon />
          </IconButton>
        ) : (
          <IconButton
            type="submit"
            sx={(theme) => ({
              height: "40px",
              width: "40px",
              backgroundColor: theme.palette.grey[100],
              fontSize: "24px",
            })}
          >
            <SendIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ChatInput;

import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField } from "@mui/material";
import React from "react";
import useChat from "../useChat";

type Props = ReturnType<typeof useChat>["chatInputProps"];
const ChatInput = ({
  chatUserInput,
  handleChatUserInput,
  isChatHistoryEmpty,
}: Props) => {
  return (
    <Box
      component={isChatHistoryEmpty ? "div" : React.Fragment}
      sx={{
        width: "100%",
        ...(isChatHistoryEmpty
          ? {
              minHeight: "100dvh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {}),
      }}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          border: "1px solid #b4b4b4",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mx: theme.spacing(4),
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
        <IconButton sx={{ height: "100%" }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;

import { Box } from "@mui/material";
import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";
import useChatbot from "./useChatbot";

const Chatbot = () => {
  const { chatInputProps, chatAreaProps, isChatDataEmpty } = useChatbot();
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          flex: 1,
          pb: theme.spacing(3),

          display: "flex",
          flexDirection: "column",
          justifyContent: isChatDataEmpty ? "center" : "space-between",
          alignItems: "center",
        })}
      >
        {!isChatDataEmpty && <ChatArea {...chatAreaProps} />}
        <ChatInput {...chatInputProps} />
      </Box>
    </Box>
  );
};

export default Chatbot;

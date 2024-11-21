import { Box } from "@mui/material";
import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";
import useChatbot from "./useChatbot";

const Chatbot = () => {
  const { chatInputProps, chatHistoriesProps, isChatHistoriesEmpty } =
    useChatbot();
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
          justifyContent: isChatHistoriesEmpty ? "center" : "space-between",
          alignItems: "center",
        })}
      >
        {!isChatHistoriesEmpty && <ChatArea {...chatHistoriesProps} />}
        <ChatInput {...chatInputProps} />
      </Box>
    </Box>
  );
};

export default Chatbot;

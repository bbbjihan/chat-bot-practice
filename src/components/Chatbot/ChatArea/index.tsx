import Margin from "@/components/Margin";
import StreamingIndicator from "@/components/StreamingIndicator";
import { isNull } from "@/utils/typeNarrowFunctions";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import useChatbot from "../useChatbot";
import Message from "./Message";

type Props = ReturnType<typeof useChatbot>["chatAreaProps"];
const ChatArea = ({
  chatAreaData,
  isWhloeChatStreaming,
  appendNewMessageBranch,
  getUserMessageBranchProps,
}: Props) => {
  const areaBottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isNull(areaBottomRef.current)) return;
    areaBottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatAreaData]);

  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        overflowX: "hidden",
        overflowY: "auto",

        wordBreak: "break-word",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 762,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Margin H={12} />
        {chatAreaData.map((message, index) => (
          <Message
            key={`chat-history-${index}-${message.id}`}
            message={message}
            isWhloeChatStreaming={isWhloeChatStreaming}
            appendNewMessageBranch={appendNewMessageBranch}
            id={message.id}
            getUserMessageBranchProps={getUserMessageBranchProps}
          />
        ))}
      </Box>
      <StreamingIndicator isStreaming={isWhloeChatStreaming} />
      <div ref={areaBottomRef} />
    </Box>
  );
};
export default ChatArea;

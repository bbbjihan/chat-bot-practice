import Margin from "@/components/Margin";
import { isNull } from "@/utils/typeNarrowFunctions";
import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { v4 } from "uuid";
import useChat from "../useChatbot";
import Message from "./Message";

type Props = ReturnType<typeof useChat>["chatAreaProps"];
const ChatArea = ({
  chatAreaData,
  isWhloeChatStreaming,
  getIsStreaming,
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
            key={`chat-history-${index}-${message.id ?? v4()}`}
            message={message}
            isWhloeChatStreaming={isWhloeChatStreaming}
            isStreaming={getIsStreaming(message.id)}
            appendNewMessageBranch={appendNewMessageBranch}
            id={message.id}
            getUserMessageBranchProps={getUserMessageBranchProps}
          />
        ))}
      </Box>
      <div ref={areaBottomRef} />
      <Margin H={24} />
    </Box>
  );
};
export default ChatArea;

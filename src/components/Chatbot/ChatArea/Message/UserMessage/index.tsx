import useChatbot from "@/components/Chatbot/useChatbot";
import { Message } from "@/types/data";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useMemo } from "react";
import MessageContent from "../MessageContent";
import useUserMessage from "./useUserMessage";
import useUserMessagebranch from "./useUserMessageBranch";

interface Props {
  message: Message;
  isStreaming: boolean;
  appendNewMessageBranch: (nodeId: string, message: string) => void;
  id: string;
  getUserMessageBranchProps: ReturnType<
    typeof useChatbot
  >["chatAreaProps"]["getUserMessageBranchProps"];
}
const UserMessage = ({
  message,
  isStreaming,
  appendNewMessageBranch,
  id,
  getUserMessageBranchProps,
}: Props) => {
  const {
    isEditing,
    toggleIsEditing,
    editMessageInput,
    handleEditMessageInput,
    submitEdit,
  } = useUserMessage({
    initMessage: message.content,
    isStreaming,
    appendNewMessageBranch,
    id,
  });

  const userMessageBranchProps = useMemo(
    () => getUserMessageBranchProps(id),
    [getUserMessageBranchProps, id]
  );

  const { selectedIndex, maxIndex, canGoPrev, goPrev, canGoNext, goNext } =
    useUserMessagebranch(userMessageBranchProps);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: isEditing ? 1 : 0,
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.grey[300],
            maxWidth: 500,
            width: isEditing ? 500 : "auto",
            p: isEditing ? 1 : 0,
            px: 2,
            mx: 1,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          })}
        >
          {isEditing ? (
            <TextField
              fullWidth
              value={editMessageInput}
              onChange={handleEditMessageInput}
              multiline
              size="small"
            />
          ) : (
            <MessageContent content={message.content} />
          )}
        </Box>
        <Box
          sx={{
            height: 24,
            px: 2,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 1,
          }}
        >
          {!isStreaming &&
            (isEditing ? (
              <>
                <IconButton
                  sx={{ m: 0, p: 0, width: 24, height: 24 }}
                  onClick={toggleIsEditing}
                >
                  <ClearIcon sx={{ fontSize: "16px" }} />
                </IconButton>
                <IconButton
                  sx={{ m: 0, p: 0, width: 24, height: 24 }}
                  onClick={submitEdit}
                >
                  <SendIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </>
            ) : (
              <>
                {maxIndex > 0 && (
                  <>
                    <IconButton
                      sx={{ m: 0, p: 0, width: 24, height: 24 }}
                      onClick={goPrev}
                      disabled={!canGoPrev}
                    >
                      <ChevronLeftIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                    <Typography variant="caption">
                      {selectedIndex + 1} / {maxIndex + 1}
                    </Typography>
                    <IconButton
                      sx={{ m: 0, p: 0, width: 24, height: 24 }}
                      onClick={goNext}
                      disabled={!canGoNext}
                    >
                      <ChevronRightIcon sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </>
                )}
                <IconButton
                  sx={{ m: 0, p: 0, width: 24, height: 24 }}
                  onClick={toggleIsEditing}
                >
                  <EditIcon sx={{ fontSize: "16px" }} />
                </IconButton>
              </>
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UserMessage;

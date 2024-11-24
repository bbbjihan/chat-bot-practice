import { Message } from "@/types/data";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import useUserMessage from "./useUserMessage";

interface Props {
  message: Message;
  isStreaming: boolean;
  appendNewMessageBranch: (nodeId: string, message: string) => void;
  id?: string;
}
const UserMessage = ({
  message,
  isStreaming,
  appendNewMessageBranch,
  id,
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
            p: 1,
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
            <Typography whiteSpace="pre-wrap">{message.content}</Typography>
          )}
        </Box>
        {!isStreaming && (
          <Box
            sx={{ px: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            {isEditing ? (
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
              <IconButton
                sx={{ m: 0, p: 0, width: 24, height: 24 }}
                onClick={toggleIsEditing}
              >
                <EditIcon sx={{ fontSize: "16px" }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default UserMessage;

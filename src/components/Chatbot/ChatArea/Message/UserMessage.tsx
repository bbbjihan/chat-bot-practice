import { Message } from "@/types/data";
import { Box, Typography } from "@mui/material";

interface Props {
  message: Message;
}
const UserMessage = ({ message }: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.grey[300],
          width: 500,
          p: 1,
          mx: 1,
          borderRadius: 3,
        })}
      >
        <Typography whiteSpace="pre-wrap">{message.content}</Typography>
      </Box>
    </Box>
  );
};

export default UserMessage;

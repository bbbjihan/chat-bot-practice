import { Box, keyframes } from "@mui/material";

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const Dot = ({ delay }: { delay: string }) => (
  <Box
    sx={(theme) => ({
      width: "8px",
      height: "8px",
      backgroundColor: theme.palette.grey[800],
      borderRadius: "50%",
      animation: `${bounce} 1.2s ${delay} infinite ease-in-out`,
    })}
  />
);

const BouncingDots = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      height: "50px",
    }}
  >
    <Dot delay="0s" />
    <Dot delay="0.2s" />
    <Dot delay="0.4s" />
  </Box>
);

const InputFocusCursor = () => {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <BouncingDots />
    </Box>
  );
};

export default InputFocusCursor;

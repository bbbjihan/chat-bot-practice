import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const InputFocusCursor = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const blinkTransition = () => setIsVisible((prev) => !prev);

  const handleTransitionInterval = () => {
    const interval = setInterval(blinkTransition, 500);

    return () => clearInterval(interval);
  };

  useEffect(handleTransitionInterval, []);
  return (
    <Box
      sx={{
        display: isVisible ? "inline-flex" : "none",
        width: 0,
        height: "1.125rem",
        borderLeft: "1px solid black",
        ml: "2px",
        verticalAlign: "text-bottom",
      }}
      component="span"
    />
  );
};

export default InputFocusCursor;

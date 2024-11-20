import { Box, BoxProps } from "@mui/material";

interface Props extends BoxProps {
  W?: number | string;
  H?: number | string;
}
const Margin = ({ W, H, ...props }: Props) => (
  <Box {...props} sx={{ width: W, minWidth: W, height: H, minHeight: H }} />
);

export default Margin;

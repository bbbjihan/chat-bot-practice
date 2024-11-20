import { OutlinedTextFieldProps, TextField } from "@mui/material";

interface Props extends OutlinedTextFieldProps {
  temp?: string;
}
const CustomInput = ({ temp, ...props }: Props) => {
  return <TextField {...props} />;
};

export default CustomInput;

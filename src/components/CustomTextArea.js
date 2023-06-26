import { TextareaAutosize } from "@mui/base";
import { styled } from "@mui/system";

const blue = {
  100: "#DAECFF",
  200: "#b6daff",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

const radius = 4;

export const CustomTextArea = styled(TextareaAutosize)(
  ({ theme }) => `
    min-width: 320px;
    line-height: 1.5;
    padding: 12px;
    border-radius: ${radius}px ${radius}px 0 ${radius}px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[100] : grey[300]};
  
    &:hover {
      border-color: ${grey[800]};
    }
  
    &:focus {
      border-color: ${blue[400]};
      border: 2px solid ${
        theme.palette.mode === "dark" ? blue[100] : blue[600]
      };
      padding: 11px;
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);

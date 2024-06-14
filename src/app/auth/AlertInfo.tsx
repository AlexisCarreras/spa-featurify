import { Link, Alert } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const defaultTheme = createTheme();

export const AlertInfo: React.FunctionComponent = () => {
  const CustomCheckIcon = (props: any) => {
    return (
      <CheckCircle
        sx={{
          color: "#ffbb1f",
          fontSize: "inherit",
          verticalAlign: "middle",
          marginRight: "5px",
        }}
        {...props}
      />
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Alert
        severity="success"
        iconMapping={{ success: <CustomCheckIcon /> }}
        style={{
          backgroundColor: "#191407",
          color: "rgb(255, 236, 182)",
          borderRadius: "8px",
        }}
      >
        {"Esta app funciona con la API de "}
        <Link color="inherit" href="https://developer.spotify.com/">
          https://developer.spotify.com/
        </Link>
        {"."}
      </Alert>
    </ThemeProvider>
  );
};

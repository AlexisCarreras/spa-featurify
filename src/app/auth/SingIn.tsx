import * as React from "react";
import { Album, CheckCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Toolbar } from "@mui/material";

import style from "./style.module.css";

const defaultTheme = createTheme();

function CustomCheckIcon(props: any) {
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
}

function AlertInfo() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Alert
        severity="success"
        iconMapping={{ success: <CustomCheckIcon /> }}
        style={{
          backgroundColor: "#191407",
          color: "rgb(255, 236, 182)",
          marginLeft: "8.5rem",
          marginRight: "8.5rem",
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
}

export const SignIn: React.FunctionComponent = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1511735111819-9a3f7709049c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          className={style.gridInputs}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Toolbar className={style.toolbar}>
            <Album sx={{ fontSize: 100 }} className={style.logo} />
            <div className={style.containerTextLogo}>
              <Typography variant="h5" className={style.nameLogo}>
                Featurify
              </Typography>
              <Typography variant="h6" className={style.descriptionLogo}>
                Audio Análisis
              </Typography>
            </div>
          </Toolbar>

          <Typography className={style.title} component="h1" variant="h5">
            Sign in
          </Typography>
          <Button
            variant="contained"
            className={style.button}
            //   onClick={handleSpotifyLogin}
          >
            Continue with Spotify
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify Logo"
              height="20px"
              style={{ marginLeft: "10px" }} // Cambiado a marginLeft
            />
          </Button>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 10, width: "100%" }}
          >
            <AlertInfo />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

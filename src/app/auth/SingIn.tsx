import * as React from "react";
import { Album } from "@mui/icons-material";

import {
  Button,
  CssBaseline,
  Paper,
  Box,
  Grid,
  Typography,
  Toolbar,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AlertInfo } from "./AlertInfo";

import { loginService } from "../../services/Auth/login/loginService";

import { useLocation, useNavigate } from "react-router-dom";
import style from "./style.module.css";

const defaultTheme = createTheme();

export const SignIn: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginService();
  };

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const accessToken = queryParams.get("access_token");
    const refreshToken = queryParams.get("refresh_token");
    const expiresIn = queryParams.get("expires_in");

    if (accessToken && refreshToken && expiresIn) {
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("refresh_token", refreshToken);
      sessionStorage.setItem("expires_in", expiresIn);

      navigate("/search");
    } else {
    }
  }, [location, navigate]);

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
            onClick={handleLogin}
          >
            Continue with Spotify
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
              alt="Spotify Logo"
              height="20px"
              style={{ marginLeft: "10px" }}
            />
          </Button>
          <Box component="form" noValidate sx={{ mt: 10, width: "63.5%" }}>
            <AlertInfo />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

import { Button } from "@mui/material";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loginService } from "../../services/Auth/login/loginService";
import style from "./style.module.css";

export const Login: React.FunctionComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginService();
  };

  useEffect(() => {

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
    <div>
      <Button
        onClick={handleLogin}
        className={style.button}
        variant="contained"
      >
        Iniciar Sesión en Spotify
      </Button>
    </div>
  );
};

export default Login;

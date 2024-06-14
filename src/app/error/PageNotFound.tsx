import { Box, Button, Stack, Typography } from "@mui/material";
import img from "../../assets/error-404.png";

import styles from "./style.module.css";
import { Link } from "react-router-dom";

export const PageNotFound: React.FunctionComponent = () => {
  return (
    <Box
      component="main"
      className={styles.container}
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Box>
          <Box
            component="img"
            alt="Under development"
            src={img}
            sx={{
              display: "inline-block",
              height: "auto",
              maxWidth: "100%",
              width: "400px",
            }}
          />
        </Box>
        <Typography
          variant="h3"
          sx={{ textAlign: "center" }}
          className={styles.title}
        >
          404: Página no encontrada
        </Typography>
        <Typography
          color="text.secondary"
          variant="body1"
          className={styles.subtitle}
          sx={{ textAlign: "center" }}
        >
          La ruta ingresada no es válida para esta aplicación. Por favor,
          regrese al Inicio.
        </Typography>
        <Link to="/search">
          <Button variant="contained" className={styles.button}>
            Volver al Inicio
          </Button>
        </Link>
      </Stack>
    </Box>
  );
};

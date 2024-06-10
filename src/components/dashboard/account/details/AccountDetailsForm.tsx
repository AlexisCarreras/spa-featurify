import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { AccountDetailsProps } from "./type";

export const AccountDetailsForm: React.FunctionComponent<
  AccountDetailsProps
> = ({ userData }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card className={style.card}>
        <CardHeader
          className={style.cardHeader}
          subheader="La información no puede ser editada desde acá."
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3} className={style.cardContent}>
            <Grid md={6} xs={12} className={style.gridInput}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#4e36f5",
                    },
                  }}
                >
                  Nombre
                </InputLabel>
                <OutlinedInput
                  value={userData?.displayName.split(" ")[0]}
                  label="Nombre"
                  name="nombre"
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4e36f5",
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12} className={style.gridInput}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#4e36f5",
                    },
                  }}
                >
                  Apellido
                </InputLabel>
                <OutlinedInput
                  value={userData?.displayName.split(" ")[1]}
                  label="Apellido"
                  name="apellido"
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4e36f5",
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12} className={style.gridInput}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#4e36f5",
                    },
                  }}
                >
                  Id de Usuario
                </InputLabel>
                <OutlinedInput
                  value={userData?.idUser}
                  label="ID de Usuario"
                  name="id"
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4e36f5",
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12} className={style.gridInput}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#4e36f5",
                    },
                  }}
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  value={userData?.emailUser}
                  label="Email"
                  name="email"
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4e36f5",
                    },
                  }}
                />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12} className={style.gridInput}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    "&.Mui-focused": {
                      color: "#4e36f5",
                    },
                  }}
                >
                  País
                </InputLabel>
                <OutlinedInput
                  value={userData?.countryUser}
                  label="País"
                  name="país"
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4e36f5",
                    },
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" className={style.button}>
            Guardar Detalles
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

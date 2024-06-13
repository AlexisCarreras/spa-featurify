import React from "react";
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
import { AccountDetailsProps } from "./type";
import { UseLoading } from "../../../../hooks/UseLoading";

export const AccountDetailsForm: React.FunctionComponent<
  AccountDetailsProps
> = ({ userData, loading }) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card className={style.card}>
        {loading ? (
          <UseLoading height="46vh" size={80} />
        ) : (
          <>
            <CardHeader
              className={style.cardHeader}
              subheader="La información no puede ser editada desde acá."
              title="Perfil"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3} className={style.cardContent}>
                <Grid item md={6} xs={12} className={style.gridInput}>
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
                      value={userData.displayName?.split(" ")[0] || ""}
                      label="Nombre"
                      name="nombre"
                      disabled
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4e36f5",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12} className={style.gridInput}>
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
                      value={userData.displayName?.split(" ")[1] || ""}
                      label="Apellido"
                      name="apellido"
                      disabled
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4e36f5",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12} className={style.gridInput}>
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
                      value={userData.idUser || ""}
                      label="ID de Usuario"
                      name="id"
                      disabled
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4e36f5",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12} className={style.gridInput}>
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
                      value={userData.emailUser || ""}
                      label="Email"
                      name="email"
                      disabled
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4e36f5",
                        },
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12} className={style.gridInput}>
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
                      value={userData.countryUser || ""}
                      label="País"
                      name="país"
                      disabled
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
              <Button disabled variant="contained" className={style.button}>
                Guardar Detalles
              </Button>
            </CardActions>
          </>
        )}
      </Card>
    </form>
  );
};

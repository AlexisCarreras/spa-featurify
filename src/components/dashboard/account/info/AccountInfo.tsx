import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { AccountInfoProps } from "./type";

export const AccountInfo: React.FunctionComponent<AccountInfoProps> = ({
  userData,
}) => {
  function capitalizeFirstLetter(texto: string) {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  return (
    <Card className={style.card}>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: "center", paddingBottom: "30px" }}>
          <div>
            <Avatar
              src={userData.images[1].url}
              sx={{ height: "80px", width: "80px" }}
            />
          </div>
          <Stack spacing={1} sx={{ textAlign: "center" }}>
            <Typography variant="h5">{userData.displayName}</Typography>
            <Typography color="text.secondary" variant="body2">
              Followers: {userData.followers}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {userData.countryUser} | Spotify{" "}
              {capitalizeFirstLetter(userData.type)}{" "}
              {capitalizeFirstLetter(userData.productUser)}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" className={style.button}>
          Actualizar imagen
        </Button>
      </CardActions>
    </Card>
  );
};

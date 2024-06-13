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
import { capitalizeFirstLetter } from "../../../../hooks/useCapitalizeFirstLetter";
import { UseLoading } from "../../../../hooks/UseLoading";

export const AccountInfo: React.FunctionComponent<AccountInfoProps> = ({
  userData,
  loading,
}) => {
  return (
    <Card className={style.card}>
      {loading ? (
        <UseLoading height="29vh" size={80} />
      ) : (
        <>
          <CardContent>
            <Stack
              spacing={2}
              sx={{ alignItems: "center", paddingBottom: "30px" }}
            >
              <div>
                <Avatar
                  src={userData?.images[1].url}
                  sx={{ height: "80px", width: "80px" }}
                />
              </div>
              <Stack spacing={1} sx={{ textAlign: "center" }}>
                <Typography variant="h5">{userData?.displayName}</Typography>
                <Typography color="text.secondary" variant="body2">
                  Followers: {userData?.followers}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {userData?.countryUser} | Spotify{" "}
                  {capitalizeFirstLetter(userData?.type)}{" "}
                  {capitalizeFirstLetter(userData?.productUser)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions>
            <Button disabled fullWidth variant="text" className={style.button}>
              Actualizar imagen
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

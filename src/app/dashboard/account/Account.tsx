import { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";

import { AccountDetailsForm } from "../../../components/dashboard/account/details/AccountDetailsForm";
import { AccountInfo } from "../../../components/dashboard/account/info/AccountInfo";

import "./stylesMUI.css";
import style from "./style.module.css";
import { User } from "../../../services/User/getUser/type";
import { getUser } from "../../../services/User/getUser/getUser";

export const Account: React.FunctionComponent = () => {
  const [user, setUser] = useState<User>({
    countryUser: "",
    idUser: "",
    displayName: "",
    emailUser: "",
    type: "",
    productUser: "",
    followers: 0,
    images: [
      {
        url: "",
        height: 0,
        width: 0,
      },
    ],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Typography className={style.title} variant="h4">
        Mi Cuenta
      </Typography>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12} className={style.gridInfo}>
          <AccountInfo userData={user} loading={loading} />
        </Grid>
        <Grid lg={8} md={6} xs={12} className={style.gridDetails}>
          <AccountDetailsForm userData={user} loading={loading} />
        </Grid>
      </Grid>
    </Stack>
  );
};

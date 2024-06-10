import { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";

import { AccountDetailsForm } from "../../../components/dashboard/account/details/AccountDetailsForm";
import { AccountInfo } from "../../../components/dashboard/account/info/AccountInfo";

import "./stylesMUI.css";
import style from "./style.module.css";
import { dataUser } from "./mock/dataUser";

export const Account: React.FunctionComponent = () => {
  const [userData, setuserData] = useState(dataUser);

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Typography className={style.title} variant="h4">
        Mi Cuenta
      </Typography>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12} className={style.gridInfo}>
          <AccountInfo userData={userData} />
        </Grid>
        <Grid lg={8} md={6} xs={12} className={style.gridDetails}>
          <AccountDetailsForm userData={userData} />
        </Grid>
      </Grid>
    </Stack>
  );
};

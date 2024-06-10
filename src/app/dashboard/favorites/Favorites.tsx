import { Stack, Typography } from "@mui/material";
import style from "./style.module.css";
import "./stylesMUI.css";
import { TableFavorites } from "../../../components/dashboard/favorites/table/TableFavorites";

export const Favorites = () => {
  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Stack direction="column" spacing={1}>
        <Stack spacing={1}>
          <Typography className={style.title} variant="h4">
            Mis Favoritos
          </Typography>
        </Stack>
        <Typography className={style.subtitle} variant="h4">
          Listado de Tracks agregados a favoritos:
        </Typography>
      </Stack>
      <TableFavorites />
    </Stack>
  );
};

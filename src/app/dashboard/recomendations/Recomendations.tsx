import { Stack, Typography } from "@mui/material";
import { TableRecomendations } from "../../../components/dashboard/recomendations/table/TableRecomendations";

import style from "./style.module.css";
import "./stylesMUI.css";

export const Recomendations = () => {
  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Stack direction="column" spacing={1}>
        <Stack spacing={1}>
          <Typography className={style.title} variant="h4">
            Recomendaciones
          </Typography>
        </Stack>
        <Typography className={style.subtitle} variant="h4">
          Listado de Tracks relacionados con La Razón Que Te Demora de La Renga:
        </Typography>
      </Stack>
      <TableRecomendations />
    </Stack>
  );
};

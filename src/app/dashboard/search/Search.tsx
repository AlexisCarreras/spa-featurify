import { Chip, Stack, Typography } from "@mui/material";
import { SearchFilter } from "../../../components/dashboard/search/filter/SearchFilter";
import { TableSearch } from "../../../components/dashboard/search/table/TableSearch";

import style from "./style.module.css";
import "./stylesMUI.css";

export const Search = () => {
  const features = [
    "Danceability",
    "Energy",
    "Loudness",
    "Speechiness",
    "Acousticness",
    "Instrumentalness",
    "Liveness",
    "Valence",
    "Tempo",
    "Nota",
  ];

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Stack direction="column" spacing={1}>
        <Stack spacing={1}>
          <Typography className={style.title} variant="h4">
            Buscar Track
          </Typography>
        </Stack>
        <Typography className={style.subtitle} variant="h4">
          Se podrán obtener los siguientes análisis:
        </Typography>
        <Stack spacing={1} direction="row">
          {features.map((feature) => (
            <Chip key={feature} label={feature} />
          ))}
        </Stack>
      </Stack>
      <SearchFilter />
      <TableSearch />
    </Stack>
  );
};

import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { TableRecomendations } from "../../../components/dashboard/recomendations/table/TableRecomendations";

import style from "./style.module.css";
import "./stylesMUI.css";

interface RecomendationType {
  nameTrack: string;
  seedTrack: string;
  seedArtist: {
    idArtist: string;
    nameArtist: string;
    type: string;
  }[];
  limit: number;
}

export const Recomendations = () => {
  const [storedRecommendations, setStoredRecommendations] =
    useState<RecomendationType>({
      nameTrack: "",
      seedTrack: "",
      seedArtist: [
        {
          idArtist: "",
          nameArtist: "",
          type: "",
        },
      ],
      limit: 0,
    });

  useEffect(() => {
    const stored = localStorage.getItem("tracksRecomendations");
    if (stored) {
      setStoredRecommendations(JSON.parse(stored));
    }
  }, []);

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Stack direction="column" spacing={1}>
        <Stack spacing={1}>
          <Typography className={style.title} variant="h4">
            Recomendaciones
          </Typography>
        </Stack>
        <Typography className={style.subtitle} variant="h4">
          {`Listado de Tracks relacionados con '${storedRecommendations.nameTrack}' de '${storedRecommendations.seedArtist[0].nameArtist}' :`}
        </Typography>
      </Stack>
      <TableRecomendations />
    </Stack>
  );
};

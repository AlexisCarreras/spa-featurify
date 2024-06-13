import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Favorite, PlayCircle } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { TrackAddFavoritesProps } from "./type";
import { playTrackService } from "../../../../../services/Tracks/playTrack/playTrackService";
import { UseLoading } from "../../../../../hooks/UseLoading";

export const TrackAddFavorites: React.FunctionComponent<
  TrackAddFavoritesProps
> = ({ trackId, loadingTrack }) => {
  const handlePlayTrack = async () => {
    try {
      if (trackId === null) return;
      await playTrackService(trackId);
    } catch (error) {
      console.error("Failed to play track", error);
    }
  };

  return (
    <Card sx={{ height: "100%" }} className={style.card}>
      {loadingTrack ? (
        <UseLoading height="13vh" size={70} />
      ) : (
        <CardContent>
          <Stack spacing={3}>
            <Stack
              direction="row"
              sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
              spacing={3}
            >
              <Stack spacing={1} alignItems="center">
                <Typography variant="h6" className={style.title}>
                  Favorito
                </Typography>
                <Tooltip title="Añadir a Favoritos" placement="left-start">
                  <IconButton aria-label="favorite">
                    <Favorite sx={{ fontSize: 47, color: "#4E36F5" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack spacing={1} alignItems="center">
                <Typography variant="h6" className={style.title}>
                  Abrir en Spotify
                </Typography>
                <Tooltip title="Reproducir en Spotify" placement="left-start">
                  <IconButton aria-label="play" onClick={handlePlayTrack}>
                    <PlayCircle sx={{ fontSize: 50, color: "#1ED760" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      )}
    </Card>
  );
};

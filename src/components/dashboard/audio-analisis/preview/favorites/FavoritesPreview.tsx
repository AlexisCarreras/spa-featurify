import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Alert,
} from "@mui/material";
import { ArrowForward, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import style from "./style.module.css";
import "./stylesMUI.css";

import { getLimitTrackFavorites } from "../../../../../services/Favorites/GetLimitTracks/getLimitFavoritesService";
import { Track } from "../../../../../services/Favorites/GetLimitTracks/type";
import { UseLoading } from "../../../../../hooks/UseLoading";
import { DataFavoritesLimit } from "./type";

export const FavoritesPreview: React.FunctionComponent<DataFavoritesLimit> = ({
  flagTrackId,
  setFlagTrackId,
  flagTrackFavorite
}) => {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [loadingTracks, setLoadingTracks] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const limit = 4; 
        const favoriteTracks = await getLimitTrackFavorites({ limit });
        setTracks(favoriteTracks);
        setError(null); 
      } catch (err) {
        setError("Failed to fetch tracks");
        alert("Failed to fetch tracks");
      } finally {
        setLoadingTracks(false);
      }
    };

    fetchTracks();
  }, [flagTrackId, flagTrackFavorite]);

  const handleGetAnalysis = (trackId: string) => {
    localStorage.setItem("selectedTrackId", trackId);
    setFlagTrackId(!flagTrackId);
  };

  return (
    <Card sx={{ height: "100%" }} className={style.cardPreviewFavorites}>
      {loadingTracks ? (
        <UseLoading height="32vh" size={70} />
      ) : (
        <>
          <CardHeader title="Tracks Favoritos" />
          <Divider />
          {error && (
            <Alert severity="error" sx={{ m: 2 }}>
              {error}
            </Alert>
          )}
          <List>
            {tracks.map((favorite, index) => (
              <ListItem divider={index < tracks.length - 1} key={favorite._id}>
                <ListItemAvatar>
                  {favorite.album.images[0] ? (
                    <Box
                      component="img"
                      src={favorite.album.images[0].url}
                      sx={{ borderRadius: 1, height: "48px", width: "48px" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: "var(--mui-palette-neutral-200)",
                        height: "48px",
                        width: "48px",
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={favorite.nameTrack}
                  primaryTypographyProps={{ variant: "subtitle1" }}
                  secondary={`${favorite.artist
                    .map((artist) => artist.nameArtist)
                    .join(", ")}`}
                  secondaryTypographyProps={{ variant: "body2" }}
                />
                <Tooltip title="Ver Análisis del Track" placement="left-start">
                  <IconButton
                    edge="end"
                    onClick={() => handleGetAnalysis(favorite.idTrack)}
                  >
                    <KeyboardArrowRight />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Divider />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              onClick={() => navigate("/favorites")}
              className={style.buttonSeeMore}
              color="inherit"
              endIcon={<ArrowForward />}
              size="small"
              variant="text"
            >
              Ver todos
            </Button>
          </CardActions>
        </>
      )}
    </Card>
  );
};

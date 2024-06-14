import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Snackbar,
  Slide,
} from "@mui/material";
import { Favorite, FavoriteBorder, PlayCircle } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { TrackAddFavoritesProps } from "./type";
import { playTrackService } from "../../../../../services/Tracks/playTrack/playTrackService";
import { UseLoading } from "../../../../../hooks/UseLoading";
import { getAllFavoritesService } from "../../../../../services/Favorites/GetAllTracks/getAllFavoritesService";
import { deleteFavoriteTrackService } from "../../../../../services/Favorites/DeleteTracks/deleteFavoriteTrackService";
import { addFavoriteTrackService } from "../../../../../services/Favorites/AddTracks/addFavoriteTrackService";

const TransitionSlide = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const TrackAddFavorites: React.FunctionComponent<
  TrackAddFavoritesProps
> = ({
  trackId,
  loadingTrack,
  track,
  flagTrackFavorite,
  setFlagTrackFavorite,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loadingFavorites, setLoadingFavorites] = useState<boolean>(true);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [snackBar, setSnackBar] = useState({ open: false, text: "" });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesTracks = await getAllFavoritesService();
        const favoriteTrack = favoritesTracks.find(
          (track) => track.idTrack === trackId
        );

        if (favoriteTrack) {
          setIsFavorite(true);
          setFavoriteId(favoriteTrack._id);
        } else {
          setIsFavorite(false);
          setFavoriteId(null);
        }
      } catch (error) {
        console.error("Failed to fetch favorite tracks", error);
      } finally {
        setLoadingFavorites(false);
      }
    };

    fetchFavorites();
  }, [trackId]);

  const handlePlayTrack = async () => {
    try {
      if (!trackId) return;
      await playTrackService(trackId);
    } catch (error) {
      console.error("Failed to play track", error);
    }
  };

  const toggleFavorite = async (_: string, isCurrentlyFavorite: boolean) => {
    try {
      if (isCurrentlyFavorite) {
        if (favoriteId) {
          await deleteFavoriteTrackService(favoriteId);
          setSnackBar({ open: true, text: "Track quitado de favoritos" });
          setFlagTrackFavorite(!flagTrackFavorite);
        }
      } else {
        const body = {
          album: {
            idAlbum: track.album.idAlbum,
            nameAlbum: track.album.nameAlbum,
            images: track.album.images.map((image) => ({
              url: image.url,
              height: image.height,
              width: image.width,
            })),
          },
          artist: track.artists.map((artist) => ({
            idArtist: artist.idArtist,
            nameArtist: artist.nameArtist,
          })),
          idTrack: track.idTrack,
          nameTrack: track.nameTrack,
        };
        await addFavoriteTrackService(body);
        setSnackBar({ open: true, text: "Track añadido a favoritos" });
      }
      setIsFavorite(!isCurrentlyFavorite);
      setFavoriteId(isCurrentlyFavorite ? null : favoriteId);
    } catch (error) {
      console.error("Failed to toggle favorite", error);
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({ ...snackBar, open: false });
  };

  return (
    <Card sx={{ height: "100%" }} className={style.card}>
      {loadingTrack || loadingFavorites ? (
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
                <Tooltip
                  title={
                    isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"
                  }
                  placement="right-start"
                >
                  <IconButton
                    color="primary"
                    aria-label="toggle favorite"
                    onClick={() => {
                      if (trackId) {
                        toggleFavorite(trackId, isFavorite);
                      }
                    }}
                  >
                    {isFavorite ? (
                      <Favorite
                        sx={{ fontSize: 47, color: "#4E36F5" }}
                        className={style.icon}
                      />
                    ) : (
                      <FavoriteBorder
                        sx={{ fontSize: 47, color: "#4E36F5" }}
                        className={style.icon}
                      />
                    )}
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
      <Snackbar
        open={snackBar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackBar}
        message={snackBar.text}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={TransitionSlide}
      />
    </Card>
  );
};

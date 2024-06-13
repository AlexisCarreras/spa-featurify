import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Slide,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Favorite, FavoriteBorder, Leaderboard } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import style from "./style.module.css";
import { Track, TableSearchProps } from "./type";
import { useformatDuration } from "../../../../hooks/useFormatDuration";
import { deleteFavoriteTrackService } from "../../../../services/Favorites/DeleteTracks/deleteFavoriteTrackService";
import { addFavoriteTrackService } from "../../../../services/Favorites/AddTracks/addFavoriteTrackService";
import { GetAllFavoritesTrack } from "../../../../services/Favorites/GetAllTracks/type";
import { useNavigate } from "react-router-dom";

const TransitionSlide = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const TableSearch: React.FunctionComponent<TableSearchProps> = ({
  tracks,
  favorites,
  setFavorites,
}) => {
  const navigate = useNavigate();

  const [localTracks, setLocalTracks] = useState<Track[]>([]);
  const [loadingAvatars, setLoadingAvatars] = useState<{
    [key: string]: boolean;
  }>({});
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: "",
  });

  useEffect(() => {
    setLocalTracks(
      tracks.map((track) => ({
        ...track,
        isFavorite: favorites.some((fav) => fav.idTrack === track.idTrack),
      }))
    );
  }, [tracks, favorites]);

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleCloseSnackBar = () => {
    setSnackBar({
      ...snackBar,
      open: false,
    });
  };

  const toggleFavorite = async (trackId: string, isFavorite?: boolean) => {
    if (!isMounted.current) return;

    try {
      if (isFavorite) {
        const favorite = favorites.find((fav) => fav.idTrack === trackId);
        if (!favorite) return;

        await deleteFavoriteTrackService(favorite._id);

        if (!isMounted.current) return;

        setLocalTracks((prevTracks) =>
          prevTracks.map((track) =>
            track.idTrack === trackId ? { ...track, isFavorite: false } : track
          )
        );
        const updatedFavorites = favorites.filter(
          (fav: GetAllFavoritesTrack) => fav._id !== favorite._id
        );
        setFavorites(updatedFavorites);

        if (isMounted.current) {
          console.log("SnackBar should open: Track quitado de favoritos");
          setSnackBar({
            open: true,
            text: "Track quitado de favoritos",
          });
        }
      } else {
        const newFavorite = localTracks.find(
          (track) => track.idTrack === trackId
        );
        if (!newFavorite) return;

        const addedFavorite = await addFavoriteTrackService({
          album: newFavorite.album,
          artist: newFavorite.artist,
          idTrack: newFavorite.idTrack,
          nameTrack: newFavorite.nameTrack,
        });

        if (!isMounted.current) return;

        setLocalTracks((prevTracks) =>
          prevTracks.map((track) =>
            track.idTrack === trackId ? { ...track, isFavorite: true } : track
          )
        );

        const updatedFavorites = [...favorites, addedFavorite];
        setFavorites(updatedFavorites);

        if (isMounted.current) {
          console.log("SnackBar should open: Track añadido a favoritos");
          setSnackBar({
            open: true,
            text: "Track añadido a favoritos",
          });
        }
      }
    } catch (error) {
      console.error(
        `Error al ${isFavorite ? "quitar" : "añadir"} el track de favoritos`,
        error
      );
      if (isMounted.current) {
        setSnackBar({
          open: true,
          text: `Error al ${
            isFavorite ? "quitar" : "añadir"
          } el track de favoritos`,
        });
      }
    }
  };

  const dataTable = [
    "Track",
    "Artista",
    "Album",
    "Duración",
    "Favorito",
    "Obtener Análisis",
  ];

  const handleGetAnalysis = (trackId: string) => {
    localStorage.setItem("selectedTrackId", trackId);
    navigate("/audio-analisis");
  };

  return (
    <Card className={style.card}>
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: "800px" }}>
          <TableHead className={style.tableHead}>
            <TableRow>
              {dataTable.map((item: string, index: number) => (
                <TableCell key={index} className={style.tableCellHeader}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {localTracks.map((track: Track, index: number) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Stack
                    sx={{ alignItems: "center" }}
                    direction="row"
                    spacing={2}
                  >
                    {loadingAvatars[track.idTrack] ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Avatar
                        src={track.album.images[0].url}
                        onLoad={() =>
                          setLoadingAvatars((prev) => ({
                            ...prev,
                            [track.idTrack]: false,
                          }))
                        }
                        onError={() =>
                          setLoadingAvatars((prev) => ({
                            ...prev,
                            [track.idTrack]: false,
                          }))
                        }
                        style={{
                          display: loadingAvatars[track.idTrack]
                            ? "none"
                            : "block",
                        }}
                      />
                    )}
                    <Typography
                      variant="subtitle2"
                      className={style.tableCellDataPrimary}
                    >
                      {track.nameTrack}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell className={style.tableCellDataSecondary}>
                  {track.artist[0].nameArtist}
                </TableCell>
                <TableCell className={style.tableCellDataSecondary}>
                  {track.album.nameAlbum}
                </TableCell>
                <TableCell className={style.tableCellDataSecondary}>
                  {useformatDuration(track.durationMs)}
                </TableCell>
                <TableCell>
                  <Tooltip
                    title={
                      track.isFavorite
                        ? "Quitar de Favoritos"
                        : "Añadir a Favoritos"
                    }
                    placement="left-start"
                  >
                    <IconButton
                      color="primary"
                      aria-label="toggle favorite"
                      onClick={() =>
                        toggleFavorite(track.idTrack, track.isFavorite)
                      }
                    >
                      {track.isFavorite ? (
                        <Favorite className={style.icon} />
                      ) : (
                        <FavoriteBorder className={style.icon} />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleGetAnalysis(track.idTrack)}
                    startIcon={<Leaderboard />}
                    className={style.button}
                  >
                    Ver Análisis
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          message={snackBar.text}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={TransitionSlide}
        />
      </Box>
      <TablePagination
        component="div"
        count={localTracks.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

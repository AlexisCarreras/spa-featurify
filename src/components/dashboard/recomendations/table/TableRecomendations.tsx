import { useEffect, useState, useRef } from "react";
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
import style from "./style.module.css";
import { useformatDuration } from "../../../../hooks/useFormatDuration";
import { getRecommendationsService } from "../../../../services/Tracks/getRecomendations/getRecomendationsService";
import { GetAllFavoritesTrack } from "../../../../services/Favorites/GetAllTracks/type";
import { getAllFavoritesService } from "../../../../services/Favorites/GetAllTracks/getAllFavoritesService";
import { deleteFavoriteTrackService } from "../../../../services/Favorites/DeleteTracks/deleteFavoriteTrackService";
import { addFavoriteTrackService } from "../../../../services/Favorites/AddTracks/addFavoriteTrackService";
import { Album, Artist } from "../type";
import { useNavigate } from "react-router-dom";
import { UseLoading } from "../../../../hooks/UseLoading";

interface Track {
  idTrack: string;
  nameTrack: string;
  durationMs: number;
  explicit: boolean;
  type: string;
  album: Album;
  artists: Artist[];
  isFavorite: boolean;
}

const TransitionSlide = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const TableRecomendations: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [localTracks, setLocalTracks] = useState<Track[]>([]);
  const [favorites, setFavorites] = useState<GetAllFavoritesTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: "",
  });

  const isMounted = useRef(true);

  useEffect(() => {
    const fetchRecommendationsAndFavorites = async () => {
      try {
        const [recommendationsResponse, favoritesResponse] = await Promise.all([
          getRecommendationsService(
            15,
            "4VikOud5ZmdmHH6h7uQeDB",
            "3jO7X5KupvwmWTHGtHgcgo"
          ),
          getAllFavoritesService(),
        ]);

        const updatedTracks: Track[] = recommendationsResponse.tracks.map(
          (track) => ({
            idTrack: track.idTrack,
            nameTrack: track.nameTrack,
            durationMs: track.duration_ms,
            explicit: track.explicit,
            type: track.type,
            album: track.album,
            artists: track.artists,
            isFavorite: favoritesResponse.some(
              (fav) => fav.idTrack === track.idTrack
            ),
          })
        );

        setTracks(updatedTracks);
        setLocalTracks(updatedTracks);

        setFavorites(favoritesResponse);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching recommendations or favorites:", error);
      }
    };

    fetchRecommendationsAndFavorites();

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
          setSnackBar({
            open: true,
            text: "Track quitado de favoritos",
          });
        }
      } else {
        const newFavorite = tracks.find((track) => track.idTrack === trackId);
        if (!newFavorite) return;

        const addedFavorite = await addFavoriteTrackService({
          album: newFavorite.album,
          artist: newFavorite.artists,
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
        {loading ? (
          <UseLoading height="37vh" size={100} />
        ) : (
          <Table sx={{ minWidth: "800px" }}>
            <TableHead className={style.tableHead}>
              <TableRow>
                {dataTable.map((item: string, index) => (
                  <TableCell key={index} className={style.tableCellHeader}>
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {localTracks.map((track: Track) => (
                <TableRow key={track.idTrack} hover>
                  <TableCell>
                    <Stack
                      sx={{ alignItems: "center" }}
                      direction="row"
                      spacing={2}
                    >
                      <Avatar src={track.album.images[0].url} />
                      <Typography
                        variant="subtitle2"
                        className={style.tableCellDataPrimary}
                      >
                        {track.nameTrack}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell className={style.tableCellDataSecondary}>
                    {track.artists
                      .map((artist) => artist.nameArtist)
                      .join(", ")}
                  </TableCell>
                  <TableCell className={style.tableCellDataSecondary}>
                    {track.album.nameAlbum}
                  </TableCell>
                  <TableCell className={style.tableCellDataSecondary}>
                    {useformatDuration(track.durationMs)}{" "}
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
                      onClick={() => handleGetAnalysis(track.idTrack)}
                      variant="outlined"
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
        )}
        <Snackbar
          open={snackBar.open}
          autoHideDuration={2000}
          onClose={handleCloseSnackBar}
          message={snackBar.text}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={TransitionSlide}
        />
      </Box>
      <TablePagination
        component="div"
        count={tracks.length}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

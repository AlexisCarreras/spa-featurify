import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CircularProgress,
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
import { Favorite, Leaderboard } from "@mui/icons-material";

import style from "./style.module.css";
import { Track } from "../type";
import { getAllFavoritesService } from "../../../../services/Favorites/GetAllTracks/getAllFavoritesService";
import { deleteFavoriteTrackService } from "../../../../services/Favorites/DeleteTracks/deleteFavoriteTrackService";
import { useNavigate } from "react-router-dom";

const TransitionSlide = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const TableFavorites: React.FunctionComponent = () => {
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [refreshFavorites, setRefreshFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedFavorites = await getAllFavoritesService();
        setTracks(updatedFavorites);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los favoritos:", error);
      } finally {
        setRefreshFavorites(false);
      }
    };

    fetchData();
  }, [refreshFavorites]);

  const toggleFavorite = async (trackId: string) => {
    try {
      const favorite = tracks.find((fav) => fav.idTrack === trackId);
      if (!favorite) return;

      await deleteFavoriteTrackService(favorite._id);

      setRefreshFavorites(!refreshFavorites);

      setSnackBar({
        open: true,
        text: "Track quitado de favoritos",
      });
    } catch (error) {
      console.error("Error al eliminar favorito:", error);
    }
  };

  const handleCloseSnackBar = () => {
    setSnackBar({
      ...snackBar,
      open: false,
    });
  };

  function noop(): void {
    // Función no operativa
  }

  const dataTable = [
    "Track",
    "Artista",
    "Album",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "37vh",
            }}
          >
            <CircularProgress sx={{ color: "#4E36F5" }} size={100} />
          </Box>
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
              {tracks.map((track: Track) => (
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
                    {track.artist.map((artist) => artist.nameArtist).join(", ")}
                  </TableCell>
                  <TableCell className={style.tableCellDataSecondary}>
                    {track.album.nameAlbum}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      aria-label="remove from favorites"
                      onClick={() => toggleFavorite(track.idTrack)}
                    >
                      <Tooltip
                        title="Quitar de Favoritos"
                        placement="left-start"
                      >
                        <Favorite className={style.icon} />
                      </Tooltip>
                    </IconButton>
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
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
          message={snackBar.text}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={TransitionSlide}
        />
      </Box>
      <TablePagination
        component="div"
        count={tracks.length}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

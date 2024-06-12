import { useState, useEffect } from "react";
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
import { Track, TableSearchProps } from "./type";
import { useformatDuration } from "../../../../hooks/useFormatDuration";

const TransitionSlide = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export const TableSearch: React.FunctionComponent<TableSearchProps> = ({
  tracks,
}) => {
  const [localTracks, setLocalTracks] = useState<Track[]>([]);
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: "",
  });

  useEffect(() => {
    setLocalTracks(
      tracks.map((track) => ({
        ...track,
        isFavorite: track.isFavorite ?? false,
      }))
    );
  }, [tracks]);

  const toggleFavorite = (trackId: string) => {
    setLocalTracks((prevTracks) =>
      prevTracks.map((track) =>
        track.idTrack === trackId
          ? { ...track, isFavorite: !track.isFavorite }
          : track
      )
    );

    const track = localTracks.find((track) => track.idTrack === trackId);
    const action = track?.isFavorite ? "quitado de" : "añadido a";

    setSnackBar({
      open: true,
      text: `Track ${action} favoritos`,
    });
  };

  const handleCloseSnackBar = () => {
    setSnackBar({
      ...snackBar,
      open: false,
    });
  };

  function noop(): void {
    // do nothing
  }

  const dataTable = [
    "Track",
    "Artista",
    "Album",
    "Duración",
    "Favorito",
    "Obtener Análisis",
  ];

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
                  {track.artist[0].nameArtist}
                </TableCell>
                <TableCell className={style.tableCellDataSecondary}>
                  {track.album.nameAlbum}
                </TableCell>
                <TableCell className={style.tableCellDataSecondary}>
                  {useformatDuration(track.durationMs)}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(track.idTrack)}
                  >
                    {track.isFavorite ? (
                      <Tooltip
                        title="Quitar de Favoritos"
                        placement="left-start"
                      >
                        <Favorite className={style.icon} />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Añadir a Favoritos"
                        placement="left-start"
                      >
                        <FavoriteBorder className={style.icon} />
                      </Tooltip>
                    )}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Button
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
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={0}
        rowsPerPage={5}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

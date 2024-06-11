import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { ArrowForward, KeyboardArrowRight } from "@mui/icons-material";

import { Link } from "react-router-dom";

import style from "./style.module.css";
import "./stylesMUI.css";

import { dataRecomendationsPreview } from "./mock/dataRecomendationsPreview";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
};

export const RecomendationsPreview: React.FunctionComponent = () => {
  return (
    <Card sx={{ height: "100%" }} className={style.cardPreviewRecomendations}>
      <CardHeader title="Tracks Recomendados" />
      <Divider />
      <Box sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell
                className={style.tableCellLeftRecomendations}
              ></TableCell>
              <TableCell>Track</TableCell>
              <TableCell>Artista</TableCell>
              <TableCell>Album</TableCell>
              <TableCell className={style.tableCellRightRecomendations}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataRecomendationsPreview.tracks.map((track) => {
              const artistNames = track.artists
                .map((artist) => artist.nameArtist)
                .join(", ");
              const displayArtistNames = truncateText(artistNames, 22);
              const showArtistTooltip = artistNames.length > 22;

              const trackName = track.nameTrack;
              const displayTrackName = truncateText(trackName, 22);
              const showTrackTooltip = trackName.length > 22;

              const albumName = track.album.nameAlbum;
              const displayAlbumName = truncateText(albumName, 22);
              const showAlbumTooltip = albumName.length > 22;

              return (
                <TableRow hover key={track.idTrack}>
                  <TableCell>
                    <img
                      src={track.album.images[2].url}
                      alt={track.album.nameAlbum}
                      style={{
                        width: 45,
                        height: 45,
                        borderRadius: "100%",
                        boxShadow:
                          "0px 5px 22px 0px rgba(0, 0, 0, 0.1), inset 0px 0px 0px 1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {showTrackTooltip ? (
                      <Tooltip title={trackName}>
                        <span>{displayTrackName}</span>
                      </Tooltip>
                    ) : (
                      <span>{trackName}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {showArtistTooltip ? (
                      <Tooltip title={artistNames}>
                        <span>{displayArtistNames}</span>
                      </Tooltip>
                    ) : (
                      <span>{artistNames}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {showAlbumTooltip ? (
                      <Tooltip title={albumName}>
                        <span>{displayAlbumName}</span>
                      </Tooltip>
                    ) : (
                      <span>{albumName}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title="Ver Análisis del Track"
                      placement="left-start"
                    >
                      <IconButton edge="end">
                        <KeyboardArrowRight />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link to="/recomendations">
          <Button
            className={style.buttonSeeMore}
            color="inherit"
            endIcon={<ArrowForward />}
            size="small"
            variant="text"
          >
            Ver todos
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

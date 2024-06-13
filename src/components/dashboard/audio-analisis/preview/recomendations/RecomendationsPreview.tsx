import React, { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";
import { ArrowForward, KeyboardArrowRight } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";
import "./stylesMUI.css";
import { truncateText } from "../../../../../hooks/useTruncateText";
import { getRecommendationsService } from "../../../../../services/Tracks/getRecomendations/getRecomendationsService";
import { Track } from "../../../../../services/Tracks/getRecomendations/type";
import { DataRecomendationsPreview } from "./type";
import { UseLoading } from "../../../../../hooks/UseLoading";

export const RecomendationsPreview: React.FunctionComponent<
  DataRecomendationsPreview
> = ({
  nameTrack,
  seedTrack,
  seedArtist,
  limit,
  flagTrackId,
  setFlagTrackId,
}) => {
  const navigate = useNavigate();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const convertSecondsToHMS = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const pad = (num: number) => num.toString().padStart(2, "0");
    return `${pad(hours)} horas y ${pad(minutes)} minutos`;
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await getRecommendationsService(
          limit,
          seedTrack,
          seedArtist[0].idArtist
        );
        setTracks(response.tracks);
      } catch (err: any) {
        if (err.response && err.response.status === 429) {
          setError(
            `Hubo más solicitudes a recomendaciones que las permitidas por Spotify. Inténtalo de nuevo después de ${convertSecondsToHMS(
              err.response.data.retryAfter
            )}.`
          );
        } else {
          setError("Error fetching recommendations. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [flagTrackId]);

  const handleGetAllRecomendations = () => {
    localStorage.setItem(
      "tracksRecomendations",
      JSON.stringify({
        nameTrack,
        seedTrack,
        seedArtist,
        limit: 15,
      })
    );
    navigate("/recomendations");
  };

  const handleGetAnalysis = (trackId: string) => {
    localStorage.setItem("selectedTrackId", trackId);
    setFlagTrackId(!flagTrackId);
  };

  return (
    <Card sx={{ height: "100%" }} className={style.cardPreviewRecomendations}>
      {loading ? (
        <UseLoading height="30vh" size={70} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
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
                {tracks?.map((track) => {
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
                          <IconButton
                            edge="end"
                            onClick={() => handleGetAnalysis(track.idTrack)}
                          >
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
                onClick={handleGetAllRecomendations}
                color="inherit"
                endIcon={<ArrowForward />}
                size="small"
                variant="text"
              >
                Ver todos
              </Button>
            </Link>
          </CardActions>
        </>
      )}
    </Card>
  );
};

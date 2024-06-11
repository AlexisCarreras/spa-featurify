import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { ArtTrack, Audiotrack, Speed, Piano } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { CardDetailTracksProps } from "./type";
import { useformatDuration } from "../../../../hooks/useFormatDuration";

export const CardDetails: React.FunctionComponent<CardDetailTracksProps> = ({
  title,
  durationMs,
  description,
  typeIcon,
  loudness,
  tempo,
  timeSignature,
  typeNote,
  mode,
}) => {
  const timeSignatureDescriptions: { [key: number]: string } = {
    3: "3/4",
    4: "4/4",
    5: "5/4",
    6: "6/4",
    7: "7/4",
  };

  const descriptionTimeSignature = timeSignature
    ? timeSignatureDescriptions[timeSignature] || "Tipo de compás desconocido"
    : "";

  const getAvatarContent = (typeIcon: string) => {
    const getCommonProps = (bgcolor: string) => ({
      sx: {
        bgcolor,
        height: "56px",
        width: "56px",
      },
    });

    switch (typeIcon) {
      case "track":
        return (
          <Avatar {...getCommonProps("#635bff")}>
            <ArtTrack />
          </Avatar>
        );
      case "tempo":
        return (
          <Avatar {...getCommonProps("#15b79f")}>
            <Speed />
          </Avatar>
        );
      case "nota":
        return (
          <Avatar {...getCommonProps("#fb9c0c")}>
            <Piano />
          </Avatar>
        );
      case "compas":
        return (
          <Avatar {...getCommonProps("#635bff")}>
            <Audiotrack />
          </Avatar>
        );
      default:
        return null;
    }
  };

  const normalizedLoudness = loudness ? ((loudness + 60) / 60) * 100 : 0;

  const keyMap: { [key: number]: string } = {
    0: "C",
    1: "C♯/D♭",
    2: "D",
    3: "D♯/E♭",
    4: "E",
    5: "F",
    6: "F♯/G♭",
    7: "G",
    8: "G♯/A♭",
    9: "A",
    10: "A♯/B♭",
    11: "B",
  };

  const modeMap: { [mode: number]: string } = {
    0: "Menor",
    1: "Mayor",
  };

  function getKeyDescription(typeNote: number): string {
    return keyMap[typeNote] || "Clave desconocida";
  }

  function getModeDescription(mode: number): string {
    return modeMap[mode] || "Modo desconocido";
  }

  const keyDescription = typeNote ? getKeyDescription(typeNote) : "";
  const modeDescription = mode ? getModeDescription(mode) : "";

  return (
    <Card sx={{ height: "100%" }} className={style.card}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography className={style.title} variant="overline">
                {title}
              </Typography>
              <Typography className={style.description} variant="h4">
                {durationMs && useformatDuration(durationMs)}
                {tempo && `${Math.round(tempo)} BPM`}
              </Typography>
              {timeSignature && (
                <>
                  <Typography className={style.title} variant="overline">
                    Compás
                  </Typography>
                  <Typography className={style.description} variant="h4">
                    {descriptionTimeSignature}
                  </Typography>
                </>
              )}
              {mode && (
                <>
                  <Typography variant="body1" color="textSecondary">
                    {` ${keyDescription} ${modeDescription}`}
                  </Typography>
                </>
              )}
            </Stack>
            {typeIcon ? getAvatarContent(typeIcon) : null}
          </Stack>
          {loudness && (
            <Box sx={{ width: "100%" }}>
              <Box sx={{ display: "flex", justifyContent: "start", mb: 1 }}>
                <Typography variant="body2" color="textSecondary">
                  Volumen:
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={normalizedLoudness}
                  />
                </Box>
                <Box sx={{ minWidth: 50 }}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >{`${Math.round(loudness)} dB`}</Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

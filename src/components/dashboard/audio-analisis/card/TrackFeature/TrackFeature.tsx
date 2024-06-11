import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

import { Speed } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { CardDetailTracksProps } from "./type";

export const TrackFeature: React.FunctionComponent<CardDetailTracksProps> = ({
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

  const descriptionTimeSignature =
    timeSignatureDescriptions[timeSignature] || "Tipo de compás desconocido";

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

  const keyDescription = getKeyDescription(typeNote);
  const modeDescription = getModeDescription(mode);

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
                Características
              </Typography>
              <Typography variant="h4" className={style.description}>
                {`${keyDescription} ${modeDescription}`}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography className={style.description} variant="h4">
                  {`${Math.round(tempo)} BPM`}
                </Typography>
                <Typography className={style.description} variant="h4">
                  {descriptionTimeSignature}
                </Typography>
              </Box>
            </Stack>
            <Avatar
              sx={{
                bgcolor: "#15b79f",
                height: "56px",
                width: "56px",
              }}
            >
              <Speed />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

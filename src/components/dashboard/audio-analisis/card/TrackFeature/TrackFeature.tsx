import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import { Speed } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { CardDetailTracksProps } from "./type";
import {
  getKeyDescription,
  getModeDescription,
  timeSignatureDescriptions,
} from "./utils";

export const TrackFeature: React.FunctionComponent<CardDetailTracksProps> = ({
  tempo,
  timeSignature,
  typeNote,
  mode,
  loadingFeatures,
}) => {
  const descriptionTimeSignature =
    timeSignatureDescriptions[timeSignature] || "Compás desconocido";

  const keyDescription = getKeyDescription(typeNote);
  const modeDescription = getModeDescription(mode);

  return (
    <Card sx={{ height: "100%" }} className={style.card}>
      {loadingFeatures ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "13vh",
          }}
        >
          <CircularProgress sx={{ color: "#4E36F5" }} size={70} />
        </Box>
      ) : (
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
      )}
    </Card>
  );
};

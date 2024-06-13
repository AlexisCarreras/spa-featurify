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
import {
  getKeyDescription,
  getModeDescription,
  timeSignatureDescriptions,
} from "./utils";
import { UseLoading } from "../../../../../hooks/UseLoading";

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
        <UseLoading height="13vh" size={70} />
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

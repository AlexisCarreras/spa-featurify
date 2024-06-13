import {
  Avatar,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import { Audiotrack } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { CardDetailTracksProps } from "./type";
import { useformatDuration } from "../../../../../hooks/useFormatDuration";
import { truncateText } from "../../../../../hooks/useTruncateText";
import { UseLoading } from "../../../../../hooks/UseLoading";

export const TrackName: React.FunctionComponent<CardDetailTracksProps> = ({
  nameTrack,
  durationMs,
  loudness,
  loadingFeatures,
  loadingTrack,
}) => {
  const normalizedLoudness = loudness ? ((loudness + 60) / 60) * 100 : 0;

  const name = truncateText(nameTrack, 18);
  const showNameTooltip = nameTrack.length > 18;

  return (
    <Card sx={{ height: "100%" }} className={style.card}>
      {loadingFeatures && loadingTrack ? (
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
                  {showNameTooltip ? (
                    <Tooltip title={nameTrack}>
                      <span>{name}</span>
                    </Tooltip>
                  ) : (
                    <span>{nameTrack}</span>
                  )}
                </Typography>
                <Typography className={style.description} variant="h4">
                  {durationMs && useformatDuration(durationMs)}
                </Typography>
              </Stack>
              <Avatar
                sx={{
                  bgcolor: "#FB9C0C",
                  height: "56px",
                  width: "56px",
                }}
              >
                <Audiotrack />
              </Avatar>
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
      )}
    </Card>
  );
};

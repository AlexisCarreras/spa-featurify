import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  Card,
  CardContent,
  IconButton,
  Slider,
  Stack,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  PlayArrowRounded,
  PauseRounded,
  FastRewindRounded,
  FastForwardRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

import style from "./style.module.css";
import "./stylesMUI.css";
import { AudioPlayerProps } from "./type";

const formatDuration = (value: number) => {
  const minute = Math.floor(value / 60);
  const secondLeft = Math.floor(value - minute * 60);
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
};

export const TrackPreview: React.FunctionComponent<AudioPlayerProps> = ({
  url,
  loadingTrack,
}) => {
  const theme = useTheme();
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.54)";

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => setPlaying(!playing);

  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume((newValue as number) / 100); // Convert volume to the range 0-1
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setPosition(state.playedSeconds);
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleSeekChange = (event: Event, newValue: number | number[]) => {
    setPosition(newValue as number);
    if (playerRef.current) {
      playerRef.current.seekTo(newValue as number, "seconds");
    }
  };

  return (
    <Card sx={{ height: "100%" }} className={style.card}>
      {loadingTrack ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "5vh",
          }}
        >
          <CircularProgress sx={{ color: "#4E36F5" }} size={100} />
        </Box>
      ) : (
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ReactPlayer
              ref={playerRef}
              url={url}
              playing={playing}
              volume={volume}
              onDuration={handleDuration}
              onProgress={handleProgress}
              controls={false}
              width="100%"
              height="20px"
            />
          </Box>
          <Slider
            aria-label="time-indicator"
            size="small"
            value={position}
            min={0}
            step={1}
            max={duration}
            onChange={handleSeekChange}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&::before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${
                    theme.palette.mode === "dark"
                      ? "rgb(255 255 255 / 16%)"
                      : "rgb(0 0 0 / 16%)"
                  }`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: -2,
            }}
          >
            <Typography variant="body2">{formatDuration(position)}</Typography>
            <Typography variant="body2">
              -{formatDuration(duration - position)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mt: -1,
            }}
          >
            <IconButton aria-label="previous song">
              <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
            <IconButton
              aria-label={playing ? "pause" : "play"}
              onClick={handlePlayPause}
            >
              {playing ? (
                <PauseRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PlayArrowRounded
                  sx={{ fontSize: "3rem" }}
                  htmlColor={mainIconColor}
                />
              )}
            </IconButton>
            <IconButton aria-label="next song">
              <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
            </IconButton>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
          >
            <VolumeDownRounded htmlColor={lightIconColor} />
            <Slider
              aria-label="Volume"
              value={volume * 100} // Convert volume to the range 0-100
              onChange={handleVolumeChange}
              sx={{
                color:
                  theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
                "& .MuiSlider-track": {
                  border: "none",
                },
                "& .MuiSlider-thumb": {
                  width: 24,
                  height: 24,
                  backgroundColor: "#fff",
                  "&::before": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              }}
            />
            <VolumeUpRounded htmlColor={lightIconColor} />
          </Stack>
        </CardContent>
      )}
    </Card>
  );
};

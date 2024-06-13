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
  const mainIconColor = "#222"; // Define el color principal
  const lightIconColor = "#222"; // Define el color para iconos de volumen

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => setPlaying(!playing);

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    setVolume((newValue as number) / 100); // Convertir el volumen al rango: 0-1
  };

  const handleProgress = (state: { playedSeconds: number }) => {
    setPosition(state.playedSeconds);
  };

  const handleDuration = (dur: number) => {
    setDuration(dur);
  };

  const handleSeekChange = (_: Event, newValue: number | number[]) => {
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
              color: "#4E36F5",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&::before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px rgba(78, 54, 245, 0.16)`,
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
              <FastRewindRounded
                fontSize="large"
                sx={{ color: mainIconColor }}
              />
            </IconButton>
            <IconButton
              aria-label={playing ? "pause" : "play"}
              onClick={handlePlayPause}
            >
              {playing ? (
                <PauseRounded sx={{ fontSize: "3rem", color: mainIconColor }} />
              ) : (
                <PlayArrowRounded
                  sx={{ fontSize: "3rem", color: mainIconColor }}
                />
              )}
            </IconButton>
            <IconButton aria-label="next song">
              <FastForwardRounded
                fontSize="large"
                sx={{ color: mainIconColor }}
              />
            </IconButton>
          </Box>
          <Stack
            spacing={2}
            direction="row"
            sx={{ mb: 1, px: 1 }}
            alignItems="center"
          >
            <VolumeDownRounded sx={{ color: lightIconColor }} />
            <Slider
              aria-label="Volume"
              value={volume * 100} // Convertir el volumen al rango de: 0-100
              onChange={handleVolumeChange}
              sx={{
                color: "#4E36F5",
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
            <VolumeUpRounded sx={{ color: lightIconColor }} />
          </Stack>
        </CardContent>
      )}
    </Card>
  );
};

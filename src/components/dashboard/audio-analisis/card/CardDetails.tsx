import { Avatar, Card, CardContent, Stack, Typography } from "@mui/material";

import { ArtTrack, Audiotrack, Speed, Piano } from "@mui/icons-material";

import style from "./style.module.css";

import { CardDetailTracksProps } from "./type";

export const CardDetails: React.FunctionComponent<CardDetailTracksProps> = ({
  title,
  description,
  typeIcon,
}) => {
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
                {description}
              </Typography>
            </Stack>
            {getAvatarContent(typeIcon)}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

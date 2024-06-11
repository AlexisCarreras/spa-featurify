import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {  ArrowForward, KeyboardArrowRight } from "@mui/icons-material";

import style from "./style.module.css";
import "./stylesMUI.css";

import { dataFavoritesLimit } from "./mock/dataFavoritesLimit";
import { Link } from "react-router-dom";

export const FavoritesPreview: React.FunctionComponent = () => {
  return (
    <Card sx={{ height: "100%" }} className={style.cardPreviewFavorites}>
      <CardHeader title="Tracks Favoritos" />
      <Divider />
      <List>
        {dataFavoritesLimit.map((favorite, index) => (
          <ListItem
            divider={index < dataFavoritesLimit.length - 1}
            key={favorite._id}
          >
            <ListItemAvatar>
              {favorite.album.images[0] ? (
                <Box
                  component="img"
                  src={favorite.album.images[0].url}
                  sx={{ borderRadius: 1, height: "48px", width: "48px" }}
                />
              ) : (
                <Box
                  sx={{
                    borderRadius: 1,
                    backgroundColor: "var(--mui-palette-neutral-200)",
                    height: "48px",
                    width: "48px",
                  }}
                />
              )}
            </ListItemAvatar>
            <ListItemText
              primary={favorite.nameTrack}
              primaryTypographyProps={{ variant: "subtitle1" }}
              secondary={`${favorite.artist
                .map((artist) => artist.nameArtist)
                .join(", ")}`}
              secondaryTypographyProps={{ variant: "body2" }}
            />
            <Tooltip title="Ver Análisis del Track" placement="left-start">
              <IconButton edge="end">
                <KeyboardArrowRight />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Link to="/favorites">
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

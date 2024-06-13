import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AlbumOutlined,
  CalendarTodayOutlined,
  QueueMusicOutlined,
} from "@mui/icons-material";
import style from "./style.module.css";
import { AlbumDetailsProps } from "./type";
import { truncateText } from "../../../../hooks/useTruncateText";
import { capitalizeFirstLetter } from "../../../../hooks/useCapitalizeFirstLetter";
import { UseLoading } from "../../../../hooks/useLoading";

export const AlbumDetails: React.FunctionComponent<AlbumDetailsProps> = ({
  album,
  loadingTrack,
}) => {
  const { idAlbum, images, nameAlbum, releaseDate, totalTracks, typeAlbum } =
    album;

  // Encuentra la imagen más adecuada (por ejemplo, la de mayor resolución)
  const albumCover = images.length > 0 ? images[0].url : "";

  const name = truncateText(nameAlbum, 30);
  const showNameTooltip = nameAlbum.length > 30;

  const renderCardHeader = () => {
    return showNameTooltip ? (
      <Tooltip title={nameAlbum}>
        <CardHeader title={name} />
      </Tooltip>
    ) : (
      <CardHeader title={nameAlbum} />
    );
  };

  return (
    <Card
      sx={{ height: "100%" }}
      className={style.cardAlbumDetails}
      key={idAlbum}
    >
      {loadingTrack ? (
        <UseLoading height="67vh" size={100} />
      ) : (
        <>
          {renderCardHeader()}
          <CardContent className={style.cardContentAlbum}>
            <Stack spacing={2}>
              <img
                src={albumCover}
                alt={nameAlbum}
                style={{ borderRadius: 8 }}
              />
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center", justifyContent: "center" }}
              >
                <Stack spacing={1} sx={{ alignItems: "center" }}>
                  <AlbumOutlined className={style.iconDetailsAlbum} />
                  <Typography variant="h6" className={style.titleDetailsAlbum}>
                    Tipo de Album:
                  </Typography>
                  <Typography
                    className={style.descriptionDetailsAlbum}
                    variant="subtitle2"
                  >
                    {capitalizeFirstLetter(typeAlbum)}
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: "center" }}>
                  <QueueMusicOutlined className={style.iconDetailsAlbum} />
                  <Typography variant="h6" className={style.titleDetailsAlbum}>
                    Total Tracks:
                  </Typography>
                  <Typography
                    className={style.descriptionDetailsAlbum}
                    variant="subtitle2"
                  >
                    {totalTracks}
                  </Typography>
                </Stack>
                <Stack spacing={1} sx={{ alignItems: "center" }}>
                  <CalendarTodayOutlined className={style.iconDetailsAlbum} />
                  <Typography variant="h6" className={style.titleDetailsAlbum}>
                    Lanzamiento:
                  </Typography>
                  <Typography
                    className={style.descriptionDetailsAlbum}
                    variant="subtitle2"
                  >
                    {new Date(releaseDate).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </>
      )}
    </Card>
  );
};

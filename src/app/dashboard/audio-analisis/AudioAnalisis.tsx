import { Grid, Stack } from "@mui/material";
import { CardDetails } from "../../../components/dashboard/audio-analisis/card/CardDetails";
import { FavoritesPreview } from "../../../components/dashboard/audio-analisis/preview/favorites/FavoritesPreview";

import style from "./style.module.css";
import "./stylesMUI.css";
import { RecomendationsPreview } from "../../../components/dashboard/audio-analisis/preview/recomendations/RecomendationsPreview";
import { AlbumDetails } from "../../../components/dashboard/audio-analisis/album-details/AlbumDetails";
import { TrackAnalysis } from "../../../components/dashboard/audio-analisis/track-analysis/TrackAnalysis";
import { dataTrackFeature } from "./mock/dataTrackFeature";
import { TrackName } from "../../../components/dashboard/audio-analisis/card/TrackName/TrackName";
import { TrackFeature } from "../../../components/dashboard/audio-analisis/card/TrackFeature/TrackFeature";
import { TrackAddFavorites } from "../../../components/dashboard/audio-analisis/card/TrackFavorites/TrackAddFavorites";

export const AudioAnalisis: React.FunctionComponent = () => {
  const { durationMs, loudness, tempo, timeSignature, key, mode } =
    dataTrackFeature;

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackName
            durationMs={durationMs}
            loudness={loudness}
          />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackFeature
            tempo={tempo}
            timeSignature={timeSignature}
            typeNote={key}
            mode={mode}
          />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackAddFavorites />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <CardDetails title="Compás" description="4/4" typeIcon="compas" />
        </Grid>
        <Grid lg={8} xs={12} className={style.gridCardBarFeatures}>
          <TrackAnalysis dataTrackFeature={dataTrackFeature} />
        </Grid>
        <Grid lg={4} md={6} xs={12} className={style.gridCardAlbumDetails}>
          <AlbumDetails />
        </Grid>
        <Grid lg={4} md={6} xs={12} className={style.gridCardFavorites}>
          <FavoritesPreview />
        </Grid>
        <Grid lg={8} md={12} xs={12} className={style.gridCardRecomendations}>
          <RecomendationsPreview />
        </Grid>
      </Grid>
    </Stack>
  );
};

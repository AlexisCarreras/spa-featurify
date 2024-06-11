import { Grid, Stack } from "@mui/material";
import { CardDetails } from "../../../components/dashboard/audio-analisis/card/CardDetails";
import { FavoritesPreview } from "../../../components/dashboard/audio-analisis/preview/favorites/FavoritesPreview";

import style from "./style.module.css";
import "./stylesMUI.css";
import { RecomendationsPreview } from "../../../components/dashboard/audio-analisis/preview/recomendations/RecomendationsPreview";
import { AlbumDetails } from "../../../components/dashboard/audio-analisis/album-details/AlbumDetails";
import { TrackAnalysis } from "../../../components/dashboard/audio-analisis/track-analysis/TrackAnalysis";

export const AudioAnalisis: React.FunctionComponent = () => {
    return (
    <Stack className={style.searchContainer} spacing={3}>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <CardDetails
            title="La Razón Que Te Demora"
            description="4:50"
            typeIcon="track"
          />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <CardDetails title="Tempo" description="126 BPM" typeIcon="tempo" />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <CardDetails title="Nota" description="Sol M" typeIcon="nota" />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <CardDetails title="Compás" description="4/4" typeIcon="compas" />
        </Grid>
        <Grid lg={8} xs={12} className={style.gridCardBarFeatures}>
          <TrackAnalysis />
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

import { useEffect, useState } from "react";
import { Grid, Stack } from "@mui/material";
import { FavoritesPreview } from "../../../components/dashboard/audio-analisis/preview/favorites/FavoritesPreview";

import style from "./style.module.css";
import "./stylesMUI.css";
import { RecomendationsPreview } from "../../../components/dashboard/audio-analisis/preview/recomendations/RecomendationsPreview";
import { AlbumDetails } from "../../../components/dashboard/audio-analisis/album-details/AlbumDetails";
import { TrackAnalysis } from "../../../components/dashboard/audio-analisis/track-analysis/TrackAnalysis";
import { TrackName } from "../../../components/dashboard/audio-analisis/card/TrackName/TrackName";
import { TrackFeature } from "../../../components/dashboard/audio-analisis/card/TrackFeature/TrackFeature";
import { TrackAddFavorites } from "../../../components/dashboard/audio-analisis/card/TrackFavorites/TrackAddFavorites";
import { TrackPreview } from "../../../components/dashboard/audio-analisis/card/TrackPreview/TrackPreview";
import { getAudioFeaturesService } from "../../../services/Tracks/getAudioFeatures/getAudioFeaturesService";
import { AudioFeatures } from "../../../services/Tracks/getAudioFeatures/type";

export const AudioAnalisis: React.FunctionComponent = () => {
  const selectedTrackId = localStorage.getItem("selectedTrackId");

  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures>({
    idTrack: "",
    danceability: 0,
    energy: 0,
    key: 0,
    loudness: 0,
    mode: 0,
    speechiness: 0,
    acousticness: 0,
    instrumentalness: 0,
    liveness: 0,
    valence: 0,
    tempo: 0,
    durationMs: 0,
    timeSignature: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      try {
        if (!selectedTrackId) return;
        const data = await getAudioFeaturesService(selectedTrackId);
        setAudioFeatures(data);
      } catch (error) {
        setError("Error fetching audio features");
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFeatures();
  }, []);

  const { durationMs, loudness, tempo, timeSignature, key, mode } =
    audioFeatures;

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackName
            loading={loading}
            durationMs={durationMs}
            loudness={loudness}
          />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackFeature
            loading={loading}
            tempo={tempo}
            timeSignature={timeSignature}
            typeNote={key}
            mode={mode}
          />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackAddFavorites trackId={selectedTrackId} />
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          <TrackPreview url="https://p.scdn.co/mp3-preview/4e165954262eec8ac03d4a5c17f15a0f1bac808d?cid=c0da54e4db61472d91c890564e176f07" />
        </Grid>
        <Grid lg={8} xs={12} className={style.gridCardBarFeatures}>
          <TrackAnalysis dataTrackFeature={audioFeatures} loading={loading} />
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

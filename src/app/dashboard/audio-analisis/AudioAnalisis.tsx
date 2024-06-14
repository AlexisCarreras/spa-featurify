import { useEffect, useState } from "react";
import { Alert, Card, Grid, Stack } from "@mui/material";
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
import { getTrackService } from "../../../services/Tracks/getTrack/getTrackService";
import { Track } from "../../../services/Tracks/getTrack/type";
import { dataInitialFeatures, dataInitialTrack } from "./utils";
import { UseLoading } from "../../../hooks/UseLoading";

export const AudioAnalisis: React.FunctionComponent = () => {
  const selectedTrackId = localStorage.getItem("selectedTrackId");

  const [audioFeatures, setAudioFeatures] =
    useState<AudioFeatures>(dataInitialFeatures);
  const [loadingFeatures, setLoadingFeatures] = useState<boolean>(true);
  const [errorFeatures, setErrorFeatures] = useState<string | null>(null);

  const [track, setTrack] = useState<Track>(dataInitialTrack);
  const [loadingTrack, setLoadingTrack] = useState<boolean>(true);
  const [errorTrack, setErrorTrack] = useState<string | null>(null);

  // Flag para renderizar nuevamente el audio analisis
  const [flagTrackId, setFlagTrackId] = useState<boolean>(false);

  // Flag para renderizar favoritos en audio analisis
  const [flagTrackFavorite, setFlagTrackFavorite] = useState<boolean>(false);

  useEffect(() => {
    const fetchAudioFeatures = async () => {
      try {
        if (!selectedTrackId) return;
        const data = await getAudioFeaturesService(selectedTrackId);
        setAudioFeatures(data);
      } catch (error) {
        setErrorFeatures("Error al obtener el análisis del track");
      } finally {
        setLoadingFeatures(false);
      }
    };

    fetchAudioFeatures();
  }, [flagTrackId]);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        if (!selectedTrackId) return;
        const data = await getTrackService(selectedTrackId);
        setTrack(data);
      } catch (error) {
        setErrorTrack("Error al obtener la información track");
      } finally {
        setLoadingTrack(false);
      }
    };

    fetchTrack();
  }, [flagTrackId]);

  const { durationMs, loudness, tempo, timeSignature, key, mode } =
    audioFeatures;

  const { nameTrack, previewTrackUrl, album, artists } = track;

  return (
    <Stack className={style.searchContainer} spacing={3}>
      <Grid container spacing={3}>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          {errorTrack ? (
            <Alert severity="error">{errorTrack}</Alert>
          ) : errorFeatures ? (
            <Alert severity="error">{errorFeatures}</Alert>
          ) : (
            <TrackName
              nameTrack={nameTrack}
              durationMs={durationMs}
              loudness={loudness}
              loadingFeatures={loadingFeatures}
              loadingTrack={loadingTrack}
            />
          )}
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          {errorFeatures ? (
            <Alert severity="error">{errorFeatures}</Alert>
          ) : (
            <TrackFeature
              tempo={tempo}
              timeSignature={timeSignature}
              typeNote={key}
              mode={mode}
              loadingFeatures={loadingFeatures}
            />
          )}
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          {errorTrack ? (
            <></>
          ) : (
            <TrackAddFavorites
              trackId={selectedTrackId}
              loadingTrack={loadingTrack}
              track={track}
              flagTrackFavorite={flagTrackFavorite}
              setFlagTrackFavorite={setFlagTrackFavorite}
            />
          )}
        </Grid>
        <Grid lg={3} sm={6} xs={12} className={style.gridCardDetails}>
          {errorTrack ? (
            <></>
          ) : (
            <TrackPreview url={previewTrackUrl} loadingTrack={loadingTrack} />
          )}
        </Grid>
        <Grid lg={8} xs={12} className={style.gridCardBarFeatures}>
          {errorFeatures ? (
            <></>
          ) : (
            <TrackAnalysis
              dataTrackFeature={audioFeatures}
              loadingFeatures={loadingFeatures}
            />
          )}
        </Grid>
        <Grid lg={4} md={6} xs={12} className={style.gridCardAlbumDetails}>
          {errorTrack ? (
            <></>
          ) : (
            <AlbumDetails album={album} loadingTrack={loadingTrack} />
          )}
        </Grid>
        <Grid lg={4} md={6} xs={12} className={style.gridCardFavorites}>
          <FavoritesPreview
            flagTrackId={flagTrackId}
            setFlagTrackId={setFlagTrackId}
            flagTrackFavorite={flagTrackFavorite}
          />
        </Grid>
        <Grid lg={8} md={12} xs={12} className={style.gridCardRecomendations}>
          <Card
            sx={{ height: "100%" }}
            className={style.cardPreviewRecomendations}
          >
            {loadingTrack ? (
              <UseLoading height="32vh" size={70} />
            ) : (
              selectedTrackId && (
                <RecomendationsPreview
                  nameTrack={nameTrack}
                  seedTrack={selectedTrackId}
                  seedArtist={artists}
                  limit={4}
                  flagTrackId={flagTrackId}
                  setFlagTrackId={setFlagTrackId}
                />
              )
            )}
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
